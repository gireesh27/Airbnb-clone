import sys
from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings
from airbnb_spider import AirbnbSpider

def run_spider(location=None, checkin=None, checkout=None, guests=None):
    process = CrawlerProcess(get_project_settings())
    
    process.crawl(
        AirbnbSpider,
        location=location,
        checkin=checkin,
        checkout=checkout,
        guests=guests
    )
    process.start()

if __name__ == "__main__":
    # Parse command line arguments
    location = sys.argv[1] if len(sys.argv) > 1 else None
    checkin = sys.argv[2] if len(sys.argv) > 2 else None
    checkout = sys.argv[3] if len(sys.argv) > 3 else None
    guests = sys.argv[4] if len(sys.argv) > 4 else None
    
    run_spider(location, checkin, checkout, guests)
    
print("Usage: python run_spider.py [location] [checkin] [checkout] [guests]")
print("Example: python run_spider.py 'New York' '2023-12-01' '2023-12-05' '2'")

