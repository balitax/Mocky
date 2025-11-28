export const generateCustom = (count, template) => {
    let parsedTemplate = {};
    try {
        parsedTemplate = JSON.parse(template);
    } catch (e) {
        // Fallback if invalid JSON, though UI should prevent this
        parsedTemplate = { error: "Invalid JSON template" };
    }

    // If the parsed template is an array, return it as-is
    if (Array.isArray(parsedTemplate)) {
        return parsedTemplate;
    }

    // If the parsed template is a single object, return it directly
    // This preserves the user's input structure as expected
    if (typeof parsedTemplate === 'object' && parsedTemplate !== null) {
        return parsedTemplate;
    }

    // For primitive values, wrap in an object with the value
    return { value: parsedTemplate };
};
