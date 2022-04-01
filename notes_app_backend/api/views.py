import base64
from django.contrib.auth import login
from django.http import FileResponse, HttpResponse
from django.shortcuts import get_object_or_404
from knox.models import AuthToken
from knox.views import LoginView as KnoxLoginView
from rest_framework import generics, permissions
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.response import Response

from .models import Document, Note, NoteType
from .serializers import (DocumentSerializer, NoteDetailSerializer, NoteListSerializer,
                          NoteTypeListSerializer, RegisterSerializer,
                          UserSerializer)


def send_file_contents(request, filename):
    file = get_object_or_404(Document, name=filename)
    path = file.upload
    # resp = open(path, "rb")
    data = bytes(path.read())
    # lines = data.decode().strip().split('\n')
    encoded = base64.b64encode(data)
    # print(type(" HAHAHA " + data))
    return HttpResponse(encoded)




class NoteListAPIView(generics.ListCreateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteListSerializer


class NoteDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    lookup_field = 'pk'
    queryset = Note.objects.all()
    serializer_class = NoteDetailSerializer


class NoteTypeListAPIView(generics.ListCreateAPIView):
    queryset = NoteType.objects.all()
    serializer_class = NoteTypeListSerializer


class DocumentListAPIView(generics.ListCreateAPIView):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer


class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
        "user": UserSerializer(user, context=self.get_serializer_context()).data,
        "token": AuthToken.objects.create(user)[1]
        })



class LoginAPI(KnoxLoginView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return super(LoginAPI, self).post(request, format=None)