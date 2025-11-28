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

// Generate SQL CREATE TABLE statement
export const jsonToSQLCreateTable = (data, tableName = 'generated_data', sqlDialect = 'mysql') => {
    if (!data || data.length === 0) return '';

    const sample = data[0];
    const typeMapping = {
        'mysql': {
            'string': 'VARCHAR(255)',
            'number': 'DECIMAL(10,2)',
            'boolean': 'TINYINT(1)',
            'object': 'JSON',
            'array': 'JSON',
            'null': 'NULL'
        },
        'postgresql': {
            'string': 'VARCHAR(255)',
            'number': 'DECIMAL(10,2)',
            'boolean': 'BOOLEAN',
            'object': 'JSONB',
            'array': 'JSONB',
            'null': 'NULL'
        },
        'sqlite': {
            'string': 'TEXT',
            'number': 'REAL',
            'boolean': 'INTEGER',
            'object': 'TEXT',
            'array': 'TEXT',
            'null': 'NULL'
        }
    };

    const getSQLType = (value) => {
        if (value === null || value === undefined) return typeMapping[sqlDialect]['null'];
        if (Array.isArray(value)) return typeMapping[sqlDialect]['array'];
        if (typeof value === 'object') return typeMapping[sqlDialect]['object'];
        if (typeof value === 'string') {
            // Check if it looks like a date
            if (/\d{4}-\d{2}-\d{2}/.test(value)) {
                return sqlDialect === 'sqlite' ? 'TEXT' : 'DATETIME';
            }
            return typeMapping[sqlDialect]['string'];
        }
        if (typeof value === 'number') {
            return Number.isInteger(value) ? 'INT' : typeMapping[sqlDialect]['number'];
        }
        if (typeof value === 'boolean') return typeMapping[sqlDialect]['boolean'];
        return typeMapping[sqlDialect]['string'];
    };

    let sql = `CREATE TABLE ${tableName} (\n`;
    const columns = [];

    for (const [key, value] of Object.entries(sample)) {
        const sqlType = getSQLType(value);
        const columnName = key.replace(/[^a-zA-Z0-9_]/g, '_'); // Sanitize column name
        const nullable = value === null || value === undefined ? ' NULL' : ' NOT NULL';
        columns.push(`    ${columnName} ${sqlType}${nullable}`);
    }

    sql += columns.join(',\n');
    sql += '\n);';

    return sql;
};

// Generate SQL INSERT statements
export const jsonToSQLInsert = (data, tableName = 'generated_data', sqlDialect = 'mysql') => {
    if (!data || data.length === 0) return '';

    const escapeSQLString = (str) => {
        if (typeof str !== 'string') return str;
        return str.replace(/'/g, "''");
    };

    const formatValue = (value) => {
        if (value === null || value === undefined) return 'NULL';
        if (typeof value === 'boolean') return value ? '1' : '0';
        if (typeof value === 'number') return isNaN(value) ? 'NULL' : value.toString();
        if (typeof value === 'object') return `'${escapeSQLString(JSON.stringify(value))}'`;
        return `'${escapeSQLString(value)}'`;
    };

    const sample = data[0];
    const columnNames = Object.keys(sample).map(key => key.replace(/[^a-zA-Z0-9_]/g, '_'));
    const columns = columnNames.join(', ');

    let sql = `INSERT INTO ${tableName} (${columns}) VALUES\n`;

    const values = data.map(row => {
        const rowValues = Object.values(row).map(formatValue);
        return `(${rowValues.join(', ')})`;
    });

    sql += values.join(',\n') + ';';

    return sql;
};

// Generate complete SQL script (CREATE TABLE + INSERT)
export const jsonToSQL = (data, tableName = 'generated_data', sqlDialect = 'mysql') => {
    const createTable = jsonToSQLCreateTable(data, tableName, sqlDialect);
    const insertStatements = jsonToSQLInsert(data, tableName, sqlDialect);
    
    return `${createTable}\n\n${insertStatements}`;
};

// Generate MySQL dump format
export const jsonToMySQLDump = (data, tableName = 'generated_data') => {
    const timestamp = new Date().toISOString().split('T')[0];
    
    let dump = `-- Mocky Generated MySQL Dump\n`;
    dump += `-- Generated on ${timestamp}\n`;
    dump += `-- Table structure for ${tableName}\n\n`;
    
    dump += `DROP TABLE IF EXISTS ${tableName};\n\n`;
    dump += jsonToSQLCreateTable(data, tableName, 'mysql') + '\n\n';
    
    dump += `-- Dumping data for table ${tableName}\n\n`;
    dump += jsonToSQLInsert(data, tableName, 'mysql') + '\n';

    return dump;
};

// Generate TSV (Tab-Separated Values) export
export const jsonToTSV = (data) => {
    if (!data || data.length === 0) return '';

    // Get all unique keys from all objects
    const allKeys = [...new Set(data.flatMap(obj => Object.keys(obj)))];

    // Create header row
    const header = allKeys.join('\t');

    // Create data rows
    const rows = data.map(obj => {
        return allKeys.map(key => {
            const value = obj[key];
            if (value === null || value === undefined) return '';
            if (typeof value === 'object') return JSON.stringify(value);
            return String(value).replace(/\t/g, ' '); // Replace tabs in values
        }).join('\t');
    });

    return [header, ...rows].join('\n');
};
