import {Navigate, Route} from "react-router-dom";

const PrivateRouter = (props) => {
    const firstLogin = localStorage.getItem('token')
    console.log(firstLogin)
    return firstLogin ? <Route {...props} /> : <Navigate to="/" />
}

export default PrivateRouter