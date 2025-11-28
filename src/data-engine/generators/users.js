import { randomInt, randomChoice, randomDate, randomId, randomBool } from '../../utils/randomizers';

const firstNames = ['James', 'Mary', 'Robert', 'Patricia', 'John', 'Jennifer', 'Michael', 'Linda', 'David', 'Elizabeth', 'William', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica', 'Thomas', 'Sarah', 'Charles', 'Karen'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'];
const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'example.com'];
const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'];
const roles = ['Admin', 'User', 'Editor', 'Viewer', 'Moderator'];

export const generateUsers = (count) => {
    return Array.from({ length: count }, () => {
        const firstName = randomChoice(firstNames);
        const lastName = randomChoice(lastNames);
        const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${randomInt(1, 999)}@${randomChoice(domains)}`;

        return {
            id: randomId('usr'),
            firstName,
            lastName,
            email,
            role: randomChoice(roles),
            isActive: randomBool(),
            age: randomInt(18, 80),
            city: randomChoice(cities),
            createdAt: randomDate(new Date(2020, 0, 1), new Date()),
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${firstName}${lastName}`
        };
    });
};
