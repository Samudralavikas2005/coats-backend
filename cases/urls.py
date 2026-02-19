from django.urls import path
from .views import CaseListCreateView, CaseDetailUpdateView, SupervisorCaseOverview

urlpatterns = [
    path("cases/", CaseListCreateView.as_view()),
    path("cases/<uuid:pk>/", CaseDetailUpdateView.as_view()),
    path("supervisor/overview/", SupervisorCaseOverview.as_view()),
]
