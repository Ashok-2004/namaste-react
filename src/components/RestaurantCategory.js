import ItemList from "./itemList"
const RestaurantCategoty =({data,itemShow,handleClick,Data}) =>{
    // const[itemShow,setItemShow]=useState(false)
    // console.log(data)
    console.log(itemShow)
    return(
        <div>
            <div className="w-6/12 mx-auto my-4 bg-gray-50 shadow-lg p-4 cursor-pointer">
            <div onClick={handleClick} className="flex justify-between">
                <span className="text-lg font-bold">{data.title}({data.itemCards.length})</span>
                <span>⬇️</span>
            </div>
            {itemShow && <ItemList items={data.itemCards} Data={Data}/>}
            </div>
        </div>
    )
}
export default RestaurantCategoty