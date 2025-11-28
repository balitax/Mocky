// Template management utilities

const STORAGE_KEY = 'mocky-templates';

// Template data structure
export const createTemplate = (name, description, config, sampleData, dataType) => {
    return {
        id: Date.now().toString(),
        name: name.trim(),
        description: description.trim(),
        config: { ...config },
        sampleData: sampleData || null,
        dataType: dataType || config.type,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        usageCount: 0,
        tags: []
    };
};

// Get all templates from localStorage
export const getTemplates = () => {
    try {
        const templatesJson = localStorage.getItem(STORAGE_KEY);
        if (!templatesJson) return [];
        
        const templates = JSON.parse(templatesJson);
        return Array.isArray(templates) ? templates : [];
    } catch (error) {
        console.error('Error loading templates:', error);
        return [];
    }
};

// Save templates to localStorage
export const saveTemplates = (templates) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(templates));
        return true;
    } catch (error) {
        console.error('Error saving templates:', error);
        return false;
    }
};

// Save a new template
export const saveTemplate = (template) => {
    const templates = getTemplates();
    const newTemplate = {
        ...template,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        usageCount: 0
    };
    
    templates.push(newTemplate);
    const success = saveTemplates(templates);
    
    if (success) {
        return { success: true, template: newTemplate };
    } else {
        return { success: false, error: 'Failed to save template' };
    }
};

// Update an existing template
export const updateTemplate = (templateId, updates) => {
    const templates = getTemplates();
    const templateIndex = templates.findIndex(t => t.id === templateId);
    
    if (templateIndex === -1) {
        return { success: false, error: 'Template not found' };
    }
    
    templates[templateIndex] = {
        ...templates[templateIndex],
        ...updates,
        updatedAt: new Date().toISOString()
    };
    
    const success = saveTemplates(templates);
    
    if (success) {
        return { success: true, template: templates[templateIndex] };
    } else {
        return { success: false, error: 'Failed to update template' };
    }
};

// Delete a template
export const deleteTemplate = (templateId) => {
    const templates = getTemplates();
    const filteredTemplates = templates.filter(t => t.id !== templateId);
    
    if (filteredTemplates.length === templates.length) {
        return { success: false, error: 'Template not found' };
    }
    
    const success = saveTemplates(filteredTemplates);
    
    if (success) {
        return { success: true };
    } else {
        return { success: false, error: 'Failed to delete template' };
    }
};

// Get a specific template by ID
export const getTemplate = (templateId) => {
    const templates = getTemplates();
    return templates.find(t => t.id === templateId) || null;
};

// Increment usage count for a template
export const incrementUsageCount = (templateId) => {
    const templates = getTemplates();
    const templateIndex = templates.findIndex(t => t.id === templateId);
    
    if (templateIndex !== -1) {
        templates[templateIndex].usageCount += 1;
        templates[templateIndex].lastUsed = new Date().toISOString();
        saveTemplates(templates);
    }
};

