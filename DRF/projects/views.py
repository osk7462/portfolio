
from rest_framework.viewsets import ModelViewSet
from .serializers import ProjectSerializer
from .models import Project
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
import json
import io

# Create your views here.


class Projects(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    parser_classes = [MultiPartParser, FormParser]

    def get_object(self, **kwargs):
        slug = self.kwargs.get('pk')
        return self.queryset.get(slug=slug)

    def create(self, request):
        
        images = request.data.pop('project_images')
        skills = request.data.pop('skills')
        

        serializer = ProjectSerializer(
            data=request.data, user=request.user, images=images, skills=skills)

        if serializer.is_valid():
            serializer.save()
        else:
            print('*'*50)
            print(serializer.errors)

        # print(request.data)
        return Response('some')
