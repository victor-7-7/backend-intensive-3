// https://github.com/ajv-validator/ajv
// https://ajv.js.org/
// JSON Schema validation keywords
// https://github.com/ajv-validator/ajv/blob/master/docs/json-schema.md
import Ajv from 'ajv';
import { ValidationError } from './customErrors.js';

export const validator = (schema) => (req, res, next) => {
    const ajv = new Ajv({ allErrors: true });
    const validate = ajv.compile(schema);

    const valid = validate(req.body);
    if (valid) {
        return next();
    }
    // const errorsArr = validate.errors.map(({ message }) => message);
    // res.status(400).json({ message: errorsArr.join(', ') });

    let msg = '[';
    // validate.errors - массив ошибок валидации
    for (const error of validate.errors) {
        switch (error.keyword) {
            case 'additionalProperties':
                msg += ` ${error.message} - ${error.params.additionalProperty},`;
                break;
            case 'required':
                msg += ` ${error.message},`;
                break;
            default:
                if (error.keyword === 'type' && error.dataPath === '') {
                    msg += ` entity req.body ${error.message},`;
                } else {
                    msg += ` ${error.keyword} for ${error.dataPath} ${error.message},`;
                }
        }
    }
    // https://stackoverflow.com/questions/4810841/pretty-print-json-using-javascript
    // req.body - это JS объект, а не JSON
    msg += ' ]\n' + JSON.stringify(req.body, null, 2);

    next(new ValidationError(msg));
};
