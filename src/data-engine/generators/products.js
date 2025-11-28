import { randomInt, randomChoice, randomFloat, randomId, randomBool } from '../../utils/randomizers';

const adjectives = ['Premium', 'Wireless', 'Portable', 'Smart', 'Professional', 'Advanced', 'Compact', 'Durable', 'Elegant', 'Modern', 'Classic', 'Vintage', 'Minimalist', 'Ultra', 'Pro', 'Deluxe', 'Essential', 'Versatile', 'Performance'];
const materials = ['Stainless Steel', 'Bamboo', 'Organic Cotton', 'Aluminum', 'Recycled Plastic', 'Leather', 'Glass', 'Ceramic', 'Wood', 'Carbon Fiber', 'Titanium', 'Silicone', 'Natural Rubber', 'Polyester', 'Cashmere'];
const baseProducts = ['Laptop', 'Smartphone', 'Headphones', 'Watch', 'Backpack', 'Coffee Maker', 'Desk Lamp', 'Water Bottle', 'Yoga Mat', 'Running Shoes', 'Bluetooth Speaker', 'Fitness Tracker', 'Tablet', 'Keyboard', 'Mouse', 'Monitor', 'Camera', 'Microphone', 'Charger', 'Cable'];
const categories = ['Electronics', 'Home & Kitchen', 'Clothing', 'Sports & Outdoors', 'Books & Media', 'Beauty & Personal Care', 'Automotive', 'Office Supplies'];
const brands = ['TechPro', 'EcoLife', 'SmartHome', 'UrbanStyle', 'NaturePure', 'ProGear', 'ComfortPlus', 'EliteTech', 'GreenChoice', 'ModernLiving', 'ActiveWear', 'HomeEssentials'];
const colors = ['Black', 'White', 'Gray', 'Blue', 'Red', 'Green', 'Yellow', 'Pink', 'Purple', 'Orange', 'Brown', 'Gold', 'Silver'];

export const generateProducts = (count, userIds = []) => {
    return Array.from({ length: count }, () => {
        const adjective = randomChoice(adjectives);
        const material = randomChoice(materials);
        const product = randomChoice(baseProducts);
        const name = `${adjective} ${material} ${product}`;
        const category = randomChoice(categories);
        const brand = randomChoice(brands);
        const color = randomChoice(colors);

        // Price ranges by category
        let price;
        if (category === 'Electronics') {
            price = randomFloat(50, 2000);
        } else if (category === 'Clothing') {
            price = randomFloat(20, 300);
        } else if (category === 'Sports & Outdoors') {
            price = randomFloat(25, 800);
        } else {
            price = randomFloat(10, 500);
        }

        const generatedProduct = {
            id: randomId('prod'),
            name,
            brand,
            category,
            price,
            originalPrice: price > 100 ? randomFloat(price * 1.1, price * 1.5) : null,
            currency: 'USD',
            color,
            inStock: Math.random() > 0.1, // 90% in stock
            stockCount: randomInt(0, 1000),
            rating: randomFloat(2.5, 5, 1),
            reviewsCount: randomInt(0, 1000),
            description: `The ${name} offers exceptional quality and performance. Built with ${material}, it provides reliability and style for everyday use.`,
            features: ['High Quality', 'Durable', 'Modern Design'],
            warranty: randomInt(1, 3),
            weight: randomFloat(0.1, 50),
            dimensions: {
                length: randomFloat(5, 100),
                width: randomFloat(5, 80),
                height: randomFloat(1, 50)
            },
            isActive: randomBool(),
            isFeatured: Math.random() > 0.8,
            createdAt: new Date().toISOString()
        };

        if (userIds.length > 0) {
            generatedProduct.sellerId = randomChoice(userIds);
        }

        return generatedProduct;
    });
};
