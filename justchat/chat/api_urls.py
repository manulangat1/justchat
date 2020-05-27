from django.urls import path
from knox import views as knox_views
from .api import ChatListView,ChatDestroy,ChatUpdate,ChatCreateView,ChatDetails,RegisterAPI,UserAPI,LoginAPI 

urlpatterns = [
    path('login/',LoginAPI.as_view(),name='login'),
    path('logout/',knox_views.LogoutView.as_view(),name='logout'),
    path('user/',UserAPI.as_view(),name='user'),
    path('register/',RegisterAPI.as_view(),name='register'),
    path('chats/',ChatListView.as_view(),name='chat'),
    path('chat/',ChatCreateView.as_view(),name='chat'),
    path('chats/<pk>/',ChatDetails.as_view(),name='chats'),
    path('chats/u/<pk>/',ChatUpdate.as_view(),name='chats'),
    path('chats/d/<pk>/',ChatDestroy.as_view(),name='chats'),
]