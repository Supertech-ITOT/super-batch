import pandas as pd

from fastapi import APIRouter, HTTPException
from fastapi.encoders import jsonable_encoder
from app.api.schemas.bct_request import BCTAnalysisRequest
from app.features.bct_analysis.service import analyze_bct

router = APIRouter(
    prefix="/api/bct-analysis",
    tags=["BCT Analysis"]
)

# Convert a DataFrame into JSON-compatible records.
def dataframe_to_records(df: pd.DataFrame) -> list[dict]:
    if df.empty:
        return []

    records = df.astype(object).where(
        pd.notna(df),
        None
    ).to_dict(orient="records")

    return jsonable_encoder(records)


# Execute BCT analysis and return batch, step and delay results.
@router.post("/")
def run_bct_analysis(request: BCTAnalysisRequest):

    try:
        result = analyze_bct(request)

        return {
            "total_batches_analyzed": len(result["batch_analysis"]),
            "total_steps_analyzed": len(result["step_analysis"]),
            "total_delayed_batches": int(
                result["batch_analysis"]["status"]
                .eq("ANOMALY")
                .sum()
            ) if not result["batch_analysis"].empty else 0,
            "batch_analysis": dataframe_to_records(
                result["batch_analysis"]
            ),
            "step_analysis": dataframe_to_records(
                result["step_analysis"]
            ),
            "delay_analysis": dataframe_to_records(
                result["delay_analysis"]
            )
        }

    except FileNotFoundError as exc:
        raise HTTPException(
            status_code=503,
            detail=str(exc)
        )

    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"BCT analysis failed: {str(exc)}"
        )
