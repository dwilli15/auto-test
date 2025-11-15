from fastapi import APIRouter, HTTPException
from app.models import Agent, AgentCreate
from typing import List
from datetime import datetime
import uuid

router = APIRouter()

# In-memory storage (replace with database in production)
agents_db: dict[str, Agent] = {}

@router.get("/", response_model=List[Agent])
async def list_agents():
    """List all agents"""
    return list(agents_db.values())

@router.get("/{agent_id}", response_model=Agent)
async def get_agent(agent_id: str):
    """Get a specific agent by ID"""
    if agent_id not in agents_db:
        raise HTTPException(status_code=404, detail="Agent not found")
    return agents_db[agent_id]

@router.post("/", response_model=Agent)
async def create_agent(agent: AgentCreate):
    """Create a new agent"""
    agent_id = str(uuid.uuid4())
    now = datetime.now()
    
    new_agent = Agent(
        id=agent_id,
        **agent.model_dump(),
        status='idle',
        createdAt=now,
        updatedAt=now
    )
    
    agents_db[agent_id] = new_agent
    return new_agent

@router.put("/{agent_id}", response_model=Agent)
async def update_agent(agent_id: str, agent_update: AgentCreate):
    """Update an existing agent"""
    if agent_id not in agents_db:
        raise HTTPException(status_code=404, detail="Agent not found")
    
    existing_agent = agents_db[agent_id]
    updated_agent = Agent(
        id=agent_id,
        **agent_update.model_dump(),
        status=existing_agent.status,
        createdAt=existing_agent.createdAt,
        updatedAt=datetime.now()
    )
    
    agents_db[agent_id] = updated_agent
    return updated_agent

@router.delete("/{agent_id}")
async def delete_agent(agent_id: str):
    """Delete an agent"""
    if agent_id not in agents_db:
        raise HTTPException(status_code=404, detail="Agent not found")
    
    del agents_db[agent_id]
    return {"message": "Agent deleted successfully"}
