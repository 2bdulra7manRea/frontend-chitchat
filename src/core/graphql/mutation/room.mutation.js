
import{gql, useMutation} from "@apollo/client"
export const CREATE_ROOM=gql`
mutation AddRoom($title:String! , $language:String! , $level:String! , $number:Int!){
createRoom(roomInput:{title:$title , language:$language , level:$level ,number:$number}){
id
title
language
level
number
}
}
`
