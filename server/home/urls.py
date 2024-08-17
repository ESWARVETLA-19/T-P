from . import views
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static

app_name= 'app'

urlpatterns = [
    path("student", views.all_students,name="student"),
    path("student/<str:pk>", views.student),
    path('add_drive_data',views.add_drive_data, name="add_drive_data"),
]