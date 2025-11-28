export const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const randomChoice = (arr) => arr[Math.floor(Math.random() * arr.length)];

export const randomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
};

export const randomId = (prefix = 'id') => `${prefix}_${Math.random().toString(36).substr(2, 9)}`;

export const randomBool = () => Math.random() > 0.5;

export const randomFloat = (min, max, decimals = 2) => {
    const str = (Math.random() * (max - min) + min).toFixed(decimals);
    return parseFloat(str);
};

export const generateArray = (count, generator) => Array.from({ length: count }, generator);
