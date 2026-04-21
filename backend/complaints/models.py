from django.db import models
from django.contrib.auth.models import User


class Complaint(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    category = models.CharField(max_length=100)
    description = models.TextField()
    status = models.CharField(max_length=50, default="Submitted")
    is_anonymous = models.BooleanField(default=False)
    document = models.FileField(upload_to="complaint_documents/", blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title