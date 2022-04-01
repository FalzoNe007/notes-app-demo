from django.urls import reverse
from rest_framework import serializers
from .models import Document, Note, NoteType
from django.contrib.auth.models import User


class NoteListSerializer(serializers.ModelSerializer):
    absolute_url = serializers.SerializerMethodField()

    class Meta:
        model = Note
        fields = "__all__"

    def get_absolute_url(self, obj):
        return reverse('api:note-detail', args=(obj.pk,))


class NoteDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = "__all__"


class NoteTypeListSerializer(serializers.ModelSerializer):
    class Meta:
        model = NoteType
        fields = "__all__"


class DocumentSerializer(serializers.ModelSerializer):
    file_size = serializers.ReadOnlyField()
    uploaded_at = serializers.DateTimeField(format="%d-%B-%Y")
    class Meta:
        model = Document
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'], validated_data['email'], validated_data['password'])

        return user
