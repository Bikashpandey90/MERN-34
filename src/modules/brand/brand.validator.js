const Joi = require("joi");

const brandCreateDTO=Joi.object({
    title:Joi.string().min(3).max(100).required(),
    status:Joi.string().regex(/^(active|inactive)$/).required()
   
})

const brandUpdateDTO=Joi.object({
    title:Joi.string().min(3).max(100).required(),
    status:Joi.string().regex(/^(active|inactive)$/).required()
   
}).unknown()
module.exports={
    brandCreateDTO,
    brandUpdateDTO
}