
import React from 'react';

interface ModuleWrapperProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export const ModuleWrapper: React.FC<ModuleWrapperProps> = ({ title, subtitle, children }) => {
  return (
    <div className="flex flex-col h-full animate-in fade-in zoom-in-95 duration-700 relative">
      <div className="mb-6 relative z-10">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-1 h-8 bg-emerald-500 shadow-[0_0_15px_#10b981]" />
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
            {title}
          </h2>
        </div>
        {subtitle && (
          <p className="text-emerald-500/80 text-[10px] font-mono tracking-[0.2em] pl-4 uppercase font-bold">
            // {subtitle}
          </p>
        )}
      </div>
      <div className="flex-1 glass border border-white/10 rounded-2xl p-8 overflow-hidden relative group">
        <div className="absolute top-0 right-0 p-4 pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity">
          <div className="text-[10px] font-mono text-right text-emerald-500">
            SECURE_MODULE_ID: {Math.random().toString(16).substring(2, 8).toUpperCase()}<br/>
            STATUS: NOMINAL<br/>
            ENCRYPTION: AES-256
          </div>
        </div>
        <div className="h-full overflow-y-auto pr-2 custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};
