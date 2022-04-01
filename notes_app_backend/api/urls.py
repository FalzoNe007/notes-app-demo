from django.urls import path
from knox import views as knox_views

from .views import (DocumentListAPIView, LoginAPI, NoteDetailAPIView,
                    NoteListAPIView, NoteTypeListAPIView, RegisterAPI,
                    send_file_contents)

app_name = 'api'

urlpatterns = [
    path('', NoteListAPIView.as_view(), name='note-list'),
    path('<int:pk>/', NoteDetailAPIView.as_view(), name='note-detail'),
    path('notetypes/', NoteTypeListAPIView.as_view(), name='note-types'),
    path('register/', RegisterAPI.as_view(), name='register'),
    path('login/', LoginAPI.as_view(), name='login'),
    path('logout/', knox_views.LogoutView.as_view(), name='logout'),
    path('logoutall/', knox_views.LogoutAllView.as_view(), name='logoutall'),
    path('documents/', DocumentListAPIView.as_view(), name='document-list'),
    path('file/<str:filename>/', send_file_contents, name='file-contents'),

]
