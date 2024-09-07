import { useStoreRouteInfo } from "expo-router/build/global-state/router-store";
import { createContext, useContext, useState, useEffect, Children } from "react";
import { getCurrentUser } from "../lib/appwrite";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {

    const [isLoggenIn, setIsLoggenIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      getCurrentUser()
        .then((res) => {
            if (res) {
                setIsLoggenIn(true);
                setUser(res)
            } else {
                setIsLoggenIn(false)
                setUser(null)
            }
        })

        .catch((error) => {
            console.log(error);
        })

        .finally(() => {
            setIsLoading(false);
        })
    }, [])
    
    
    return (
        <GlobalContext.Provider
            value={{
                isLoggenIn,
                setIsLoggenIn,
                user,
                setUser,
                isLoading
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider;