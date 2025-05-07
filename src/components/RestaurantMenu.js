import React, { useContext, useState } from "react";
import Shimmer from "./shimmer";
import { useParams } from "react-router-dom";
import useRestrauntMenu from "../utils/useRestrauntMenu";
import { CDN_LINK } from "../utils/constant";
import CartContext from "./CartContext";
import RestaurantCategoty from "./RestaurantCategory";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestrauntMenu(resId);
  const { addToCart } = useContext(CartContext);
  const [showIndex, setShowIndex] = useState(0);
  if (resInfo === null) return <Shimmer />;
  const data="Dummy"

  const {
    name,
    cuisines,
    cloudinaryImageId,
    costForTwoMessage,
    avgRating,
    deliveryTime,
  } = resInfo?.cards[2]?.card?.card?.info || {};

  const { itemCards } = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR
    ?.cards[1]?.card?.card || { itemCards: [] };
  //  console.log(resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1].card.card)
console.log(resInfo)
  const category =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );
  console.log(category)

  const handleAddToCart = (item) => {
    const itemInfo = item.card.info;
    addToCart({
      id: itemInfo.id,
      name: itemInfo.name,
      price: itemInfo.price || itemInfo.defaultPrice,
      isVeg: itemInfo.isVeg,
      quantity: 1,
      restaurantName: name, // Add restaurant name to identify items from which restaurant
      imageId: itemInfo.imageId,
    });
  };

  const handleClick = (index) => {
    console.log(index, showIndex, index === showIndex);
    if (index === showIndex) {
      setShowIndex(-1);
    } else {
      setShowIndex(index);
    }
  };
  console.log(category.card)
  return (
    <div className="text-center">
      <h1 className="font-bold my-4 text-2xl">{name}</h1>
      <p className="font-bold text-lg">
        {cuisines.join(",")} - {costForTwoMessage}
      </p>
      {category.map((c, index) => (
        <div key={c.card.card.title}>
          <RestaurantCategoty
            data={c?.card?.card}
            itemShow={index == showIndex}
            handleClick={() => handleClick(index)}
            Data={data}
          />
        </div>
      ))}
    </div>
  );
};

export default RestaurantMenu;
