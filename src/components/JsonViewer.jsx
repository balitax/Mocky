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

const JsonViewer = ({ data, onReset }) => {
    const [copied, setCopied] = useState(false);
    const [exportFormat, setExportFormat] = useState('json');
    const [sqlDialect, setSqlDialect] = useState('mysql');
    const [tableName, setTableName] = useState('generated_data');

    const getExportData = () => {
        const formatForDialect = (dialect) => {
            switch (exportFormat) {
                case 'csv':
                    return jsonToCSV(data);
                case 'tsv':
                    return jsonToTSV(data);
                case 'xml':
                    return jsonToXML(data);
                case 'typescript':
                    return jsonToTypeScript(data);
                case 'sql':
                    return jsonToSQL(data, tableName, dialect);
                case 'sql-insert':
                    return jsonToSQLInsert(data, tableName, dialect);
                case 'sql-createtable':
                    return jsonToSQLCreateTable(data, tableName, dialect);
                case 'mysql-dump':
                    return jsonToMySQLDump(data, tableName);
                case 'json':
                default:
                    return JSON.stringify(data, null, 2);
            }
        };

        if (exportFormat.startsWith('sql')) {
            return formatForDialect(sqlDialect);
        }
        return formatForDialect('mysql'); // default for non-SQL formats
    };

    const getFileExtension = () => {
        switch (exportFormat) {
            case 'csv': return 'csv';
            case 'tsv': return 'tsv';
            case 'xml': return 'xml';
            case 'typescript': return 'ts';
            case 'sql': return 'sql';
            case 'sql-insert': return 'sql';
            case 'sql-createtable': return 'sql';
            case 'mysql-dump': return 'sql';
            case 'json':
            default: return 'json';
        }
    };

    const getDownloadLabel = () => {
        switch (exportFormat) {
            case 'csv': return 'Download CSV';
            case 'tsv': return 'Download TSV';
            case 'xml': return 'Download XML';
            case 'typescript': return 'Download TS';
            case 'sql': return 'Download SQL';
            case 'sql-insert': return 'Download SQL';
            case 'sql-createtable': return 'Download SQL';
            case 'mysql-dump': return 'Download SQL';
            case 'json':
            default: return 'Download JSON';
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(getExportData());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        const exportData = getExportData();
        const mimeType = exportFormat === 'json' ? 'application/json' : 'text/plain';
        const blob = new Blob([exportData], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `mock-data.${getFileExtension()}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const isSQLFormat = exportFormat.startsWith('sql');

    if (!data) return null;

    const displayData = getExportData();

    return (
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100 mt-8 transition-all duration-300">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex justify-between items-center flex-wrap gap-4 mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Generated Data</h3>
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
                            onClick={onReset}
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
                            onChange={(e) => setExportFormat(e.target.value)}
                            className="text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
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
                                    className="text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
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
                    {displayData.split('\n').map((_, i) => (
                        <div key={i}>{i + 1}</div>
                    ))}
                </div>
                <pre className="py-6 pl-4 pr-6 text-green-400 flex-1">
                    {displayData}
                </pre>
            </div>
        </div>
    );
};

export default JsonViewer;
