from django.db import models
from django.contrib.auth.models import User
from projects.models import Project
# Create your models here.


class Profile(models.Model):
    name = models.CharField(max_length=50)
    image = models.ImageField(
        upload_to='profile/dp', default='profile/default.jpg')
    resume = models.FileField(
        upload_to='profile/resume', default='profile/resume/default.pdf')
    description = models.TextField()
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name='user', default=1)

    def __str__(self):
        return self.name


class Skill(models.Model):
    name = models.CharField(max_length=200)
    proficiency = models.IntegerField()
    profile = models.ForeignKey(
        Profile, on_delete=models.CASCADE, related_name='skills', default=1)
    project = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name='skills', blank=True, null=True)

    class Meta:
        ordering = ('-proficiency', )

    def __str__(self):
        return self.name
