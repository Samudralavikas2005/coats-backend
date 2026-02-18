from django.urls import path
from .views import CaseListCreateView

urlpatterns = [
    path('cases/', CaseListCreateView.as_view(), name='cases'),
]
