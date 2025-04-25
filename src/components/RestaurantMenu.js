import React, { useContext } from 'react';
import Shimmer from './shimmer';
import { useParams } from 'react-router-dom';
import useRestrauntMenu from '../utils/useRestrauntMenu';
import { CDN_LINK } from '../utils/constant';
import CartContext from './CartContext';

const RestaurantMenu = () => {
    const { resId } = useParams();
    const resInfo = useRestrauntMenu(resId);
    const { addToCart } = useContext(CartContext);
    
    if (resInfo === null) return <Shimmer />;
    
    const { name, cuisines, cloudinaryImageId, costForTwoMessage, avgRating, deliveryTime } = 
        resInfo?.cards[2]?.card?.card?.info || {};
    
    const { itemCards } = 
        resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card || { itemCards: [] };
    
    const handleAddToCart = (item) => {
        const itemInfo = item.card.info;
        addToCart({
            id: itemInfo.id,
            name: itemInfo.name,
            price: itemInfo.price || itemInfo.defaultPrice,
            isVeg: itemInfo.isVeg,
            quantity: 1,
            restaurantName: name, // Add restaurant name to identify items from which restaurant
            imageId: itemInfo.imageId
        });
    };
    
    return (
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
            {/* Restaurant Header */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="mb-4 md:mb-0">
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">{name}</h1>
                        <p className="text-gray-600 mb-1">{cuisines?.join(', ')}</p>
                        <p className="text-gray-600">{costForTwoMessage}</p>
                    </div>
                    
                    <div className="flex flex-col items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                        <div className={`flex items-center justify-center ${avgRating >= 4 ? 'text-green-600' : 'text-orange-500'} font-medium mb-1`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            {avgRating}
                        </div>
                        <div className="text-sm text-gray-500">{deliveryTime} mins</div>
                    </div>
                </div>
            </div>

            {/* Menu Section */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        Menu
                    </h2>
                </div>
                
                <ul className="divide-y divide-gray-200">
                    {itemCards?.map((item) => (
                        <li key={item?.card?.info?.id} className="p-4 hover:bg-gray-50">
                            <div className="flex justify-between">
                                {/* Left side: Item info */}
                                <div className="flex-grow pr-4 max-w-md">
                                    <div className="flex items-start mb-2">
                                        {/* Veg/Non-veg indicator */}
                                        {item?.card?.info?.isVeg ? (
                                            <span className="flex-shrink-0 h-5 w-5 rounded-sm border border-green-600 p-0.5 mr-2 mt-1">
                                                <div className="h-full w-full rounded-sm bg-green-600"></div>
                                            </span>
                                        ) : (
                                            <span className="flex-shrink-0 h-5 w-5 rounded-sm border border-red-600 p-0.5 mr-2 mt-1">
                                                <div className="h-full w-full rounded-sm bg-red-600"></div>
                                            </span>
                                        )}
                                        
                                        {/* Name and price */}
                                        <div>
                                            <h3 className="text-gray-800 font-medium">{item?.card?.info?.name}</h3>
                                            <p className="text-gray-600 text-sm">
                                                ₹ {item?.card?.info?.price ? item?.card?.info?.price/100 : item?.card?.info?.defaultPrice/100}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    {/* Description */}
                                    {item?.card?.info?.description && (
                                        <p className="text-gray-500 text-sm mt-1">{item?.card?.info?.description}</p>
                                    )}
                                </div>
                                
                                {/* Right side: Image and add button */}
                                <div className="flex-shrink-0 relative ml-2">
                                    {item?.card?.info?.imageId && (
                                        <div className="w-40 h-32 overflow-hidden rounded-lg">
                                            <img 
                                                src={CDN_LINK + item?.card?.info?.imageId} 
                                                alt={item?.card?.info?.name}
                                                className="h-full w-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-opacity-5 rounded-lg"></div>
                                        </div>
                                    )}
                                    <button 
                                        onClick={() => handleAddToCart(item)}
                                        className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white border border-green-500 text-green-600 font-bold text-xs px-4 py-1 rounded-md shadow-md hover:bg-green-50 transition-colors"
                                    >
                                        ADD
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default RestaurantMenu;