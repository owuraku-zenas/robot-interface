import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);
    const [ros, setRos] = useState(null);
    const [topics, setTopics] = useState(false);

    return (
        <AuthContext.Provider value={{ auth, setAuth, setRos, ros, topics, setTopics }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;