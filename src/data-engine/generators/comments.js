import { randomChoice, randomDate, randomId } from '../../utils/randomizers';

const comments = [
    'Great post!', 'Thanks for sharing.', 'I totally agree.', 'Interesting perspective.',
    'Could you elaborate on that?', 'This was very helpful.', 'Awesome content!', 'Keep it up!',
    'I learned something new today.', 'Wow, amazing!'
];

export const generateComments = (count, postIds = [], userIds = []) => {
    return Array.from({ length: count }, () => {
        return {
            id: randomId('cmt'),
            text: randomChoice(comments),
            createdAt: randomDate(new Date(2023, 0, 1), new Date()),
            postId: postIds.length > 0 ? randomChoice(postIds) : randomId('post'),
            userId: userIds.length > 0 ? randomChoice(userIds) : randomId('usr')
        };
    });
};
