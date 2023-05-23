import axios from "axios";
import {setRoles, setUser, setUsers} from "../store/userReduser";
import {setIsError, setIsFetching} from "../store/coursesReduser";
import {setError, setErrorInfo} from "../store/errorReduser";

const BASE_URL =`https://camp-courses.api.kreosoft.space/`
export const registration = (fullName,birthDate,email, password, confirmPassword)=>{
    return async dispatch =>{
    try {
        const response = await axios.post(BASE_URL+`registration`, {
            fullName,
            birthDate,
            email,
            password,
            confirmPassword
        })
        localStorage.setItem(`token`,response.data.token)
        dispatch(profile())
    }
    catch (e){
        dispatch(setErrorInfo(e.response))
        dispatch(setError(true))
    }
    }
}
export const login = (email, password)=>{
    return async dispatch => {
        try {
            const response = await axios.post(BASE_URL + `login`, {
                email,
                password
            })
            localStorage.setItem(`token`,response.data.token)
            dispatch(profile())
        } catch (e) {
            dispatch(setErrorInfo(e.response))
            dispatch(setError(true))
        }
    }
}
export const profile = ()=> {
    return async dispatch => {
        try {
            const response = await axios.get(BASE_URL + `profile`, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}

            })
            dispatch(setUser(response.data))
            dispatch(roles())
        }
        catch (err){
            if(err.response.statusText==="Unauthorized"){
                localStorage.removeItem("token")
            }
            dispatch(setErrorInfo(err.response.data.message))
            dispatch(setError(true))
        }
    }
}
export const putProfile = (fullName, birthDate)=> {
    return async dispatch => {
        try {
            const response = await axios.put(BASE_URL + `profile`, {
                fullName,
                birthDate
            },{
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(setUser(response.data))
        } catch (e) {
            dispatch(setErrorInfo(e.response.data.message))
            dispatch(setError(true))
        }
    }
}
export const roles = ()=>{
        return async dispatch => {
            try {
                const response = await axios.get(BASE_URL + `roles`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}

                })
                dispatch(setRoles(response.data))
            } catch (e) {
                dispatch(setErrorInfo(e.response.data.message))
                dispatch(setError(true))
            }
        }
}
export const getUsers = ()=>{
    return async dispatch => {
        try {
            const response = await axios.get(BASE_URL + `users`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}

            })
            dispatch(setUsers(response.data))
        } catch (e) {
            dispatch(setErrorInfo(e.response.data.message))
            dispatch(setError(true))
        }
    }
}