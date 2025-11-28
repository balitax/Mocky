import React, { useState } from 'react';

const ApiPreview = ({ type, data, setToast }) => {
    const [copied, setCopied] = useState(false);

    // Use custom endpoint if available (for custom datasets), otherwise use type
    const endpointName = data && data._endpoint ? data._endpoint : type;
    const endpoint = `/api/${endpointName}`;
    const fullUrl = `${window.location.origin}${endpoint}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(fullUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);

        if (setToast) {
            setToast({
                message: 'API endpoint copied to clipboard!',
                type: 'success'
            });
        }
    };

    return (
        <div className="mt-8 glass-effect rounded-2xl p-6 flex items-center justify-between shadow-xl animate-fade-in-up">
            <div className="flex items-center space-x-3 overflow-hidden flex-1">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 uppercase tracking-wide">
                    GET
                </span>
                <code className="text-sm text-slate-800 font-mono truncate bg-white/60 px-3 py-1 rounded-lg flex-1">
                    {fullUrl}
                </code>
                <button
                    onClick={handleCopy}
                    className="inline-flex items-center px-3 py-1.5 border border-slate-200 shadow-sm text-xs font-medium rounded-lg text-slate-700 bg-white/80 hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 ml-2"
                >
                    {copied ? 'Copied!' : 'Copy'}
                </button>
            </div>
            <span className="text-xs text-slate-500 hidden sm:block ml-4">Mock Endpoint Preview</span>
        </div>
    );
};

export default ApiPreview;
