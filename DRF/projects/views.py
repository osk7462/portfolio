
from rest_framework.viewsets import ModelViewSet
from .serializers import ProjectSerializer
from .models import Project
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.parsers import MultiPartParser, FormParser


class Projects(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    parser_classes = [MultiPartParser, FormParser]

    def get_object(self, **kwargs):
        slug = self.kwargs.get('pk')
        return self.queryset.filter(slug=slug)[0]

    def get_serializer_context(self):
        context = super(Projects, self).get_serializer_context()
        context.update({'user': self.request.user})
        return context
