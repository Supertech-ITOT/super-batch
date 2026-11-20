from fastapi import FastAPI
from app.api.routes.bct_analysis import router as bct_analysis_router
app = FastAPI(
    title="SuperBatch AI",
    description="AI-powered batch and process analysis service",
    version="1.0.0"
)

app.include_router(bct_analysis_router)

@app.get("/")
def root():
    return {
        "application": "SuperBatch AI",
        "status": "running"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }
