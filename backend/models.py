from django.db import models

class Host(models.Model):
    name = models.CharField(max_length=255)
    image_url = models.URLField(blank=True, null=True)
    is_superhost = models.BooleanField(default=False)
    response_rate = models.IntegerField(default=0)
    joined_date = models.DateField(null=True, blank=True)
    
    def __str__(self):
        return self.name

class Listing(models.Model):
    title = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    address = models.CharField(max_length=255, blank=True)
    price_per_night = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=10, default="USD")
    total_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    ratings = models.DecimalField(max_digits=3, decimal_places=2, null=True, blank=True)
    reviews = models.IntegerField(default=0)
    description = models.TextField(blank=True)
    property_type = models.CharField(max_length=100, blank=True)
    host = models.ForeignKey(Host, on_delete=models.CASCADE, related_name='listings')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title

class ListingImage(models.Model):
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE, related_name='images')
    image_url = models.URLField()
    
    def __str__(self):
        return f"Image for {self.listing.title}"

class Amenity(models.Model):
    name = models.CharField(max_length=100)
    listings = models.ManyToManyField(Listing, related_name='amenities')
    
    def __str__(self):
        return self.name

