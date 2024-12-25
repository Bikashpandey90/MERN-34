const slugify = require("slugify");
const fileUploaderSvc = require("../../services/fileuploader.service");
const BrandModel = require("./brand.model");

class BrandService{

    transformCreateRequest=async(req)=>{
        try{
            let data=req.body;
            //title
            //special chars=>remove
            //space replace=>-
            //lowercase convert
            data.slug=slugify(data.title,{
                lower:true
                
            })

            if(req.file){
                data.image=await fileUploaderSvc.uploadFile(req.file.path,'/brand')
            }
            data.createdBy=req.authUser._id;
            return data;

        }catch(exception){
            console.log("transformCreateRequest",exception);
            throw exception
        }
    }

    transformUpdateRequest=async(req, brandData)=>{
        try{
            let data=req.body;
            if(req.file){
                data.image=await fileUploaderSvc.uploadFile(req.file.path,'/brand')
            }else{
                data.image=brandData.image
            }
            data.updatedBy=req.authUser._id;
            return data;

        }catch(exception){
            console.log("transformUpdateRequest",exception);
            throw exception
        }
    }

    createBrand=async(data)=>{
        try{
            const brandObj=new BrandModel(data);
            return await brandObj.save();

        }catch(exception){
            console.log("createBrand",exception);
            throw exception
        }
    }

    countData=async(filter={})=>{
        try{

            return await BrandModel.countDocuments(filter)
            
        }catch(exception){
            console.log("CountData",exception)
            throw exception

        }

    }

    listAllBrand=async({skip=0,limit=10,filter={}})=>{
        try{
            let data= await BrandModel.find(filter)
                                .sort({_id:1})
                                .skip(skip)
                                .limit(limit)
            return data;

        }catch(exception){
            console.log("listAllBrand",exception);
            throw exception
        }
    }

    getSingleByFilter=async(filter)=>{
        try{
            const data=await BrandModel.findOne(filter)
                          .populate("createdBy",["_id","name","email","status"])
                          .populate("updatedBy",["_id","name","email","status"]);
        if(!data){
            throw {code:404,message:"Brand does not exist",status:"BANNER_NOT_FOUND"}
        }

        return data;


        }catch(exception){
            console.log("getSingleByFilter",exception);
            throw exception
        }
    }

    updateByFilter=async(filter,updateData)=>{
        try{
            const resp = await BrandModel.findOneAndUpdate(filter,{$set:updateData})

            return resp;
        }catch(exception){
            console.log("updateByFilter",exception)
            throw exception
        }
    }

    deleteByFilter=async(filter)=>{
        try{
            const resp = await BrandModel.findOneAndDelete(filter)
            return resp;

        }catch(exception){
            console.log("deleteByFilter",exception)
            throw exception
        }
    }
}

const brandSvc=new BrandService();
module.exports=brandSvc;