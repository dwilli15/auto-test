'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, TestTube } from 'lucide-react';

export default function SettingsPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [settings, setSettings] = useState({
    ollamaUrl: 'http://localhost:11434',
    openaiKey: '',
    anthropicKey: '',
    sandboxType: 'docker',
    maxConcurrentAgents: 5,
    logLevel: 'info',
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSave = () => {
    localStorage.setItem('agent-orchestrator-settings', JSON.stringify(settings));
    alert('Settings saved!');
  };

  const testOllama = async () => {
    try {
      const response = await fetch(`${settings.ollamaUrl}/api/tags`);
      if (response.ok) {
        alert('Ollama connection successful!');
      } else {
        alert('Ollama connection failed. Check URL and ensure Ollama is running.');
      }
    } catch (error) {
      alert('Ollama connection failed. Check URL and ensure Ollama is running.');
    }
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
            <h1 className="text-2xl font-bold">Settings</h1>
          </div>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            <Save className="w-4 h-4" />
            Save Settings
          </button>
        </div>
      </div>

      <div className="container mx-auto p-6 max-w-4xl">
        {/* LLM Providers */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">LLM Providers</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Ollama URL (Local)</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={settings.ollamaUrl}
                  onChange={(e) => setSettings({ ...settings, ollamaUrl: e.target.value })}
                  className="flex-1 px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  placeholder="http://localhost:11434"
                />
                <button
                  onClick={testOllama}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  <TestTube className="w-4 h-4" />
                  Test
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Make sure Ollama is installed and running locally
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">OpenAI API Key</label>
              <input
                type="password"
                value={settings.openaiKey}
                onChange={(e) => setSettings({ ...settings, openaiKey: e.target.value })}
                className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                placeholder="sk-..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Anthropic API Key</label>
              <input
                type="password"
                value={settings.anthropicKey}
                onChange={(e) => setSettings({ ...settings, anthropicKey: e.target.value })}
                className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                placeholder="sk-ant-..."
              />
            </div>
          </div>
        </div>

        {/* Execution Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Execution Settings</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Sandbox Type</label>
              <select
                value={settings.sandboxType}
                onChange={(e) => setSettings({ ...settings, sandboxType: e.target.value })}
                className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="docker">Docker Container</option>
                <option value="process">Isolated Process</option>
                <option value="none">None (Direct Execution)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Max Concurrent Agents</label>
              <input
                type="number"
                min="1"
                max="20"
                value={settings.maxConcurrentAgents}
                onChange={(e) => setSettings({ ...settings, maxConcurrentAgents: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Log Level</label>
              <select
                value={settings.logLevel}
                onChange={(e) => setSettings({ ...settings, logLevel: e.target.value })}
                className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="debug">Debug</option>
                <option value="info">Info</option>
                <option value="warning">Warning</option>
                <option value="error">Error</option>
              </select>
            </div>
          </div>
        </div>

        {/* System Info */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">System Information</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Version:</span>
              <span className="font-medium">0.1.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Platform:</span>
              <span className="font-medium">{typeof window !== 'undefined' ? navigator.platform : 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Mode:</span>
              <span className="font-medium">Offline-First</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
