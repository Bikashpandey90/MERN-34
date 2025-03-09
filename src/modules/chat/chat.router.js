const chatRouter= require('express').Router();
const { checkLogin } = require("../../middlewares/auth.middleware");
const { bodyValidator } = require('../../middlewares/bodyvalidator.middleware');
const chatController = require('./chat.controller');
const { ChatMessageDTO } = require('./chat.validator');



///chat List

chatRouter.get('/list-user',checkLogin,chatController.listAllUsers)
chatRouter.get('/detail/:receiverId',checkLogin,chatController.getAllChats)
chatRouter.post('/send',checkLogin,bodyValidator(ChatMessageDTO),chatController.createChat)



module.exports=chatRouter;