from django.contrib import admin
from .models import Complaint


@admin.register(Complaint)
class ComplaintAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "title",
        "category",
        "user",
        "status",
        "is_anonymous",
        "created_at",
    )

    list_filter = (
        "category",
        "status",
        "is_anonymous",
        "created_at",
    )

    search_fields = (
        "title",
        "category",
        "description",
        "user__username",
        "user__email",
    )

    ordering = ("-created_at",)
    readonly_fields = ("created_at",)

    fieldsets = (
        ("Complaint Information", {
            "fields": ("user", "title", "category", "description")
        }),
        ("Status and Privacy", {
            "fields": ("status", "is_anonymous")
        }),
        ("Supporting Document", {
            "fields": ("document",)
        }),
        ("Time Information", {
            "fields": ("created_at",)
        }),
    )