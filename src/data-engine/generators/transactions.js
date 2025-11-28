import { randomChoice, randomDate, randomId, randomFloat } from '../../utils/randomizers';

const types = ['purchase', 'refund', 'transfer', 'deposit', 'withdrawal'];
const statuses = ['completed', 'pending', 'failed', 'cancelled'];
const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD'];
const paymentMethods = ['credit_card', 'debit_card', 'paypal', 'bank_transfer', 'crypto'];

export const generateTransactions = (count, userIds = []) => {
    return Array.from({ length: count }, () => {
        return {
            id: randomId('txn'),
            type: randomChoice(types),
            amount: randomFloat(10, 10000),
            currency: randomChoice(currencies),
            status: randomChoice(statuses),
            paymentMethod: randomChoice(paymentMethods),
            description: `${randomChoice(types)} transaction`,
            userId: userIds.length > 0 ? randomChoice(userIds) : randomId('usr'),
            createdAt: randomDate(new Date(2023, 0, 1), new Date()),
            processedAt: randomDate(new Date(2023, 0, 1), new Date())
        };
    });
};
