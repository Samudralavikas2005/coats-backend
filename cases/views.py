from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from .models import Case
from .serializers import CaseSerializer

class CaseListCreateView(generics.ListCreateAPIView):
    serializer_class = CaseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        if user.role == 'SUPERVISOR':
            return Case.objects.all()

        return Case.objects.filter(case_holding_officer=user)

    def perform_create(self, serializer):
        user = self.request.user

        # Only Case Handling Officers can create cases
        if user.role != 'CASE':
            raise PermissionDenied("Only Case Officers can create cases.")

        serializer.save(
            case_holding_officer=user,
            branch=user.branch
        )
