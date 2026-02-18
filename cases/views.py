
# Create your views here.
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from .models import Case
from .serializers import CaseSerializer
from .permissions import IsSupervisor, IsCaseOfficer

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

        # ❌ Supervisors cannot create cases
        if user.role != 'CASE':
            raise PermissionDenied("Only Case Officers can create cases.")

        serializer.save(
            case_holding_officer=user,
            branch=user.branch
        )
    
    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsSupervisor()]
        return [IsAuthenticated()]


