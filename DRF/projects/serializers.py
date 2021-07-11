from rest_framework import serializers
from .models import Project, ProjectImage
from profileInfo.models import Skill
from django.contrib.auth.models import User


class ProjectImageSerailezer(serializers.ModelSerializer):

    class Meta:
        model = ProjectImage
        fields = ['id', 'image', ]


class ProjectSkillsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'name']


class ProjectSerializer(serializers.ModelSerializer):
    project_images = ProjectImageSerailezer(many=True, read_only=True)
    project_skills = ProjectSkillsSerializer(many=True, read_only=True)

    images = serializers.ListField(
        child=serializers.ImageField(required=False), write_only=True)
    skills = serializers.ListField(
        child=serializers.CharField(max_length=200), write_only=True)

    class Meta:
        model = Project
        fields = ['slug', 'project', 'name', 'description',
                  'link', 'project_images', 'project_skills', 'images', 'skills']
        depth = 1

    def create(self, validated_data):
        user = self.context.get('user')
        return Project.objects.create(user=user, **validated_data)

    def update(self, instance, validated_data):
        return Project.objects.update(instance=instance, **validated_data)
