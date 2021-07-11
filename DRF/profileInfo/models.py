from django.db import models
from django.contrib.auth.models import User
# Create your models here.
import json


class Profile(models.Model):

    class ModelManager(models.Manager):

        def update(self, instance, **kwargs):
            updatee_skills = kwargs.pop('updated_skills', [])

            instance.name = kwargs.get('name', instance.name)
            instance.description = kwargs.get(
                'description', instance.description)
            instance.image = kwargs.get('image', instance.image)
            instance.resume = kwargs.get('resume', instance.resume)

            # let me delete all the skills related to this profile
            for skill in instance.skills.all():
                skill.delete()

            # let me update skills
            for skill in updatee_skills:
                instance.skills.create(**json.loads(skill))

            instance.save()
            return instance

    name = models.CharField(max_length=50)
    image = models.ImageField(
        upload_to='profile/dp', default='profile/default.jpg')
    resume = models.FileField(
        upload_to='profile/resume', default='profile/resume/default.pdf')
    description = models.TextField()
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name='user', default=1)

    objects = ModelManager()

    def __str__(self):
        return self.name


class Skill(models.Model):
    name = models.CharField(max_length=200)
    proficiency = models.IntegerField()
    profile = models.ForeignKey(
        Profile, on_delete=models.CASCADE, related_name='skills', default=1)

    class Meta:
        ordering = ('-proficiency', )

    def __str__(self):
        return self.name
