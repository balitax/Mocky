// Relationship configuration for each dataset type
export const RELATIONSHIPS = {
    products: {
        requires: ['users'],
        ratio: 3, // 3 products per user on average
        foreignKeys: [{ field: 'sellerId', references: 'users' }]
    },
    posts: {
        requires: ['users'],
        ratio: 5, // 5 posts per user on average
        foreignKeys: [{ field: 'authorId', references: 'users' }]
    },
    comments: {
        requires: ['users', 'posts'],
        ratio: 5, // 5 comments per post on average
        foreignKeys: [
            { field: 'userId', references: 'users' },
            { field: 'postId', references: 'posts' }
        ]
    },
    transactions: {
        requires: ['users'],
        ratio: 10, // 10 transactions per user on average
        foreignKeys: [{ field: 'userId', references: 'users' }]
    },
    events: {
        requires: [],
        ratio: 1,
        foreignKeys: []
    },
    schedules: {
        requires: [],
        ratio: 1,
        foreignKeys: []
    },
    companies: {
        requires: [],
        ratio: 1,
        foreignKeys: []
    },
    addresses: {
        requires: [],
        ratio: 1,
        foreignKeys: []
    },
    users: {
        requires: [],
        ratio: 1,
        foreignKeys: []
    },
    custom: {
        requires: [],
        ratio: 1,
        foreignKeys: []
    }
};

// Calculate how many related entities to generate
export const calculateRelatedCounts = (type, count) => {
    const config = RELATIONSHIPS[type];
    if (!config || config.requires.length === 0) return {};

    const counts = {};
    config.requires.forEach(relatedType => {
        // Generate enough related entities based on ratio
        counts[relatedType] = Math.max(1, Math.ceil(count / config.ratio));
    });

    return counts;
};
