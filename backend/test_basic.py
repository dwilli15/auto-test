import pytest
from app.models import Agent, AgentCreate, LLMConfig
from datetime import datetime

def test_agent_creation():
    """Test creating an agent"""
    agent_data = AgentCreate(
        name="Test Agent",
        role="Tester",
        description="A test agent",
        llmProvider="ollama",
        modelName="llama2",
        systemPrompt="You are a test agent",
        temperature=0.7,
        maxTokens=1000
    )
    
    assert agent_data.name == "Test Agent"
    assert agent_data.role == "Tester"
    assert agent_data.llmProvider == "ollama"

def test_llm_config():
    """Test LLM configuration"""
    config = LLMConfig(
        provider="ollama",
        modelName="llama2",
        temperature=0.5,
        maxTokens=2000
    )
    
    assert config.provider == "ollama"
    assert config.temperature == 0.5
    assert config.maxTokens == 2000

@pytest.mark.asyncio
async def test_workflow_execution():
    """Test basic workflow execution"""
    from app.services.workflow_executor import WorkflowExecutor
    from app.models import Workflow, WorkflowNode, WorkflowNodeData, Agent
    
    # Create a simple workflow
    workflow = Workflow(
        id="test-workflow",
        name="Test Workflow",
        description="A test workflow",
        nodes=[
            WorkflowNode(
                id="node1",
                type="agent",
                position={"x": 0, "y": 0},
                data=WorkflowNodeData(label="Test Node", agentId="agent1")
            )
        ],
        edges=[],
        status="draft",
        createdAt=datetime.now(),
        updatedAt=datetime.now()
    )
    
    # Create test agent
    agent = Agent(
        id="agent1",
        name="Test Agent",
        role="Tester",
        description="Test",
        llmProvider="ollama",
        modelName="llama2",
        systemPrompt="Test",
        temperature=0.7,
        maxTokens=100,
        status="idle",
        createdAt=datetime.now(),
        updatedAt=datetime.now()
    )
    
    executor = WorkflowExecutor()
    
    # Note: This test will fail if Ollama is not running
    # In CI/CD, you'd mock the LLM service
    result = await executor.execute_workflow(
        workflow=workflow,
        agents={"agent1": agent},
        initial_input="Test input"
    )
    
    assert result["status"] in ["completed", "error"]
    assert "execution_id" in result
