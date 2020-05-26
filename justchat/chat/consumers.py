import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from .models import Message,Posts
from django.contrib.auth import get_user_model
User = get_user_model()

# class PostsConsumer(WebsocketConsumer):
#     def fetch_messages(self,data):
#         print("FETCH")
#         posts = Posts.objects.all()[:10]
#         content = {
#             'command':'posts',
#             'posts': self.messages_to_json(posts)
#         }
#         self.send_message(content)
#     def new_messages(self,data):
#         print("NEW_MESSAGE")
#         post = Posts.objects.create(
#             content = data['message']
#         )
#         content = {
#             'command' : 'new_message',
#             'message': self.message_to_json(post)
#         }
#         return self.send_chat_message(content)
#     def messages_to_json(self,messages):
#         result = []
#         for message in messages:
#             result.append(self.message_to_json(message))
#         return result
#     def message_to_json(self,message):
#         return {
#             # # 'author':message.author.username,
#             'content':message.content,
#             'timestamp':str(message.timestamp)

#         }
#     commands = {
#         'messages':fetch_messages,
#         'new_message':new_messages
#     }
#     def connect(self):
#         self.room_name = self.scope['url_route']['kwargs']['room_name']
#         self.room_group_name = 'chat_%s' % self.room_name

#         # Join room group
#         async_to_sync(self.channel_layer.group_add)(
#             self.room_group_name,
#             self.channel_name
#         )

#         self.accept()

#     def disconnect(self, close_code):
#         # Leave room group
#         async_to_sync(self.channel_layer.group_discard)(
#             self.room_group_name,
#             self.channel_name
#         )

#     # Receive message from WebSocket
#     def receive(self, text_data):
#         data = json.loads(text_data)
#         self.commands[data['command']](self,data)
#     def send_chat_message(self,message):
#         # Send message to room group
#         async_to_sync(self.channel_layer.group_send)(
#             self.room_group_name,
#             {
#                 'type': 'chat_message',
#                 'message': message
#             }
#         )
#     def send_message(self,message):
#         self.send(text_data=json.dumps(message))
#     # Receive message from room group
#     def chat_message(self, event):
#         message = event['message']
#         # Send message to WebSocket
#         self.send(text_data=json.dumps(message))
class ChatConsumer(WebsocketConsumer):
    def fetch_messages(self,data):
        print("Fetch")
        messages = Message.last_10_messages()
        content = {
            'command':'messages',
            'messages':self.messages_to_json(messages)
        }
        # self.send_chat_message(content)
        self.send_message(content)
    def new_messages(self,data):
        print("new message")
        # author = data['from']
        author = 'manulangat'
        author_user = User.objects.filter(username=author)[0]
        message = Message.objects.create(
            author=author_user,
            content = data['message']
        )
        content = {
            'command' : 'new_message',
            'message': self.message_to_json(message)
        }
        return self.send_chat_message(content)
    def messages_to_json(self,messages):
        result = []
        for message in messages:
            result.append(self.message_to_json(message))
        return result
    def message_to_json(self,message):
        return {
            'id':message.id,
            'author':message.author.username,
            'content':message.content,
            'timestamp':str(message.timestamp)

        }
    commands = {
        'messages':fetch_messages,
        'new_message':new_messages
    }
    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    def receive(self, text_data):
        data = json.loads(text_data)
        self.commands[data['command']](self,data)
    def send_chat_message(self,message):
        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )
    def send_message(self,message):
        self.send(text_data=json.dumps(message))
    # Receive message from room group
    def chat_message(self, event):
        message = event['message']
        # Send message to WebSocket
        self.send(text_data=json.dumps(message))