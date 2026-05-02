from rest_framework import serializers
from .models import Complaint
from accounts.models import StudentProfile


class ComplaintSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()
    student_id = serializers.SerializerMethodField()
    department = serializers.SerializerMethodField()
    session = serializers.SerializerMethodField()

    class Meta:
        model = Complaint
        fields = [
            "id",
            "user",
            "title",
            "category",
            "description",
            "status",
            "is_anonymous",
            "document",
            "created_at",
            "full_name",
            "student_id",
            "department",
            "session",
        ]

        read_only_fields = [
            "user",
            "status",
            "created_at",
            "full_name",
            "student_id",
            "department",
            "session",
        ]

    def get_profile(self, obj):
        return StudentProfile.objects.filter(user=obj.user).first()

    def get_full_name(self, obj):
        if obj.is_anonymous:
            return "Anonymous"

        profile = self.get_profile(obj)
        if profile:
            return profile.full_name

        return obj.user.username

    def get_student_id(self, obj):
        if obj.is_anonymous:
            return "Anonymous"

        profile = self.get_profile(obj)
        if profile:
            return profile.student_id

        return "N/A"

    def get_department(self, obj):
        if obj.is_anonymous:
            return "Anonymous"

        profile = self.get_profile(obj)
        if profile:
            return profile.department

        return "N/A"

    def get_session(self, obj):
        if obj.is_anonymous:
            return "Anonymous"

        profile = self.get_profile(obj)
        if profile:
            return f"{profile.year} Year - Semester {profile.semester}"

        return "N/A"