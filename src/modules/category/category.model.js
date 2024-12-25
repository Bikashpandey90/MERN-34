const mongoose=require("mongoose");
const { commonStr, schemaOpts } = require("../../common/schema");


//Electonics parent
    //Smart phones under Electronics
         //iphones under smart phones
         //android under smart phones


//electronics=> id=1,parentId=null ===> parentId null is always top level category
//smartphones=>id=2,parentId=1
//iphone=>id=3 ,parentId=2
//android=>id=4,parentid=2


const CategorySchema=new mongoose.Schema({
   title:{
    type:String,
    min:3,
    max:100,
    unique:true,
    required:true
   },parentId:{
      type:mongoose.Types.ObjectId,
      ref:"Category",
      default:null
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
const CategoryModel=mongoose.model("Category",CategorySchema)   //collection name(table)=> Categorys



module.exports=CategoryModel