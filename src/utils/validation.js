// Data validation rules and functions

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// URL validation regex
const URL_REGEX = /^https?:\/\/[\w\.-]+\.\w{2,6}(\/[\w\.\-\/\?\#\=\&]*)?$/;

// Phone number validation regex (US format)
const PHONE_REGEX = /^\+1[2-9]\d{2}[2-9]\d{2}\d{4}$/;

// Validation rules for different data types
export const VALIDATION_RULES = {
    users: {
        requiredFields: ['id', 'firstName', 'lastName', 'email', 'role', 'isActive'],
        fieldRules: {
            id: { type: 'string', pattern: /^usr_[a-z0-9]+$/, required: true },
            firstName: { type: 'string', minLength: 1, maxLength: 50, required: true },
            lastName: { type: 'string', minLength: 1, maxLength: 50, required: true },
            email: { type: 'string', pattern: EMAIL_REGEX, required: true },
            role: { type: 'string', enum: ['Admin', 'User', 'Editor', 'Viewer', 'Moderator', 'Manager', 'Supervisor', 'Director', 'CEO', 'CTO', 'Developer', 'Designer', 'Analyst', 'Coordinator'], required: true },
            isActive: { type: 'boolean', required: true },
            age: { type: 'number', min: 18, max: 100 },
            city: { type: 'string', maxLength: 100 },
            createdAt: { type: 'string', pattern: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/ },
            avatar: { type: 'string', pattern: /^https:\/\/api\.dicebear\.com\/.*$/ }
        }
    },
    products: {
        requiredFields: ['id', 'name', 'price', 'category', 'inStock'],
        fieldRules: {
            id: { type: 'string', pattern: /^prod_[a-z0-9]+$/, required: true },
            name: { type: 'string', minLength: 1, maxLength: 200, required: true },
            price: { type: 'number', min: 0, max: 100000, required: true },
            category: { type: 'string', enum: ['Electronics', 'Home & Kitchen', 'Clothing', 'Sports & Outdoors', 'Books & Media', 'Beauty & Personal Care', 'Automotive', 'Office Supplies'], required: true },
            inStock: { type: 'boolean', required: true },
            stockCount: { type: 'number', min: 0, max: 10000 },
            rating: { type: 'number', min: 1, max: 5 },
            reviewsCount: { type: 'number', min: 0, max: 100000 },
            brand: { type: 'string', maxLength: 100 },
            color: { type: 'string', maxLength: 50 },
            weight: { type: 'number', min: 0, max: 1000 }
        }
    }
};

// Validate a single data item
export const validateItem = (item, dataType) => {
    const rules = VALIDATION_RULES[dataType];
    if (!rules) {
        return { isValid: false, errors: [`Unknown data type: ${dataType}`] };
    }

    const errors = [];

    // Check required fields
    rules.requiredFields.forEach(field => {
        if (!(field in item) || item[field] === null || item[field] === undefined) {
            errors.push(`Missing required field: ${field}`);
        }
    });

    // Validate field rules
    Object.keys(rules.fieldRules).forEach(field => {
        if (field in item) {
            const fieldValue = item[field];
            const fieldRule = rules.fieldRules[field];

            // Type validation
            if (fieldRule.type && typeof fieldValue !== fieldRule.type) {
                errors.push(`Field ${field} should be of type ${fieldRule.type}`);
            }

            // String validations
            if (fieldRule.type === 'string') {
                if (fieldRule.minLength && fieldValue.length < fieldRule.minLength) {
                    errors.push(`Field ${field} should be at least ${fieldRule.minLength} characters`);
                }
                if (fieldRule.maxLength && fieldValue.length > fieldRule.maxLength) {
                    errors.push(`Field ${field} should be at most ${fieldRule.maxLength} characters`);
                }
                if (fieldRule.pattern && !fieldRule.pattern.test(fieldValue)) {
                    errors.push(`Field ${field} does not match expected format`);
                }
                if (fieldRule.enum && !fieldRule.enum.includes(fieldValue)) {
                    errors.push(`Field ${field} should be one of: ${fieldRule.enum.join(', ')}`);
                }
            }

            // Number validations
            if (fieldRule.type === 'number') {
                if (fieldRule.min !== undefined && fieldValue < fieldRule.min) {
                    errors.push(`Field ${field} should be at least ${fieldRule.min}`);
                }
                if (fieldRule.max !== undefined && fieldValue > fieldRule.max) {
                    errors.push(`Field ${field} should be at most ${fieldRule.max}`);
                }
            }

            // Boolean validation
            if (fieldRule.type === 'boolean' && typeof fieldValue !== 'boolean') {
                errors.push(`Field ${field} should be a boolean value`);
            }
        }
    });

    return {
        isValid: errors.length === 0,
        errors
    };
};

// Validate an array of data items
export const validateData = (data, dataType) => {
    if (!Array.isArray(data)) {
        return { 
            isValid: false, 
            errors: ['Data should be an array'],
            validCount: 0,
            invalidCount: 1,
            validationDetails: []
        };
    }

    const validationDetails = data.map((item, index) => {
        const result = validateItem(item, dataType);
        return {
            index,
            item,
            ...result
        };
    });

    const validCount = validationDetails.filter(d => d.isValid).length;
    const invalidCount = validationDetails.filter(d => !d.isValid).length;
    const allErrors = validationDetails
        .filter(d => !d.isValid)
        .flatMap(d => d.errors.map(error => `Item ${d.index}: ${error}`));

    return {
        isValid: invalidCount === 0,
        errors: allErrors,
        validCount,
        invalidCount,
        totalCount: data.length,
        validationDetails
    };
};

// Generate validation report
export const generateValidationReport = (validationResult) => {
    const { isValid, validCount, invalidCount, totalCount, errors } = validationResult;
    
    const report = {
        summary: {
            isValid,
            totalItems: totalCount,
            validItems: validCount,
            invalidItems: invalidCount,
            successRate: totalCount > 0 ? ((validCount / totalCount) * 100).toFixed(1) : 0
        },
        errors: errors.slice(0, 10), // Show first 10 errors
        hasMoreErrors: errors.length > 10
    };

    return report;
};

// Custom validation rules
export const createCustomRule = (fieldName, validatorFn, errorMessage) => {
    return {
        fieldName,
        validator: validatorFn,
        errorMessage
    };
};

// Apply custom validation rules
export const applyCustomRules = (data, customRules, dataType) => {
    const baseValidation = validateData(data, dataType);
    const customErrors = [];

    customRules.forEach(rule => {
        data.forEach((item, index) => {
            if (rule.fieldName in item) {
                if (!rule.validator(item[rule.fieldName], item)) {
                    customErrors.push(`Item ${index}: ${rule.errorMessage}`);
                }
            }
        });
    });

    return {
        ...baseValidation,
        errors: [...baseValidation.errors, ...customErrors],
        isValid: baseValidation.errors.length === 0 && customErrors.length === 0
    };
};

// Business logic validation rules
export const BUSINESS_RULES = {
    // Ensure emails are unique
    uniqueEmails: (data) => {
        const emails = data.map(item => item.email).filter(Boolean);
        const uniqueEmails = new Set(emails);
        return emails.length === uniqueEmails.size;
    },

    // Ensure product prices are reasonable for category
    reasonablePricing: (data) => {
        return data.every(item => {
            if (item.category === 'Electronics' && item.price < 10) return false;
            if (item.category === 'Clothing' && item.price > 1000) return false;
            return true;
        });
    },

    // Ensure users have valid age ranges for their roles
    ageRoleCompatibility: (data) => {
        return data.every(item => {
            if (item.role === 'CEO' && item.age < 30) return false;
            if (item.role === 'Student' && (item.age < 16 || item.age > 25)) return false;
            return true;
        });
    }
};

// Export utility functions
export default {
    validateItem,
    validateData,
    generateValidationReport,
    createCustomRule,
    applyCustomRules,
    BUSINESS_RULES,
    VALIDATION_RULES
};