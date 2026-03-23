import React, { useEffect, useState} from 'react'
import {useContext} from 'react'
import { authDataContext } from "./AuthContext"
import axios from 'axios'
import { createContext } from "react";

// export const UserContext = createContext();
// import {userDataContext} from './UserContextProvider'
// import { userDataContext } from "./Context/UserContext";
export const userDataContext = createContext();




function UserContext({children}) {
    let {serverUrl} = useContext(authDataContext);
    let [userData, setUserData] = useState(null); 

    const getCurrentUser = async () => {
        try {
            let result = await axios.get(serverUrl + "/api/user/currentuser", { withCredentials: true });
            setUserData(result.data);
        } catch (error) {
            setUserData(null);
            if (error?.response?.status && [400, 401].includes(error.response.status)) {
                // expected when not logged in; do not spam console
                return;
            }
            console.error("getCurrentUser error:", error);
        }
    }

    useEffect(() => {
        getCurrentUser()
    }, [])

    let value = {
        userData, 
        setUserData
    }

    return(
        <div>
            <userDataContext.Provider value={value}>
                {children}
            </userDataContext.Provider>
        </div>
    )
}

export default UserContext