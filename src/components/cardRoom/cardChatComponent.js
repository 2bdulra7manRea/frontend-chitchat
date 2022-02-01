
import "./cardChat.scss"
import { SettingOutlined } from '@ant-design/icons';

import prof from "./../../assets/images/m.jpeg"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react";


const CardChat=({item , openModelEdit})=>{

const nav=useNavigate()


useEffect(()=>{
},[])


 const gotoChat=()=>{
if(!!item.id && item.id !=="undefined"){

nav('/chat/'+item.id)

}
 }   

return<>
<div className="card-chat">
<div className="card-chat-header">
    
<div className="text-chat">
 <p>{item.level?item.level:"any level"}</p>       
 <h6>{item.title}</h6>

</div>

 <div className="od-icon" onClick={()=>openModelEdit(item)}><SettingOutlined   /></div>   
</div>


<div className="card-chat-body">
{item.joiners&&item.joiners.length!==0&&item.joiners.map((pro)=>{

return <div className="chat-p-profile">
<div className="chat-p-profile-img">
<img src={pro.imageUrl} width="100%" height="100%"  alt="profile-p" />
</div>
<p>{pro.name}</p>
</div>

})}

</div>
<div className="card-chat-action">
    <button onClick={gotoChat} >Join Conversation</button>
</div>
</div>
</>
}
export default CardChat