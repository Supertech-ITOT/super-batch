
import joblib
import numpy as np
import pandas as pd

from pathlib import Path


MODEL_DIR = (
    Path(__file__).resolve().parents[3]
    / "artifacts"
    / "bct_analysis"
)


# Load the previously trained batch and step models.
def load_bct_models() -> tuple[dict, dict]:

    batch_model_path = MODEL_DIR / "batch_model.joblib"
    step_model_path = MODEL_DIR / "step_model.joblib"

    if not batch_model_path.exists() or not step_model_path.exists():
        raise FileNotFoundError(
            "Trained BCT models not found. Train the models first."
        )

    batch_models = joblib.load(batch_model_path)
    step_models = joblib.load(step_model_path)

    return batch_models, step_models


# Detect batch duration anomalies using the corresponding recipe and unit model.
def detect_batch_anomalies(
    df: pd.DataFrame,
    models: dict
) -> pd.DataFrame:

    if df.empty:
        return df.copy()

    df = df.copy()

    df["status"] = "MODEL_NOT_AVAILABLE"
    df["anomaly_score"] = np.nan

    for group_key, group_df in df.groupby(["recipe_id", "unit_id"]):

        model = models.get(group_key)

        if model is None:
            continue

        predictions = model.predict(
            group_df[["actual_duration"]]
        )

        scores = model.decision_function(
            group_df[["actual_duration"]]
        )

        df.loc[group_df.index, "status"] = np.where(
            predictions == -1,
            "ANOMALY",
            "NORMAL"
        )

        df.loc[group_df.index, "anomaly_score"] = scores

    return df


# Detect SOP step duration anomalies using the corresponding step, recipe and unit model.
def detect_step_anomalies(
    df: pd.DataFrame,
    models: dict
) -> pd.DataFrame:

    if df.empty:
        return df.copy()

    df = df.copy()

    df["status"] = "MODEL_NOT_AVAILABLE"
    df["anomaly_score"] = np.nan

    group_columns = ["step_no", "recipe_id", "unit_id"]

    for group_key, group_df in df.groupby(group_columns):

        model = models.get(group_key)

        if model is None:
            continue

        predictions = model.predict(
            group_df[["act_time"]]
        )

        scores = model.decision_function(
            group_df[["act_time"]]
        )

        df.loc[group_df.index, "status"] = np.where(
            predictions == -1,
            "ANOMALY",
            "NORMAL"
        )

        df.loc[group_df.index, "anomaly_score"] = scores

    return df


# Load trained models and detect batch and step anomalies.
def analyze_anomalies(
    batch_df: pd.DataFrame,
    step_df: pd.DataFrame
) -> tuple[pd.DataFrame, pd.DataFrame]:

    batch_models, step_models = load_bct_models()

    batch_result = detect_batch_anomalies(
        batch_df,
        batch_models
    )

    step_result = detect_step_anomalies(
        step_df,
        step_models
    )

    return batch_result, step_result
