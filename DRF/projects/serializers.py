from rest_framework import serializers
from .models import Project, ProjectImage
from profileInfo.models import Skill


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
    skills = ProjectSkillsSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = ['slug', 'project', 'name', 'description',
                  'link', 'project_images', 'skills']
        depth = 1

    def __init__(self, *args, **kwargs):
        self.user = kwargs.pop('user', None)
        self.image = kwargs.pop('images', [])
        self.skills = kwargs.pop('skills', [])
        super().__init__(*args, **kwargs)


    def create(self, validated_data):
        project = Project.objects.create(user=self.user, **validated_data)
        for skill in self.skills:
            skill_db = Skill.objects.get(name=skill)
            skill_db.project = project
            skill_db.save()

        for image in self.image:
            ProjectImage.objects.create(project=project, image=image)
        return project
