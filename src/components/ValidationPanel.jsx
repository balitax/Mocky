import React, { useState } from 'react';
import { validateData, generateValidationReport, BUSINESS_RULES } from '../utils/validation';

const ValidationPanel = ({ data, dataType, onClose }) => {
    const [validationResult, setValidationResult] = useState(null);
    const [customRules, setCustomRules] = useState([]);
    const [isValidating, setIsValidating] = useState(false);

    const runValidation = () => {
        setIsValidating(true);
        
        // Simulate validation delay for better UX
        setTimeout(() => {
            const result = validateData(data, dataType);
            const report = generateValidationReport(result);
            
            // Check business rules
            const businessRuleResults = {};
            Object.keys(BUSINESS_RULES).forEach(ruleName => {
                try {
                    businessRuleResults[ruleName] = BUSINESS_RULES[ruleName](data);
                } catch (error) {
                    businessRuleResults[ruleName] = false;
                }
            });
            
            setValidationResult({
                ...result,
                report,
                businessRules: businessRuleResults
            });
            setIsValidating(false);
        }, 500);
    };

    const addCustomRule = () => {
        const newRule = {
            id: Date.now(),
            fieldName: 'email',
            condition: 'contains',
            value: '@',
            errorMessage: 'Email should contain @ symbol'
        };
        setCustomRules([...customRules, newRule]);
    };

    const updateCustomRule = (id, field, value) => {
        setCustomRules(customRules.map(rule => 
            rule.id === id ? { ...rule, [field]: value } : rule
        ));
    };

    const removeCustomRule = (id) => {
        setCustomRules(customRules.filter(rule => rule.id !== id));
    };

    if (!data || !dataType) {
        return (
            <div className="bg-white shadow-xl rounded-2xl p-6 mt-8">
                <div className="text-center text-gray-500">
                    <p>No data to validate. Generate some data first!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100 mt-8">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-900">Data Validation</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 focus:outline-none"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="p-6">
                {/* Validation Controls */}
                <div className="mb-6">
                    <div className="flex items-center gap-4 mb-4">
                        <button
                            onClick={runValidation}
                            disabled={isValidating}
                            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                        >
                            {isValidating ? 'Validating...' : 'Run Validation'}
                        </button>
                        <button
                            onClick={addCustomRule}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                        >
                            Add Custom Rule
                        </button>
                    </div>

                    {/* Custom Rules */}
                    {customRules.length > 0 && (
                        <div className="mb-4">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Custom Rules</h4>
                            {customRules.map(rule => (
                                <div key={rule.id} className="flex items-center gap-2 mb-2 p-2 bg-gray-50 rounded">
                                    <input
                                        type="text"
                                        value={rule.fieldName}
                                        onChange={(e) => updateCustomRule(rule.id, 'fieldName', e.target.value)}
                                        className="text-sm border rounded px-2 py-1"
                                        placeholder="Field name"
                                    />
                                    <select
                                        value={rule.condition}
                                        onChange={(e) => updateCustomRule(rule.id, 'condition', e.target.value)}
                                        className="text-sm border rounded px-2 py-1"
                                    >
                                        <option value="contains">contains</option>
                                        <option value="equals">equals</option>
                                        <option value="greater">greater than</option>
                                        <option value="less">less than</option>
                                    </select>
                                    <input
                                        type="text"
                                        value={rule.value}
                                        onChange={(e) => updateCustomRule(rule.id, 'value', e.target.value)}
                                        className="text-sm border rounded px-2 py-1"
                                        placeholder="Value"
                                    />
                                    <button
                                        onClick={() => removeCustomRule(rule.id)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Validation Results */}
                {validationResult && (
                    <div className="space-y-4">
                        {/* Summary */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <div className="text-2xl font-bold text-blue-600">{validationResult.report.summary.totalItems}</div>
                                <div className="text-sm text-blue-800">Total Items</div>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg">
                                <div className="text-2xl font-bold text-green-600">{validationResult.report.summary.validItems}</div>
                                <div className="text-sm text-green-800">Valid Items</div>
                            </div>
                            <div className="bg-red-50 p-4 rounded-lg">
                                <div className="text-2xl font-bold text-red-600">{validationResult.report.summary.invalidItems}</div>
                                <div className="text-sm text-red-800">Invalid Items</div>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="text-2xl font-bold text-gray-600">{validationResult.report.summary.successRate}%</div>
                                <div className="text-sm text-gray-800">Success Rate</div>
                            </div>
                        </div>

                        {/* Overall Status */}
                        <div className={`p-4 rounded-lg ${validationResult.isValid ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} border`}>
                            <div className="flex items-center">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${validationResult.isValid ? 'bg-green-500' : 'bg-red-500'}`}>
                                    {validationResult.isValid ? (
                                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : (
                                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    )}
                                </div>
                                <div className="ml-3">
                                    <h4 className={`font-medium ${validationResult.isValid ? 'text-green-800' : 'text-red-800'}`}>
                                        {validationResult.isValid ? 'All Data Valid' : 'Validation Issues Found'}
                                    </h4>
                                    <p className={`text-sm ${validationResult.isValid ? 'text-green-600' : 'text-red-600'}`}>
                                        {validationResult.isValid 
                                            ? 'Your data meets all validation criteria'
                                            : `Found ${validationResult.report.summary.invalidItems} items with validation issues`
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Business Rules */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-medium text-gray-900 mb-3">Business Rules</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                {Object.entries(validationResult.businessRules).map(([ruleName, passed]) => (
                                    <div key={ruleName} className="flex items-center">
                                        <div className={`w-4 h-4 rounded-full mr-2 ${passed ? 'bg-green-500' : 'bg-red-500'}`}>
                                            {passed ? (
                                                <svg className="w-3 h-3 text-white m-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </svg>
                                            ) : (
                                                <svg className="w-3 h-3 text-white m-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            )}
                                        </div>
                                        <span className="text-sm text-gray-700 capitalize">
                                            {ruleName.replace(/([A-Z])/g, ' $1').trim()}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Validation Errors */}
                        {!validationResult.isValid && validationResult.report.errors.length > 0 && (
                            <div className="bg-red-50 p-4 rounded-lg">
                                <h4 className="font-medium text-red-800 mb-2">Validation Errors</h4>
                                <div className="max-h-48 overflow-y-auto">
                                    {validationResult.report.errors.map((error, index) => (
                                        <div key={index} className="text-sm text-red-700 mb-1">
                                            • {error}
                                        </div>
                                    ))}
                                    {validationResult.report.hasMoreErrors && (
                                        <div className="text-sm text-red-600 mt-2 font-medium">
                                            ... and {validationResult.errors.length - 10} more errors
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Export Validation Report */}
                        <div className="flex gap-2">
                            <button
                                onClick={() => {
                                    const reportData = {
                                        timestamp: new Date().toISOString(),
                                        dataType,
                                        validation: validationResult.report,
                                        businessRules: validationResult.businessRules,
                                        sampleErrors: validationResult.errors.slice(0, 5)
                                    };
                                    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
                                    const url = URL.createObjectURL(blob);
                                    const a = document.createElement('a');
                                    a.href = url;
                                    a.download = `validation-report-${dataType}-${Date.now()}.json`;
                                    document.body.appendChild(a);
                                    a.click();
                                    document.body.removeChild(a);
                                    URL.revokeObjectURL(url);
                                }}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                            >
                                Export Report
                            </button>
                        </div>
                    </div>
                )}

                {/* No Results State */}
                {!validationResult && !isValidating && (
                    <div className="text-center text-gray-500 py-8">
                        <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p>Click "Run Validation" to check your data quality</p>
                        <p className="text-sm mt-2">Validation will check data types, formats, ranges, and business rules</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ValidationPanel;