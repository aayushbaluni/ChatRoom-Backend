const express=require("express");
const {Server}=require('socket.io');
const http=require('http');

const cors=require('cors')

const router=require("./router");

const PORT=process.env.PORT||8000;



const app=express();
app.use(cors());

app.get('/',(req,res)=>res.send("Hello"));

app.use(router);
const server=http.createServer(app);
const io=new Server(server);
const {addUser,removeUser,getUser,getUserInRoom}=require('./user')
io.on('connection',function(socket){
    console.log("User Joined")
    socket.on("join",({name,room},callback)=>{
      try{
        console.log({name,room});
        const {err,user}=addUser({id:socket.id,name,room});
       
        
        if(err!==undefined){
           return  callback({error:err});
        }
        // console.log(user);
        socket.emit("message",{user:'admin',text:`${user.name}, welcome to the room ${user.room}`});
      
        socket.broadcast.to(user.room).emit('message',{user:'admin',text:`${user.name} has joined the chat!`})
        socket.join(user.room);
        
      }
      catch(err){
        callback(err);
      }

    });
    socket.on('sendMessage',({name,room,message},callback)=>{
        // console.log("name ", name,room);
        const user=getUser(name,room);
        // console.log(user);
        io.to(user.room).emit("message",{user:user.name,text:message});
        callback();
    })
    socket.on("disconnec",({name,room})=>{
        console.log("disconnected..");
        removeUser(name,room);
    })
});


server.listen(PORT,()=>{
    console.log(`server started on PORT ${PORT}`);
})