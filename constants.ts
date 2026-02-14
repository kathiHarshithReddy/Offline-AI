
import { ModuleType, Agent } from './types';

export const SYSTEM_NAME = "RHEA-AI";
export const SYSTEM_VERSION = "2.4.0-STABLE";
export const CORE_IDENTITY = "Autonomous AI Engineering Laboratory";

export const MODULES = [
  { type: ModuleType.DASHBOARD, label: "Terminal Core", icon: "Terminal" },
  { type: ModuleType.BUILDER, label: "Full-Stack Builder", icon: "Layers" },
  { type: ModuleType.AI_ENGINEER, label: "Agent Orchestrator", icon: "Cpu" },
  { type: ModuleType.SECURITY, label: "Cyber-Defense", icon: "ShieldAlert" },
  { type: ModuleType.DATA_ANALYSIS, label: "Logic Synthesis", icon: "BarChart3" },
  { type: ModuleType.VISION, label: "Visual Cortex", icon: "Camera" },
  { type: ModuleType.MEMORY, label: "Synaptic Storage", icon: "Database" }
];

// Added explicit typing to ensure the status field matches the Agent interface
export const INITIAL_AGENTS: Agent[] = [
  { id: '1', name: 'Architect-01', role: 'System Architecture', status: 'IDLE' },
  { id: '2', name: 'Codex-A', role: 'Code Generation', status: 'IDLE' },
  { id: '3', name: 'Guard-Prime', role: 'Security Review', status: 'IDLE' },
  { id: '4', name: 'Optimus', role: 'Optimization', status: 'IDLE' }
];
