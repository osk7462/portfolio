from django.urls import path
from .views import Profile
from rest_framework.routers import DefaultRouter

app_name = 'profileInfo'


router = DefaultRouter()
router.register('', Profile, basename='profile')

urlpatterns = router.urls
