from django.contrib.auth.models import User
from rest_framework import serializers
from .models import StudentProfile


class RegisterSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField(write_only=True)
    student_id = serializers.CharField(write_only=True)
    department = serializers.CharField(write_only=True)
    year = serializers.CharField(write_only=True)
    semester = serializers.CharField(write_only=True)

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
        if not value.endswith('@student.just.edu.bd') and not value.endswith('@just.edu.bd'):
            raise serializers.ValidationError("Use university email only")

        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("This email is already registered")

        return value

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("This username is already taken")
        return value

    def validate_student_id(self, value):
        if StudentProfile.objects.filter(student_id=value).exists():
            raise serializers.ValidationError("This student ID is already registered")
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

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)