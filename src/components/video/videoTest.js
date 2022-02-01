import react,{useEffect , useState , useRef} from 'react'
import Peer from "simple-peer"

const VideoTest=()=>{


useEffect(()=>{

let peer1 = new Peer({initiator:true});
let peer2= new Peer();

peer1.on('signal',(data)=>{
    console.log('peer 1 signal ::::::::::::::')
peer2.signal(data)

})


peer2.on('signal',(data)=>{
    console.log('peer 2 signal ::::::::::::::')
    peer1.signal(data)

})


peer1.on('connect',()=>{
console.log('peer 1 connected ::::::::::::::')

// peer1.send('hi i am peer1')

})

peer2.on('connect',(data)=>{

  console.log('data from to peer2',data)
})

},[])





return(<></>)
}

export default VideoTest