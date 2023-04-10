import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom'
import {authRoutes, publicRoutes} from "../routes";
import {useSelector} from "react-redux";
import Login from "../pages/Login";
import Auth from "../pages/Auth";
const AppRouter = () => {
    const isAuth=useSelector(state => state.user.isAuth)
    return (
        <Routes>
            {isAuth && authRoutes.map(({path, component})=>
                <Route key={path} path={path} element={component} exact/>
            )}
            {!isAuth && <Route path='/login' element={<Login/>}/>}
            {!isAuth && <Route path='registration' element={<Auth/>}/>}
            {publicRoutes.map(({path, component})=>
                <Route key={path} path={path} element={component} exact/>
            )}
            <Route path={'*'} element={<Navigate to={'/'}/>}/>
        </Routes>

    );
};

export default AppRouter;