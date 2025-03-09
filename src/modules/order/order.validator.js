const Joi = require("joi");

const AddToCartDTO = Joi.object({
    productId: Joi.string().required(),
    quantity: Joi.number().min(1).max(5).required()

})

const CheckOutDTO = Joi.object({
    cartId: Joi.array().items(Joi.string().required()).required(),
    discount: Joi.number().allow(null, 0, '').default(0),
    serviceCharge: Joi.number().allow(null, 0, '').default(0),
    deliveryCharge: Joi.number().allow(null, 0, '').default(0)
})
const PaymentDTO = Joi.object({
    method: Joi.string().regex(/^(esewa|khalti|connectips|bank|cash|other)$/).default('cash'),
    amount: Joi.number().min(100).required(),
    transactionCode: Joi.string().allow(null, '').default(null),
    data: Joi.any()

})

module.exports = {
    AddToCartDTO,
    CheckOutDTO,
    PaymentDTO

}