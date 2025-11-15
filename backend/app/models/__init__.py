from pydantic import BaseModel, Field
from typing import Optional, Literal
from datetime import datetime

class AgentBase(BaseModel):
    name: str
    role: str
    description: str
    llmProvider: Literal['ollama', 'openai', 'anthropic', 'custom']
    modelName: str
    systemPrompt: str = ""
    temperature: float = 0.7
    maxTokens: int = 2000

class AgentCreate(AgentBase):
    pass

class Agent(AgentBase):
    id: str
    status: Literal['idle', 'running', 'paused', 'error', 'completed'] = 'idle'
    createdAt: datetime
    updatedAt: datetime

    class Config:
        from_attributes = True

class WorkflowNodeData(BaseModel):
    label: str
    agentId: Optional[str] = None
    config: Optional[dict] = None

class WorkflowNode(BaseModel):
    id: str
    type: str
    position: dict
    data: WorkflowNodeData

class WorkflowEdge(BaseModel):
    id: str
    source: str
    target: str
    label: Optional[str] = None
    type: Optional[str] = None

class WorkflowBase(BaseModel):
    name: str
    description: str
    nodes: list[WorkflowNode] = []
    edges: list[WorkflowEdge] = []

class WorkflowCreate(WorkflowBase):
    pass

class Workflow(WorkflowBase):
    id: str
    status: Literal['draft', 'active', 'paused', 'completed', 'error'] = 'draft'
    createdAt: datetime
    updatedAt: datetime

    class Config:
        from_attributes = True

class TeamBase(BaseModel):
    name: str
    description: str

class TeamCreate(TeamBase):
    agentIds: list[str] = []

class Team(TeamBase):
    id: str
    agents: list[Agent] = []
    workflowId: Optional[str] = None
    createdAt: datetime
    updatedAt: datetime

    class Config:
        from_attributes = True

class ExecutionLog(BaseModel):
    id: str
    workflowId: str
    agentId: Optional[str] = None
    timestamp: datetime
    level: Literal['debug', 'info', 'warning', 'error']
    message: str
    metadata: Optional[dict] = None

class LLMConfig(BaseModel):
    provider: Literal['ollama', 'openai', 'anthropic', 'custom']
    apiKey: Optional[str] = None
    baseUrl: Optional[str] = None
    modelName: str
    temperature: Optional[float] = 0.7
    maxTokens: Optional[int] = 2000
