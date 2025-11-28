import { randomInt, randomChoice, randomDate, randomId, randomBool } from '../../utils/randomizers';

const eventNames = ['Tech Conference', 'Product Launch', 'Team Meeting', 'Workshop', 'Webinar', 'Networking Event', 'Training Session', 'Annual Summit'];
const locations = ['Conference Hall A', 'Virtual', 'Main Auditorium', 'Meeting Room 1', 'Online Platform', 'Convention Center'];
const categories = ['Technology', 'Business', 'Education', 'Entertainment', 'Sports', 'Health'];

export const generateEvents = (count) => {
    return Array.from({ length: count }, () => {
        const startDate = randomDate(new Date(), new Date(2025, 11, 31));
        const endDate = new Date(new Date(startDate).getTime() + randomInt(1, 8) * 60 * 60 * 1000);

        return {
            id: randomId('evt'),
            name: randomChoice(eventNames),
            description: `Join us for an amazing ${randomChoice(eventNames).toLowerCase()}`,
            category: randomChoice(categories),
            location: randomChoice(locations),
            startDate: startDate,
            endDate: endDate.toISOString(),
            capacity: randomInt(10, 500),
            attendees: randomInt(0, 500),
            price: randomInt(0, 1) === 0 ? 0 : randomInt(10, 500),
            isVirtual: randomBool(),
            organizer: `${randomChoice(['John', 'Jane', 'Mike', 'Sarah'])} ${randomChoice(['Smith', 'Johnson', 'Williams'])}`,
            createdAt: randomDate(new Date(2024, 0, 1), new Date())
        };
    });
};
