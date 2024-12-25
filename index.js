// // Packages required in every projects
// // http server(node server then express ko app || directly express server )
// const http =require("http");

// const httpServer=http.createServer((req,res)=>{
//     res.end("Hello World");
// });

// httpServer.listen(9005,'127.0.0.1',(err)=>{
//     if(!err){
//         console.log("Server is running on port",9005)
//         console.log("Presss CTRl+C to discountinue server...")
//     }
// });




const http=require("http");
const app= require("./src/config/express.config")
const httpServer=http.createServer(app);
httpServer.listen(9005,'127.0.0.1',(errr)=>{
    if(!errr){
        console.log("Server is running on port",9005)
        console.log("Press ctrl+c to disconnect");
    }

});

httpServer.on("error",(err)=>{

});
