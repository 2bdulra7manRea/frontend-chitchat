import { useEffect, useRef, useState } from "react"
import Peer from "simple-peer"
import "./video.scss"



const VideoPlayer=({socket})=>{
const [stream , setStream]=useState(null)
let myVideo=useRef()
let userVideo=useRef();
useEffect(()=>{
navigator.mediaDevices.getUserMedia({
    video: { facingMode: "user" },
    audio:{
        channelCount:1,
    }
}).then((currentStream)=>{
setStream(currentStream)
}).catch((reason)=>{
})
},[])



function startStreaming(){
myVideo.current.srcObject=stream
}


// function startVideo(){

// let peer = new Peer({initiator:true,trickle:false,stream:stream})

// peer.on("signal",(signal)=>{

// socket.emit("callUser", {signalData: signal, from:localStorage.getItem('name')})

// })

// peer.on("stream",(streamPeer)=>{
// myVideo.current.srcObject=streamPeer; 
// })


// };


// function userGetVideo(){
// let peer = new Peer({initiator:false,trickle:false,stream:stream})
// peer.on("signal",(signal)=>{

// socket.emit("callPatner", {signalData: signal, from:localStorage.getItem('name')})
    
// })

// peer.on("stream",(streamPeer)=>{
// userVideo.current.srcObject=streamPeer; 
// })
    

// }



function closeStream(){
let tracks=stream.getTracks()

tracks.forEach((track)=>{
console.log(track)
track.stop()
})
myVideo.current.srcObject=null
}


    return(<>
    <div className="video-player-view">
        <video width="50%" autoPlay height="100%" muted ref={myVideo} ></video>
        <video width="50%" autoPlay height="100%" muted ref={userVideo} ></video>
    </div>
    <div className='video-actions'>
        <button onClick={startStreaming} >start</button>
        <button>open mic</button>
        <button>Other user</button>
        <button onClick={closeStream} >end</button>
    </div>
    </>)
}



export default VideoPlayer