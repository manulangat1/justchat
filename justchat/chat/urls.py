from django.urls import path
from knox import views as knox_views
from . import views
from .api import RegisterAPI,UserAPI,LoginAPI 

urlpatterns = [
    path('', views.index, name='index'),
    path('<str:room_name>/', views.room, name='room'),
    path('login/',LoginAPI.as_view(),name='login'),
    path('logout/',knox_views.LogoutView.as_view(),name='logout'),
    path('user/',UserAPI.as_view(),name='user'),
    path('register/',RegisterAPI.as_view(),name='register'),
]