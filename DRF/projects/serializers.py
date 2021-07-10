from rest_framework import serializers
from .models import Project, ProjectImage
from profileInfo.models import Skill
from django.core.exceptions import ObjectDoesNotExist


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
        images = validated_data.pop('images')
        skills = validated_data.pop('skills')
        user = self.context.get('user')
        
        project = Project.objects.create(user=user, **validated_data)
        for skill in skills:
            skill_db = Skill.objects.get(name=skill)
            skill_db.project.add(project)
            skill_db.save()

        for image in images:
            project.project_images.create(image=image)
        
        project.save()
        return project


    def update(self, instance, validated_data):
        images = validated_data.pop('images', [])

        # print(images)
        skills = validated_data.pop('skills', [])
        
        instance.project = validated_data.get('project', instance.project)
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get(
            'description', instance.description)
        instance.link = validated_data.get('link', instance.link)

        instance.project_skills.clear()
        for skill in skills:
            instance.project_skills.add(Skill.objects.get(name=skill))

        for images in instance.project_images.all():
            images.delete()

        for image in images:
            instance.project_images.create(image=image)

        instance.save()
        return instance
