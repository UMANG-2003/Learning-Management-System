import React from 'react';

function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="relative w-24 h-24">
        {/* Spinning circular border */}
        <div className="absolute inset-0 border-4 border-dashed border-cyan-400 rounded-full animate-spin"></div>
        
        {/* Pulsing center glow */}
        <div className="absolute top-1/2 left-1/2 w-10 h-10 bg-cyan-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-ping opacity-75"></div>
        
        {/* Core static circle */}
        <div className="absolute top-1/2 left-1/2 w-6 h-6 bg-cyan-300 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-lg"></div>
      </div>

      {/* Optional loading text */}
      <div className="ml-6 text-cyan-300 text-xl font-mono animate-pulse">Loading...</div>
    </div>
  );
}

export default Loading;
