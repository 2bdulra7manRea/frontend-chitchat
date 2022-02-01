
import "./mv.scss"
import Pf from "./../../assets/images/m.jpeg"
import moment from "moment"
export const MvChat=({item})=>{


function convert(d){
    return moment(d).format('hh:mm')
}

return(<>


<div className="mv-chat">

<div className="prof-box">

<div className="prof-image">
    <img src={item.profile.imageUrl} alt="profim" width="100%" height="100%" ></img>
</div>

</div>
<div className="mv-chat-det" >

<div className="mv-chat-header">
    <p>{item.profile.name}</p>
    <span>{convert(item.date)}</span>
</div>

<div className="mv-chat-msg">
<p>{item.content}</p>
</div>


</div>



</div>


</>)
}