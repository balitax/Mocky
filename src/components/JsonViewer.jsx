import React, { useState } from 'react';
import { 
    jsonToCSV, 
    jsonToXML, 
    jsonToTypeScript, 
    jsonToSQL, 
    jsonToTSV, 
    jsonToMySQLDump,
    jsonToSQLInsert,
    jsonToSQLCreateTable
} from '../utils/exporters';

const JsonViewer = ({ data, onReset, setToast }) => {
    const actualData = data && data.data ? data.data : data;
    const [copied, setCopied] = useState(false);
    const [exportFormat, setExportFormat] = useState('json');
    const [sqlDialect, setSqlDialect] = useState('mysql');
    const [tableName, setTableName] = useState('generated_data');

    const getExportData = () => {
        const formatForDialect = (dialect) => {
            switch (exportFormat) {
                case 'csv':
                    return jsonToCSV(actualData);
                case 'tsv':
                    return jsonToTSV(actualData);
                case 'xml':
                    return jsonToXML(actualData);
                case 'typescript':
                    return jsonToTypeScript(actualData);
                case 'sql':
                    return jsonToSQL(actualData, tableName, dialect);
                case 'sql-insert':
                    return jsonToSQLInsert(actualData, tableName);
                case 'sql-createtable':
                    return jsonToSQLCreateTable(actualData, tableName, dialect);
                case 'mysql-dump':
                    return jsonToMySQLDump(actualData, tableName);
                case 'json':
                default:
                    return JSON.stringify(actualData, null, 2);
            }
        };

        if (exportFormat.startsWith('sql')) {
            return formatForDialect(sqlDialect);
        }
        return formatForDialect('mysql'); // default for non-SQL formats
    };


    const getDownloadLabel = () => {
        const fileName = getDownloadFileName();
        switch (exportFormat) {
            case 'csv': return `Download ${fileName}`;
            case 'tsv': return `Download ${fileName}`;
            case 'xml': return `Download ${fileName}`;
            case 'typescript': return `Download ${fileName}`;
            case 'sql': return `Download ${fileName}`;
            case 'sql-insert': return `Download ${fileName}`;
            case 'sql-createtable': return `Download ${fileName}`;
            case 'mysql-dump': return `Download ${fileName}`;
            case 'json':
            default: return `Download ${fileName}`;
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(getExportData());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        setToast({ 
            message: `${exportFormat.toUpperCase()} data copied to clipboard!`, 
            type: 'success' 
        });
    };

    const getDownloadFileName = () => {
        const baseName = 'mock-data';

        switch (exportFormat) {
            case 'json':
                return `${baseName}.json`;
            case 'csv':
                return `${baseName}.csv`;
            case 'tsv':
                return `${baseName}.tsv`;
            case 'xml':
                return `${baseName}.xml`;
            case 'typescript':
                return `${baseName}.ts`;
            case 'sql':
                return `${baseName}-${sqlDialect}.sql`;
            case 'sql-insert':
                return `${baseName}-insert-${sqlDialect}.sql`;
            case 'sql-createtable':
                return `${baseName}-create-${sqlDialect}.sql`;
            case 'mysql-dump':
                return `${baseName}-dump.sql`;
            default:
                return `${baseName}.txt`;
        }
    };

    const handleDownload = () => {
        const exportData = getExportData();
        const mimeType = exportFormat === 'json' ? 'application/json' : 'text/plain';
        const blob = new Blob([exportData], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = getDownloadFileName();
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        setToast({ 
            message: `${getDownloadFileName()} downloaded successfully!`, 
            type: 'success' 
        });
    };

    const handleResetWithNotification = () => {
        onReset();
        setToast({ 
            message: 'Generated data cleared successfully!', 
            type: 'success' 
        });
    };

    const isSQLFormat = exportFormat.startsWith('sql');

    if (!data) return null;

    const previewData = JSON.stringify(actualData, null, 2);

    return (
        <div className="modern-card overflow-hidden mt-8 animate-fade-in-up">
            <div className="bg-gradient-to-r from-slate-50 to-blue-50 px-8 py-6 border-b border-slate-200/50">
                <div className="flex justify-between items-center flex-wrap gap-4 mb-4">
                    <h3 className="text-xl font-bold gradient-text">Generated Data</h3>
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
                            {getDownloadLabel()}
                        </button>
                        <button
                            onClick={handleResetWithNotification}
                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                        >
                            Reset
                        </button>
                    </div>
                </div>
                
                {/* Export Format Selection */}
                <div className="flex items-center gap-4 flex-wrap">
                    <div>
                        <label htmlFor="exportFormat" className="block text-sm font-medium text-gray-700 mb-1">
                            Export Format
                        </label>
                        <select
                            id="exportFormat"
                            value={exportFormat}
                            onChange={(e) => {
                                setExportFormat(e.target.value);
                                setToast({ 
                                    message: `Export format changed to ${e.target.value.toUpperCase()}`, 
                                    type: 'success' 
                                });
                            }}
                            className="dropdown-modern text-sm"
                        >
                            <option value="json">JSON</option>
                            <option value="csv">CSV</option>
                            <option value="tsv">TSV</option>
                            <option value="xml">XML</option>
                            <option value="typescript">TypeScript</option>
                            <option value="sql">SQL (Full)</option>
                            <option value="sql-insert">SQL (INSERT only)</option>
                            <option value="sql-createtable">SQL (CREATE only)</option>
                            <option value="mysql-dump">MySQL Dump</option>
                        </select>
                    </div>

                    {/* SQL-specific options */}
                    {isSQLFormat && (
                        <>
                            <div>
                                <label htmlFor="sqlDialect" className="block text-sm font-medium text-gray-700 mb-1">
                                    SQL Dialect
                                </label>
                                <select
                                    id="sqlDialect"
                                    value={sqlDialect}
                                    onChange={(e) => setSqlDialect(e.target.value)}
                                    className="dropdown-modern text-sm"
                                >
                                    <option value="mysql">MySQL</option>
                                    <option value="postgresql">PostgreSQL</option>
                                    <option value="sqlite">SQLite</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="tableName" className="block text-sm font-medium text-gray-700 mb-1">
                                    Table Name
                                </label>
                                <input
                                    type="text"
                                    id="tableName"
                                    value={tableName}
                                    onChange={(e) => setTableName(e.target.value)}
                                    className="text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="generated_data"
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Data Preview */}
            <div className="p-0 overflow-auto max-h-[600px] bg-gray-900 flex text-sm font-mono leading-relaxed">
                <div className="py-6 pl-4 pr-2 text-right text-gray-500 select-none border-r border-gray-800 bg-gray-900 sticky left-0 min-w-[3rem]">
                    {previewData.split('\n').map((_, i) => (
                        <div key={i}>{i + 1}</div>
                    ))}
                </div>
                <pre className="py-6 pl-4 pr-6 text-green-400 flex-1">
                    {previewData}
                </pre>
            </div>
        </div>
    );
};

export default JsonViewer;