// Search templates by name or description
export const searchTemplates = (query) => {
    const templates = getTemplates();
    const searchTerm = query.toLowerCase().trim();
    
    if (!searchTerm) return templates;
    
    return templates.filter(template => 
        template.name.toLowerCase().includes(searchTerm) ||
        template.description.toLowerCase().includes(searchTerm) ||
        template.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
};

// Filter templates by data type
export const filterTemplatesByType = (dataType) => {
    const templates = getTemplates();
    
    if (!dataType) return templates;
    
    return templates.filter(template => template.dataType === dataType);
};

// Sort templates
export const sortTemplates = (templates, sortBy = 'name', order = 'asc') => {
    const sorted = [...templates];
    
    sorted.sort((a, b) => {
        let aValue, bValue;
        
        switch (sortBy) {
            case 'name':
                aValue = a.name.toLowerCase();
                bValue = b.name.toLowerCase();
                break;
            case 'created':
                aValue = new Date(a.createdAt);
                bValue = new Date(b.createdAt);
                break;
            case 'updated':
                aValue = new Date(a.updatedAt);
                bValue = new Date(b.updatedAt);
                break;
            case 'usage':
                aValue = a.usageCount;
                bValue = b.usageCount;
                break;
            default:
                return 0;
        }
        
        if (aValue < bValue) return order === 'asc' ? -1 : 1;
        if (aValue > bValue) return order === 'asc' ? 1 : -1;
        return 0;
    });
    
    return sorted;
};

// Export templates to JSON file
export const exportTemplates = () => {
    const templates = getTemplates();
    const exportData = {
        version: '1.0',
        exportedAt: new Date().toISOString(),
        templates
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mocky-templates-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

// Import templates from JSON file
export const importTemplates = (fileContent) => {
    try {
        const importData = JSON.parse(fileContent);
        
        if (!importData.templates || !Array.isArray(importData.templates)) {
            return { success: false, error: 'Invalid template file format' };
        }
        
        const existingTemplates = getTemplates();
        const importedTemplates = importData.templates.map(template => ({
            ...template,
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            importedAt: new Date().toISOString()
        }));
        
        const allTemplates = [...existingTemplates, ...importedTemplates];
        const success = saveTemplates(allTemplates);
        
        if (success) {
            return { 
                success: true, 
                count: importedTemplates.length,
                templates: importedTemplates
            };
        } else {
            return { success: false, error: 'Failed to save imported templates' };
        }
    } catch (error) {
        return { success: false, error: 'Invalid JSON file' };
    }
};

// Get template statistics
export const getTemplateStats = () => {
    const templates = getTemplates();
    
    const stats = {
        total: templates.length,
        byType: {},
        recentlyUsed: [],
        mostUsed: []
    };
    
    // Count by data type
    templates.forEach(template => {
        if (!stats.byType[template.dataType]) {
            stats.byType[template.dataType] = 0;
        }
        stats.byType[template.dataType]++;
    });
    
    // Sort by usage
    const sortedByUsage = [...templates].sort((a, b) => b.usageCount - a.usageCount);
    stats.mostUsed = sortedByUsage.slice(0, 5);
    
    // Sort by last used (if available)
    const sortedByLastUsed = templates
        .filter(t => t.lastUsed)
        .sort((a, b) => new Date(b.lastUsed) - new Date(a.lastUsed));
    stats.recentlyUsed = sortedByLastUsed.slice(0, 5);
    
    return stats;
};

// Pre-built sample templates
export const SAMPLE_TEMPLATES = [
    {
        name: 'Small Business Users',
        description: 'Basic user profiles suitable for small business applications',
        dataType: 'users',
        config: {
            type: 'users',
            count: 25,
            relational: false,
            relationMode: 'single',
            customTemplate: '{}'
        },
        tags: ['users', 'small-business', 'basic']
    },
    {
        name: 'E-commerce Products',
        description: 'Product catalog for online store with pricing and inventory',
        dataType: 'products',
        config: {
            type: 'products',
            count: 50,
            relational: false,
            relationMode: 'single',
            customTemplate: '{}'
        },
        tags: ['products', 'ecommerce', 'retail']
    },
    {
        name: 'Blog Content',
        description: 'Blog posts and comments for content management testing',
        dataType: 'posts',
        config: {
            type: 'posts',
            count: 30,
            relational: true,
            relationMode: 'nested',
            customTemplate: '{}'
        },
        tags: ['posts', 'blog', 'content']
    },
    {
        name: 'Company Directory',
        description: 'Corporate structure with employees and departments',
        dataType: 'companies',
        config: {
            type: 'companies',
            count: 15,
            relational: false,
            relationMode: 'single',
            customTemplate: '{}'
        },
        tags: ['companies', 'corporate', 'directory']
    },
    {
        name: 'Event Management',
        description: 'Events, schedules, and attendees for event planning apps',
        dataType: 'events',
        config: {
            type: 'events',
            count: 20,
            relational: true,
            relationMode: 'multi',
            customTemplate: '{}'
        },
        tags: ['events', 'scheduling', 'calendar']
    }
];

// Initialize sample templates if no templates exist
export const initializeSampleTemplates = () => {
    const templates = getTemplates();
    
    if (templates.length === 0) {
        const sampleTemplates = SAMPLE_TEMPLATES.map(template => 
            createTemplate(
                template.name,
                template.description,
                template.config,
                null,
                template.dataType
            )
        );
        
        saveTemplates(sampleTemplates);
        return sampleTemplates;
    }
    
    return templates;
};

export default {
    createTemplate,
    getTemplates,
    saveTemplate,
    updateTemplate,
    deleteTemplate,
    getTemplate,
    incrementUsageCount,
    searchTemplates,
    filterTemplatesByType,
    sortTemplates,
    exportTemplates,
    importTemplates,
    getTemplateStats,
    SAMPLE_TEMPLATES,
    initializeSampleTemplates
};