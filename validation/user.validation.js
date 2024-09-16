let Joi = require("joi");

let user = {
    body: Joi.object().keys({
        firstname: Joi.string().required().trim(),
        lastname: Joi.string().required().trim(),
        email: Joi.string().required().trim(),
        phone : Joi.number().required(),
        password: Joi.string().required().trim(),
        confirmpassword: Joi.string().required().trim(),
    }),
};

module.exports = { user };