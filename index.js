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

const http = require("http");
const app = require("./src/config/express.config")
//socket server
const { Server } = require("socket.io");
const { prototype } = require("events");

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: "*"
});


//on is event listener
io.on('connection', (socket) => {
    // console.log("Socket",socket.id)

    io.emit("connected", { id: socket.id })
    //  socket.emit("connected",{id:socket.id})

    socket.on('newMessage', (data) => {
        socket.broadcast.emit("messageReceived", data)
    })
});
// io.emit();


const port = process.env.PORT || 9005;
httpServer.listen(port, '192.168.0.101', (errr) => {                          //'192.168.0.110'
    if (!errr) {
        console.log("Server is running on port", port)
        console.log("Press ctrl+c to disconnect");
    }

});

httpServer.on("error", (err) => {

});
