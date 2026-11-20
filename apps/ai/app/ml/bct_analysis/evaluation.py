
import numpy as np
import pandas as pd

from sklearn.ensemble import IsolationForest
from sklearn.model_selection import train_test_split

from app.common.constants import (
    ANOMALY_CONTAMINATION,
    ANOMALY_RANDOM_STATE,
    MINIMUM_HISTORICAL_RECORDS
)

# Evaluate an Isolation Forest model for each comparable data group.
def evaluate_group_models(
    df: pd.DataFrame,
    group_columns: list[str],
    feature_column: str
) -> pd.DataFrame:

    results = []

    if df.empty:
        return pd.DataFrame()

    df = df.copy()

    df[feature_column] = pd.to_numeric(
        df[feature_column],
        errors="coerce"
    )

    df = df.dropna(
        subset=group_columns + [feature_column]
    )

    df = df[
        np.isfinite(df[feature_column]) &
        (df[feature_column] >= 0)
    ]

    for group_key, group_df in df.groupby(group_columns):

        if len(group_df) <= MINIMUM_HISTORICAL_RECORDS:
            continue

        train_df, test_df = train_test_split(
            group_df,
            test_size=0.2,
            random_state=ANOMALY_RANDOM_STATE
        )

        if len(train_df) < MINIMUM_HISTORICAL_RECORDS:
            continue

        model = IsolationForest(
            n_estimators=200,
            contamination=ANOMALY_CONTAMINATION,
            random_state=ANOMALY_RANDOM_STATE
        )

        model.fit(train_df[[feature_column]])

        predictions = model.predict(
            test_df[[feature_column]]
        )

        scores = model.decision_function(
            test_df[[feature_column]]
        )

        anomaly_count = int((predictions == -1).sum())
        normal_count = int((predictions == 1).sum())

        if not isinstance(group_key, tuple):
            group_key = (group_key,)

        result = dict(zip(group_columns, group_key))

        result.update({
            "feature": feature_column,
            "training_records": len(train_df),
            "testing_records": len(test_df),
            "anomalies_detected": anomaly_count,
            "normal_records": normal_count,
            "anomaly_rate_percentage": round(
                anomaly_count / len(test_df) * 100,
                2
            ),
            "average_anomaly_score": round(
                float(scores.mean()), 6
            ),
            "minimum_anomaly_score": round(
                float(scores.min()), 6
            )
        })

        results.append(result)

    return pd.DataFrame(results)


# Evaluate batch anomaly detection using historical batch durations.
def evaluate_batch_model(df: pd.DataFrame) -> pd.DataFrame:

    return evaluate_group_models(
        df=df,
        group_columns=["recipe_id", "unit_id"],
        feature_column="actual_duration"
    )


# Evaluate SOP step anomaly detection using historical step durations.
def evaluate_step_model(df: pd.DataFrame) -> pd.DataFrame:

    return evaluate_group_models(
        df=df,
        group_columns=["step_no", "recipe_id", "unit_id"],
        feature_column="act_time"
    )


# Evaluate both batch and step anomaly detection models.
def evaluate_bct_models(
    batch_df: pd.DataFrame,
    step_df: pd.DataFrame
) -> dict:

    batch_results = evaluate_batch_model(batch_df)
    step_results = evaluate_step_model(step_df)

    return {
        "batch_evaluation": batch_results,
        "step_evaluation": step_results
    }
