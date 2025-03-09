const mongoose=require('mongoose');

const ChatSchema=new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    receiver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    message:{
        type:String,
        required:true

    }},
    {
        timestamps:true,
        autoCreate:true,
        autoIndex:true
    }

)

const ChatModel=mongoose.model('Chat',ChatSchema);
module.exports=ChatModel;