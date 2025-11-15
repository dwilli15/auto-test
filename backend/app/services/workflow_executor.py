"""
Workflow execution engine for orchestrating agent teams.
Handles workflow execution, agent coordination, and result aggregation.
"""
import asyncio
from typing import Dict, Any, List, Optional
from datetime import datetime
import uuid

from app.models import Workflow, Agent, ExecutionLog, LLMConfig
from app.services.llm_service import LLMService
from app.services.sandbox import get_executor, SandboxType

class WorkflowExecutor:
    """Execute workflows by coordinating multiple agents"""
    
    def __init__(self):
        self.active_executions: Dict[str, dict] = {}
        self.execution_logs: List[ExecutionLog] = []
    
    async def execute_workflow(
        self,
        workflow: Workflow,
        agents: Dict[str, Agent],
        initial_input: str,
        sandbox_type: SandboxType = SandboxType.PROCESS
    ) -> Dict[str, Any]:
        """
        Execute a workflow with the given agents.
        
        Args:
            workflow: The workflow to execute
            agents: Dictionary of available agents
            initial_input: Initial input to the workflow
            sandbox_type: Type of sandbox to use
            
        Returns:
            Execution results and metadata
        """
        execution_id = str(uuid.uuid4())
        start_time = datetime.now()
        
        self.active_executions[execution_id] = {
            "workflow_id": workflow.id,
            "status": "running",
            "start_time": start_time
        }
        
        self._log(workflow.id, None, "info", f"Starting workflow execution: {workflow.name}")
        
        try:
            # Get execution order from workflow nodes and edges
            execution_plan = self._create_execution_plan(workflow)
            
            # Execute agents in order
            results = {}
            current_input = initial_input
            
            for step in execution_plan:
                agent_id = step.get("agent_id")
                if not agent_id or agent_id not in agents:
                    continue
                
                agent = agents[agent_id]
                self._log(workflow.id, agent_id, "info", f"Executing agent: {agent.name}")
                
                # Create LLM service for the agent
                llm_config = LLMConfig(
                    provider=agent.llmProvider,
                    modelName=agent.modelName,
                    temperature=agent.temperature,
                    maxTokens=agent.maxTokens
                )
                
                llm_service = LLMService(llm_config)
                
                try:
                    # Generate response using LLM
                    response = await llm_service.generate(
                        prompt=current_input,
                        system_prompt=agent.systemPrompt
                    )
                    
                    results[agent_id] = response
                    current_input = response  # Pass output to next agent
                    
                    self._log(
                        workflow.id, 
                        agent_id, 
                        "info", 
                        f"Agent completed: {len(response)} chars generated"
                    )
                    
                finally:
                    await llm_service.close()
            
            # Mark execution as complete
            end_time = datetime.now()
            duration = (end_time - start_time).total_seconds()
            
            self.active_executions[execution_id]["status"] = "completed"
            self.active_executions[execution_id]["end_time"] = end_time
            
            self._log(workflow.id, None, "info", f"Workflow completed in {duration:.2f}s")
            
            return {
                "execution_id": execution_id,
                "status": "completed",
                "results": results,
                "duration": duration,
                "final_output": current_input
            }
            
        except Exception as e:
            self.active_executions[execution_id]["status"] = "error"
            self._log(workflow.id, None, "error", f"Workflow execution failed: {str(e)}")
            
            return {
                "execution_id": execution_id,
                "status": "error",
                "error": str(e)
            }
    
    def _create_execution_plan(self, workflow: Workflow) -> List[Dict[str, Any]]:
        """
        Create an execution plan from workflow nodes and edges.
        
        For now, this returns a simple sequential plan.
        In the future, this should analyze the graph structure to:
        - Detect parallel execution opportunities
        - Handle conditional branches
        - Manage loops and cycles
        """
        plan = []
        
        # Find nodes with agent_id
        for node in workflow.nodes:
            if node.data.agentId:
                plan.append({
                    "node_id": node.id,
                    "agent_id": node.data.agentId,
                    "type": node.type
                })
        
        return plan
    
    def _log(
        self, 
        workflow_id: str, 
        agent_id: Optional[str], 
        level: str, 
        message: str
    ):
        """Create an execution log entry"""
        log = ExecutionLog(
            id=str(uuid.uuid4()),
            workflowId=workflow_id,
            agentId=agent_id,
            timestamp=datetime.now(),
            level=level,
            message=message
        )
        self.execution_logs.append(log)
    
    def get_logs(self, workflow_id: Optional[str] = None) -> List[ExecutionLog]:
        """Get execution logs, optionally filtered by workflow"""
        if workflow_id:
            return [log for log in self.execution_logs if log.workflowId == workflow_id]
        return self.execution_logs
    
    def get_active_executions(self) -> Dict[str, dict]:
        """Get currently running executions"""
        return {
            k: v for k, v in self.active_executions.items() 
            if v["status"] == "running"
        }

# Global executor instance
_workflow_executor: Optional[WorkflowExecutor] = None

def get_workflow_executor() -> WorkflowExecutor:
    """Get or create the global workflow executor"""
    global _workflow_executor
    if _workflow_executor is None:
        _workflow_executor = WorkflowExecutor()
    return _workflow_executor
