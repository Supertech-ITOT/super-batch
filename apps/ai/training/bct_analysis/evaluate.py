import pandas as pd
from pathlib import Path
from app.ml.bct_analysis.evaluation import (
    evaluate_bct_models
)

BASE_DIR = Path(__file__).resolve().parent
DATASET_DIR = BASE_DIR.parent / "datasets"

BATCH_DATASET = DATASET_DIR / "batch_history.csv"
STEP_DATASET = DATASET_DIR / "step_history.csv"


# Load historical batch and step datasets.
def load_evaluation_data() -> tuple[pd.DataFrame, pd.DataFrame]:

    if not BATCH_DATASET.exists():
        raise FileNotFoundError(
            f"Batch dataset not found: {BATCH_DATASET}"
        )

    if not STEP_DATASET.exists():
        raise FileNotFoundError(
            f"Step dataset not found: {STEP_DATASET}"
        )

    batch_df = pd.read_csv(BATCH_DATASET)
    step_df = pd.read_csv(STEP_DATASET)

    if batch_df.empty or step_df.empty:
        raise ValueError(
            "Evaluation datasets must contain historical records."
        )

    return batch_df, step_df


# Validate the columns required for model evaluation.
def validate_evaluation_data(
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


# Display the evaluation results for a trained model.
def display_evaluation_results(
    title: str,
    results: pd.DataFrame
) -> None:

    print(f"\n{title}")
    print("=" * 60)

    if results.empty:
        print("Not enough historical records for evaluation.")
        return

    print(results.to_string(index=False))


# Load historical data and evaluate both anomaly detection models.
def main():

    batch_df, step_df = load_evaluation_data()

    validate_evaluation_data(
        batch_df,
        step_df
    )

    results = evaluate_bct_models(
        batch_df=batch_df,
        step_df=step_df
    )

    display_evaluation_results(
        "BATCH MODEL EVALUATION",
        results["batch_evaluation"]
    )

    display_evaluation_results(
        "STEP MODEL EVALUATION",
        results["step_evaluation"]
    )


if __name__ == "__main__":
    main()
