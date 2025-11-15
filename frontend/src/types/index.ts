// Agent Types
export interface Agent {
  id: string;
  name: string;
  role: string;
  description: string;
  llmProvider: LLMProvider;
  modelName: string;
  systemPrompt: string;
  temperature: number;
  maxTokens: number;
  status: AgentStatus;
  createdAt: string;
  updatedAt: string;
}

export type AgentStatus = 'idle' | 'running' | 'paused' | 'error' | 'completed';

// LLM Provider Types
export type LLMProvider = 'ollama' | 'openai' | 'anthropic' | 'custom';

export interface LLMConfig {
  provider: LLMProvider;
  apiKey?: string;
  baseUrl?: string;
  modelName: string;
  temperature?: number;
  maxTokens?: number;
}

export interface OllamaModel {
  name: string;
  size: string;
  modified_at: string;
  digest: string;
}

// Workflow Types
export interface WorkflowNode {
  id: string;
  type: WorkflowNodeType;
  position: { x: number; y: number };
  data: WorkflowNodeData;
}

export type WorkflowNodeType = 'agent' | 'condition' | 'input' | 'output' | 'group';

export interface WorkflowNodeData {
  label: string;
  agentId?: string;
  config?: Record<string, any>;
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  type?: string;
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  status: WorkflowStatus;
  createdAt: string;
  updatedAt: string;
}

export type WorkflowStatus = 'draft' | 'active' | 'paused' | 'completed' | 'error';

// Execution Types
export interface ExecutionLog {
  id: string;
  workflowId: string;
  agentId?: string;
  timestamp: string;
  level: LogLevel;
  message: string;
  metadata?: Record<string, any>;
}

export type LogLevel = 'debug' | 'info' | 'warning' | 'error';

export interface ExecutionMetrics {
  workflowId: string;
  startTime: string;
  endTime?: string;
  duration?: number;
  tokensUsed: number;
  cost?: number;
  status: WorkflowStatus;
}

// Team Types
export interface Team {
  id: string;
  name: string;
  description: string;
  agents: Agent[];
  workflow?: Workflow;
  createdAt: string;
  updatedAt: string;
}
