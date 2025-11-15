'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Activity, Terminal, TrendingUp } from 'lucide-react';

export default function MonitorPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [logs, setLogs] = useState([
    { id: '1', timestamp: new Date().toISOString(), level: 'info', message: 'System initialized', agentId: 'system' },
    { id: '2', timestamp: new Date().toISOString(), level: 'info', message: 'Waiting for workflow execution...', agentId: 'system' },
  ]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const metrics = [
    { label: 'Active Workflows', value: '0', icon: <Activity className="w-6 h-6" /> },
    { label: 'Total Executions', value: '0', icon: <TrendingUp className="w-6 h-6" /> },
    { label: 'Tokens Used', value: '0', icon: <Terminal className="w-6 h-6" /> },
  ];

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
          <h1 className="text-2xl font-bold">Monitoring Dashboard</h1>
        </div>
      </div>

      <div className="container mx-auto p-6">
        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{metric.label}</p>
                  <p className="text-3xl font-bold mt-1">{metric.value}</p>
                </div>
                <div className="text-blue-600 dark:text-blue-400">
                  {metric.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Logs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold">Execution Logs</h2>
          </div>
          <div className="p-4">
            <div className="bg-gray-900 text-gray-100 rounded p-4 font-mono text-sm max-h-96 overflow-y-auto">
              {logs.map((log) => (
                <div key={log.id} className="mb-2">
                  <span className="text-gray-500">[{new Date(log.timestamp).toLocaleTimeString()}]</span>
                  {' '}
                  <span className={
                    log.level === 'error' ? 'text-red-400' :
                    log.level === 'warning' ? 'text-yellow-400' :
                    'text-green-400'
                  }>
                    {log.level.toUpperCase()}
                  </span>
                  {' '}
                  <span className="text-blue-400">{log.agentId}</span>
                  {': '}
                  <span>{log.message}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Active Workflows */}
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold">Active Workflows</h2>
          </div>
          <div className="p-4">
            <p className="text-gray-500 text-center py-8">No workflows running</p>
          </div>
        </div>
      </div>
    </div>
  );
}
