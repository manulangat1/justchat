from rest_framework import generics,permissions
from rest_framework.response import Response
from knox.models import AuthToken
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.status import HTTP_200_OK,HTTP_400_BAD_REQUEST
from .serializers import ChatSerializer,UserSerializer,RegisterSerializer,LoginSerializer
from .models import Message,Contact,Chat
User = get_user_model()
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self,request,*args,**kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user,context=self.get_serializer_context()).data,
            "token":AuthToken.objects.create(user)[1]
        })

##login APi
class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self,request,*args,**kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user,context=self.get_serializer_context()).data,
            "token":AuthToken.objects.create(user)[1]
        })
#user api
class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

def get_user_contacts(username):
    user = get_object_or_404(User,username=username)
    contact = get_object_or_404(Contact,user=user)
    return contact


class ChatListView(generics.ListAPIView):
    # queryset = Chat.objects.all()
    # permissions_classes = [
    #     permissions.IsAuthenticated
    # ]
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = ChatSerializer
    def get_queryset(self):
        qs = Chat.objects.all()
        username = self.request.query_params.get('username',None)
        if username is not None:
            pass
            contact = get_user_contacts(username)
            qs =  contact.chats.all()
        return qs
class ChatCreateView(generics.CreateAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
class ChatDetails(generics.RetrieveAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
class ChatUpdate(generics.UpdateAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
class ChatDestroy(generics.DestroyAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer