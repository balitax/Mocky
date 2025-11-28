import { randomId } from '../../utils/randomizers';

export const generateCustom = (count, template) => {
    let parsedTemplate = {};
    try {
        parsedTemplate = JSON.parse(template);
    } catch (e) {
        // Fallback if invalid JSON, though UI should prevent this
        parsedTemplate = { error: "Invalid JSON template" };
    }

    return Array.from({ length: count }, () => {
        // Deep clone the template for each item to avoid reference issues
        // For MVP, we just replicate the static data. 
        // If we wanted to be fancy, we could look for special strings like "{{name}}" and replace them.
        // But the prompt says "user can input their own json", implying replication or simple structure.
        // Let's add a unique ID to make it a list of distinct objects at least.

        const item = JSON.parse(JSON.stringify(parsedTemplate));
        if (typeof item === 'object' && item !== null && !item.id) {
            item.id = randomId('custom');
        }
        return item;
    });
};
