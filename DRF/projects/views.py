from django.shortcuts import render
from django.http import HttpResponse

from rest_framework import generics
from .serializers import ProjectSerializer
from .models import Project

# Create your views here.


class Projects(generics.ListCreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
