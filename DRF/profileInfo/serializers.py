from .models import Profile, Skill
from rest_framework import serializers


class SkillSerializer(serializers.ModelSerializer):

    class Meta:
        model = Skill
        fields = ('id', 'name', 'proficiency')


class ProfileSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    skills = SkillSerializer(many=True)

    class Meta:
        model = Profile
        fields = ('id', 'name','image', 'resume', 'description', 'skills')


    def create(self, validated_data):
        skills = validated_data.pop('skills')
        profile = Profile.objects.create(**validated_data)
        for skill in skills:
            Skill.objects.create(profile=profile, **skill)
        return profile

    def update(self, instance, validated_data):
        skills_data = validated_data.pop('skills', None)
        instance.name = validated_data.get('name', instance.name)
        instance.image = validated_data.get('image', instance.image)
        instance.resume = validated_data.get('resume', instance.resume)
        instance.description = validated_data.get('description', instance.description)
        instance.save()

        if skills_data is not None:
            skills = list((instance.skills).all())
            print(skills)
            for skill_data in skills_data:
                if skills:
                    skill = skills.pop(0)
                    skill.name = skill_data.get('name', skill.name)
                    skill.proficiency = skill_data.get('proficiency', skill.proficiency)
                    skill.save()
                else:
                    skill = Skill.objects.create(profile=instance, **skill_data)
                    skill.save()
        return instance
    