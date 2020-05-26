
from django.contrib import admin
from django.urls import path
from django.conf.urls import include
urlpatterns = [
    path('', include('frontend.urls')),
    path('chat/', include('chat.urls')),
    path('admin/', admin.site.urls),
]
