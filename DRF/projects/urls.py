

from rest_framework.routers import DefaultRouter
from .views import Projects

router = DefaultRouter()

router.register('', Projects, basename='project')

app_name = 'projects'

urlpatterns = router.urls
