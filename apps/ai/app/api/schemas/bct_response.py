from typing import List, Optional
from pydantic import BaseModel

class StepComparisonResponse(BaseModel):
    average_duration: Optional[float] = None
    minimum_duration: Optional[float] = None
    maximum_duration: Optional[float] = None
    difference_from_average: Optional[float] = None
    deviation_from_average_percentage: Optional[float] = None
    total_comparable_batches: int
    rank: Optional[int] = None

class StepAnalysisResponse(BaseModel):
    step_id: int
    step_no: int
    std_time: Optional[float] = None
    act_time: float
    deviation: Optional[float] = None
    deviation_percentage: Optional[float] = None
    status: str
    severity: Optional[str] = None
    comparison: Optional[StepComparisonResponse] = None

class BatchComparisonResponse(BaseModel):
    average_duration: Optional[float] = None
    minimum_duration: Optional[float] = None
    maximum_duration: Optional[float] = None
    difference_from_average: Optional[float] = None
    deviation_from_average_percentage: Optional[float] = None
    total_comparable_batches: int
    rank: Optional[int] = None

class BatchAnalysisResponse(BaseModel):
    batch_id: int
    batch_no: str
    actual_duration: Optional[float] = None
    std_duration: Optional[float] = None
    deviation: Optional[float] = None
    deviation_percentage: Optional[float] = None
    status: str
    comparison: Optional[BatchComparisonResponse] = None
    steps: List[StepAnalysisResponse]

class BCTAnalysisResponse(BaseModel):
    batches: List[BatchAnalysisResponse]
