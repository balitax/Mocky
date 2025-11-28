import { randomInt, randomChoice, randomDate, randomId } from '../../utils/randomizers';

const titles = [
    'The Future of Tech', 'Why I Love Coding', 'Top 10 Tips for React', 'Understanding JavaScript Closures',
    'A Day in the Life', 'Travel Diaries: Tokyo', 'Healthy Eating Habits', 'The Art of Minimalism',
    'How to Stay Productive', 'Mastering CSS Grid', 'The Rise of AI', 'Web Design Trends 2024'
];

const bodies = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
];

const tags = ['tech', 'lifestyle', 'coding', 'travel', 'food', 'design', 'productivity', 'health'];

export const generatePosts = (count, userIds = []) => {
    return Array.from({ length: count }, () => {
        return {
            id: randomId('post'),
            title: randomChoice(titles),
            content: randomChoice(bodies),
            published: true,
            likes: randomInt(0, 5000),
            views: randomInt(100, 10000),
            tags: Array.from({ length: randomInt(1, 3) }, () => randomChoice(tags)),
            createdAt: randomDate(new Date(2022, 0, 1), new Date()),
            authorId: userIds.length > 0 ? randomChoice(userIds) : randomId('usr')
        };
    });
};
