from django.contrib import admin
from .models import StudentProfile


@admin.register(StudentProfile)
class StudentProfileAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "full_name",
        "student_id",
        "department",
        "year",
        "semester",
        "user",
    )

    list_filter = (
        "department",
        "year",
        "semester",
    )

    search_fields = (
        "full_name",
        "student_id",
        "department",
        "user__username",
        "user__email",
    )

    ordering = ("full_name",)