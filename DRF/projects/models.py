from django.db import models
from django.contrib.auth.models import User


class Project(models.Model):
    project = models.CharField(max_length=200)
    name = models.CharField(max_length=200)
    description = models.TextField()
    link = models.URLField(max_length=200)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='project_user')
    slug = models.SlugField(max_length=200)

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
