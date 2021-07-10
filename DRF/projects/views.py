
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

    def get_serializer_context(self):
        context = super(Projects, self).get_serializer_context()
        context.update({'user': self.request.user})
        return context

    # def create(self, request):
        # images = request.data.pop('project_images', [])
        # skills = request.data.pop('skills', [])

        # serializer = ProjectSerializer(
        #     data=request.data, user=request.user, images=images, skills=skills)

        # if serializer.is_valid():
        #     serializer.save()
        #     return Response(serializer.data)
        # else:
        #     return Response(serializer.errors)

    # def partial_update(self, request, pk=None):
    #     skills = request.data.getlist('skills', [])
    #     images = request.data.getlist('project_images', [])
    #     serializer=ProjectSerializer(
    #         instance=self.queryset.filter(slug=pk)[0],
    #          data=request.data, user=request.user,
    #           images=images,
    #           skills=skills,
    #            partial=True,)

    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data)
    #     else:
    #         return Response(serializer.errors)
