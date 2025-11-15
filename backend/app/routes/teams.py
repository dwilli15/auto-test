from fastapi import APIRouter, HTTPException
from app.models import Team, TeamCreate
from typing import List
from datetime import datetime
import uuid

router = APIRouter()

# In-memory storage
teams_db: dict[str, Team] = {}

@router.get("/", response_model=List[Team])
async def list_teams():
    """List all teams"""
    return list(teams_db.values())

@router.get("/{team_id}", response_model=Team)
async def get_team(team_id: str):
    """Get a specific team by ID"""
    if team_id not in teams_db:
        raise HTTPException(status_code=404, detail="Team not found")
    return teams_db[team_id]

@router.post("/", response_model=Team)
async def create_team(team: TeamCreate):
    """Create a new team"""
    team_id = str(uuid.uuid4())
    now = datetime.now()
    
    new_team = Team(
        id=team_id,
        name=team.name,
        description=team.description,
        agents=[],
        createdAt=now,
        updatedAt=now
    )
    
    teams_db[team_id] = new_team
    return new_team

@router.put("/{team_id}", response_model=Team)
async def update_team(team_id: str, team_update: TeamCreate):
    """Update an existing team"""
    if team_id not in teams_db:
        raise HTTPException(status_code=404, detail="Team not found")
    
    existing_team = teams_db[team_id]
    updated_team = Team(
        id=team_id,
        name=team_update.name,
        description=team_update.description,
        agents=existing_team.agents,
        workflowId=existing_team.workflowId,
        createdAt=existing_team.createdAt,
        updatedAt=datetime.now()
    )
    
    teams_db[team_id] = updated_team
    return updated_team

@router.delete("/{team_id}")
async def delete_team(team_id: str):
    """Delete a team"""
    if team_id not in teams_db:
        raise HTTPException(status_code=404, detail="Team not found")
    
    del teams_db[team_id]
    return {"message": "Team deleted successfully"}
