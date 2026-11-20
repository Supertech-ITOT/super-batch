import pandas as pd

from app.common.constants import (
    STEP_DURATION_THRESHOLD,
    AnalysisStatus
)

# Identify and classify SOP steps based on standard and average duration deviations.
def analyze_steps(df: pd.DataFrame) -> pd.DataFrame:
    if df.empty:
        return df

    df = df.copy()

    df["status"] = AnalysisStatus.NORMAL.value

    df.loc[
        (
            df["standard_deviation_percentage"] > STEP_DURATION_THRESHOLD
        ) |
        (
            df["deviation_from_average_percentage"] > STEP_DURATION_THRESHOLD
        ),
        "status"
    ] = AnalysisStatus.LONG_DURATION.value

    return df.sort_values(
        by="act_time",
        ascending=False
    ).reset_index(drop=True)