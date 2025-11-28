// Convert JSON to CSV
export const jsonToCSV = (data) => {
    if (!data || data.length === 0) return '';

    // Get all unique keys from all objects
    const allKeys = [...new Set(data.flatMap(obj => Object.keys(obj)))];

    // Create header row
    const header = allKeys.join(',');

    // Create data rows
    const rows = data.map(obj => {
        return allKeys.map(key => {
            const value = obj[key];
            // Handle different data types
            if (value === null || value === undefined) return '';
            if (typeof value === 'object') return JSON.stringify(value).replace(/"/g, '""');
            if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
                return `"${value.replace(/"/g, '""')}"`;
            }
            return value;
        }).join(',');
    });

    return [header, ...rows].join('\n');
};

// Convert JSON to XML
export const jsonToXML = (data, rootName = 'data') => {
    const escapeXML = (str) => {
        if (typeof str !== 'string') return str;
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
    };

    const objectToXML = (obj, indent = '  ') => {
        let xml = '';
        for (const [key, value] of Object.entries(obj)) {
            if (value === null || value === undefined) {
                xml += `${indent}<${key}/>\n`;
            } else if (typeof value === 'object' && !Array.isArray(value)) {
                xml += `${indent}<${key}>\n${objectToXML(value, indent + '  ')}${indent}</${key}>\n`;
            } else if (Array.isArray(value)) {
                xml += `${indent}<${key}>\n`;
                value.forEach(item => {
                    xml += `${indent}  <item>${escapeXML(String(item))}</item>\n`;
                });
                xml += `${indent}</${key}>\n`;
            } else {
                xml += `${indent}<${key}>${escapeXML(String(value))}</${key}>\n`;
            }
        }
        return xml;
    };

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += `<${rootName}>\n`;

    if (Array.isArray(data)) {
        data.forEach(item => {
            xml += '  <item>\n';
            xml += objectToXML(item, '    ');
            xml += '  </item>\n';
        });
    } else {
        xml += objectToXML(data, '  ');
    }

    xml += `</${rootName}>`;
    return xml;
};

// Generate TypeScript interface from JSON
export const jsonToTypeScript = (data, interfaceName = 'GeneratedData') => {
    if (!data || data.length === 0) return '';

    // Get first item to infer types
    const sample = data[0];

    const inferType = (value) => {
        if (value === null || value === undefined) return 'any';
        if (Array.isArray(value)) {
            if (value.length === 0) return 'any[]';
            return `${inferType(value[0])}[]`;
        }
        if (typeof value === 'object') return 'object';
        if (typeof value === 'string') return 'string';
        if (typeof value === 'number') return 'number';
        if (typeof value === 'boolean') return 'boolean';
        return 'any';
    };

    let typescript = `export interface ${interfaceName} {\n`;

    for (const [key, value] of Object.entries(sample)) {
        const type = inferType(value);
        typescript += `  ${key}: ${type};\n`;
    }

    typescript += '}\n';

    return typescript;
};
