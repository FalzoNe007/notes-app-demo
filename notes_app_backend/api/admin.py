from django.contrib import admin
from .models import Document, Note, NoteType


admin.site.register(Note)
admin.site.register(NoteType)
admin.site.register(Document)
