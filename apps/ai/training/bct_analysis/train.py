import pandas as pd

from pathlib import Path

from app.ml.bct_analysis.trainer import train_bct_models

BASE_DIR = Path(__file__).resolve().parent
DATASET_DIR = BASE_DIR.parent / "datasets"

BATCH_DATASET = DATASET_DIR / "batch_history.csv"
STEP_DATASET = DATASET_DIR / "step_history.csv"


# Load historical batch and step datasets from CSV files.
# Load historical batch and step datasets from CSV files.
def load_training_data() -> tuple[pd.DataFrame, pd.DataFrame]:

    if not BATCH_DATASET.exists():
        raise FileNotFoundError(
            f"Batch dataset not found: {BATCH_DATASET}"
        )

    if not STEP_DATASET.exists():
        raise FileNotFoundError(
            f"Step dataset not found: {STEP_DATASET}"
        )

    try:
        batch_df = pd.read_csv(BATCH_DATASET)
        step_df = pd.read_csv(STEP_DATASET)

    except pd.errors.EmptyDataError as exc:
        raise ValueError(
            "Training dataset is empty. Please add CSV headers and data."
        ) from exc

    if batch_df.empty or step_df.empty:
        raise ValueError(
            "Training datasets must contain at least one data row."
        )

    return batch_df, step_df


# Validate the columns required to train the models.
def validate_training_data(
    batch_df: pd.DataFrame,
    step_df: pd.DataFrame
) -> None:

    required_batch_columns = [
        "recipe_id",
        "unit_id",
        "actual_duration"
    ]

    required_step_columns = [
        "step_no",
        "recipe_id",
        "unit_id",
        "act_time"
    ]

    missing_batch_columns = (
        set(required_batch_columns) - set(batch_df.columns)
    )

    missing_step_columns = (
        set(required_step_columns) - set(step_df.columns)
    )

    if missing_batch_columns:
        raise ValueError(
            f"Missing batch columns: {missing_batch_columns}"
        )

    if missing_step_columns:
        raise ValueError(
            f"Missing step columns: {missing_step_columns}"
        )


# Load historical data and train the batch and step anomaly models.
def main():

    batch_df, step_df = load_training_data()

    validate_training_data(batch_df, step_df)

    result = train_bct_models(
        batch_df=batch_df,
        step_df=step_df
    )

    print("BCT models trained successfully.")
    print(result)


if __name__ == "__main__":
    main()
