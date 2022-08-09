import axios from './axios'

// TODO: Login 
export const login = async (email, password) => {
    try {
        const response = await axios.post('/auth/login', {
            email,
            password
        }, {
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' },
        }).then((response) => {
            console.log(response);
            return response
        }).catch((response) => {
            return response
        })

        return response;

    } catch (error) {
        console.log(error)
        return error;
    }

}

// TODO: Get User
export const getUser = async (token) => {
    try {
        const response = await axios.get('/auth/user', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            console.log(response);
            return response
        }).catch((response) => {
            return response
        })


        return response;

    } catch (error) {
        console.log(error)
        return error;
    }
}


// TODO: Change name, email, and password
export const editUser = () => {

}

// TODO: Logout User
export const logout = async (token) => {
    try {
        const response = await axios.get('/auth/logout', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            console.log(response);
            return response
        }).catch((response) => {
            return response
        })


        return response;

    } catch (error) {
        console.log(error)
        return error;
    }
}