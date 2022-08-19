import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);
    const [ros, setRos] = useState(null);
    const [map, setMap] = useState(null);

    const resetContext = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('rosURL')
        setAuth(null)
        setRos(null)
    }

    return (
        <AuthContext.Provider value={{ auth, setAuth, setRos, ros, resetContext, map, setMap }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;