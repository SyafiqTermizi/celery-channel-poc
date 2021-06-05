import re

from django.core.exceptions import ValidationError


def birth_year_validator(birth_year: str) -> None:
    """
    Validate if given birth year is in 19 BBY or 19 ABY format
    """
    if birth_year == "unknown":
        return

    match = re.match(r"(^\d*\.?\d*)\s?(BBY|ABY)", "419BBY", re.I)

    if not match:
        raise ValidationError("Invalid Birth Year")
