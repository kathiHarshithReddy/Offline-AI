
import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, ChevronRight, Activity, Cpu } from 'lucide-react';

interface TerminalProps {
  logs: string[];
  onCommand: (cmd: string) => void;
  isProcessing: boolean;
}

export const Terminal: React.FC<TerminalProps> = ({ logs, onCommand, isProcessing }) => {
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isProcessing) {
      onCommand(input);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-full glass border border-emerald-500/20 rounded-lg overflow-hidden font-mono text-sm shadow-[0_0_30px_rgba(0,0,0,0.5)]">
      <div className="bg-slate-900/90 px-4 py-2 flex items-center justify-between border-b border-emerald-500/20">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-emerald-400 flicker">
            <TerminalIcon size={14} />
            <span className="font-bold tracking-tighter text-[10px]">RHEA_SHELL://SYS_CORE</span>
          </div>
          <div className="h-3 w-[1px] bg-emerald-500/20" />
          <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
            <Activity size={10} />
            <span>LINK_ESTABLISHED</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-[9px] text-emerald-500/60 font-bold uppercase">
            <Cpu size={10} />
            <span>PROCRESSOR_LOAD: 4%</span>
          </div>
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_#10b981]"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-5 space-y-2 scrollbar-hide bg-slate-950/40">
        {logs.map((log, i) => (
          <div key={i} className="animate-in fade-in slide-in-from-left-2 duration-300 flex gap-3">
            <span className="text-slate-600 text-[10px] pt-0.5 min-w-[65px]">{new Date().toLocaleTimeString([], {hour12: false})}</span>
            <span className={`${log.startsWith('>') ? 'text-cyan-400 font-bold' : 'text-emerald-400/90'}`}>
              {log}
            </span>
          </div>
        ))}
        {isProcessing && (
          <div className="text-emerald-400 animate-pulse flex items-center gap-2 pl-20">
            <div className="flex gap-1">
              <span className="w-1 h-3 bg-emerald-500 animate-[bounce_1s_infinite]"></span>
              <span className="w-1 h-3 bg-emerald-500 animate-[bounce_1s_infinite_0.2s]"></span>
              <span className="w-1 h-3 bg-emerald-500 animate-[bounce_1s_infinite_0.4s]"></span>
            </div>
            <span className="text-[10px] tracking-widest font-black italic">SYNTHESIZING_NEURAL_LOGIC</span>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 bg-slate-900/40 border-t border-emerald-500/10 flex items-center gap-3">
        <ChevronRight size={18} className="text-emerald-500 flicker" />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isProcessing}
          placeholder={isProcessing ? "WAITING FOR CORE..." : "CMD_INPUT >"}
          className="bg-transparent border-none outline-none flex-1 text-emerald-400 placeholder-emerald-900/30 font-bold"
          autoFocus
        />
        <div className="text-[10px] font-bold text-slate-600 tracking-widest">UTF-8 // TLS_SECURED</div>
      </form>
    </div>
  );
};
