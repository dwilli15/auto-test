'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Play, Users, Workflow, Settings, Zap } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const features = [
    {
      icon: <Workflow className="w-12 h-12" />,
      title: 'Drag & Drop Workflows',
      description: 'Visually design agent workflows with an intuitive drag-and-drop interface',
      action: () => router.push('/workflows'),
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: 'Agent Teams',
      description: 'Create and manage teams of autonomous agents with specific roles',
      action: () => router.push('/agents'),
    },
    {
      icon: <Zap className="w-12 h-12" />,
      title: 'Local & Cloud LLMs',
      description: 'Connect to Ollama, OpenAI, Anthropic, and more with modular connectors',
      action: () => router.push('/settings'),
    },
    {
      icon: <Play className="w-12 h-12" />,
      title: 'Sandboxed Execution',
      description: 'Run agents safely in isolated environments with transparent logs',
      action: () => router.push('/monitor'),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            Agent Orchestrator
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            No-code GUI for creating, managing, and coordinating autonomous agent teams.
            Build powerful AI workflows without writing a single line of code.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => router.push('/workflows')}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Get Started
            </button>
            <button
              onClick={() => router.push('/onboarding')}
              className="px-8 py-3 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-semibold border border-blue-600"
            >
              Tutorial
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              onClick={feature.action}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
            >
              <div className="text-blue-600 dark:text-blue-400 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Key Benefits */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-8">Why Agent Orchestrator?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">🔒 Offline-First</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Run entirely locally with Ollama and other local LLMs
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">👥 Beginner-Friendly</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Interactive tutorials and guided onboarding
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">🔍 Transparent</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Real-time logs and monitoring dashboards
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
