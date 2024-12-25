const { default: slugify } = require("slugify");
const fileUploaderSvc = require("../../services/fileuploader.service");
const ProductModel = require("./product.model");

class ProductService{

    transformCreateRequest=async(req)=>{
        try{
            let data=req.body;

            let images=[];


            if(req.files){

                for(let image of req.files){
                    let filepath=await fileUploaderSvc.uploadFile(image.path,'/product')
                    images.push(filepath)

                }
            }
            data.images=images;

            //slug
            data.slug=slugify(data.title,{
                lower:true
            })

            //foreign
            if(!data.category|| !Array.isArray(data.category)){
                data.category=null
            }

            if(!data.brand|| data.brand===''||data.brand==='null'){
                data.brand=null
            }

            data.seller=data.seller&&data.seller!==''?data.seller:req.authUser._id;

            data.actualAmt=data.price - data.price*data.discount/100
            


            data.createdBy=req.authUser._id;
            return data;

        }catch(exception){
            console.log("transformCreateRequest",exception);
            throw exception
        }
    }

    transformUpdateRequest=async(req, productData)=>{
        try{
            let data=req.body;

            let images=[
                ...productData['images']
            ];


            if(req.files){

                for(let image of req.files){
                    let filepath=await fileUploaderSvc.uploadFile(image.path,'/product')
                    images.push(filepath)

                }
            }
            data.images=images;

            //foreign
            if(!data.category|| !Array.isArray(data.category)){
                data.category=null
            }

            if(!data.brand|| data.brand===''||data.brand==='null'){
                data.brand=null
            }

            data.seller=data.seller&&data.seller!==''?data.seller:req.authUser._id;

            data.actualAmt=data.price - data.price*data.discount/100
            

            data.updatedBy=req.authUser._id;
            return data;

        }catch(exception){
            console.log("transformUpdateRequest",exception);
            throw exception
        }
    }

    createProduct=async(data)=>{
        try{
            const productObj=new ProductModel(data);
            return await productObj.save();

        }catch(exception){
            console.log("createProduct",exception);
            throw exception
        }
    }

    countData=async(filter={})=>{
        try{

            return await ProductModel.countDocuments(filter)
            
        }catch(exception){
            console.log("CountData",exception)
            throw exception

        }

    }

    listAllProduct=async({skip=0,limit=10,filter={}})=>{
        try{
            let data= await ProductModel.find(filter)
                                .populate("category",["_id","title","slug"])
                                .populate("brand",["_id","title","slug"])
                                .populate("seller",["_id","name","email","phone"])
                                .populate("createdBy",["_id","name","email","status"])
                                .populate("updatedBy",["_id","name","email","status"])
                                .sort({_id:-1})
                                .skip(skip)
                                .limit(limit)
            return data;

        }catch(exception){
            console.log("listAllProduct",exception);
            throw exception
        }
    }

    getSingleByFilter=async(filter)=>{
        try{
            const data=await ProductModel.findOne(filter)
                          .populate("category",["_id","title","slug"])
                          .populate("brand",["_id","title","slug"])
                          .populate("seller",["_id","name","email","phone"])
                          .populate("createdBy",["_id","name","email","status"])
                          .populate("updatedBy",["_id","name","email","status"]);
        if(!data){
            throw {code:404,message:"Product does not exist",status:"BANNER_NOT_FOUND"}
        }

        return data;


        }catch(exception){
            console.log("getSingleByFilter",exception);
            throw exception
        }
    }

    updateByFilter=async(filter,updateData)=>{
        try{
            const resp = await ProductModel.findOneAndUpdate(filter,{$set:updateData})

            return resp;
        }catch(exception){
            console.log("updateByFilter",exception)
            throw exception
        }
    }

    deleteByFilter=async(filter)=>{
        try{
            const resp = await ProductModel.findOneAndDelete(filter)
            return resp;

        }catch(exception){
            console.log("deleteByFilter",exception)
            throw exception
        }
    }
}

const productSvc=new ProductService();
module.exports=productSvc;