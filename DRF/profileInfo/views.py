from django.shortcuts import render
from rest_framework import generics
from rest_framework import viewsets
from .models import Profile, Skill
from .serializers import SkillSerializer, ProfileSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.decorators import action
# Create your views here.


class Profile(viewsets.ModelViewSet):

    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    parser_classes = [MultiPartParser, FormParser, JSONParser]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    def create(self, request):
        return Response({'detail': 'create method is not allowed'})

    @action(detail=True, methods=['delete','get'])
    def delete_skill(self, request, pk=None):
        profile = self.queryset.get(user=request.user)
        skill = profile.skills.get(pk=pk)
        skill.delete()
        return Response({'datat': pk})
