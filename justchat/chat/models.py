from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()
# Create your models here.
class Contact(models.Model):
    user = models.ForeignKey(User,related_name='friend',on_delete=models.CASCADE )
    friends = models.ManyToManyField('self',blank=True)

    def __str__(self):
        return self.user.username
class Message(models.Model):
    contact =  models.ForeignKey(Contact,related_name='messages',on_delete=models.CASCADE,default=None)
    content = models.TextField()
    timestamp =  models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.contact.user.username
class Chat(models.Model):
    participants = models.ManyToManyField(Contact,related_name="chats")
    messages = models.ManyToManyField(Message,blank=True)
    
    def __str__(self):
        return "{}".format(self.pk)
class Post(models.Model):
    body = models.TextField()
    sums = models.TextField()

    def __str__(self):
        return self.body

class Posts(models.Model):
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.content

