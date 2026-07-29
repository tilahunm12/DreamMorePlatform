import React from 'react';
import { Briefcase, LayoutDashboard, UserCheck, ChevronDown } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, currentRole, setCurrentRole }) {
  return (
    <header className="sticky top-0 z-40 glass-panel border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Branding */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('marketplace')}>
            <div className="w-11 h-11 rounded-xl bg-white p-1 shadow-lg shadow-orange-500/10 border border-slate-700/80 flex items-center justify-center">
              <img
                src="https://www.dreammoredigitals.com/dreammorelogo.jpg"
                alt="DreamMore Platform"
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-white">
                  Dream<span className="text-orange-500">More</span>
                </span>
                <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
                  AppWorks
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">Freelance Work & Skill Marketplace</p>
            </div>
          </div>

          {/* Clean Main Navigation Links */}
          <nav className="flex items-center gap-1 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('marketplace')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                activeTab === 'marketplace'
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Job Marketplace</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('employer');
                setCurrentRole('employer');
              }}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                activeTab === 'employer'
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Employer Hub</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('freelancer');
                setCurrentRole('freelancer');
              }}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                activeTab === 'freelancer'
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Freelancer Hub</span>
            </button>
          </nav>

          {/* User Profile & Role Selector */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
              <select
                value={currentRole}
                onChange={(e) => {
                  const newRole = e.target.value;
                  setCurrentRole(newRole);
                  if (newRole === 'employer') setActiveTab('employer');
                  else if (newRole === 'freelancer') setActiveTab('freelancer');
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700/80 text-xs font-semibold text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
              >
                <option value="freelancer">🎓 Freelancer Mode</option>
                <option value="employer">🏢 Employer Mode</option>
              </select>

              {/* Profile Avatar */}
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-0.5 cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="User avatar"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
