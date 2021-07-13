from rest_framework import serializers
from django.core.mail import send_mail


class ContactSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=200)
    email = serializers.EmailField()
    message = serializers.CharField(max_length=1000)

    class Meta:
        fields = '_all_'

    def save(self):
        email = self.validated_data.get('email', 'abcd@xyz.com')
        name = self.validated_data.get('name', 'unknow')
        message = self.validated_data.get('message', 'no message')
        # send_mail(name, message, email, ['osk7462@gmail.com'])
