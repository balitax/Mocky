import { randomInt, randomChoice, randomFloat, randomId, randomBool } from '../../utils/randomizers';

const adjectives = ['Ergonomic', 'Rustic', 'Intelligent', 'Gorgeous', 'Incredible', 'Fantastic', 'Practical', 'Sleek', 'Awesome', 'Generic', 'Handcrafted', 'Licensed', 'Refined', 'Unbranded', 'Tasty'];
const materials = ['Steel', 'Wooden', 'Concrete', 'Plastic', 'Cotton', 'Granite', 'Rubber', 'Metal', 'Soft', 'Fresh', 'Frozen'];
const products = ['Chair', 'Car', 'Computer', 'Keyboard', 'Mouse', 'Bike', 'Ball', 'Gloves', 'Pants', 'Shirt', 'Table', 'Shoes', 'Hat', 'Towels', 'Soap', 'Tuna', 'Chicken', 'Fish', 'Cheese', 'Bacon'];
const categories = ['Electronics', 'Home', 'Clothing', 'Sports', 'Food', 'Beauty', 'Automotive', 'Books'];

export const generateProducts = (count, userIds = []) => {
    return Array.from({ length: count }, () => {
        const name = `${randomChoice(adjectives)} ${randomChoice(materials)} ${randomChoice(products)}`;

        const product = {
            id: randomId('prod'),
            name,
            price: randomFloat(10, 1000),
            category: randomChoice(categories),
            inStock: randomBool(),
            stockCount: randomInt(0, 500),
            rating: randomFloat(1, 5, 1),
            reviewsCount: randomInt(0, 1000),
            description: `The ${name} is perfect for your daily needs. It features high quality materials and a modern design.`
        };

        if (userIds.length > 0) {
            product.sellerId = randomChoice(userIds);
        }

        return product;
    });
};
