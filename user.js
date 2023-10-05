const users=[];

const addUser=({id,name,room})=>{
    try{
        name=name.toLowerCase();
    room=room.toLowerCase();
    const existingUser=users.find((user)=>user.room===room && user.name===name);
    if(existingUser){
        return {error:"Username is taken"}
    }
    const user={id,name,room};
    users.push(user);
    return {user};
    }
    catch(err){
        return [err];
    }
}
const removeUser=(name,room)=>{
    const index=users.findIndex((user)=>user.name===name && user.room===room);
    if(index!=-1){
        return users.splice(index,1)[0];
    }
}

const getUser=(name,room)=>{
    // console.log(users);
   const user= users.find((user)=>user.name===name && user.room===room);
//    console.log('get: ', user);
// console.log("found User",user);
   return user;
}

const  getUserInRoom=room=>users.filter((user)=>users.room===room);


module.exports={addUser,removeUser,getUser,getUserInRoom};