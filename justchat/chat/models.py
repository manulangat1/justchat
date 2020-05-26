from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()
# Create your models here.
class Message(models.Model):
    author =  models.ForeignKey(User,related_name='author_messages',on_delete=models.CASCADE,default=None)
    content = models.TextField()
    timestamp =  models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.content
    def last_10_messages():
        return Message.objects.order_by('-timestamp')[:10]
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