'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const steps = [
    {
      title: 'Welcome to Agent Orchestrator!',
      content: (
        <div className="space-y-4">
          <p className="text-lg">
            Agent Orchestrator is a no-code platform for building and managing autonomous AI agent teams.
          </p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <span>Create agents with different roles and capabilities</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <span>Design workflows visually with drag-and-drop</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <span>Use local LLMs (Ollama) or cloud providers (OpenAI, Anthropic)</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <span>Monitor execution with real-time logs</span>
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: 'Step 1: Configure LLM Providers',
      content: (
        <div className="space-y-4">
          <p>Before creating agents, you need to set up at least one LLM provider:</p>
          <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded">
            <h3 className="font-semibold mb-2">Recommended: Ollama (Local & Free)</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>Install Ollama from <a href="https://ollama.ai" target="_blank" className="text-blue-600 underline">ollama.ai</a></li>
              <li>Run: <code className="bg-white dark:bg-gray-800 px-2 py-1 rounded">ollama pull llama2</code></li>
              <li>Verify it's running at http://localhost:11434</li>
            </ol>
          </div>
          <p className="text-sm text-gray-600">
            Or configure OpenAI/Anthropic API keys in Settings for cloud-based models.
          </p>
        </div>
      ),
    },
    {
      title: 'Step 2: Create Your First Agent',
      content: (
        <div className="space-y-4">
          <p>Agents are autonomous AI workers with specific roles:</p>
          <div className="bg-green-50 dark:bg-green-900 p-4 rounded space-y-2">
            <p className="font-semibold">Example Agent Configuration:</p>
            <ul className="text-sm space-y-1">
              <li><strong>Name:</strong> Research Assistant</li>
              <li><strong>Role:</strong> Researcher</li>
              <li><strong>Description:</strong> Gathers and analyzes information</li>
              <li><strong>LLM Provider:</strong> Ollama</li>
              <li><strong>Model:</strong> llama2</li>
            </ul>
          </div>
          <p className="text-sm">
            Navigate to the Agents page to create your first agent.
          </p>
        </div>
      ),
    },
    {
      title: 'Step 3: Design a Workflow',
      content: (
        <div className="space-y-4">
          <p>Workflows connect agents together to accomplish complex tasks:</p>
          <div className="bg-purple-50 dark:bg-purple-900 p-4 rounded space-y-2">
            <p className="font-semibold">Workflow Builder Features:</p>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>Drag agents from the sidebar onto the canvas</li>
              <li>Connect agents with arrows to define data flow</li>
              <li>Add conditions to create branching logic</li>
              <li>Save and execute workflows with one click</li>
            </ul>
          </div>
          <p className="text-sm">
            Go to Workflows to start building your automation.
          </p>
        </div>
      ),
    },
    {
      title: 'Step 4: Monitor & Debug',
      content: (
        <div className="space-y-4">
          <p>Track your agents' execution in real-time:</p>
          <div className="bg-orange-50 dark:bg-orange-900 p-4 rounded space-y-2">
            <p className="font-semibold">Monitoring Dashboard:</p>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>View live execution logs</li>
              <li>Track token usage and costs</li>
              <li>See which agents are active</li>
              <li>Debug errors and warnings</li>
            </ul>
          </div>
          <p className="text-sm">
            Access the Monitor page to see everything happening in your system.
          </p>
        </div>
      ),
    },
    {
      title: 'You\'re Ready!',
      content: (
        <div className="space-y-6 text-center">
          <p className="text-lg">
            You now know the basics of Agent Orchestrator!
          </p>
          <div className="space-y-4">
            <button
              onClick={() => router.push('/agents')}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Create Your First Agent
            </button>
            <button
              onClick={() => router.push('/')}
              className="w-full px-6 py-3 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              Go to Home
            </button>
          </div>
          <p className="text-sm text-gray-600">
            Need help? Check the documentation or explore example workflows.
          </p>
        </div>
      ),
    },
  ];

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="container mx-auto flex items-center gap-4">
          <button
            onClick={() => router.push('/')}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold">Getting Started Tutorial</h1>
        </div>
      </div>

      <div className="container mx-auto p-6 max-w-3xl">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`flex-1 h-2 mx-1 rounded ${
                  index <= currentStep ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-600 text-center">
            Step {currentStep + 1} of {steps.length}
          </p>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 mb-6">
          <h2 className="text-3xl font-bold mb-6">{steps[currentStep].title}</h2>
          {steps[currentStep].content}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </button>
          <button
            onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
            disabled={currentStep === steps.length - 1}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
