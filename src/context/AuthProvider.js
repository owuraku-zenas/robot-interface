import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);
    const [ros, setRos] = useState(null);
    const [topics, setTopics] = useState(null);
    const [map, setMap] = useState(null);

    // TODO: Add new states to the reset function
    const resetContext = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('rosURL')
        setAuth(null)
        setRos(null)
        setTopics(null)
    }

    return (
        <AuthContext.Provider value={{ auth, setAuth, setRos, ros, topics, setTopics, resetContext, map, setMap }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;