from rest_framework import serializers
from .models import Project, ProjectImage


class ImageSerailezer(serializers.ModelSerializer):

    class Meta:
        model = ProjectImage
        fields = ['image', ]


class ProjectSerializer(serializers.ModelSerializer):

    ProjectImage = ImageSerailezer(many=True)

    class Meta:
        model = Project
        fields = ['name', 'description', 'ProjectImage']
        depth = 1
