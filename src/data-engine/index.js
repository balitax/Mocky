import { generateUsers } from './generators/users';
import { generateProducts } from './generators/products';
import { generatePosts } from './generators/posts';
import { generateComments } from './generators/comments';
import { generateSchedules } from './generators/schedules';
import { generateCustom } from './generators/custom';
import { generateCompanies } from './generators/companies';
import { generateAddresses } from './generators/addresses';
import { generateTransactions } from './generators/transactions';
import { generateEvents } from './generators/events';
import { RELATIONSHIPS, calculateRelatedCounts } from './relationships';

// Simple generation without relationships
export const generateData = (type, count, relational = false, customTemplate = '{}', relationMode = 'single') => {
    if (!relational) {
        // Non-relational mode - simple generation
        return generateSimple(type, count, customTemplate);
    }

    // Relational mode with different output modes
    return generateRelational(type, count, relationMode, customTemplate);
};

// Generate data without relationships
const generateSimple = (type, count, customTemplate) => {
    switch (type) {
        case 'users':
            return generateUsers(count);
        case 'products':
            return generateProducts(count, []);
        case 'posts':
            return generatePosts(count, []);
        case 'comments':
            return generateComments(count, [], []);
        case 'schedules':
            return generateSchedules(count);
        case 'companies':
            return generateCompanies(count);
        case 'addresses':
            return generateAddresses(count);
        case 'transactions':
            return generateTransactions(count, []);
        case 'events':
            return generateEvents(count);
        case 'custom':
            return generateCustom(count, customTemplate);
        default:
            return [];
    }
};

// Generate data with relationships
const generateRelational = (type, count, mode, customTemplate) => {
    const config = RELATIONSHIPS[type];

    if (!config || config.requires.length === 0) {
        // No relationships needed, generate normally
        return generateSimple(type, count, customTemplate);
    }

    // Calculate how many related entities we need
    const relatedCounts = calculateRelatedCounts(type, count);

    // Generate all required related datasets
    const relatedData = {};
    config.requires.forEach(relatedType => {
        relatedData[relatedType] = generateSimple(relatedType, relatedCounts[relatedType]);
    });

    // Generate the main dataset with foreign keys
    let mainData;
    const userIds = relatedData.users ? relatedData.users.map(u => u.id) : [];
    const postIds = relatedData.posts ? relatedData.posts.map(p => p.id) : [];

    switch (type) {
        case 'products':
            mainData = generateProducts(count, userIds);
            break;
        case 'posts':
            mainData = generatePosts(count, userIds);
            break;
        case 'comments':
            mainData = generateComments(count, postIds, userIds);
            break;
        case 'transactions':
            mainData = generateTransactions(count, userIds);
            break;
        default:
            mainData = generateSimple(type, count, customTemplate);
    }

    // Return based on mode
    if (mode === 'nested') {
        return embedRelatedData(mainData, relatedData, config);
    }

    if (mode === 'multi') {
        return {
            [type]: mainData,
            ...relatedData
        };
    }

    // Default: single mode (just foreign keys)
    return mainData;
};

// Embed related objects into main data
const embedRelatedData = (mainData, relatedData, config) => {
    return mainData.map(item => {
        const embedded = { ...item };

        config.foreignKeys.forEach(fk => {
            const relatedType = fk.references;
            const relatedItems = relatedData[relatedType];

            if (relatedItems) {
                const relatedItem = relatedItems.find(r => r.id === item[fk.field]);
                if (relatedItem) {
                    // Add the full object with a descriptive key
                    const embeddedKey = relatedType.slice(0, -1); // users -> user
                    embedded[embeddedKey] = relatedItem;
                }
            }
        });

        return embedded;
    });
};
