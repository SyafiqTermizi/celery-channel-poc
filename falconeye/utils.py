from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer


def update_task_status(group_name: str, message: str):
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        group_name,
        {
            "type": "status_update",
            "data": {"status": "PENDING", "message": message},
        },
    )
