import io from "socket.io-client"

export default class SocketService{

socket;

connect(){
     this.socket=io("http://localhost:80",{
        transports:['websocket']
      }) 
      console.log(this.socket)  
}


send(event,data){
        if(this.socket){
         this.socket.emit(event,data)   
        }
}

get(event){
return new Promise((resolve)=>{
this.socket.on(event,(data)=>{
resolve(data)
})
})
}


disconnect(){

this.socket.disconnect()

}








}