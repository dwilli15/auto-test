import { create } from 'zustand';
import type { Workflow, WorkflowNode, WorkflowEdge } from '@/types';

interface WorkflowStore {
  workflows: Workflow[];
  currentWorkflow: Workflow | null;
  setWorkflows: (workflows: Workflow[]) => void;
  setCurrentWorkflow: (workflow: Workflow | null) => void;
  addWorkflow: (workflow: Workflow) => void;
  updateWorkflow: (id: string, workflow: Partial<Workflow>) => void;
  deleteWorkflow: (id: string) => void;
  updateNodes: (nodes: WorkflowNode[]) => void;
  updateEdges: (edges: WorkflowEdge[]) => void;
}

export const useWorkflowStore = create<WorkflowStore>((set) => ({
  workflows: [],
  currentWorkflow: null,
  setWorkflows: (workflows) => set({ workflows }),
  setCurrentWorkflow: (workflow) => set({ currentWorkflow: workflow }),
  addWorkflow: (workflow) =>
    set((state) => ({ workflows: [...state.workflows, workflow] })),
  updateWorkflow: (id, updatedWorkflow) =>
    set((state) => ({
      workflows: state.workflows.map((workflow) =>
        workflow.id === id ? { ...workflow, ...updatedWorkflow } : workflow
      ),
      currentWorkflow:
        state.currentWorkflow?.id === id
          ? { ...state.currentWorkflow, ...updatedWorkflow }
          : state.currentWorkflow,
    })),
  deleteWorkflow: (id) =>
    set((state) => ({
      workflows: state.workflows.filter((workflow) => workflow.id !== id),
      currentWorkflow: state.currentWorkflow?.id === id ? null : state.currentWorkflow,
    })),
  updateNodes: (nodes) =>
    set((state) => ({
      currentWorkflow: state.currentWorkflow
        ? { ...state.currentWorkflow, nodes }
        : null,
    })),
  updateEdges: (edges) =>
    set((state) => ({
      currentWorkflow: state.currentWorkflow
        ? { ...state.currentWorkflow, edges }
        : null,
    })),
}));
