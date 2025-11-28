import React, { useRef } from 'react';

const ControlPanel = ({ config, setConfig, onGenerate, isGenerating }) => {
    const textareaRef = useRef(null);
    const lineNumbersRef = useRef(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setConfig(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleScroll = () => {
        if (lineNumbersRef.current && textareaRef.current) {
            lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
        }
    };

    const lineCount = config.customTemplate ? config.customTemplate.split('\n').length : 1;
    const lines = Array.from({ length: Math.max(5, lineCount) }, (_, i) => i + 1);

    return (
        <div className="bg-white shadow-xl rounded-2xl p-6 md:p-8 transition-all duration-300 hover:shadow-2xl border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">

                {/* Dataset Type Selector */}
                <div className="col-span-1">
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">Dataset Type</label>
                    <select
                        id="type"
                        name="type"
                        value={config.type}
                        onChange={handleChange}
                        className="block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                        <option value="users">User Profiles</option>
                        <option value="products">Product Catalog</option>
                        <option value="posts">Blog Posts</option>
                        <option value="comments">Comments</option>
                        <option value="schedules">Classroom Schedules</option>
                        <option value="companies">Companies</option>
                        <option value="addresses">Addresses</option>
                        <option value="transactions">Transactions</option>
                        <option value="events">Events</option>
                        <option value="custom">Custom Dataset</option>
                    </select>
                </div>

                {/* Count Input */}
                {config.type !== 'custom' && (
                    <div className="col-span-1">
                        <label htmlFor="count" className="block text-sm font-medium text-gray-700 mb-2">
                            Count <span className="text-gray-400 text-xs">(1-500)</span>
                        </label>
                        <input
                            type="number"
                            name="count"
                            id="count"
                            min="1"
                            max="500"
                            value={config.count}
                            onChange={handleChange}
                            className="block w-full pl-4 pr-4 py-3 border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-50"
                        />
                    </div>
                )}

                {/* Generate Button */}
                <div className="col-span-1 flex flex-col justify-end h-full">
                    <button
                        onClick={onGenerate}
                        disabled={isGenerating}
                        className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform active:scale-95 ${isGenerating ? 'opacity-75 cursor-not-allowed' : ''}`}
                    >
                        {isGenerating ? (
                            <span className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Generating...
                            </span>
                        ) : 'Generate JSON'}
                    </button>
                </div>
            </div>

            {/* Custom JSON Input */}
            {config.type === 'custom' && (
                <div className="mt-6">
                    <div className="flex justify-between items-center mb-2">
                        <label htmlFor="customTemplate" className="block text-sm font-medium text-gray-700">
                            Custom JSON Template <span className="text-gray-400 text-xs">(Single Object)</span>
                        </label>
                        <button
                            type="button"
                            onClick={() => {
                                try {
                                    const parsed = JSON.parse(config.customTemplate);
                                    setConfig(prev => ({
                                        ...prev,
                                        customTemplate: JSON.stringify(parsed, null, 2)
                                    }));
                                } catch (e) {
                                    // Ignore invalid JSON
                                }
                            }}
                            className="text-xs bg-indigo-50 text-indigo-600 hover:bg-indigo-100 px-2 py-1 rounded transition-colors font-medium"
                        >
                            Beautify JSON
                        </button>
                    </div>
                    <div className="flex border border-gray-300 rounded-lg overflow-hidden bg-gray-900 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500">
                        <div
                            ref={lineNumbersRef}
                            className="bg-gray-800 text-gray-500 text-right pr-3 pl-2 py-4 select-none font-mono text-sm leading-6 overflow-hidden w-12 border-r border-gray-700"
                            style={{ height: '300px' }}
                        >
                            {lines.map(l => <div key={l}>{l}</div>)}
                        </div>
                        <textarea
                            ref={textareaRef}
                            onScroll={handleScroll}
                            id="customTemplate"
                            name="customTemplate"
                            value={config.customTemplate}
                            onChange={handleChange}
                            placeholder='{"name": "Example", "value": 123}'
                            className="block w-full p-4 border-none focus:ring-0 sm:text-sm bg-gray-900 text-green-400 font-mono leading-6 resize-y outline-none"
                            style={{ height: '300px', minHeight: '300px' }}
                            spellCheck="false"
                        />
                    </div>
                </div>
            )}

            {/* Relational Toggle */}
            <div className="mt-6 flex items-center">
                <div className="flex items-center h-5">
                    <input
                        id="relational"
                        name="relational"
                        type="checkbox"
                        checked={config.relational}
                        onChange={handleChange}
                        className="focus:ring-indigo-500 h-5 w-5 text-indigo-600 border-gray-300 rounded cursor-pointer"
                    />
                </div>
                <div className="ml-3 text-sm">
                    <label htmlFor="relational" className="font-medium text-gray-700 cursor-pointer select-none">Enable Relational Mode</label>
                    <p className="text-gray-500 text-xs">Includes foreign keys and realistic links between data.</p>
                </div>
            </div>
        </div>
    );
};

export default ControlPanel;
