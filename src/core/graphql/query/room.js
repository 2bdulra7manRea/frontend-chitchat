
import{gql, useQuery} from "@apollo/client"

export const GET_ROOMS=gql`
query {
    rooms{
        title
        id
        language
        number
        level
        joiners {
            name
            id
            roomId
            imageUrl
        }
    }
}
`


const GET_ROOM_BY_ID=gql`
query DogetRoom($id:String!){
getRoom(id:$id){
title
id
number
level
language
}
}
`
export const GetRoomId=(id)=>{
console.log(id , ' i d')
const {data , loading , error} = useQuery(GET_ROOM_BY_ID,{variables:{id:id}})
console.log(data , loading)
return {
    data,
    loading, 
    error,
}
}
