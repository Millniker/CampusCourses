import axios from "axios";
import alert from "bootstrap/js/src/alert";
import {setRoles, setUser} from "../store/userReduser";

const BASE_URL =`https://camp-courses.api.kreosoft.space/`
export const registration = async (fullName,birthDate,email, password, confirmPassword)=>{
    try {
        const response = await axios.post(BASE_URL+`registration`, {
            fullName,
            birthDate,
            email,
            password,
            confirmPassword
        })
        login(email, password)
        console.log(response.status)
    }
    catch (e){
        console.log(e.message)

    }
}
export const login = (email, password)=>{
    return async dispatch => {
        try {
            const response = await axios.post(BASE_URL + `login`, {
                email,
                password
            })
            console.log(2344)
            localStorage.setItem(`token`,response.data.token)
            dispatch(profile())
        } catch (e) {
            console.log(e)
        }
    }
}
export const profile = ()=> {
    return async dispatch => {
        try {
            const response = await axios.get(BASE_URL + `profile`, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}

            })
            console.log(response.data)
            dispatch(setUser(response.data))
        } catch (e) {
            console.log(e)
        }
    }
}
export const roles = ()=>{
        return async dispatch => {
            try {
                const response = await axios.get(BASE_URL + `roles`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}

                })
                console.log(response.data)
                dispatch(setRoles(response.data))
            } catch (e) {
                console.log(e)
            }
        }
}