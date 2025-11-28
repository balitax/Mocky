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

export const generateData = (type, count, relational = false, customTemplate = '{}') => {
    let data = [];

    // If relational is true, we might need to generate auxiliary data
    // For MVP simplicity, if relational is on, we generate a small set of "parents" 
    // if the requested type is a "child" type, or just generate the requested type with internal consistency.

    // However, the prompt asks for: users -> own products -> have comments
    // So if I generate Products with relational=true, I should probably generate some users first to link them.
    // But the output should be just the requested dataset.
    // So:
    // If type is Products and relational is true: generate fake user IDs and assign them.
    // If type is Comments and relational is true: generate fake user IDs and post IDs.

    // Actually, to make it "realistic" without returning the whole DB:
    // We can just generate a pool of IDs to pick from.

    const userIds = relational ? Array.from({ length: 50 }, (_, i) => `usr_${i}`) : [];
    const postIds = relational ? Array.from({ length: 50 }, (_, i) => `post_${i}`) : [];

    switch (type) {
        case 'users':
            data = generateUsers(count);
            break;
        case 'products':
            data = generateProducts(count, userIds);
            break;
        case 'posts':
            data = generatePosts(count, userIds);
            break;
        case 'comments':
            data = generateComments(count, postIds, userIds);
            break;
        case 'schedules':
            data = generateSchedules(count);
            break;
        case 'companies':
            data = generateCompanies(count);
            break;
        case 'addresses':
            data = generateAddresses(count);
            break;
        case 'transactions':
            data = generateTransactions(count, userIds);
            break;
        case 'events':
            data = generateEvents(count);
            break;
        case 'custom':
            data = generateCustom(count, customTemplate);
            break;
        default:
            data = [];
    }

    return data;
};
