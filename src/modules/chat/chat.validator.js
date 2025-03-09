const Joi = require("joi");

const ChatMessageDTO=Joi.object({
    receiver:Joi.string().required(),
    message:Joi.string().required(),
    
})
module.exports={
    ChatMessageDTO
}