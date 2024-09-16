let Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi);

let product = {
    body: Joi.object().keys({
        frontimage: Joi.string(),
        backimage: Joi.string(),
        title: Joi.string().required().trim(),
        price: Joi.number().required(),
        discount: Joi.number().required(),
        category: Joi.objectId().required(),
        description: Joi.string().optional(),
        quantity: Joi.number().optional().default(1),
        stoke: Joi.number().optional().default(1),
        available: Joi.boolean().optional().default(true),
        public_id: Joi.array().items(Joi.string()).optional(),
    }),
};

module.exports = { product };