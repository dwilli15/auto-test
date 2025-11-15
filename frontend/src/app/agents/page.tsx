'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Trash, ArrowLeft, Play, Pause } from 'lucide-react';
import { useAgentStore } from '@/stores/agentStore';
import { generateId } from '@/lib/utils';
import type { Agent, LLMProvider } from '@/types';

export default function AgentsPage() {
  const router = useRouter();
  const { agents, addAgent, deleteAgent, selectAgent } = useAgentStore();
  const [showForm, setShowForm] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    description: '',
    llmProvider: 'ollama' as LLMProvider,
    modelName: 'llama2',
    systemPrompt: '',
    temperature: 0.7,
    maxTokens: 2000,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAgent: Agent = {
      id: generateId(),
      ...formData,
      status: 'idle',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    addAgent(newAgent);
    setShowForm(false);
    setFormData({
      name: '',
      role: '',
      description: '',
      llmProvider: 'ollama',
      modelName: 'llama2',
      systemPrompt: '',
      temperature: 0.7,
      maxTokens: 2000,
    });
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/')}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-bold">Agents</h1>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            Create Agent
          </button>
        </div>
      </div>

      <div className="container mx-auto p-6">
        {agents.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 mb-4">No agents created yet</p>
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Create Your First Agent
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{agent.name}</h3>
                    <p className="text-sm text-gray-500">{agent.role}</p>
                  </div>
                  <div
                    className={`px-2 py-1 rounded text-xs ${
                      agent.status === 'running'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {agent.status}
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  {agent.description}
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                  <span className="font-medium">{agent.llmProvider}</span>
                  <span>•</span>
                  <span>{agent.modelName}</span>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600">
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => deleteAgent(agent.id)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200"
                  >
                    <Trash className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Agent Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">Create New Agent</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  placeholder="e.g., Research Assistant"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Role</label>
                <input
                  type="text"
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  placeholder="e.g., Researcher, Writer, Analyst"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  rows={3}
                  placeholder="What does this agent do?"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">LLM Provider</label>
                  <select
                    value={formData.llmProvider}
                    onChange={(e) => setFormData({ ...formData, llmProvider: e.target.value as LLMProvider })}
                    className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  >
                    <option value="ollama">Ollama (Local)</option>
                    <option value="openai">OpenAI</option>
                    <option value="anthropic">Anthropic</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Model Name</label>
                  <input
                    type="text"
                    required
                    value={formData.modelName}
                    onChange={(e) => setFormData({ ...formData, modelName: e.target.value })}
                    className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                    placeholder="e.g., llama2, gpt-4"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">System Prompt</label>
                <textarea
                  value={formData.systemPrompt}
                  onChange={(e) => setFormData({ ...formData, systemPrompt: e.target.value })}
                  className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  rows={4}
                  placeholder="Instructions for the agent..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Temperature</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="2"
                    value={formData.temperature}
                    onChange={(e) => setFormData({ ...formData, temperature: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Max Tokens</label>
                  <input
                    type="number"
                    step="100"
                    min="100"
                    max="100000"
                    value={formData.maxTokens}
                    onChange={(e) => setFormData({ ...formData, maxTokens: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Create Agent
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
