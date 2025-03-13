import scrapy
import json
import requests
from datetime import datetime
from urllib.parse import urlencode

class AirbnbSpider(scrapy.Spider):
    name = 'airbnb'
    
    def __init__(self, location=None, checkin=None, checkout=None, guests=None, *args, **kwargs):
        super(AirbnbSpider, self).__init__(*args, **kwargs)
        self.location = location or "New York"
        self.checkin = checkin or (datetime.now().strftime("%Y-%m-%d"))
        self.checkout = checkout or ((datetime.now().replace(day=1) + datetime.timedelta(days=32)).replace(day=1).strftime("%Y-%m-%d"))
        self.guests = guests or "2"
        self.api_url = "https://www.airbnb.com/api/v2/explore_tabs"
    
    def start_requests(self):
        params = {
            'version': '1.3.9',
            'satori_version': '1.1.0',
            'items_per_grid': '18',
            'timezone_offset': '-240',
            'is_standard_search': 'true',
            'tab_id': 'home_tab',
            'section_offset': '0',
            'query': self.location,
            'checkin': self.checkin,
            'checkout': self.checkout,
            'adults': self.guests,
            'source': 'structured_search_input_header',
            'search_type': 'filter_change',
            'locale': 'en',
            'currency': 'USD',
        }
        
        url = f"{self.api_url}?{urlencode(params)}"
        yield scrapy.Request(url=url, callback=self.parse_api)
    
    def parse_api(self, response):
        data = json.loads(response.body)
        
        # Extract listings from the API response
        try:
            sections = data.get('explore_tabs', [])[0].get('sections', [])
            for section in sections:
                listings = section.get('listings', [])
                for listing in listings:
                    listing_data = listing.get('listing', {})
                    if not listing_data:
                        continue
                    
                    # Extract basic listing info
                    listing_id = listing_data.get('id')
                    listing_url = f"https://www.airbnb.com/rooms/{listing_id}"
                    
                    # Get detailed listing info
                    yield scrapy.Request(
                        url=listing_url,
                        callback=self.parse_listing,
                        meta={
                            'listing_id': listing_id,
                            'basic_info': {
                                'title': listing_data.get('name', ''),
                                'location': listing_data.get('city', '') + ', ' + listing_data.get('country', ''),
                                'price_per_night': listing_data.get('price_rate', {}).get('amount', 0),
                                'currency': listing_data.get('price_rate', {}).get('currency', 'USD'),
                                'ratings': listing_data.get('star_rating', 0),
                                'reviews': listing_data.get('reviews_count', 0),
                                'property_type': listing_data.get('room_type', ''),
                            }
                        }
                    )
            
            # Handle pagination
            pagination_metadata = data.get('explore_tabs', [])[0].get('pagination_metadata', {})
            if pagination_metadata.get('has_next_page'):
                next_page_params = params.copy()
                next_page_params['section_offset'] = pagination_metadata.get('section_offset', 0) + 1
                next_page_url = f"{self.api_url}?{urlencode(next_page_params)}"
                yield scrapy.Request(url=next_page_url, callback=self.parse_api)
                
        except (IndexError, KeyError) as e:
            self.logger.error(f"Error parsing API response: {e}")
    
    def parse_listing(self, response):
        listing_id = response.meta.get('listing_id')
        basic_info = response.meta.get('basic_info', {})
        
        # Extract detailed listing info using CSS/XPath selectors
        description = response.css('div[data-section-id="DESCRIPTION_DEFAULT"] span::text').get() or ''
        address = response.css('div[data-section-id="LOCATION_DEFAULT"] div._9afwyy4::text').get() or ''
        
        # Extract amenities
        amenities = response.css('div[data-section-id="AMENITIES_DEFAULT"] div._1nlbjeu::text').getall() or []
        
        # Extract host info
        host_name = response.css('div[data-section-id="HOST_PROFILE_DEFAULT"] h2::text').get() or ''
        host_image = response.css('div[data-section-id="HOST_PROFILE_DEFAULT"] img::attr(src)').get() or ''
        is_superhost = bool(response.css('div[data-section-id="HOST_PROFILE_DEFAULT"] ._1mhorg9::text').re(r'Superhost'))
        
        # Extract images
        image_urls = response.css('div[data-testid="photo-viewer"] img::attr(src)').getall() or []
        
        # Combine all data
        listing_data = {
            **basic_info,
            'address': address,
            'description': description,
            'amenities': amenities,
            'host': {
                'name': host_name,
                'image_url': host_image,
                'is_superhost': is_superhost,
                'response_rate': 95,  # Default value, would need to be extracted
                'joined_date': None,  # Would need to be extracted
            },
            'images': [{'image_url': url} for url in image_urls],
        }
        
        # Send data to Django backend
        self.send_to_backend(listing_data)
        
        return listing_data
    
    def send_to_backend(self, data):
        """Send the scraped data to the Django backend"""
        headers = {"Content-Type": "application/json"}
        try:
            response = requests.post(
                "http://localhost:8000/api/add_listing/", 
                json=data, 
                headers=headers
            )
            if response.status_code == 201:
                self.logger.info(f"Successfully added listing: {data['title']}")
            else:
                self.logger.error(f"Failed to add listing: {response.text}")
        except Exception as e:
            self.logger.error(f"Error sending data to backend: {e}")

