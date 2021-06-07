import json
from typing import Dict


class Response:
    def __init__(self, status: str, message: str, data: Dict = None) -> None:
        self.status = status
        self.message = message
        self.data = data

    def to_json(self):
        return json.dumps(
            {
                "status": self.status,
                "message": self.message,
                "data": self.data,
            }
        )
