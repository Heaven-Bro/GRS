from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status

from .models import Complaint
from .serializers import ComplaintSerializer
from accounts.authentication import CsrfExemptSessionAuthentication


@api_view(['POST'])
@authentication_classes([CsrfExemptSessionAuthentication])
@permission_classes([IsAuthenticated])
def submit_complaint(request):
    serializer = ComplaintSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@authentication_classes([CsrfExemptSessionAuthentication])
@permission_classes([IsAdminUser])
def get_all_complaints(request):
    complaints = Complaint.objects.all()
    serializer = ComplaintSerializer(complaints, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@authentication_classes([CsrfExemptSessionAuthentication])
@permission_classes([IsAuthenticated])
def get_my_complaints(request):
    complaints = Complaint.objects.filter(user=request.user)
    serializer = ComplaintSerializer(complaints, many=True)
    return Response(serializer.data)