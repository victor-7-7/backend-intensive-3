// JSON Schema validation keywords
// https://github.com/ajv-validator/ajv/blob/master/docs/json-schema.md
export const userScheme = {
    type:       'object',
    properties: {
        name: {
            type:      'string',
            minLength: 3,
        },
        email: {
            type:   'string',
            format: 'email',
        },
    },
    required:             [ 'name', 'email' ],
    additionalProperties: false,
};
