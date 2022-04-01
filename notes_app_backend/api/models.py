import os
from django.db import models
from django.utils.translation import gettext_lazy as _


class NoteType(models.Model):
    name = models.CharField(max_length=50, null=False,
                            blank=False, default="Personal")

    def __str__(self) -> str:
        return self.name


class Note(models.Model):
    title = models.CharField(max_length=200, null=False, blank=False)
    description = models.TextField(blank=False, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    image = models.ImageField(upload_to='notesImages', blank=True, null=True)

    note_type = models.ForeignKey(
        NoteType, on_delete=models.SET_DEFAULT, default="Personal")

    def __str__(self) -> str:
        return self.title


class Document(models.Model):
    name = models.CharField(max_length=100, null=False, blank=False)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    upload = models.FileField(upload_to='uploads/', max_length=250)

    @property
    def file_size(self):
        return self.upload.size
        
    @property
    def file_type(self):
        name, extension = os.path.splitext(self.upload.name)
        if extension == 'pdf':
            return 'pdf'
        elif extension == 'doc':
            return 'word'
        elif extension == 'zip':
            return 'zip'
        elif extension == 'png' or extension == 'jpg':
            return 'photo'
        return 'other'


    def __str__(self):
        return self.name
