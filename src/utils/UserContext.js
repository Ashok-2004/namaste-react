import { createContext, useContext } from "react";

const UserContext=createContext({
    user:"Default User"
})
export default UserContext