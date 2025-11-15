from fastapi import APIRouter, HTTPException
from app.models import Workflow, WorkflowCreate
from typing import List
from datetime import datetime
import uuid

router = APIRouter()

# In-memory storage
workflows_db: dict[str, Workflow] = {}

@router.get("/", response_model=List[Workflow])
async def list_workflows():
    """List all workflows"""
    return list(workflows_db.values())

@router.get("/{workflow_id}", response_model=Workflow)
async def get_workflow(workflow_id: str):
    """Get a specific workflow by ID"""
    if workflow_id not in workflows_db:
        raise HTTPException(status_code=404, detail="Workflow not found")
    return workflows_db[workflow_id]

@router.post("/", response_model=Workflow)
async def create_workflow(workflow: WorkflowCreate):
    """Create a new workflow"""
    workflow_id = str(uuid.uuid4())
    now = datetime.now()
    
    new_workflow = Workflow(
        id=workflow_id,
        **workflow.model_dump(),
        status='draft',
        createdAt=now,
        updatedAt=now
    )
    
    workflows_db[workflow_id] = new_workflow
    return new_workflow

@router.put("/{workflow_id}", response_model=Workflow)
async def update_workflow(workflow_id: str, workflow_update: WorkflowCreate):
    """Update an existing workflow"""
    if workflow_id not in workflows_db:
        raise HTTPException(status_code=404, detail="Workflow not found")
    
    existing_workflow = workflows_db[workflow_id]
    updated_workflow = Workflow(
        id=workflow_id,
        **workflow_update.model_dump(),
        status=existing_workflow.status,
        createdAt=existing_workflow.createdAt,
        updatedAt=datetime.now()
    )
    
    workflows_db[workflow_id] = updated_workflow
    return updated_workflow

@router.delete("/{workflow_id}")
async def delete_workflow(workflow_id: str):
    """Delete a workflow"""
    if workflow_id not in workflows_db:
        raise HTTPException(status_code=404, detail="Workflow not found")
    
    del workflows_db[workflow_id]
    return {"message": "Workflow deleted successfully"}

@router.post("/{workflow_id}/execute")
async def execute_workflow(workflow_id: str):
    """Execute a workflow"""
    if workflow_id not in workflows_db:
        raise HTTPException(status_code=404, detail="Workflow not found")
    
    workflow = workflows_db[workflow_id]
    workflow.status = 'active'
    workflow.updatedAt = datetime.now()
    
    # TODO: Implement actual workflow execution logic
    
    return {"message": "Workflow execution started", "workflowId": workflow_id}
