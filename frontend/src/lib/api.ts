import axios from 'axios';
import type { Agent, Workflow, Team, ExecutionLog, LLMConfig, OllamaModel } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Agent API
export const agentApi = {
  list: async (): Promise<Agent[]> => {
    const response = await apiClient.get('/api/agents');
    return response.data;
  },
  get: async (id: string): Promise<Agent> => {
    const response = await apiClient.get(`/api/agents/${id}`);
    return response.data;
  },
  create: async (agent: Partial<Agent>): Promise<Agent> => {
    const response = await apiClient.post('/api/agents', agent);
    return response.data;
  },
  update: async (id: string, agent: Partial<Agent>): Promise<Agent> => {
    const response = await apiClient.put(`/api/agents/${id}`, agent);
    return response.data;
  },
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/agents/${id}`);
  },
};

// Workflow API
export const workflowApi = {
  list: async (): Promise<Workflow[]> => {
    const response = await apiClient.get('/api/workflows');
    return response.data;
  },
  get: async (id: string): Promise<Workflow> => {
    const response = await apiClient.get(`/api/workflows/${id}`);
    return response.data;
  },
  create: async (workflow: Partial<Workflow>): Promise<Workflow> => {
    const response = await apiClient.post('/api/workflows', workflow);
    return response.data;
  },
  update: async (id: string, workflow: Partial<Workflow>): Promise<Workflow> => {
    const response = await apiClient.put(`/api/workflows/${id}`, workflow);
    return response.data;
  },
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/workflows/${id}`);
  },
  execute: async (id: string): Promise<void> => {
    await apiClient.post(`/api/workflows/${id}/execute`);
  },
};

// Team API
export const teamApi = {
  list: async (): Promise<Team[]> => {
    const response = await apiClient.get('/api/teams');
    return response.data;
  },
  get: async (id: string): Promise<Team> => {
    const response = await apiClient.get(`/api/teams/${id}`);
    return response.data;
  },
  create: async (team: Partial<Team>): Promise<Team> => {
    const response = await apiClient.post('/api/teams', team);
    return response.data;
  },
  update: async (id: string, team: Partial<Team>): Promise<Team> => {
    const response = await apiClient.put(`/api/teams/${id}`, team);
    return response.data;
  },
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/teams/${id}`);
  },
};

// Logs API
export const logsApi = {
  list: async (workflowId?: string): Promise<ExecutionLog[]> => {
    const params = workflowId ? { workflowId } : {};
    const response = await apiClient.get('/api/logs', { params });
    return response.data;
  },
  stream: (workflowId: string, onMessage: (log: ExecutionLog) => void) => {
    const eventSource = new EventSource(`${API_BASE_URL}/api/logs/stream/${workflowId}`);
    eventSource.onmessage = (event) => {
      const log = JSON.parse(event.data);
      onMessage(log);
    };
    return eventSource;
  },
};

// LLM Provider API
export const llmApi = {
  listOllamaModels: async (): Promise<OllamaModel[]> => {
    const response = await apiClient.get('/api/llm/ollama/models');
    return response.data;
  },
  testConnection: async (config: LLMConfig): Promise<boolean> => {
    const response = await apiClient.post('/api/llm/test', config);
    return response.data.success;
  },
};

export default apiClient;
