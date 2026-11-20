import pandas as pd

from app.api.schemas.bct_request import (
    BatchRequest,
    BCTAnalysisRequest
)
from app.common.utils import calculate_duration

# Convert batch request objects into a batch DataFrame.
def prepare_batch_data(
    batches: list[BatchRequest]
) -> pd.DataFrame:
    records = []

    for batch in batches:
        record = batch.model_dump(exclude={"steps"})

        record["actual_duration"] = (
            calculate_duration(batch.start_time, batch.end_time)
            if batch.start_time and batch.end_time
            else None
        )

        records.append(record)

    return pd.DataFrame(records)

# Convert batch step request objects into a step DataFrame.
def prepare_step_data(
    batches: list[BatchRequest]
) -> pd.DataFrame:
    records = []

    for batch in batches:
        for step in batch.steps:
            record = step.model_dump()

            record.update({
                "batch_id": batch.batch_id,
                "recipe_id": batch.recipe_id,
                "unit_id": batch.unit_id
            })

            records.append(record)

    return pd.DataFrame(records)


# Remove invalid or incomplete batch duration records.
def clean_batch_data(
    df: pd.DataFrame
) -> pd.DataFrame:
    if df.empty:
        return df

    df = df.dropna(subset=["actual_duration", "batch_id"])
    df = df[df["actual_duration"] >= 0]

    return df.reset_index(drop=True)


# Remove invalid step duration records.
def clean_step_data(
    df: pd.DataFrame
) -> pd.DataFrame:
    if df.empty:
        return df

    df = df.dropna(subset=["act_time", "step_id"])
    df = df[df["act_time"] >= 0]
    df = df[df["std_time"].isna() | (df["std_time"] > 0)]

    return df.reset_index(drop=True)


# Prepare and clean batch and step data.
def preprocess_bct_data(
    request: BCTAnalysisRequest
) -> tuple[pd.DataFrame, pd.DataFrame]:
    batch_df = prepare_batch_data(request.batches)
    step_df = prepare_step_data(request.batches)

    batch_df = clean_batch_data(batch_df)
    step_df = clean_step_data(step_df)

    return batch_df, step_df