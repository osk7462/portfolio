from rest_framework import generics
from .serializers import ContactSerializer
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status

class Contact(generics.CreateAPIView):
    serializer_class = ContactSerializer
    permission_classes = [AllowAny, ]

    def post(self, request):
      serializer = ContactSerializer(data=request.data)
      if serializer.is_valid():
        serializer = serializer.save()
        return Response({'data': 'success'}, status=status.HTTP_200_OK)
      else:
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
