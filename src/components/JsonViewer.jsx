import React, { useState } from 'react';

const JsonViewer = ({ data, onReset }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(JSON.stringify(data, null, 2));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'mock-data.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    if (!data) return null;

    return (
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100 mt-8 transition-all duration-300">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center flex-wrap gap-4">
                <h3 className="text-lg font-medium text-gray-900">Generated JSON</h3>
                <div className="flex space-x-3">
                    <button
                        onClick={handleCopy}
                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                    >
                        {copied ? 'Copied!' : 'Copy to Clipboard'}
                    </button>
                    <button
                        onClick={handleDownload}
                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                    >
                        Download JSON
                    </button>
                    <button
                        onClick={onReset}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                    >
                        Reset
                    </button>
                </div>
            </div>
            <div className="p-0 overflow-auto max-h-[600px] bg-gray-900 flex text-sm font-mono leading-relaxed">
                <div className="py-6 pl-4 pr-2 text-right text-gray-500 select-none border-r border-gray-800 bg-gray-900 sticky left-0 min-w-[3rem]">
                    {JSON.stringify(data, null, 2).split('\n').map((_, i) => (
                        <div key={i}>{i + 1}</div>
                    ))}
                </div>
                <pre className="py-6 pl-4 pr-6 text-green-400 flex-1">
                    {JSON.stringify(data, null, 2)}
                </pre>
            </div>
        </div>
    );
};

export default JsonViewer;
