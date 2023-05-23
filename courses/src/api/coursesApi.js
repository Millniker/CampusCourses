import axios from "axios";
import {
    getCoursesGroup,
    getCurMyCourses,
    getGroup,
    getMyCourses, getTeachingCourses,
    setCourse,
    setIsError,
    setIsFetching
} from "../store/coursesReduser";
import {setError, setErrorInfo} from "../store/errorReduser";

const BASE_URL =`https://camp-courses.api.kreosoft.space/`

export const getGroupCourses=()=>{
    return async dispatch=>{
        dispatch(setIsFetching(true))
        try {
            const response= await axios.get(BASE_URL+'groups',{
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })

            dispatch(getGroup(response.data))
            return response;
        }
        catch (e){
            setIsFetching(false)
            alert(e.message)
        }
    }
}
export const putGroupCourses=(id, name)=>{
    return async dispatch=>{
        dispatch(setIsFetching(true))
        try {
            const response= await axios.put(BASE_URL+'groups/'+id,{
                name
            },{
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(getGroupCourses())
            return response;
        }
        catch (e){
            dispatch(setIsFetching(false))
            dispatch(setIsError(true))
        }
    }
}
export const deleteGroupCourses=(id)=>{
    return async dispatch=>{
        try {
            const response= await axios.delete(BASE_URL+'groups/'+id,{
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(getGroupCourses())
            return response;
        }
        catch (e){
            dispatch(setErrorInfo(e.response))
            dispatch(setError(true))
        }
    }
}
export const postGroupCourses=(name)=>{
    return async dispatch=>{
        try {
            const response= await axios.post(BASE_URL+'groups',{
                name
            },{
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(getGroupCourses())
            return response;
        }
        catch (e){
            dispatch(setErrorInfo(e.response))
            dispatch(setError(true))
        }
    }
}
export const getCourses=(id)=>{
    return async dispatch=>{
        dispatch(setIsFetching(true))
        try {
            const response= await axios.get(BASE_URL+'groups/'+id,{
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(getCoursesGroup(response.data))
            return response;
        }
        catch (e){
            dispatch(setErrorInfo(e.response))
            dispatch(setError(true))
        }
    }
}
export const postCourse=(id,name,startYear,maximumStudentsCount,semester,requirements,annotations,mainTeacherId)=>{
    return async dispatch=>{
        try {
            console.log(
                id,
                name,
                startYear,
                maximumStudentsCount,
                semester,
                requirements,
                annotations,
                mainTeacherId)
            const response= await axios.post(BASE_URL+'courses/'+id,{
                name,
                startYear,
                maximumStudentsCount,
                semester,
                requirements,
                annotations,
                mainTeacherId
            },{
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(getCourses(id))
            return response;
        }
        catch (e){
            dispatch(setErrorInfo(e.response))
            dispatch(setError(true))
        }
    }
}
export const getCourse=(id)=>{
    return async dispatch=>{

        try {
            const response= await axios.get(BASE_URL+'courses/'+id+'/details',{
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(setCourse(response.data))
            return response;
        }
        catch (e){
            dispatch(setErrorInfo(e.response))
            dispatch(setError(true))
        }
    }
}

export const editCoursesStatus=(status,id)=>{
    return async dispatch=>{
        try {
            const response= await axios.post(BASE_URL+'courses/'+id+'/status',{
                status
            },{
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(getCourse(id))
            return response;
        }
        catch (e){
            dispatch(setErrorInfo(e.response))
            dispatch(setError(true))
        }
    }
}

export const putCoursesInfo=(requirements,annotations,id)=>{
    return async dispatch=>{
        try {
            const response= await axios.put(BASE_URL+'courses/'+id,{
                requirements,
                annotations
            },{
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(getCourse(id))
            return response;
        }
        catch (e){
            dispatch(setErrorInfo(e.response))
            dispatch(setError(true))
        }
    }
}
export const postCoursesNotif=(text,isImportant,id)=>{
    return async dispatch=>{
        try {
            const response= await axios.post(BASE_URL+'courses/'+id+"/notifications",{
                text,
                isImportant
            },{
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(getCourse(id))
            return response;
        }
        catch (e){
            dispatch(setErrorInfo(e.response))
            dispatch(setError(true))
        }
    }
}
export const addCoursesTeacher=(userId,id)=>{
    return async dispatch=>{
        try {
            const response= await axios.post(BASE_URL+`courses/${id}/teachers`,{
                userId,
            },{
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })

            dispatch(getCourse(id))
            return response;
        }
        catch (e){
            dispatch(setErrorInfo(e.response))
            dispatch(setError(true))
        }
    }
}
export const addStudentMark=(mark,markType,studentId,id)=>{
    return async dispatch=>{
        try {
            const response= await axios.post(BASE_URL+`courses/${id}/marks/${studentId}`,{
                markType,
                mark
            },{
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(getCourse(id))
            return response;
        }
        catch (e){
            dispatch(setErrorInfo(e.response))
            dispatch(setError(true))
        }
    }
}

export const changeStudentStatus=(status,studentId,id)=>{
    return async dispatch=>{
        try {
            const response= await axios.post(BASE_URL+`courses/${id}/student-status/${studentId}`,{
                status
            },{
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(getCourse(id))
            return response;
        }
        catch (e){
            dispatch(setErrorInfo(e.response))
            dispatch(setError(true))
        }
    }
}

export const signUpStudent=(id)=>{
    return async dispatch=>{
        try {
            const response= await axios.post(BASE_URL+`courses/${id}/sign-up`,{},{
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(getCourse(id))
        }
        catch (e){
            dispatch(setErrorInfo(e.response))
            dispatch(setError(true))
        }
    }
}
export const getMyCourse=()=>{
    return async dispatch=>{

        try {
            const response= await axios.get(BASE_URL+'courses/my',{
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(getCurMyCourses(response.data))
            return response;
        }
        catch (e){
            dispatch(setErrorInfo(e.response))
            dispatch(setError(true))
        }
    }
}
export const getMyTeachingCourse=()=>{
    return async dispatch=>{

        try {
            const response= await axios.get(BASE_URL+'courses/teaching',{
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(getTeachingCourses(response.data))
            return response;
        }
        catch (e){
            dispatch(setErrorInfo(e.response))
            dispatch(setError(true))
        }
    }
}