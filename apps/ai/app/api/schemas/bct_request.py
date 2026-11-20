from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, model_validator

class StepRequest(BaseModel):
    step_id: int
    step_no: int
    action_id: int
    transition_id: int
    std_time: Optional[float] = None
    act_time: float = 0.0
    from_equipment_id: Optional[int] = None
    to_equipment_id: Optional[int] = None
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None

    @model_validator(mode="after")
    def validate_timestamps(self):
        if (
            self.start_time is not None
            and self.end_time is not None
            and self.end_time < self.start_time
        ):
            raise ValueError(
                "Step end time cannot be before start time"
            )

        return self

class BatchRequest(BaseModel):
    batch_id: int
    batch_no: str
    recipe_id: int
    unit_id: int
    status: str
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None
    steps: List[StepRequest]

    @model_validator(mode="after")
    def validate_timestamps(self):
        if (
            self.start_time is not None
            and self.end_time is not None
            and self.end_time < self.start_time
        ):
            raise ValueError(
                "Batch end time cannot be before start time"
            )

        return self


class BCTAnalysisRequest(BaseModel):
    batches: List[BatchRequest]
