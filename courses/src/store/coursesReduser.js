const GET_GROUP_COURSES="GET_GROUP_COURSES"
const GET_COURSES="GET_COURSES"
const SET_COURSE ="SET_COURSE"
const SET_MY_COURSE = "SET_MY_COURSE"
const SET_IS_FETCHING ="SET_IS_FETCHING"
const SET_IS_ERROR ="SET_IS_ERROR"
const GET_TEACHING_COURSES ="GET_TEACHING_COURSES"
const GET_MY_CURRENT_COURSES ="GET_MY_CURRENT_COURSES"

const defaultState={
    currentGroups:{},
    currentCourses:{},
    myCurrentCourses:{},
    teachingCourses:{},
    myCourses:{},
    isFetching:false,
};
export default function coursesReduser(state = defaultState, action) {
    switch (action.type){
        case GET_GROUP_COURSES:
            return{
                ...state,
                currentGroups: action.payload,
                isFetching:false
            }
        case GET_COURSES:
            return{
                ...state,
                currentCourses: action.payload,
                isFetching:false
            }
        case SET_COURSE:
            return {
                ...state,
                course:action.payload,
                isFetching:false
            }
        case SET_MY_COURSE:
            return {
                ...state,
                myCourses:action.payload,
                isFetching:false
            }
        case SET_IS_FETCHING:
            return {
                ...state,
                isFetching:action.payload
            }
        case GET_MY_CURRENT_COURSES:
            return {
                ...state,
                myCurrentCourses: action.payload
            }
        case GET_TEACHING_COURSES:
            return {
                ...state,
                teachingCourses: action.payload
            }
        default:
            return state
    }

}
export const setCourse = course =>({type:SET_COURSE, payload:course})
export const getGroup = group =>({type:GET_GROUP_COURSES, payload:group})
export const getCoursesGroup = courses =>({type:GET_COURSES, payload:courses})
export const getMyCourses = myCourses =>({type:SET_MY_COURSE,payload:myCourses})
export const setIsFetching = (bool) =>({type:SET_IS_FETCHING,payload:bool})
export const setIsError = (bool) =>({type:SET_IS_ERROR,payload:bool})
export const getCurMyCourses = myCurrentCourses =>({type:GET_MY_CURRENT_COURSES,payload:myCurrentCourses})
export const getTeachingCourses = teachingCourses =>({type:GET_TEACHING_COURSES,payload:teachingCourses})