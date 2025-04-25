import RestrauntCard from "./RestaurantCard"
import Shimmer from "./shimmer"
import {useState, useEffect} from "react"
import { Link } from "react-router-dom"
import useOnlineStatus from "../utils/useOnlineStatus"

const Body = () => {
    const [ListofRestaurant, setListofRestaurant] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [filteredRestaurant, setFilteredRestaurant] = useState([]);
    
    useEffect(() => {
        fetchData();
    }, []);
    
    const fetchData = async () => {
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING");
        const json = await data.json();
        console.log(json.data);
        setListofRestaurant(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setFilteredRestaurant(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
      }
    
    const handleSearch = () => {
        const filtered = ListofRestaurant.filter((res) => 
            res.info.name.toLowerCase().includes(searchText.toLowerCase()));
        setFilteredRestaurant(filtered);
    };
    
    const handleTopRatedFilter = () => {
        const filtered = ListofRestaurant.filter(res => res.info.avgRating > 4);
        setFilteredRestaurant(filtered);
    };
    
    const onlineStatus = useOnlineStatus();
    
    if (onlineStatus === false) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md max-w-md mx-auto">
                    <p className="font-bold">You are offline!</p>
                    <p>Please check your internet connection and try again.</p>
                </div>
            </div>
        );
    }
    
    return ListofRestaurant.length === 0 ? (
        <Shimmer />
    ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <div className="relative flex-grow">
                            <input 
                                type="text" 
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-500 outline-none transition-all" 
                                placeholder="Search restaurants..." 
                                value={searchText} 
                                onChange={(e) => setSearchText(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') handleSearch();
                                }}
                            />
                        </div>
                        <button 
                            className="w-full sm:w-auto px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                            onClick={handleSearch}
                        >
                            Search
                        </button>
                    </div>
                    <button 
                        className="w-full sm:w-auto px-4 py-2 bg-pink-100 text-pink-700 rounded-lg hover:bg-pink-200 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 flex items-center justify-center"
                        onClick={handleTopRatedFilter}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        Top-Rated Restaurants
                    </button>
                </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredRestaurant.map(restaurant => (
                    <Link 
                        key={restaurant.info.id} 
                        to={"/restaurant/" + restaurant.info.id}
                        className="transform hover:scale-105 transition-transform duration-200"
                    >
                        <RestrauntCard resData={restaurant} />
                    </Link>
                ))}
            </div>
            
            {filteredRestaurant.length === 0 && (
                <div className="flex flex-col items-center justify-center p-10 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <p className="text-xl font-medium">No restaurants found</p>
                    <p className="mt-2">Try adjusting your search or filter criteria</p>
                </div>
            )}
        </div>
    );
}

export default Body;