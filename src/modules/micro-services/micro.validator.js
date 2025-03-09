const Joi = require("joi");

const newsLetterDTO = Joi.object({
    email: Joi.string().email().required().messages({
        "string.email": "Please enter a valid email",
        "string.required": "Email is required",

    })
})
module.exports = {
    newsLetterDTO
}