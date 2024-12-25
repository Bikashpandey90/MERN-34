const mongoose=require("mongoose");
const { commonStr, schemaOpts } = require("../../common/schema");
const BrandSchema=new mongoose.Schema({
   title:{
    type:String,
    min:3,
    max:100,
    unique:true,
    required:true
   },
   slug:{
    type:String,
    default:null,
    unique:true
   },
   image:{
    type:String
  
   },
   ...commonStr

},schemaOpts);
const BrandModel=mongoose.model("Brand",BrandSchema)   //collection name(table)=> Brands



module.exports=BrandModel