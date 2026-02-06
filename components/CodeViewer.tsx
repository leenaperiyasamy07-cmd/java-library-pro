
import React, { useState } from 'react';
import { JavaFile } from '../types';

interface CodeViewerProps {
  files: JavaFile[];
}

const CodeViewer: React.FC<CodeViewerProps> = ({ files }) => {
  const [activeTab, setActiveTab] = useState(0);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Code copied to clipboard!');
  };

  return (
    <div className="bg-slate-900 rounded-xl overflow-hidden shadow-2xl flex flex-col h-[700px]">
      {/* Tab Bar */}
      <div className="flex bg-slate-800 p-2 gap-1 overflow-x-auto border-b border-slate-700">
        {files.map((file, idx) => (
          <button
            key={file.name}
            onClick={() => setActiveTab(idx)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
              activeTab === idx 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'text-slate-400 hover:text-white hover:bg-slate-700'
            }`}
          >
            {file.name}
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div className="bg-slate-800/50 px-4 py-2 flex justify-between items-center border-b border-slate-700">
        <span className="text-xs text-slate-500 font-mono">Source Editor</span>
        <button 
          onClick={() => copyToClipboard(files[activeTab].content)}
          className="text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
          </svg>
          Copy Code
        </button>
      </div>

      {/* Editor Content */}
      <div className="flex-1 overflow-auto p-4 code-font">
        <pre className="text-sm leading-relaxed">
          {files[activeTab].content.split('\n').map((line, i) => (
            <div key={i} className="flex group">
              <span className="w-10 text-slate-600 text-right pr-4 select-none group-hover:text-slate-400 transition-colors">
                {i + 1}
              </span>
              <span className="text-slate-300">{line}</span>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
};

export default CodeViewer;
