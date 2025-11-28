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

// Weighted random choice - allows some items to be more likely than others
export const weightedRandomChoice = (items, weights) => {
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
    let random = Math.random() * totalWeight;
    
    for (let i = 0; i < items.length; i++) {
        random -= weights[i];
        if (random <= 0) {
            return items[i];
        }
    }
    
    return items[items.length - 1];
};

// Generate realistic email addresses
export const generateEmail = (firstName, lastName, domains = []) => {
    const defaultDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'company.com'];
    const allDomains = domains.length > 0 ? domains : defaultDomains;
    
    const separators = ['.', '_', ''];
    const extensions = ['', randomInt(1, 999)];
    
    const separator = randomChoice(separators);
    const extension = randomChoice(extensions);
    const domain = randomChoice(allDomains);
    
    return `${firstName.toLowerCase()}${separator}${lastName.toLowerCase()}${extension}@${domain}`;
};

// Generate realistic phone numbers
export const generatePhoneNumber = (countryCode = '+1') => {
    const areaCodes = [201, 202, 203, 205, 206, 207, 208, 209, 210, 212, 213, 214, 215, 216, 217, 218, 219, 224, 225, 228, 229, 231, 234, 239, 240, 248, 251, 252, 253, 254, 256, 260, 262, 267, 269, 270, 272, 274, 276, 281, 301, 302, 303, 304, 305, 307, 308, 309, 310, 312, 313, 314, 315, 316, 317, 318, 319, 320, 321, 323, 325, 330, 331, 334, 336, 337, 339, 346, 347, 351, 352, 360, 361, 364, 380, 385, 386, 401, 402, 404, 405, 406, 407, 408, 409, 410, 412, 413, 414, 415, 417, 419, 423, 424, 425, 430, 432, 434, 435, 440, 443, 445, 458, 463, 469, 470, 475, 478, 479, 480, 484, 501, 502, 503, 504, 505, 507, 508, 509, 510, 512, 513, 515, 516, 517, 518, 520, 530, 531, 534, 539, 540, 541, 551, 559, 561, 562, 563, 564, 567, 570, 571, 573, 574, 575, 580, 585, 586, 601, 602, 603, 605, 606, 607, 608, 609, 610, 612, 614, 615, 616, 617, 618, 619, 620, 623, 626, 628, 629, 630, 631, 636, 641, 646, 650, 651, 657, 658, 659, 660, 661, 662, 667, 669, 678, 680, 682, 701, 702, 703, 704, 706, 707, 708, 712, 713, 714, 715, 716, 717, 718, 719, 720, 724, 725, 727, 728, 731, 732, 734, 737, 740, 743, 747, 754, 757, 760, 762, 763, 765, 769, 770, 772, 773, 774, 775, 779, 781, 785, 786, 801, 802, 803, 804, 805, 806, 808, 810, 812, 813, 814, 815, 816, 817, 818, 828, 830, 831, 832, 835, 838, 839, 840, 843, 845, 847, 848, 850, 854, 856, 857, 858, 859, 860, 862, 863, 864, 865, 870, 872, 878, 901, 903, 904, 906, 907, 908, 909, 910, 912, 913, 914, 915, 916, 917, 918, 919, 920, 925, 928, 929, 930, 931, 936, 937, 938, 939, 940, 941, 947, 949, 951, 952, 954, 956, 959, 970, 971, 972, 973, 975, 978, 979, 980, 984, 985, 986, 989];
    
    const areaCode = randomChoice(areaCodes);
    const exchange = randomInt(200, 999);
    const number = randomInt(1000, 9999);
    
    return `${countryCode}${areaCode}${exchange}${number}`;
};

// Generate realistic URLs
export const generateURL = (domain = 'example.com', path = '') => {
    const protocols = ['https://', 'http://'];
    const protocol = randomChoice(protocols);
    const subdomains = ['www.', 'api.', 'app.', 'cdn.', 'mail.', 'support.', ''];
    const subdomain = randomChoice(subdomains);
    
    return `${protocol}${subdomain}${domain}/${path}`;
};

// Generate realistic text content
export const generateText = (minWords = 10, maxWords = 50) => {
    const words = [
        'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'I', 'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
        'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she', 'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their',
        'what', 'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me', 'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him',
        'know', 'take', 'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other', 'than', 'then', 'now', 'look', 'only',
        'come', 'its', 'over', 'think', 'also', 'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way', 'even', 'new', 'want',
        'because', 'any', 'these', 'give', 'day', 'most', 'us'
    ];
    
    const wordCount = randomInt(minWords, maxWords);
    return Array.from({ length: wordCount }, () => randomChoice(words)).join(' ');
};

// Generate normal distribution numbers (for more realistic data)
export const randomNormal = (mean = 0, stdDev = 1) => {
    // Box-Muller transformation
    const u1 = Math.random();
    const u2 = Math.random();
    const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    return z0 * stdDev + mean;
};

// Generate realistic address components
export const generateAddress = () => {
    const streetNames = ['Main', 'Oak', 'Pine', 'Maple', 'Cedar', 'Elm', 'Washington', 'Lake', 'Hill', 'Sunset', 'Park', 'First', 'Second', 'Broad', 'Market', 'School', 'Church', 'Mill', 'River', 'Center'];
    const streetTypes = ['St', 'Ave', 'Rd', 'Blvd', 'Dr', 'Ln', 'Ct', 'Pl', 'Way', 'Cir'];
    const cities = ['Springfield', 'Fairview', 'Franklin', 'Greenville', 'Madison', 'Georgetown', 'Arlington', 'Ashland', 'Auburn', 'Dayton', 'Dover', 'Hudson', 'Kingston', 'Manchester', 'Milton', 'Oxford', 'Richmond', 'Salem', 'Winchester'];
    const states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];
    
    const streetNumber = randomInt(1, 9999);
    const street = `${streetNumber} ${randomChoice(streetNames)} ${randomChoice(streetTypes)}`;
    const city = randomChoice(cities);
    const state = randomChoice(states);
    const zipCode = randomInt(10000, 99999);
    
    return {
        street,
        city,
        state,
        zipCode,
        country: 'United States',
        fullAddress: `${street}, ${city}, ${state} ${zipCode}`
    };
};
