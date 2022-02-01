
import "./joiners.scss"

const JoinerCard=({profile})=>{



return(<>
<div className="joiner-card">
<div className="box-content" >
<div className="joiner-img">
    <img src={profile.imageUrl} width="100%" height="100%" alt="join"></img>
</div>
<p>{profile.name}</p>
</div>

<p style={{color:"greenyellow"}} >{profile.status}</p>
</div>
</>)
}

export default JoinerCard