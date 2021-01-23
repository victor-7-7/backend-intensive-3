import { ValidationError } from '../index.js';

export const getPort = () => {
    const { PORT } = process.env;

    if (!PORT) {
        throw new ValidationError('Environment variable PORT should be specified');
    }

    const isValid = /^[3-9][0-9]{3}$/.test(PORT);

    if (!isValid) {
        throw new ValidationError(
            'Environment variable PORT should be a number between 3000 and 9999',
        );
    }

    return PORT;
};
