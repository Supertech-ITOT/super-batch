
import joblib
import numpy as np
import pandas as pd

from pathlib import Path
from sklearn.ensemble import IsolationForest

from app.common.constants import (
    ANOMALY_CONTAMINATION,
    ANOMALY_RANDOM_STATE,
    MINIMUM_HISTORICAL_RECORDS
)

MODEL_DIR = (
    Path(__file__).resolve().parents[3]
    / "artifacts"
    / "bct_analysis"
)

# Train separate anomaly detection models for each comparable group.
def train_group_models(
    df: pd.DataFrame,
    group_columns: list[str],
    feature_column: str
) -> dict:

    models = {}

    if df.empty:
        raise ValueError("No historical data available for training.")

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

        if len(group_df) < MINIMUM_HISTORICAL_RECORDS:
            continue

        model = IsolationForest(
            n_estimators=200,
            contamination=ANOMALY_CONTAMINATION,
            random_state=ANOMALY_RANDOM_STATE
        )

        model.fit(group_df[[feature_column]])

        if not isinstance(group_key, tuple):
            group_key = (group_key,)

        models[group_key] = model

    if not models:
        raise ValueError(
            f"No groups have enough historical records for {feature_column}."
        )

    return models


# Train batch anomaly detection models using historical batch durations.
def train_batch_model(df: pd.DataFrame) -> dict:
    return train_group_models(
        df=df,
        group_columns=["recipe_id", "unit_id"],
        feature_column="actual_duration"
    )

# Train step anomaly detection models using historical SOP durations.
def train_step_model(df: pd.DataFrame) -> dict:
    return train_group_models(
        df=df,
        group_columns=["step_no", "recipe_id", "unit_id"],
        feature_column="act_time"
    )

# Train and save batch and step anomaly detection models.
def train_bct_models(
    batch_df: pd.DataFrame,
    step_df: pd.DataFrame
) -> dict:

    batch_models = train_batch_model(batch_df)
    step_models = train_step_model(step_df)

    MODEL_DIR.mkdir(parents=True, exist_ok=True)

    batch_model_path = MODEL_DIR / "batch_model.joblib"
    step_model_path = MODEL_DIR / "step_model.joblib"

    joblib.dump(batch_models, batch_model_path)
    joblib.dump(step_models, step_model_path)

    return {
        "batch_model_path": str(batch_model_path),
        "step_model_path": str(step_model_path),
        "batch_groups_trained": len(batch_models),
        "step_groups_trained": len(step_models)
    }
