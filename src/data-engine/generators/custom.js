import { randomId } from '../../utils/randomizers';

export const generateCustom = (count, template) => {
    let parsedTemplate = {};
    try {
        parsedTemplate = JSON.parse(template);
    } catch {
        // Fallback if invalid JSON, though UI should prevent this
        parsedTemplate = { error: "Invalid JSON template" };
    }

    // If the parsed template is an array, return it as-is
    if (Array.isArray(parsedTemplate)) {
        return parsedTemplate;
    }

    // If the parsed template is a single object, generate 'count' copies with unique IDs
    if (typeof parsedTemplate === 'object' && parsedTemplate !== null) {
        return Array.from({ length: count }, () => ({
            id: randomId('custom'),
            ...parsedTemplate
        }));
    }

    // For primitive values, wrap in an object with the value, and generate count copies with IDs
    return Array.from({ length: count }, () => ({
        id: randomId('custom'),
        value: parsedTemplate
    }));
};
