# Generated by Django 3.2.4 on 2021-07-10 08:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0015_alter_projectimage_image'),
        ('profileInfo', '0006_alter_skill_project'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='skill',
            name='project',
        ),
        migrations.AddField(
            model_name='skill',
            name='project',
            field=models.ManyToManyField(blank=True, null=True, related_name='project_skills', to='projects.Project'),
        ),
    ]
