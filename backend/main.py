from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import agents, workflows, teams, logs, llm
import uvicorn

app = FastAPI(
    title="Agent Orchestrator API",
    description="Backend API for no-code agent orchestration platform",
    version="0.1.0",
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(agents.router, prefix="/api/agents", tags=["agents"])
app.include_router(workflows.router, prefix="/api/workflows", tags=["workflows"])
app.include_router(teams.router, prefix="/api/teams", tags=["teams"])
app.include_router(logs.router, prefix="/api/logs", tags=["logs"])
app.include_router(llm.router, prefix="/api/llm", tags=["llm"])

@app.get("/")
async def root():
    return {
        "message": "Agent Orchestrator API",
        "version": "0.1.0",
        "status": "running"
    }

@app.get("/health")
async def health():
    return {"status": "healthy"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
