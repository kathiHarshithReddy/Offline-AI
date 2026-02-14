
export enum ModuleType {
  DASHBOARD = 'DASHBOARD',
  BUILDER = 'BUILDER',
  AI_ENGINEER = 'AI_ENGINEER',
  SECURITY = 'SECURITY',
  DATA_ANALYSIS = 'DATA_ANALYSIS',
  VISION = 'VISION',
  VOICE = 'VOICE',
  MEMORY = 'MEMORY'
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  status: 'IDLE' | 'THINKING' | 'EXECUTING' | 'DONE' | 'ERROR';
  task?: string;
}

export interface MemoryEntry {
  id: string;
  timestamp: string;
  category: string;
  content: string;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR' | 'SYSTEM';
  message: string;
  source: string;
}
