import { CDN_LINK } from "../utils/constant"

const RestrauntCard= (props)=>{
    const {resData}=props
    const {costForTwo,cloudinaryImageId,name,cuisines,avgRating}=resData?.info
    return (
        <div className="res-card" style={{ backgroundColor:"#f0f0f0"}}>
            <img 
            className="res-logo"
            alt="res-logo" 
            src={CDN_LINK+cloudinaryImageId}></img>
            <h3>{name}</h3>
            <h4>{cuisines.join(", ")}</h4>
            <h4>{avgRating}</h4>
            <h4>{costForTwo}</h4>
        </div>
    )
}
export default RestrauntCard