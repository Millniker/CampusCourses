const SET_USER ="SET_USER"
const LOGOUT ="LOGOUT"
const SET_ROLES ="SET_ROLES"
const UPDATE_USER ="UPDATE_USER"
const defaultState ={
    currentUser:{},
    email:'',
    isAuth:false,
    roles:{}

}
export default function userReduser(state = defaultState, action){
    console.log(action.payload)
    switch (action.type){
            case SET_USER:
            return {
                ...state,
                currentUser: action.payload,
                isAuth: true
            }
            case LOGOUT:
            localStorage.removeItem(`token`)
            return {
                ...state,
                currentUser:{},
                roles: {},
                isAuth: false
            }
            case SET_ROLES:
            return {
                ...state,
                roles: action.payload
            }
        default:
            return state
    }
}
export const setUser = user =>({type:SET_USER, payload:user})
export const setRoles = roles =>({type:SET_ROLES, payload:roles})
export const logout =()=>({type:LOGOUT})
export const updateUser = user => ({type:UPDATE_USER})
