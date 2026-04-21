from django.urls import path
from .views import submit_complaint, get_all_complaints, get_my_complaints, update_complaint_status

urlpatterns = [
    path('submit/', submit_complaint),
    path('all/', get_all_complaints),
    path('my/', get_my_complaints),
    path('update-status/<int:complaint_id>/', update_complaint_status),
]