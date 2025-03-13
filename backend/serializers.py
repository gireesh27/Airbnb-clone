from rest_framework import serializers
from .models import Listing, Host, ListingImage, Amenity

class HostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Host
        fields = '__all__'

class ListingImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListingImage
        fields = ['id', 'image_url']

class AmenitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Amenity
        fields = ['id', 'name']

class ListingSerializer(serializers.ModelSerializer):
    host = HostSerializer()
    images = ListingImageSerializer(many=True, read_only=True)
    amenities = serializers.SerializerMethodField()
    
    class Meta:
        model = Listing
        fields = '__all__'
    
    def get_amenities(self, obj):
        return [amenity.name for amenity in obj.amenities.all()]
    
    def create(self, validated_data):
        host_data = validated_data.pop('host')
        amenities_data = validated_data.pop('amenities', [])
        images_data = validated_data.pop('images', [])
        
        # Create or get host
        host, _ = Host.objects.get_or_create(**host_data)
        
        # Create listing
        listing = Listing.objects.create(host=host, **validated_data)
        
        # Add amenities
        for amenity_name in amenities_data:
            amenity, _ = Amenity.objects.get_or_create(name=amenity_name)
            listing.amenities.add(amenity)
        
        # Add images
        for image_data in images_data:
            ListingImage.objects.create(listing=listing, **image_data)
        
        return listing

