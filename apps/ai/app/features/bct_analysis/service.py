
from app.api.schemas.bct_request import BCTAnalysisRequest

from app.features.bct_analysis.preprocessing import (
    preprocess_bct_data
)

from app.features.bct_analysis.delay_analyzer import (
    analyze_batch_delays
)

from app.ml.bct_analysis.anomaly_detector import (
    analyze_anomalies
)


# Execute BCT analysis using trained machine learning models.
def analyze_bct(request: BCTAnalysisRequest) -> dict:

    # Prepare and clean incoming batch and step data.
    batch_df, step_df = preprocess_bct_data(request)

    # Detect anomalies using trained batch and step models.
    batch_df, step_df = analyze_anomalies(
        batch_df,
        step_df
    )

    # Identify anomalous steps associated with anomalous batches.
    delay_df = analyze_batch_delays(
        batch_df,
        step_df
    )

    return {
        "batch_analysis": batch_df,
        "step_analysis": step_df,
        "delay_analysis": delay_df
    }
