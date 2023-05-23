const SET_USER ="SET_USER"
const LOGOUT ="LOGOUT"
const SET_ROLES ="SET_ROLES"
const SET_USERS ="SET_USERS"
const defaultState ={
    currentUser:{},
    email:'',
    isAuth:false,
    roles:{},
    users:{},
    course:{}
}
export default function userReduser(state = defaultState, action){
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
        case SET_USERS:
            return {
                ...state,
                users:action.payload
            }

        default:
            return state
    }
}
export const setUser = user =>({type:SET_USER, payload:user})
export const setRoles = roles =>({type:SET_ROLES, payload:roles})
export const setUsers = users =>({type:SET_USERS, payload:users})

export const logout =()=>({type:LOGOUT})
