
import pandas as pd

from app.ml.bct_analysis.anomaly_detector import (
    load_bct_models,
    detect_batch_anomalies,
    detect_step_anomalies
)


# Load trained models and test batch and step anomaly detection.
def main():

    batch_models, step_models = load_bct_models()

    batch_df = pd.DataFrame([
        {
            "batch_id": 101,
            "batch_no": "BATCH-TEST-001",
            "recipe_id": 101,
            "unit_id": 1,
            "actual_duration": 180
        }
    ])

    step_df = pd.DataFrame([
        {
            "batch_id": 101,
            "step_id": 1,
            "step_no": 1,
            "recipe_id": 101,
            "unit_id": 1,
            "act_time": 35
        }
    ])

    batch_result = detect_batch_anomalies(
        batch_df,
        batch_models
    )

    step_result = detect_step_anomalies(
        step_df,
        step_models
    )

    print("\nBATCH ANOMALY RESULT")
    print(
        batch_result[
            ["batch_no", "actual_duration", "anomaly_status", "anomaly_score"]
        ].to_string(index=False)
    )

    print("\nSTEP ANOMALY RESULT")
    print(
        step_result[
            ["step_no", "act_time", "anomaly_status", "anomaly_score"]
        ].to_string(index=False)
    )


if __name__ == "__main__":
    main()
