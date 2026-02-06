
import React, { useState, useCallback } from 'react';
import { generateJavaProject } from './services/gemini';
import { ProjectData } from './types';
import CodeViewer from './components/CodeViewer';
import VivaAssistant from './components/VivaAssistant';

const DEFAULT_PROMPT = "Create a menu-driven Library Book Management System with Add, Display, Search, Issue, and Return functionality using ArrayList and robust Exception Handling.";

const App: React.FC = () => {
  const [prompt, setPrompt] = useState(DEFAULT_PROMPT);
  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await generateJavaProject(prompt);
      setProject(result);
    } catch (err: any) {
      setError(err.message || 'Failed to generate project. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 13V5h-2v8H5v2h8v8h2v-8h8v-2h-8z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">Java Library Pro</h1>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Academic Project Generator</p>
            </div>
          </div>
          <div className="hidden md:flex gap-6">
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Documentation</a>
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Sample Viva Q&A</a>
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">GitHub Export</a>
          </div>
        </div>
      </nav>

      {/* Hero / Input Section */}
      {!project && !loading && (
        <main className="flex-1 flex flex-col items-center justify-center p-6 max-w-4xl mx-auto text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="space-y-4">
            <h2 className="text-4xl font-extrabold text-slate-900 leading-tight">
              Build your college project in <span className="text-blue-600">seconds.</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our AI writes production-ready, structured Java code with full documentation and prepares you for your Viva exam automatically.
            </p>
          </div>

          <div className="w-full bg-white p-8 rounded-3xl shadow-xl border border-slate-100 space-y-6">
            <div className="space-y-2 text-left">
              <label className="text-sm font-bold text-slate-700 ml-1">Custom Requirements</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your specific requirements here..."
                className="w-full min-h-[120px] p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-700 leading-relaxed"
              />
            </div>
            <button
              onClick={handleGenerate}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-200 transition-all transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
            >
              Generate Project Structure
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </button>
            <div className="flex justify-center gap-6 text-slate-400">
              <div className="flex items-center gap-2 text-xs">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                ArrayList/HashMap Support
              </div>
              <div className="flex items-center gap-2 text-xs">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                OOP Focused
              </div>
              <div className="flex items-center gap-2 text-xs">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                File Handling Ready
              </div>
            </div>
          </div>
        </main>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-6">
          <div className="w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-center animate-pulse">
            <h3 className="text-2xl font-bold text-slate-800">Architecting Java Solution...</h3>
            <p className="text-slate-500 mt-2">Implementing OOP concepts and error handlers.</p>
          </div>
        </div>
      )}

      {/* Main Workspace */}
      {project && !loading && (
        <main className="flex-1 p-6 max-w-7xl mx-auto w-full animate-in fade-in slide-in-from-bottom-2 duration-500">
          <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-widest">Generated Project</span>
                <span className="text-slate-400 text-xs">ID: {Math.random().toString(36).substring(7).toUpperCase()}</span>
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900">{project.projectName}</h2>
              <p className="text-slate-500 mt-1 max-w-2xl">{project.summary}</p>
            </div>
            <button 
              onClick={() => setProject(null)}
              className="text-sm font-bold text-slate-500 hover:text-red-600 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Generate New Project
            </button>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CodeViewer files={project.files} />
            </div>
            <div className="lg:col-span-1">
              <VivaAssistant project={project} />
            </div>
          </div>
        </main>
      )}

      {error && (
        <div className="fixed bottom-6 right-6 bg-red-600 text-white px-6 py-3 rounded-xl shadow-2xl animate-bounce">
          {error}
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 px-6 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium uppercase tracking-widest">
          <p>© 2024 Java Library Pro - Academic Edition</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact Developer</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
