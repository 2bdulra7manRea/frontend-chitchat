
import CardChat from "../../components/cardRoom/cardChatComponent"
import "./home.scss"
import { Drawer, Button } from 'antd';
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ROOMS } from "../../core/graphql/query/room";
import SpinnerTk from "../../components/spinner/spinnerTk";
import { Modal } from 'antd';
import RoomForm from "../../components/roomForm/roomForm";
import Login from "../login/login";

const HomePage=()=>{
const {loading,data} = useQuery(GET_ROOMS,{fetchPolicy: "no-cache"})
const [ roomData , setRoomData]=useState([])
const [editMode , seteditMode]=useState({edit:false , item:''})
const [islogin,setIsLogin]=useState(false)


useEffect(()=>{
if(!loading){
  if(!!data){
   setRoomData(data.rooms) 
  }
}
},[data])
function getData(value){
setRoomData([...roomData,value])
}


function openModelEdit(item){
  console.log(item)
seteditMode({
edit:true,
item:item
})

setIsModalVisible(true)
}

const [isModalVisible, setIsModalVisible] = useState(false);


function addNewConversation(){
  seteditMode({edit:false , item:''})
  setIsModalVisible(true);
}


return(<>
<div className="home-page">

<div style={{width:"80%"}}>
<div className="home-header">

{islogin &&
<button  onClick={addNewConversation} className="start-cov-btn"> start new conversation </button>
}
<div>
<Login islogin={islogin} setIsLogin={setIsLogin}></Login>  
</div>





</div>
<div className="chats-view">
{loading?<SpinnerTk/> :roomData.map((itm,idx)=>(<CardChat openModelEdit={openModelEdit} item={itm} key={idx}></CardChat>))
}
</div>
</div>
</div>


{isModalVisible && islogin &&
<RoomForm isModalVisible={isModalVisible} editMode={editMode}  getData={getData} setIsModalVisible={setIsModalVisible}  ></RoomForm>
}
      {/* <Drawer headerStyle={{backgroundColor:"rgb(41, 39, 44)",color:"white"}} bodyStyle={{backgroundColor:"rgb(41, 37, 44)"}} title="Start new Conversation" placement="right" onClose={onClose} visible={visible}>

      </Drawer> */}
</>)
}



export default HomePage