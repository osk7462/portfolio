# Generated by Django 3.2.4 on 2021-07-07 13:19

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('projects', '0010_remove_project_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='user',
            field=models.ForeignKey(
                default=1, on_delete=django.db.models.deletion.CASCADE, related_name='project_user', to='auth.user'),
            preserve_default=False,
        ),
    ]
