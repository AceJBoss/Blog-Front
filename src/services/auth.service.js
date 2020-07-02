import http from '../config/http-common'

const login = data => {
    http.post("/login", data).then(response=>{
        if (response.data.token) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
    })
};

const register = data => {
    return http.post("/register", data);
};

const logout = () =>{
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));;
};

export default {
    login, register, logout, getCurrentUser
};