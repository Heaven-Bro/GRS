from django.db import models
from django.contrib.auth.models import User


class StudentProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=150)
    student_id = models.CharField(max_length=50, unique=True)
    department = models.CharField(max_length=100)
    year = models.CharField(max_length=20)
    semester = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.full_name} ({self.student_id})"