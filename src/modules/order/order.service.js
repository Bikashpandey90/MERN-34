const OrderModel = require("./order.model");
const TransactionModel = require("./transactions/transaction.model");

class OrderService{

    createOrder=async(data)=>{

        try{
            const OrderObj=new OrderModel(data);
            return await OrderObj.save()

        }catch(exception){
            console.log(exception);
            throw exception
        }

    }

    getSingleOrderByFilter=async(filter)=>{
        try{
            const orderDetail=await OrderModel.findOne(filter)
                                

        
           if(!orderDetail){
            throw {code:400,message:"Order Not found",status:"ORDER_NOT_FOUND"}
           }
           return orderDetail

        }catch(exception){
            console.log(exception);
            throw exception
        }
    }

    populateTranscation=async(transactionData)=>{
        try{
            const transactionObj=new TransactionModel(transactionData)
            return await transactionObj.save()

        }catch(exception){
            console.log(exception);
            throw exception
        }
    }

    updateOneOrderByFilter=async(filter,data)=>{
        try{
            const response=await OrderModel.findOneAndUpdate(filter,{$set:data},{new:true})
            return response

        }catch(exception){
            throw exception
        }
    }


    getAllOrderByFilter=async(filter)=>{
        try{
            let data=await OrderModel.find(filter)
                      .populate("buyer",['_id','name','email','phone'])

            return data;

        }catch(exception){
            console.log(exception);
            throw exception
        }
    }

}

const orderSvc= new OrderService()
module.exports=orderSvc