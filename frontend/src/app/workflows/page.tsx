'use client';

import { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  MiniMap,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Plus, Save, Play, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useWorkflowStore } from '@/stores/workflowStore';
import { useAgentStore } from '@/stores/agentStore';
import { generateId } from '@/lib/utils';

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Start' },
    position: { x: 250, y: 25 },
  },
];

export default function WorkflowBuilder() {
  const router = useRouter();
  const { currentWorkflow, updateNodes, updateEdges } = useWorkflowStore();
  const { agents } = useAgentStore();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [workflowName, setWorkflowName] = useState('New Workflow');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const addAgentNode = (agentId: string, agentName: string) => {
    const newNode: Node = {
      id: generateId(),
      type: 'default',
      data: { label: agentName, agentId },
      position: {
        x: Math.random() * 400 + 100,
        y: Math.random() * 400 + 100,
      },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const saveWorkflow = () => {
    updateNodes(nodes as any);
    updateEdges(edges as any);
    alert('Workflow saved!');
  };

  const executeWorkflow = () => {
    alert('Executing workflow...');
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/')}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <input
              type="text"
              value={workflowName}
              onChange={(e) => setWorkflowName(e.target.value)}
              className="text-2xl font-bold bg-transparent border-none focus:outline-none"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={saveWorkflow}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              <Save className="w-4 h-4" />
              Save
            </button>
            <button
              onClick={executeWorkflow}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              <Play className="w-4 h-4" />
              Run
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Sidebar - Agent Palette */}
        <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4 overflow-y-auto">
          <h3 className="text-lg font-semibold mb-4">Available Agents</h3>
          <div className="space-y-2">
            {agents.length === 0 ? (
              <p className="text-sm text-gray-500">
                No agents yet. Create one in the Agents page.
              </p>
            ) : (
              agents.map((agent) => (
                <button
                  key={agent.id}
                  onClick={() => addAgentNode(agent.id, agent.name)}
                  className="w-full text-left p-3 bg-gray-50 dark:bg-gray-700 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <div className="font-medium">{agent.name}</div>
                  <div className="text-xs text-gray-500">{agent.role}</div>
                </button>
              ))
            )}
          </div>
          <button
            onClick={() => router.push('/agents')}
            className="mt-4 w-full flex items-center justify-center gap-2 p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            Create Agent
          </button>
        </div>

        {/* Canvas */}
        <div className="flex-1">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
          >
            <Controls />
            <MiniMap />
            <Background />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}
