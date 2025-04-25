import { useState } from "react";
import { useEffect } from "react"
import { MENU_API } from '../utils/constant';
const useRestrauntMenu =(resId)=>{
    const [resInfo,setResInfo]=useState(null)

    const fetchData = async ()=>{
        const data=await fetch(MENU_API + resId)
        const json=await data.json();
        // console.log(json.data)
        setResInfo(json.data)
    }

    useEffect(()=>{
       fetchData();
    },[])

    return(
        resInfo
    )
}
export default useRestrauntMenu