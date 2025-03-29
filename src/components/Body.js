import RestrauntCard from "./RestaurantCard"
import Shimmer from "./shimmer"
import {useState,useEffect} from "react"
const Body= ()=>{
    const [ListofRestaurant,setListofRestaurant]=useState([]);
    const [searchText,setSearchText]=useState("")
    const [filteredRestaurant,setFilteredRestaurant]=useState([]);
    useEffect(()=>{
        fetchData();
    },[]);
    const fetchData= async ()=>{
        const data=await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING");
        const json =await data.json();
        console.log(json)
        setListofRestaurant(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
        setFilteredRestaurant(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
    }
    
    return ListofRestaurant.length===0? <Shimmer/>: (
        <div className="body">
            <div className="filter">
                <div className="search">
                <input type="text" className="search-box" value={searchText} onChange={(e) =>{
                    setSearchText(e.target.value)
                }}></input>
                <button onClick={()=>{
                    const filteredRestaurant=ListofRestaurant.filter((res)=> res.info.name.toLowerCase().includes(searchText.toLowerCase()));
                    setFilteredRestaurant(filteredRestaurant)
                }}>search</button>
            </div>
                <button className="filter-btn" onClick={()=>{filteredList=ListofRestaurant.filter(res=> res.info.avgRating>4); setListofRestaurant(filteredList);}}>Top-Rated Restaurants</button>
            </div> 
            <div className="res-container">
                {filteredRestaurant.map(restaurants=><RestrauntCard key={restaurants.info.id} resData={restaurants}/>)}
            </div>
        </div>
    )
}
export default Body;