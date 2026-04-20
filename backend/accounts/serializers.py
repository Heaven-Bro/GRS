from django.contrib.auth.models import User
from rest_framework import serializers
from .models import StudentProfile


class RegisterSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField()
    student_id = serializers.CharField()
    department = serializers.CharField()
    year = serializers.CharField()
    semester = serializers.CharField()

    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'full_name',
            'student_id',
            'department',
            'year',
            'semester',
            'email',
            'password'
        ]
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate_email(self, value):
        if not value.endswith('@student.just.edu.bd'):
            raise serializers.ValidationError("Use your university email only")
        return value

    def create(self, validated_data):
        full_name = validated_data.pop('full_name')
        student_id = validated_data.pop('student_id')
        department = validated_data.pop('department')
        year = validated_data.pop('year')
        semester = validated_data.pop('semester')

        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )

        StudentProfile.objects.create(
            user=user,
            full_name=full_name,
            student_id=student_id,
            department=department,
            year=year,
            semester=semester
        )

        return user