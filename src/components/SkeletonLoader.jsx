import React from 'react';

export function JobSkeleton() {
  return (
    <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-800"></div>
          <div className="space-y-2">
            <div className="w-24 h-3 bg-slate-800 rounded"></div>
            <div className="w-16 h-2 bg-slate-800/60 rounded"></div>
          </div>
        </div>
        <div className="w-20 h-6 bg-slate-800 rounded-full"></div>
      </div>
      <div className="space-y-2">
        <div className="w-3/4 h-5 bg-slate-800 rounded"></div>
        <div className="w-full h-3 bg-slate-800/60 rounded"></div>
        <div className="w-5/6 h-3 bg-slate-800/60 rounded"></div>
      </div>
      <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
        <div className="flex gap-3">
          <div className="w-16 h-6 bg-slate-800 rounded-lg"></div>
          <div className="w-24 h-6 bg-slate-800/60 rounded-lg"></div>
        </div>
        <div className="w-20 h-8 bg-slate-800 rounded-xl"></div>
      </div>
    </div>
  );
}

export function ProposalSkeleton() {
  return (
    <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-slate-800"></div>
          <div className="space-y-2">
            <div className="w-28 h-4 bg-slate-800 rounded"></div>
            <div className="w-36 h-3 bg-slate-800/60 rounded"></div>
          </div>
        </div>
        <div className="w-16 h-5 bg-slate-800 rounded"></div>
      </div>
      <div className="w-full h-12 bg-slate-800/40 rounded-xl"></div>
      <div className="flex justify-between items-center pt-2">
        <div className="w-20 h-5 bg-slate-800 rounded-full"></div>
        <div className="flex gap-2">
          <div className="w-16 h-7 bg-slate-800 rounded-lg"></div>
          <div className="w-24 h-7 bg-slate-800 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}

export function StatSkeleton() {
  return (
    <div className="glass-card rounded-2xl p-5 border border-slate-800 flex items-center gap-4 animate-pulse">
      <div className="w-12 h-12 rounded-xl bg-slate-800"></div>
      <div className="space-y-2 flex-1">
        <div className="w-20 h-3 bg-slate-800 rounded"></div>
        <div className="w-12 h-6 bg-slate-800 rounded"></div>
      </div>
    </div>
  );
}
