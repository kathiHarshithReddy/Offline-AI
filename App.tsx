
import React, { useState, useEffect, useCallback, useRef } from 'react';
import * as Icons from 'lucide-react';
import { ModuleType, Agent, MemoryEntry } from './types';
import { MODULES, INITIAL_AGENTS, SYSTEM_NAME, SYSTEM_VERSION, CORE_IDENTITY } from './constants';
import { Terminal } from './components/Terminal';
import { ModuleWrapper } from './components/ModuleWrapper';
import { rheaReasoning, codeGenerator, securityAudit } from './services/gemini';

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<ModuleType>(ModuleType.DASHBOARD);
  const [logs, setLogs] = useState<string[]>(["SYSTEM BOOT SEQUENCES INITIALIZED", "OFFLINE_CORE CONNECTED", "READY FOR COMMANDS"]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [agents, setAgents] = useState<Agent[]>(INITIAL_AGENTS);
  const [activeVideo, setActiveVideo] = useState(false);
  const [systemLoad, setSystemLoad] = useState(12.4);

  // Simulated live system load
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemLoad(prev => Math.max(5, Math.min(95, prev + (Math.random() * 4 - 2))));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const addLog = useCallback((msg: string) => {
    setLogs(prev => [...prev.slice(-49), msg]);
  }, []);

  const handleCommand = async (cmd: string) => {
    addLog(`> ${cmd}`);
    setIsProcessing(true);
    
    try {
      if (activeModule === ModuleType.BUILDER) {
        const res = await codeGenerator(cmd);
        addLog("CODE ARCHITECTURE SYNTHESIZED");
        // Logic to update a local state or display could go here
      } else if (activeModule === ModuleType.SECURITY) {
        const res = await securityAudit(cmd);
        addLog("THREAT MODELING COMPLETE");
      } else {
        const res = await rheaReasoning(cmd, `Active Module: ${activeModule}`);
        addLog(res || "NO RESPONSE FROM CORE");
      }
    } catch (e) {
      addLog("CORE_EXCEPTION: " + (e as Error).message);
    }
    
    setIsProcessing(false);
  };

  const getIcon = (iconName: string) => {
    const Icon = (Icons as any)[iconName];
    return Icon ? <Icon size={18} /> : <Icons.HelpCircle size={18} />;
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 overflow-hidden font-sans select-none">
      {/* Sidebar */}
      <aside className="w-72 border-r border-emerald-500/10 flex flex-col bg-slate-950/90 backdrop-blur-2xl z-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent pointer-events-none" />
        
        <div className="p-8 border-b border-white/5 relative">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-10 h-10 bg-emerald-500 flex items-center justify-center rounded-xl shadow-[0_0_25px_rgba(16,185,129,0.5)] transform rotate-3 hover:rotate-0 transition-transform cursor-pointer">
              <Icons.Zap size={24} className="text-slate-950" fill="currentColor" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tighter text-white uppercase italic flicker">{SYSTEM_NAME}</h1>
              <p className="text-[10px] text-emerald-500 font-mono tracking-[0.3em] uppercase opacity-70 leading-none">V {SYSTEM_VERSION}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar relative z-10">
          <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-black mb-6 px-4 mt-2">Active Protocols</div>
          {MODULES.map((mod) => (
            <button
              key={mod.type}
              onClick={() => setActiveModule(mod.type)}
              className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                activeModule === mod.type 
                ? 'bg-emerald-500 text-slate-950 shadow-[0_10px_20px_rgba(16,185,129,0.2)] scale-105 z-10' 
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-4 relative z-10">
                <span className={`${activeModule === mod.type ? 'text-slate-950' : 'text-emerald-500/60 group-hover:text-emerald-400'} transition-colors`}>
                  {getIcon(mod.icon)}
                </span>
                <span className="text-xs font-black tracking-tight uppercase italic">{mod.label}</span>
              </div>
              {activeModule === mod.type && (
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent pointer-events-none animate-[shimmer_2s_infinite]" />
              )}
              <Icons.ChevronRight size={14} className={`opacity-0 group-hover:opacity-100 transition-opacity ${activeModule === mod.type ? 'text-slate-950' : 'text-slate-600'}`} />
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-white/5 bg-black/20">
          <div className="glass rounded-xl p-4 border border-emerald-500/10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Neural Load</span>
              <span className="text-[10px] font-mono text-emerald-400 font-bold">{systemLoad.toFixed(1)}%</span>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden flex gap-0.5 p-[1px]">
               {Array.from({length: 20}).map((_, i) => (
                 <div 
                   key={i} 
                   className={`h-full flex-1 rounded-[1px] transition-all duration-1000 ${
                     (i/20) * 100 < systemLoad ? 'bg-emerald-500 shadow-[0_0_5px_#10b981]' : 'bg-slate-700'
                   }`} 
                 />
               ))}
            </div>
            <div className="mt-3 flex items-center justify-between text-[8px] text-slate-500 font-mono italic">
               <span>FAN_RPM: 4200</span>
               <span>TEMP: 32°C</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative">
        <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[radial-gradient(circle_at_50%_50%,#10b981_0%,transparent_50%)]" />
        
        {/* Top bar */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-10 glass z-10 relative">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping absolute inset-0" />
                <div className="w-3 h-3 rounded-full bg-emerald-500 relative z-10 shadow-[0_0_10px_#10b981]" />
              </div>
              <span className="text-xs font-black font-mono text-emerald-400 tracking-[0.3em] uppercase italic flicker">Neural Link Active</span>
            </div>
            <div className="h-6 w-[1px] bg-white/10" />
            <div className="text-[10px] text-slate-500 font-mono tracking-widest uppercase flex items-center gap-2">
              <Icons.Globe size={12} className="text-emerald-500/50" />
              {CORE_IDENTITY}
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 bg-black/40 px-4 py-2 rounded-full border border-white/5">
              <div className="flex flex-col items-end">
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter leading-none">Latent State</span>
                <span className="text-[10px] text-emerald-400 font-mono font-bold leading-none mt-1">SECURED_NODE_43</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                 <Icons.Lock size={14} className="text-emerald-500" />
              </div>
            </div>
            <button className="p-2.5 bg-white/5 hover:bg-emerald-500 hover:text-slate-950 rounded-lg transition-all border border-white/5 hover:border-emerald-500 shadow-xl group">
              <Icons.Settings size={18} className="group-hover:rotate-90 transition-transform" />
            </button>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="flex-1 p-10 overflow-hidden flex flex-col gap-8 relative">
          <div className="flex-1 min-h-0 relative z-10">
            {activeModule === ModuleType.DASHBOARD && (
              <div className="grid grid-cols-12 gap-8 h-full">
                <div className="col-span-8 h-full cyber-border p-1 rounded-lg">
                  <Terminal logs={logs} onCommand={handleCommand} isProcessing={isProcessing} />
                </div>
                <div className="col-span-4 flex flex-col gap-8">
                  <div className="glass border border-emerald-500/20 rounded-2xl p-6 flex flex-col gap-5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full -mr-16 -mt-16" />
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-3">
                      <Icons.Users size={14} className="text-emerald-500 flicker" /> Specialized Agents
                    </h3>
                    <div className="space-y-4">
                      {agents.map(agent => (
                        <div key={agent.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-emerald-500/30 transition-colors group/agent">
                          <div className="flex items-center gap-4">
                            <div className="relative">
                              <div className={`w-3 h-3 rounded-full transition-all duration-500 ${agent.status === 'IDLE' ? 'bg-slate-700' : 'bg-emerald-500 shadow-[0_0_10px_#10b981]'}`} />
                              {agent.status !== 'IDLE' && <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping" />}
                            </div>
                            <div>
                              <div className="text-xs font-black text-white uppercase italic group-hover/agent:text-emerald-400 transition-colors">{agent.name}</div>
                              <div className="text-[9px] text-slate-500 font-mono tracking-widest uppercase">{agent.role}</div>
                            </div>
                          </div>
                          <div className="px-2 py-0.5 rounded-md bg-black/40 text-[8px] font-mono text-emerald-500/50 uppercase tracking-tighter">
                            {agent.status}
                          </div>
                        </div>
                      ))}
                    </div>
                    <button className="w-full mt-2 py-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 text-[10px] font-black uppercase tracking-widest transition-all">
                      Deploy New Agent
                    </button>
                  </div>
                  
                  <div className="flex-1 glass border border-white/10 rounded-2xl p-6 overflow-hidden flex flex-col relative">
                    <div className="absolute bottom-0 right-0 w-48 h-48 bg-blue-500/5 blur-3xl rounded-full -mb-24 -mr-24" />
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                      <Icons.Database size={14} className="text-blue-500" /> Synaptic Retrieval
                    </h3>
                    <div className="flex-1 overflow-y-auto space-y-6 scrollbar-hide pr-2">
                       <div className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-gradient-to-b before:from-emerald-500 before:to-transparent">
                          <div className="text-[9px] text-emerald-400 font-mono mb-1 uppercase font-bold tracking-tighter">NODE_LOG: ST-3490</div>
                          <div className="text-[11px] text-slate-300 leading-relaxed font-medium">Modular API design pattern optimized for ultra low-latency inference cycles. Local state maintained.</div>
                          <div className="mt-2 flex gap-2">
                            <span className="text-[8px] px-1.5 py-0.5 bg-emerald-500/10 rounded text-emerald-500 border border-emerald-500/20">#architecture</span>
                            <span className="text-[8px] px-1.5 py-0.5 bg-slate-800 rounded text-slate-400 border border-white/5">2m ago</span>
                          </div>
                       </div>
                       <div className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-gradient-to-b before:from-blue-500 before:to-transparent opacity-60 hover:opacity-100 transition-opacity">
                          <div className="text-[9px] text-blue-400 font-mono mb-1 uppercase font-bold tracking-tighter">NODE_LOG: ST-3488</div>
                          <div className="text-[11px] text-slate-300 leading-relaxed font-medium">Zero-day threat mitigation strategies applied to Node.js backend. All ports isolated via secure tunneling.</div>
                          <div className="mt-2 flex gap-2">
                            <span className="text-[8px] px-1.5 py-0.5 bg-blue-500/10 rounded text-blue-500 border border-blue-500/20">#security</span>
                            <span className="text-[8px] px-1.5 py-0.5 bg-slate-800 rounded text-slate-400 border border-white/5">15m ago</span>
                          </div>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Builder Module */}
            {activeModule === ModuleType.BUILDER && (
              <ModuleWrapper title="Full-Stack Builder" subtitle="Synthesize production-grade software architectures.">
                <div className="flex flex-col h-full gap-8">
                  <div className="flex-1 bg-black/60 rounded-2xl border border-white/10 p-8 font-mono text-sm overflow-y-auto relative shadow-inner">
                    <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                       <Icons.Cpu size={200} />
                    </div>
                    <div className="relative z-10 text-emerald-400 leading-relaxed">
                       <pre className="whitespace-pre-wrap">
                          {`// RHEA-AI CODE_SYNTHESIS_ENGINE V4.0\n// INITIALIZING COMPILATION PROTOCOLS...\n\n`}
                          {logs.filter(l => !l.startsWith('>')).slice(-1)[0] || "AWAITING INSTRUCTIONS TO BUILD..."}
                       </pre>
                    </div>
                  </div>
                  <div className="h-48 cyber-border p-1 rounded-lg">
                    <Terminal logs={["BUILDER_CORE: ONLINE", "STRICT_OFFLINE: ENABLED"]} onCommand={handleCommand} isProcessing={isProcessing} />
                  </div>
                </div>
              </ModuleWrapper>
            )}

            {/* Vision Module (Fancied Up) */}
            {activeModule === ModuleType.VISION && (
               <ModuleWrapper title="Visual Cortex" subtitle="Real-time object detection and OCR extraction.">
                 <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-emerald-500/20 rounded-3xl bg-black/40 group hover:bg-black/60 transition-all duration-500">
                    <div className="relative mb-10">
                      <Icons.Camera size={80} className={`transition-all duration-1000 ${activeVideo ? 'text-emerald-500 scale-110 drop-shadow-[0_0_20px_#10b981]' : 'text-slate-700'}`} />
                      <div className={`absolute -inset-4 border-2 border-emerald-500/30 rounded-full animate-[spin_10s_linear_infinite] ${!activeVideo && 'opacity-0'}`} />
                    </div>
                    
                    <h3 className="text-2xl font-black mb-3 text-white tracking-tight uppercase italic flicker">Neural Optics System</h3>
                    <p className="text-slate-500 text-sm mb-10 max-w-sm text-center font-medium leading-relaxed uppercase tracking-widest">
                      RHEA requires specialized biometric hardware access to process high-frequency visual telemetry.
                    </p>
                    
                    <button 
                      onClick={() => setActiveVideo(!activeVideo)}
                      className={`px-12 py-4 rounded-full font-black uppercase italic tracking-[0.2em] transition-all duration-500 transform hover:scale-105 ${
                        activeVideo 
                        ? 'bg-red-500/10 border border-red-500/50 text-red-500 shadow-[0_0_30px_rgba(239,68,68,0.2)]' 
                        : 'bg-emerald-500 text-slate-950 shadow-[0_10px_30px_rgba(16,185,129,0.4)]'
                      }`}
                    >
                      {activeVideo ? "TERMINATE LINK" : "ESTABLISH OPTIC LINK"}
                    </button>

                    {activeVideo && (
                      <div className="mt-12 w-full max-w-3xl aspect-video glass rounded-3xl overflow-hidden relative border-4 border-emerald-500/20 shadow-2xl animate-in zoom-in-95 duration-500">
                        <img src="https://picsum.photos/seed/vision/1200/800" className="w-full h-full object-cover grayscale brightness-[0.4] contrast-150 saturate-0" alt="Vision Input" />
                        <div className="absolute inset-0 pointer-events-none">
                           <div className="absolute top-10 left-10 w-24 h-24 border-t-4 border-l-4 border-emerald-500 drop-shadow-[0_0_10px_#10b981]" />
                           <div className="absolute top-10 right-10 w-24 h-24 border-t-4 border-r-4 border-emerald-500 drop-shadow-[0_0_10px_#10b981]" />
                           <div className="absolute bottom-10 left-10 w-24 h-24 border-b-4 border-l-4 border-emerald-500 drop-shadow-[0_0_10_#10b981]" />
                           <div className="absolute bottom-10 right-10 w-24 h-24 border-b-4 border-r-4 border-emerald-500 drop-shadow-[0_0_10_#10b981]" />
                           <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-emerald-500/30 animate-[scanlineMove_2s_infinite]" />
                        </div>
                        <div className="absolute top-6 left-6 flex items-center gap-3">
                           <div className="w-4 h-4 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_#ef4444]" />
                           <span className="text-[10px] font-mono font-black text-white tracking-widest uppercase bg-black/60 px-2 py-1 rounded">REC // DATA_STREAM_01</span>
                        </div>
                        <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                          <div className="font-mono text-[9px] text-emerald-400 bg-black/80 p-4 rounded-xl border border-emerald-500/20 backdrop-blur-md">
                            <span className="text-white font-black block mb-2 underline decoration-emerald-500">TELEM_STATS:</span>
                            OBJECTS_DETECTED: 12<br/>
                            SPATIAL_SYNC: 98.4%<br/>
                            OCR_BUFFER: SCANNING_PAGES...<br/>
                            THREAT_LEVEL: ZERO
                          </div>
                          <div className="text-right font-mono text-[8px] text-slate-400">
                             COORD_X: 42.093<br/>
                             COORD_Y: -71.439<br/>
                             ALT: 12.4m
                          </div>
                        </div>
                      </div>
                    )}
                 </div>
               </ModuleWrapper>
            )}

            {/* Other modules fallback */}
            {!([ModuleType.DASHBOARD, ModuleType.BUILDER, ModuleType.SECURITY, ModuleType.VISION].includes(activeModule)) && (
               <ModuleWrapper title={activeModule} subtitle="Module encryption enabled. Initializing data streams...">
                 <div className="h-full flex flex-col items-center justify-center text-slate-600 italic">
                    <div className="relative mb-8">
                       <Icons.Loader2 size={64} className="animate-spin text-emerald-500 opacity-20" />
                       <Icons.Shield size={32} className="absolute inset-0 m-auto text-emerald-500 flicker" />
                    </div>
                    <p className="text-sm font-black uppercase tracking-[0.5em] text-emerald-500/40">Initializing Protocols...</p>
                 </div>
               </ModuleWrapper>
            )}
          </div>
        </div>

        {/* Floating status footer */}
        <footer className="h-12 bg-slate-900/60 border-t border-white/5 px-10 flex items-center justify-between text-[9px] font-mono tracking-[0.3em] text-slate-500 uppercase glass relative z-20">
          <div className="flex gap-10">
            <span className="flex items-center gap-2 group cursor-pointer hover:text-emerald-400 transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" /> 
              CORE_SHELL: <span className="text-slate-300 font-bold uppercase">Ready</span>
            </span>
            <span className="flex items-center gap-2 group cursor-pointer hover:text-emerald-400 transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" /> 
              NEURAL_INF: <span className="text-slate-300 font-bold uppercase">Optimal</span>
            </span>
            <span className="flex items-center gap-2 group cursor-pointer hover:text-blue-400 transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" /> 
              MEM_SYNC: <span className="text-slate-300 font-bold uppercase">100%</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
             <div className="h-4 w-[1px] bg-white/10" />
             <div className="text-emerald-500/60 font-black">STABLE_DIFFUSION_OFLN: [ENABLED]</div>
             <div className="h-4 w-[1px] bg-white/10" />
             <div className="text-slate-400">T_COMP: 0.002ms</div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;
