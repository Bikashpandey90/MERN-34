const { default: mongoose } = require("mongoose");
const { createdBy, updatedBy, schemaOpts } = require("../../common/schema");

const OrderSchema=new mongoose.Schema({

    buyer:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    },
    orderDate:Date,
    subTotal:Number,
    discount:Number,
    tax:Number,
    serviceCharge:Number,
    deliveryCharge:Number,
    total:Number,
    isPaid:Boolean,
    status:{
        type:String,
        enum:["pending","completed","cancelled"],
        default:"pending"
    },
    createdBy:createdBy,
    updatedBy:updatedBy


},schemaOpts)

const OrderModel=mongoose.model("Order",OrderSchema);
module.exports=OrderModel