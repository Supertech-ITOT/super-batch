import pandas as pd

from app.common.constants import (
    BATCH_DURATION_THRESHOLD,
    AnalysisStatus
)


# Identify and classify batches based on their duration deviation from the average.
def analyze_batches(df: pd.DataFrame) -> pd.DataFrame:
    if df.empty:
        return df

    df = df.copy()

    df["status"] = AnalysisStatus.NORMAL.value

    df.loc[
        df["deviation_from_average_percentage"] > BATCH_DURATION_THRESHOLD,
        "status"
    ] = AnalysisStatus.LONG_DURATION.value

    return df.sort_values(
        by="actual_duration",
        ascending=False
    ).reset_index(drop=True)