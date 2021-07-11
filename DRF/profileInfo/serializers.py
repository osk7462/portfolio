from .models import Profile, Skill
from rest_framework import serializers


class SkillSerializer(serializers.ModelSerializer):

    class Meta:
        model = Skill
        fields = ('id', 'name', 'proficiency')


class ProfileSerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True)
    updated_skills = serializers.ListField(
        child=serializers.CharField(max_length=250), write_only=True)

    class Meta:
        model = Profile
        fields = ('id', 'name', 'image', 'resume',
                  'description', 'skills', 'updated_skills')

    def update(self, instance, validated_data):
        return (Profile.objects.update(instance=instance, **validated_data))