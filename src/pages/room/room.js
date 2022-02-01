
import "./room.scss"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client"
import { Layout } from 'antd';
import pht from "./../../assets/images/m.jpeg";
import { MvChat } from "../../components/message-view-chat/mvChat";
import TextArea from "antd/lib/input/TextArea";
import JoinerCard from "../../components/joiners/joiners";
import VideoPlayer from "../../components/video/video";
const { Sider, Content } = Layout;

const ChatRoom=()=>{
const [socket, setSocket]=useState(null)
const [messages,setMessages]=useState([])
const [joiners ,setJoiners]=useState([])

const params= useParams()


// const {data, loading , error} = GetRoomId(params.id)
useEffect(()=>{
  const connect=io("http://localhost:80",{
    transports:['websocket']
  }) 


setSocket(connect)
connect.emit('join-room',{roomId:params.id})
emitProfile(connect)

return ()=>{
  close(connect)
}

},[])

function close(connect){
  console.log('socket close.....')
  const body={
    imageUrl:localStorage.getItem('imageUrl'),
    name:localStorage.getItem('name'),
    roomId:params.id,
    id:localStorage.getItem('googleId')
    }
connect.emit('ppl-leave',body)
}


useEffect(()=>{
  if(!!socket){
  socket.on('ppl-join',(data)=>{
  console.log('.....joiners.......' ,data)  
  setJoiners([...joiners,data])
  })
  }
  },[joiners,socket])





function emitProfile(connect){
const body={
imageUrl:localStorage.getItem('imageUrl'),
name:localStorage.getItem('name'),
roomId:params.id,
id:localStorage.getItem('googleId')
}
connect.emit('ppl-join',body)
}



useEffect(()=>{
if(!!socket){
socket.on('chat-msg',(data)=>{
setMessages([...messages,data])
})
console.log('.....the second one.......')
}
},[socket,messages])










const [msgValue , setMsgValue]=useState("")

function inputMessageOnChange(event){
  setMsgValue(event.target.value)
}




function sendMessageToSocketServer(){
  console.log('...connect msg to server..')
if(!msgValue){
return;
}
const message={
roomId:params.id,
date:new Date(),
content:msgValue,
profile:{
googleId:localStorage.getItem('googleId'),
name:localStorage.getItem('name'),
imageUrl:localStorage.getItem('imageUrl')
},
}
 socket.emit('chat-msg',message)
// pushMessages(message)
setMsgValue("")
console.log(messages)
}

return (<>

<Layout>
<Content>

<div className="user-speaker-window">
  {!!socket && 
<VideoPlayer socket={socket} ></VideoPlayer>
}
</div>

<div className="windows-speakers">


<div className="speaker-window">
  <img src={pht} alt="tope" width="100%"  height="100%" ></img>
</div>


</div>
</Content>


<Sider collapsible width="450px" >
<div className="side-bar">
<div className="participants-box">
  {joiners.map((item,index)=>{
    return <JoinerCard profile={item} key={index}></JoinerCard>
  })}
</div>          
<div className="chat-box">

<div className="msg-box">

{messages.map((contentMessage,index)=>{
return <MvChat key={index} item={contentMessage} ></MvChat>
})}


</div>
<div className="msg-action">
<div  className="text-msg-box" >
<textarea  value={msgValue} onChange={inputMessageOnChange} placeholder="Message..." rows="1"  >
</textarea>

</div>
<div className="btn-msg-box">

  <button onClick={sendMessageToSocketServer} >Send</button>
</div>
</div>










</div>
</div>
</Sider>
</Layout>


</>)
}

export default ChatRoom