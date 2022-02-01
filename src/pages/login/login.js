import { useState } from 'react';
import { GoogleLogin, useGoogleLogin, useGoogleLogout } from 'react-google-login';
import "./login.scss"
import { message } from 'antd';
const Login=({islogin,setIsLogin})=>{

    const responseGoogle = (response) => {
        console.log(response);
      }

      const onSuccessresponseGoogle = (response) => {
       userLogin(response)
      }
      
    
function userLogin(payload){
// save accesstoken with name and pic in localstorage and googleId
const googleId=payload.googleId;
const accesstoken=payload.accessToken;
const profile=payload.profileObj;
localStorage.setItem('googleId',googleId);
localStorage.setItem('accessToken',accesstoken);
localStorage.setItem('imageUrl',profile.imageUrl);
localStorage.setItem('name',profile.name)
setIsLogin(true)
message.info("You're Signed Up! Congratulations… ")
console.log(payload)
}

const clientId="1079558491303-gs6adk6hda4uf38vgsden3557qduvhh2.apps.googleusercontent.com"

const onSuccess=(response)=>{
userLogin(response)
}

const onFailure=(error)=>{
  console.log(error)
}

const {signIn}= useGoogleLogin({
onSuccess,
onFailure,
clientId,
isSignedIn:true,
accessType:'offline'
})

const onLogoutSuccess=()=>{
  localStorage.clear()
  setIsLogin(false)
  message.info("you have logged out successfully")
}


const {signOut} =useGoogleLogout({
  clientId,
  onLogoutSuccess,
  onFailure,
})


return(<>

{/* <GoogleLogin
    clientId="1079558491303-gs6adk6hda4uf38vgsden3557qduvhh2.apps.googleusercontent.com"
    buttonText="sign in"
    onSuccess={onSuccessresponseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
    isSignedIn={islogin}
  /> */}



{islogin?
<div className='btn-account' onClick={signOut}>
<div className='image-sign'>
 <img src={localStorage.getItem('imageUrl')} width="100%" height="100%" alt='don-do'></img>  
</div>
{localStorage.getItem('name')}
<div>

</div>

</div>:<button onClick={signIn} className='btn-sign-in' >Sign in</button>
}


</>)
}


export default Login