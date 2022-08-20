import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);
    const [ros, setRos] = useState(null);
    const [map, setMap] = useState(null);
    const [logs, setLogs] = useState(JSON.parse(localStorage.getItem('logs')) || [])

    const resetContext = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('rosURL')
        localStorage.removeItem('logs')
        setAuth(null)
        setLogs(null)
        setRos(null)
    }

    return (
        <AuthContext.Provider value={{ auth, setAuth, setRos, ros, resetContext, map, setMap, logs, setLogs }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;