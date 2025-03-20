const Joi = require('joi');

const WishListDTO = Joi.object({
    productId: Joi.string().required()
})

module.exports = WishListDTO