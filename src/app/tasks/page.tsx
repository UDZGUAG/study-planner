"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';

type Task = {
  id: number;
  title: string;
  dueDate: string;
  subject: string;
  priority: string;
  completed: boolean;
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch('/api/tasks');
        const data = await response.json();
        setTasks(data.tasks || []);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchTasks();
  }, []);

  const getPriorityColor = (priority: string) => {
    switch(priority.toLowerCase()) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-orange-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-blue-500';
    }
  };

  const toggleTaskCompletion = async (id: number, currentStatus: boolean) => {
    const newStatus = !currentStatus;
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: newStatus } : t));
    
    try {
      const response = await fetch('/api/tasks', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, completed: newStatus }),
      });
      if (!response.ok) throw new Error('Failed to update status');
    } catch (error) {
      console.error('Failed to update task status:', error);
      // Revert from server if failed
      const response = await fetch('/api/tasks');
      const data = await response.json();
      setTasks(data.tasks || []);
    }
  };

  const todoCount = tasks.filter(t => !t.completed).length;
  const completedCount = tasks.filter(t => t.completed).length;
  const overdueCount = tasks.filter(t => {
    if (t.completed) return false;
    const due = new Date(t.dueDate);
    const today = new Date();
    today.setHours(0,0,0,0);
    due.setHours(0,0,0,0);
    return due < today;
  }).length;

  return (
    <div className="min-h-screen bg-slate-950 p-6 sm:p-10 text-slate-200 selection:bg-indigo-500/30 font-sans relative overflow-hidden flex flex-col items-center">
      {/* Background gradients */}
      <div className="absolute top-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[10%] left-[20%] w-[40%] h-[40%] rounded-full bg-gradient-to-br from-indigo-600/10 to-transparent blur-[120px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] rounded-full bg-gradient-to-tl from-purple-600/10 to-transparent blur-[100px]" />
      </div>

      <div className="w-full max-w-6xl space-y-10 relative z-10">
        
        {/* Header container */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-800/80">
          <div>
            <div className="flex items-center space-x-3 text-sm font-medium text-slate-500 mb-3">
              <Link href="/" className="hover:text-indigo-400 transition-colors flex items-center space-x-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                <span>Home</span>
              </Link>
              <span>/</span>
              <span className="text-slate-300">Tasks</span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2 drop-shadow-sm">My Task Board</h1>
            <p className="text-slate-400 font-light text-lg">Manage your assignments and deadlines.</p>
          </div>
          
          <Link href="/tasks/new" className="flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3.5 rounded-xl font-semibold transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] hover:-translate-y-0.5 group">
            <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path>
            </svg>
            <span>Add Task</span>
          </Link>
        </header>

        {/* Filters/Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between backdrop-blur-md hover:bg-slate-800/50 transition-colors cursor-default">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-slate-400 font-medium uppercase tracking-wider">Overdue</p>
              <div className="h-10 w-10 rounded-full bg-red-400/10 flex items-center justify-center text-red-400 shadow-inner">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
            </div>
            <p className="text-3xl font-bold text-red-400">{loading ? '-' : overdueCount}</p>
          </div>
          
          <div className="bg-slate-900/60 border border-indigo-500/30 rounded-2xl p-6 flex flex-col justify-between backdrop-blur-md hover:bg-slate-800/80 transition-colors shadow-[0_0_15px_rgba(79,70,229,0.1)] cursor-default">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-indigo-400 font-medium uppercase tracking-wider">To Do</p>
              <div className="h-10 w-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 shadow-inner">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
              </div>
            </div>
            <p className="text-3xl font-bold text-white">{loading ? '-' : todoCount}</p>
          </div>
          
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between backdrop-blur-md hover:bg-slate-800/50 transition-colors cursor-default">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-slate-400 font-medium uppercase tracking-wider">Completed</p>
              <div className="h-10 w-10 rounded-full bg-green-400/10 flex items-center justify-center text-green-400 shadow-inner">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              </div>
            </div>
            <p className="text-3xl font-bold text-green-400">{loading ? '-' : completedCount}</p>
          </div>
        </div>

        {/* Loading / Task Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <svg className="w-10 h-10 animate-spin text-indigo-500" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-slate-400 font-medium animate-pulse">Loading your tasks...</p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-24 bg-slate-900/30 rounded-3xl border border-slate-800/40 border-dashed">
            <svg className="w-16 h-16 mx-auto text-slate-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
            <p className="text-xl text-slate-400 font-medium">No tasks found</p>
            <p className="text-slate-500 mt-2 text-sm">You're all caught up! Add a new task to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => {
              const color = getPriorityColor(task.priority);
              const statusText = task.completed ? 'Done' : 'To Do';
              
              return (
                <div 
                  key={task.id} 
                  className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 hover:border-slate-700/80 hover:bg-slate-800/40 transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-md flex flex-col h-full group relative overflow-hidden"
                >
                  <div className={`absolute top-0 left-0 w-full h-1 opacity-60 ${color}`}></div>
                  
                  <div className="flex justify-between items-start mb-4">
                    <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md border ${
                      task.completed ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
                      'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                    }`}>
                      {statusText}
                    </span>

                    <button className="text-slate-500 hover:text-slate-300 transition-colors p-1">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path></svg>
                    </button>
                  </div>

                  <div className="flex-grow">
                    <h3 className={`text-xl font-bold mb-2 transition-colors leading-snug ${
                      task.completed ? 'text-slate-500 line-through' : 'text-slate-100 group-hover:text-indigo-300'
                    }`}>{task.title}</h3>
                    
                    <div className="flex items-center space-x-2 text-sm text-slate-400 mb-6 font-medium">
                      <span className={`w-2 h-2 rounded-full ${color} shadow-sm`}></span>
                      <span className="text-slate-300">{task.subject}</span>
                    </div>
                  </div>

                  <div className="pt-5 border-t border-slate-800/60 flex items-center justify-between text-sm mt-auto">
                    <div className="flex items-center space-x-1.5 text-slate-400">
                      <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      <span>{task.dueDate}</span>
                    </div>
                    
                    <button 
                      onClick={() => toggleTaskCompletion(task.id, task.completed)}
                      className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors z-10 relative cursor-pointer ${
                      task.completed ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30' : 'bg-slate-800 text-slate-500 hover:bg-indigo-500 hover:text-white'
                    }`}>
                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
