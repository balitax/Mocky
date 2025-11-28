import { randomInt, randomChoice, randomDate, randomId, randomBool, randomFloat } from '../../utils/randomizers';

const companyNames = ['Tech Solutions', 'Global Innovations', 'Digital Dynamics', 'Smart Systems', 'Future Corp', 'Nexus Industries', 'Prime Ventures', 'Alpha Group', 'Quantum Labs', 'Apex Technologies'];
const suffixes = ['Inc.', 'LLC', 'Corp.', 'Ltd.', 'Group', 'Solutions', 'Technologies', 'Systems'];
const industries = ['Technology', 'Finance', 'Healthcare', 'Education', 'Retail', 'Manufacturing', 'Consulting', 'Real Estate'];
const employees = [10, 50, 100, 250, 500, 1000, 2500, 5000];

export const generateCompanies = (count) => {
    return Array.from({ length: count }, () => {
        const name = `${randomChoice(companyNames)} ${randomChoice(suffixes)}`;

        return {
            id: randomId('comp'),
            name,
            industry: randomChoice(industries),
            founded: randomInt(1990, 2024),
            employees: randomChoice(employees),
            revenue: randomFloat(100000, 50000000, 0),
            isPublic: randomBool(),
            website: `https://${name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
            headquarters: randomChoice(['New York', 'San Francisco', 'London', 'Tokyo', 'Singapore', 'Berlin']),
            createdAt: randomDate(new Date(2020, 0, 1), new Date())
        };
    });
};
