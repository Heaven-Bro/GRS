from django.urls import path
from .views import submit_complaint, get_all_complaints

urlpatterns = [
    path('submit/', submit_complaint),
    path('all/', get_all_complaints),
]