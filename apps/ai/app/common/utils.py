from datetime import datetime
from typing import Optional

def calculate_duration(
    start_time: datetime,
    end_time: datetime
) -> float:
    """
    Calculate duration between start and end timestamps.

    Returns:
        Duration in minutes.
    """

    duration = (end_time - start_time).total_seconds() / 60

    return round(duration, 2)


def calculate_deviation_percentage(
    actual_duration: float,
    normal_duration: float
) -> Optional[float]:
    """
    Calculate percentage deviation from normal duration.

    Returns:
        Deviation percentage.
        None if normal duration is zero or negative.
    """

    if normal_duration <= 0:
        return None

    deviation = (
        (actual_duration - normal_duration)
        / normal_duration
    ) * 100

    return round(deviation, 2)


def calculate_duration_difference(
    actual_duration: float,
    normal_duration: float
) -> float:
    """
    Calculate difference between actual and normal duration.

    Positive value means extra time consumed.
    Negative value means time saved.
    """

    difference = actual_duration - normal_duration

    return round(difference, 2)
