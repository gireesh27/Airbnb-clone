from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ListingViewSet, add_listing

router = DefaultRouter()
router.register(r'listings', ListingViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/add_listing/', add_listing, name='add_listing'),
]

