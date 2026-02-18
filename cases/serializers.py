from rest_framework import serializers
from .models import Case

class CaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Case
        fields = '__all__'
        read_only_fields = (
            'id',
            'date_of_first_updation',
            'branch',
            'case_holding_officer',
        )
