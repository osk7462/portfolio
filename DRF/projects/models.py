from profileInfo.models import Skill
from django.db import models
from django.contrib.auth.models import User


class Project(models.Model):

    class ModelManager(models.Manager):
        def create(self, **kwargs):
            images = kwargs.pop('images', [])
            skills = kwargs.pop('skills', [])
            user = kwargs.pop('user')
            project = Project(user=user, **kwargs)
            project.save()
            for skill in skills:
                project.project_skills.add(Skill.objects.get(name=skill))
            for image in images:
                project.project_images.create(image=image)
            return project

        def update(self, instance, **kwargs):
            images = kwargs.pop('images', [])
            skills = kwargs.pop('skills', [])
            print("*"*50)
            print(images)

            instance.project = kwargs.get('project', instance.project)
            instance.name = kwargs.get('name', instance.name)
            instance.description = kwargs.get(
                'description', instance.description)
            instance.link = kwargs.get('link', instance.link)

            instance.project_skills.clear()
            for skill in skills:
                instance.project_skills.add(Skill.objects.get(name=skill))

            if images:
                for image in instance.project_images.all():
                    image.delete()

                for image in images:
                    instance.project_images.create(image=image)

            instance.save()
            return instance

    project = models.CharField(max_length=200)
    name = models.CharField(max_length=200)
    description = models.TextField()
    link = models.URLField(max_length=200)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='project_user')
    slug = models.SlugField(max_length=200)
    project_skills = models.ManyToManyField(
        Skill, related_name='project_skills')

    objects = ModelManager()

    def __str__(self):
        return self.name


class ProjectImage(models.Model):

    def upload_to(self, filename):
        return 'projects/{}/{}'.format(self.project.name, filename)

    project = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name='project_images')

    image = models.ImageField(upload_to=upload_to, blank=True, null=True)

    def __str__(self):
        return self.project.name
