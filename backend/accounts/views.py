from django.contrib.auth import authenticate, login, logout
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from .serializers import RegisterSerializer, LoginSerializer
from .authentication import CsrfExemptSessionAuthentication
from .models import StudentProfile

@api_view(['POST'])
@authentication_classes([])    
@permission_classes([AllowAny])
def register_user(request):
    serializer = RegisterSerializer(data=request.data)

    if serializer.is_valid():
        user = serializer.save()
        return Response(
            {
                "message": "Registration successful",
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email
                }
            },
            status=status.HTTP_201_CREATED
        )

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@authentication_classes([])
@permission_classes([AllowAny])
def login_user(request):
    serializer = LoginSerializer(data=request.data)

    if serializer.is_valid():
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']

        try:
            user_obj = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response(
                {"error": "Invalid email or password"},
                status=status.HTTP_401_UNAUTHORIZED
            )

        user = authenticate(username=user_obj.username, password=password)

        if user is not None:
            login(request, user)
            return Response(
                {
                    "message": "Login successful",
                    "user": {
                        "id": user.id,
                        "username": user.username,
                        "email": user.email,
                        "is_admin": user.is_staff
                    }
                },
                status=status.HTTP_200_OK
            )

        return Response(
            {"error": "Invalid email or password"},
            status=status.HTTP_401_UNAUTHORIZED
        )

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@authentication_classes([CsrfExemptSessionAuthentication])
def logout_user(request):
    logout(request)
    return Response(
        {"message": "Logout successful"},
        status=status.HTTP_200_OK
    )

@api_view(['GET', 'PATCH'])
@authentication_classes([CsrfExemptSessionAuthentication])
def profile_user(request):
    if not request.user.is_authenticated:
        return Response({"detail": "Authentication credentials were not provided."}, status=403)

    profile, created = StudentProfile.objects.get_or_create(
        user=request.user,
        defaults={
            "full_name": request.user.username,
            "student_id": f"UNKNOWN-{request.user.id}",
            "department": "UNKNOWN",
            "year": "UNKNOWN",
            "semester": "UNKNOWN",
        }
    )

    if request.method == "PATCH":
        profile.full_name = request.data.get("full_name", profile.full_name)
        profile.department = request.data.get("department", profile.department)
        profile.year = request.data.get("year", profile.year)
        profile.semester = request.data.get("semester", profile.semester)
        profile.save()

    return Response({
        "id": request.user.id,
        "username": request.user.username,
        "email": request.user.email,
        "full_name": profile.full_name,
        "student_id": profile.student_id,
        "department": profile.department,
        "year": profile.year,
        "semester": profile.semester,
        "is_admin": request.user.is_staff,
    })