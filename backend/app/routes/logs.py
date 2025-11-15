from fastapi import APIRouter, Query
from app.models import ExecutionLog
from app.services.workflow_executor import get_workflow_executor
from typing import List, Optional
from datetime import datetime
import uuid

router = APIRouter()

@router.get("/", response_model=List[ExecutionLog])
async def list_logs(workflowId: Optional[str] = Query(None)):
    """List execution logs, optionally filtered by workflow"""
    executor = get_workflow_executor()
    return executor.get_logs(workflowId)

@router.get("/active-executions")
async def get_active_executions():
    """Get currently running workflow executions"""
    executor = get_workflow_executor()
    return executor.get_active_executions()

@router.get("/stream/{workflow_id}")
async def stream_logs(workflow_id: str):
    """Stream logs for a specific workflow (SSE endpoint)"""
    # TODO: Implement Server-Sent Events for real-time log streaming
    return {"message": "Log streaming endpoint", "workflowId": workflow_id}
