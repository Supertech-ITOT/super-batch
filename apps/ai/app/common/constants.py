from enum import Enum

class AnalysisStatus(str, Enum):
    NORMAL = "NORMAL"
    ABNORMAL = "ABNORMAL"
    LONG_DURATION = "LONG_DURATION"

class AnomalySeverity(str, Enum):
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"
    CRITICAL = "CRITICAL"

class AnalysisType(str, Enum):
    BATCH = "BATCH"
    STEP = "STEP"

# Duration comparison thresholds (percentage)
DEFAULT_DURATION_DEVIATION_THRESHOLD = 20.0

# Minimum historical records required for comparison
MINIMUM_HISTORICAL_RECORDS = 5

# ML anomaly detection configuration
ANOMALY_CONTAMINATION = 0.05
ANOMALY_RANDOM_STATE = 42

# Duration unit
DEFAULT_DURATION_UNIT = "MINUTES"
