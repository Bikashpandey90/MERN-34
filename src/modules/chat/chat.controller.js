const authSvc = require("../auth/auth.service");
const chatSvc = require("./chat.service");

class ChatController{
    
    listAllUsers=async(req,res,next)=>{
        try{

            const loggedInUser=req.authUser;
            let chatUsers;
            if(loggedInUser.role==='admin'){
                // fetch all users
                chatUsers=await authSvc.getAllUsers({
                    _id:{$ne:loggedInUser._id}
                })
                

            }else{
                //chat between users ie customers and sellers

                let withWhomIAmChatting= await chatSvc.listAllChatsByUserId(loggedInUser._id);
                let chatUsersId=withWhomIAmChatting.filter((user)=> !user.equals(loggedInUser._id));
                chatUsers=await authSvc.getAllUsers({
                    _id:{$in:chatUsersId}
                })
                
            }
            res.json({
                data:chatUsers,
                message:"Users list",
                status:"USER_LIST",
                options:null

            })

        }catch(exception){
            next(exception)
        }

    }

    getAllChats=async(req,res,next)=>{
        try{
            const receiverId=req.params.receiverId;
            const senderId=req.authUser._id;

            const allChatList=await chatSvc.listAllChats(senderId,receiverId);

            res.json({
                data:allChatList,
                message:"Chats list",
                status:"CHAT_LIST",
                options:null

            })

        }catch(exception){
            next(exception)
        }
    }

    createChat=async(req,res,next)=>{

        try{
            let loggedInUser=req.authUser._id;
            let message={
                message:req.body.message,
                receiver:req.body.receiver,
                sender:loggedInUser
            }
            const chat=await chatSvc.storeChat(message)
            res.json({
                data:chat,
                message:"Chat created",
                status:"CHAT_STORED",
                options:null

            })

        }catch(exception){
            next(exception)
        }
    }

}
const chatController = new ChatController();
module.exports = chatController;