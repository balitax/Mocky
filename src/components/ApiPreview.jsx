import React from 'react';

const ApiPreview = ({ type, data }) => {
    // Use custom endpoint if available (for custom datasets), otherwise use type
    const endpointName = data && data._endpoint ? data._endpoint : type;
    const endpoint = `/api/${endpointName}`;

    return (
        <div className="mt-8 bg-gray-800 rounded-lg p-4 flex items-center justify-between shadow-lg border border-gray-700">
            <div className="flex items-center space-x-3 overflow-hidden">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 uppercase tracking-wide">
                    GET
                </span>
                <code className="text-sm text-gray-300 font-mono truncate">
                    {window.location.origin}{endpoint}
                </code>
            </div>
            <span className="text-xs text-gray-500 hidden sm:block">Mock Endpoint Preview</span>
        </div>
    );
};

export default ApiPreview;
