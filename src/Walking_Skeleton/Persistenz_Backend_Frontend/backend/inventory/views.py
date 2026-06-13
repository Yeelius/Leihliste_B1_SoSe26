from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Item
from .serializers import ItemSerializer


class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all().order_by("id")
    serializer_class = ItemSerializer

    @action(detail=True, methods=["post"], url_path="request-loan")
    def request_loan(self, request, pk=None):
        item = self.get_object()

        if item.status != "available":
            return Response(
                {"detail": "Item is not available."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        item.status = "requested"
        item.save()

        serializer = self.get_serializer(item)
        return Response(serializer.data, status=status.HTTP_200_OK)