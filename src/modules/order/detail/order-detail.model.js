const { default: mongoose } = require("mongoose");
const { schemaOpts, createdBy, updatedBy } = require("../../../common/schema");
const { required } = require("joi");

const OrderDetailSchema=new mongoose.Schema({
    orderId:{
        type:mongoose.Types.ObjectId,
        ref:"Order",
        default:null
    },
    buyer:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true

    },
    product:{
        type:mongoose.Types.ObjectId,
        ref:"Product",
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        min:1
    },
    totalAmt:{
        type:Number,
        required:true

    },
    status:{
        type:String,
        enum:["cart","paid","cancelled"]
        
    },
    seller:{
        type:mongoose.Types.ObjectId,
        ref:"User",

    },
    createdBy:createdBy,
    updatedBy:updatedBy

},schemaOpts);


const OrderDetailModel=mongoose.model("OrderDetail",OrderDetailSchema)
module.exports=OrderDetailModel;