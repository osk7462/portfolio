from django.db import models


class Project(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()

    def __str__(self):
        return self.name


class ProjectImage(models.Model):
    def upload_to(self, filename):
        print(self.project.name)
        return 'projects/{}/{}'.format(self.project.name, filename)

    project = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name='ProjectImage')
    image = models.ImageField(upload_to=upload_to, blank=True)

    def __str__(self):
        return self.project.name