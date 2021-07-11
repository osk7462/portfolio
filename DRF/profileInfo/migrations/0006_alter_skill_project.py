# Generated by Django 3.2.4 on 2021-07-10 08:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0015_alter_projectimage_image'),
        ('profileInfo', '0005_skill_project'),
    ]

    operations = [
        migrations.AlterField(
            model_name='skill',
            name='project',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='project_skills', to='projects.project'),
        ),
    ]