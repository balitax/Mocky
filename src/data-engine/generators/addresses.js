import { randomInt, randomChoice, randomId } from '../../utils/randomizers';

const streets = ['Main St', 'Oak Ave', 'Maple Dr', 'Park Ln', 'Washington Blvd', 'Broadway', 'Market St', 'Church Rd'];
const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'];
const states = ['NY', 'CA', 'IL', 'TX', 'AZ', 'PA', 'FL', 'OH', 'NC', 'MI'];
const countries = ['USA', 'Canada', 'UK', 'Germany', 'France', 'Japan', 'Australia'];

export const generateAddresses = (count) => {
    return Array.from({ length: count }, () => {
        const streetNumber = randomInt(1, 9999);
        const street = randomChoice(streets);
        const city = randomChoice(cities);
        const state = randomChoice(states);
        const zipCode = randomInt(10000, 99999);

        return {
            id: randomId('addr'),
            street: `${streetNumber} ${street}`,
            city,
            state,
            zipCode: zipCode.toString(),
            country: randomChoice(countries),
            fullAddress: `${streetNumber} ${street}, ${city}, ${state} ${zipCode}`,
            latitude: randomInt(-90, 90) + Math.random(),
            longitude: randomInt(-180, 180) + Math.random()
        };
    });
};
