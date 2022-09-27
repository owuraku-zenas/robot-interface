import axios from './axios'

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


export const updateUser = async (token, user) => {
    try {
        const response = await axios.put('/auth/user', user, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
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

export const changePassword = async (token, currentPassword, newPassword, confirmPassword) => {
    try {
        const response = await axios.post('/auth/change-password', {
            current_password: currentPassword,
            new_password: newPassword,
            confirm_password: confirmPassword
        }, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }).then((response) => {
            console.log(response?.data?.errors);
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