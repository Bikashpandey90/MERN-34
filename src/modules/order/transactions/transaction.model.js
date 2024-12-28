const { default: mongoose } = require("mongoose");
const { schemaOpts, commonStr } = require("../../../common/schema");

const TransactionSchema=mongoose.Schema({
    orderId:{
        type:mongoose.Types.ObjectId,
        ref:"Order",
        required:true
    },
    transactionCode:{
        type:String,
        unique:true,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    paymentMethods:{
        type:String,
        enum:['esewa','khalti','connectips','bank','cash','other'],
        default:'cash'
    },
    data:{
        type:String
    },
    ...commonStr


},schemaOpts)

const TransactionModel=mongoose.model("Transaction",TransactionSchema)
module.exports=TransactionModel

