import { useEffect } from "react"
import { CDN_LINK } from "../utils/constant"

const RestaurantCard = (props) => {
    const { resData } = props
    const { costForTwo, cloudinaryImageId, name, cuisines, avgRating } = resData?.info
    
    // Determine color for rating badge based on rating value
    const ratingColor = avgRating >= 4 
        ? "bg-green-500" 
        : avgRating >= 3 
            ? "bg-orange-400" 
            : "bg-red-500";
            
    
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative">
                <img 
                    className="w-full h-48 object-cover"
                    alt={name} 
                    src={CDN_LINK + cloudinaryImageId}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-gray-800 line-clamp-1">{name}</h3>
                    <span className={`${ratingColor} text-white text-sm px-2 py-1 rounded flex items-center`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {avgRating}
                    </span>
                </div>
                
                <p className="text-gray-600 text-sm line-clamp-1 mb-2">{cuisines.join(", ")}</p>
                
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <span className="text-gray-700 font-medium">{costForTwo}</span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        25-35 min
                    </span>
                </div>
            </div>
        </div>
    )
}

export default RestaurantCard

export const PromotedRestrauntCard=() =>{
    return (props) =>{
        return(
            <div>
            <label className="absolute bg-black text-white p-2 rounded-lg z-10">Promoted</label>
            <RestaurantCard {...props}/>
            </div>
        )
    }
}