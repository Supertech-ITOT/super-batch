import pandas as pd

# Calculate comparison metrics and rankings for batches with the same recipe and unit.
def engineer_batch_features(df: pd.DataFrame) -> pd.DataFrame:
    if df.empty:
        return df

    df = df.copy()

    group_columns = ["recipe_id", "unit_id"]

    df["average_duration"] = (
        df.groupby(group_columns)["actual_duration"]
        .transform("mean")
    )

    df["difference_from_average"] = (
        df["actual_duration"] - df["average_duration"]
    )

    df["deviation_from_average_percentage"] = (
        df["difference_from_average"]
        .div(df["average_duration"].where(df["average_duration"] > 0))
        * 100
    )

    df["rank"] = (
        df.groupby(group_columns)["actual_duration"]
        .rank(method="min", ascending=False)
    )

    return df


# Calculate standard deviations, average durations and rankings for comparable SOP steps.
def engineer_step_features(df: pd.DataFrame) -> pd.DataFrame:
    if df.empty:
        return df

    df = df.copy()

    group_columns = ["step_no", "recipe_id", "unit_id"]

    df["standard_deviation"] = (
        df["act_time"] - df["std_time"]
    )

    df["standard_deviation_percentage"] = (
        df["standard_deviation"]
        .div(df["std_time"].where(df["std_time"] > 0))
        * 100
    )

    df["average_duration"] = (
        df.groupby(group_columns)["act_time"]
        .transform("mean")
    )

    df["difference_from_average"] = (
        df["act_time"] - df["average_duration"]
    )

    df["deviation_from_average_percentage"] = (
        df["difference_from_average"]
        .div(df["average_duration"].where(df["average_duration"] > 0))
        * 100
    )

    df["rank"] = (
        df.groupby(group_columns)["act_time"]
        .rank(method="min", ascending=False)
    )

    return df