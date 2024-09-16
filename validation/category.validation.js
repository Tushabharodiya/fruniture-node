let Joi = require("joi");

let category = {
    body: Joi.object().keys({
        categoryname: Joi.string().required().trim(),
    }),
};

module.exports = { category };