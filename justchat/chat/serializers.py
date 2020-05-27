from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import  authenticate

from .models import Message,Contact,Chat
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username','email')
###Reggister Seria;
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username','password','email',)
        extra_kwargs = {'password':{'write_only':True}}

        def create(self,validated_data):
            user = User.objects.create_user(validated_data['username'],validated_data['email'],validated_data['password'])
            user.is_active = True
            user.save()
            return user
##Login Serial
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password =  serializers.CharField()

    def validate(self,data):
        print("{}".format(data['username']))
        user = authenticate(**data)
        if user:
            if user.is_active:
                return user
            print("Not there")
        print("usernot")
        raise serializers.ValidationError("Incoreect Validations")
class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = ('__all__')