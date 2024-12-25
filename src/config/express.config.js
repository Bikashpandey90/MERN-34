const express=require("express");
//load mongo db
require("./db.config");

//import router
const apiRouter=require("../router/router");

const app=express();


//body parser
app.use(express.json())//json parser
app.use(express.urlencoded(
    {
        extended:false
    }
))

//router mount
//app.use(apiRouter)
app.use((req,res,next)=>{
    next()
})

//versioning
app.use('/api/v1',apiRouter)
// app.use("api/v2",apiRouter)



app.use((req,res,next)=>{
    next({code:404,message:"Not found",status:"NOT_FOUND"});

    
})
//error handling middleware

app.use((error,req,res,next)=>{
    let code=error.code||500;
    let detail=error.detail||{};
    let message=error.message||"Internal Sever Error"
    let status=error.status||"INTERNAL_SERVER_ERROR"

    //uniqueness validation failed
    if(+error.code===11000){
        code=400
        //{keyPattern:{email:1,name:1}}=>['email','name']
        Object.keys(error.keyPattern).map((key)=>{
            detail[key]=`${key} should be unique`

        })
        status="VALIDATION_FAILED"
        message="Validation Failed"
    }
   

    console.log(error)
    res.status(code).json({
        data:detail,
        message: message,
        status:status,
        options:null

    })
    


})



module.exports=app