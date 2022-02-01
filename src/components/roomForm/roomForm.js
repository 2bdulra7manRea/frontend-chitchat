import { SmileOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { Form, Input, DatePicker, TimePicker, Select, Cascader, InputNumber, Mentions ,Modal } from 'antd';
import { useEffect, useState } from 'react';
import { AddRoom, CREATE_ROOM } from '../../core/graphql/mutation/room.mutation';



const RoomForm=({isModalVisible ,setIsModalVisible , getData , editMode})=>{

const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

const [dataForm, setdataForm]=useState({title:"" , number:1 , language:"" , level:"any"})
const [createRoom,{data,error,loading}]=useMutation(CREATE_ROOM)   

useEffect(()=>{

console.log(editMode)

if(editMode.edit){
setdataForm({title:editMode.item.title , number:editMode.item.number , language:editMode.item.language , level:editMode.item.level})
}
},[])



const AddRoom=(body)=>{
const variables = {
    title:body.title,
    language:body.language,
    level:body.level,
    number:body.number
}
return createRoom({variables:variables})
}


const handleOk = () => {
  AddRoom(dataForm).then((v)=>{
  getData(v)
  setdataForm({title:"" , number:1 , language:"" , level:"any"})
  setIsModalVisible(false);
  }).catch((r)=>{
  console.log(r)
  })
};

const handleCancel = () => {
  setdataForm({title:"" , number:1 , language:"" , level:"any"})
  setIsModalVisible(false);
};


function handlSelectForm(event,type){
if(!event){
    return;
}

switch (type) {
    case "language":
    setdataForm({
    ...dataForm,
    language:event
    })
    break;
    case "level":
    setdataForm({
    ...dataForm,
    level:event
    })
    break;
    case "number":
        setdataForm({
        ...dataForm,
        number:event
        })
    break;
default:
    break

}
}

function handlForm(event,type){

if(!event ||!event.target || !event.target.value){
    return;
}

switch (type) {
    case "title":
    setdataForm({
    ...dataForm,
    title:event.target.value
    })
    break;
    default:
    break;
}
}



return(<>

<Modal title={editMode.edit?"Edit the Conversation":"Start new Conversation"} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>


  <Form {...formItemLayout}>
  <Form.Item required  label="The Title" hasFeedback validateStatus="success">
      <Input allowClear placeholder="the title of the room" value={dataForm.title} onChange={(ev)=>handlForm(ev,'title')} />
    </Form.Item>

    <Form.Item required  label="The language"  placeholder="the language" hasFeedback validateStatus="error">
        <Select allowClear value={dataForm.language} onChange={(ev)=>handlSelectForm(ev,'language')} >
            <Option  value="English " >  English  </Option>
            <Option  value="Simplified Chinese " >  Simplified Chinese  </Option>
            <Option  value="Spanish " >  Spanish  </Option>
            <Option  value="Japanese " >  Japanese  </Option>
            <Option  value="German " >  German  </Option>
            <Option  value="French " >  French  </Option>
            <Option  value="Russian " >  Russian  </Option>
            <Option  value="Arabic " >  Arabic  </Option>
            <Option  value="Portuguese " >  Portuguese  </Option>
            <Option  value="Italian " >  Italian  </Option>
            <Option  value="Korean " >  Korean  </Option>
            <Option  value="Dutch " >  Dutch  </Option>
            <Option  value="Hindi " >  Hindi  </Option>
            <Option  value="Chinese traditiona " >  Chinese traditiona  </Option>
        </Select>
    </Form.Item>

    <Form.Item required label="the number" placeholder="number of people can join"  hasFeedback validateStatus="success">
      <InputNumber style={{ width: '100%' }} min={1} max={10} defaultValue={dataForm.number} onChange={(ev)=>handlSelectForm(ev,'number')} />
    </Form.Item>

    <Form.Item  label="The Level" placeholder="the level">
      <Select  value={dataForm.level} onChange={(ev)=>handlSelectForm(ev,'level')} >
        <Option value="any level">any level</Option>
        <Option value="beginner">beginner</Option>
        <Option value="intermedate">intermedate</Option>
        <Option value="advanced">advanced</Option>
        <Option value="upper advanced">upper advanced</Option>
      </Select>
    </Form.Item>
  
  </Form>
  </Modal>
  </>)

}

export default RoomForm