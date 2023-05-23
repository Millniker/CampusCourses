const SET_ERROR_INFO ="SET_ERROR_INFO"
const SET_ERROR ="SET_ERROR"
const defaultState ={
    error:{},
    isFetchError: false
}
export default function errorReduser(state = defaultState, action){
    switch (action.type){
        case SET_ERROR:
            return {
                ...state,
                isFetchError: action.payload
            }
        case SET_ERROR_INFO:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}
export const setError = bool =>({type:SET_ERROR, payload:bool})
export const setErrorInfo = error =>({type:SET_ERROR_INFO, payload:error})