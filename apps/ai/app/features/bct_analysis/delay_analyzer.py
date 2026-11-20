import pandas as pd

# Identify anomalous steps belonging to anomalous batches.
def analyze_batch_delays(
    batch_df: pd.DataFrame,
    step_df: pd.DataFrame
) -> pd.DataFrame:

    if batch_df.empty or step_df.empty:
        return pd.DataFrame()

    anomalous_batches = batch_df[
    batch_df["status"] == "ANOMALY"
]

    anomalous_steps = step_df[
    step_df["status"] == "ANOMALY"
]

    if anomalous_batches.empty or anomalous_steps.empty:
        return pd.DataFrame()

    result = anomalous_steps[
        anomalous_steps["batch_id"].isin(
            anomalous_batches["batch_id"]
        )
    ].copy()

    if result.empty:
        return result

    result = result.merge(
        anomalous_batches[
            [
                "batch_id",
                "batch_no",
                "actual_duration",
                "anomaly_score"
            ]
        ],
        on="batch_id",
        how="left",
        suffixes=("_step", "_batch")
    )

    return result.sort_values(
        by="act_time",
        ascending=False
    ).reset_index(drop=True)
