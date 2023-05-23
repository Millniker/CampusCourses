import React from 'react';
import {Routes, Route, Navigate, useNavigate, useParams} from 'react-router-dom'
import {publicRoutes} from "../routes";
import {useDispatch, useSelector} from "react-redux";
import Login from "../pages/login";
import Registration from "../pages/registration";
import Profile from "../pages/Profile";
import Id from "../pages/groups/[id]";
import CoursePage from "../pages/CoursePage";
import PageRender from "./PageRender";
import PrivateRouter from "./PrivatRouters";
const AppRouter = () => {
    const isAuth=useSelector(state => state.user.isAuth)
    return (
        <Routes>
            {!isAuth && <Route path='/login' element={<Login/>}/>}
            {!isAuth && <Route path='/registration' element={<Registration/>}/>}
            {isAuth && <Route path='/profile' element={<Profile/>}/>}
            {<Route exact path='/:page/:id' Component={PageRender}/>}
            {isAuth && <Route path='/courses/:id' element={<CoursePage/>}/>}
            {publicRoutes.map(({path, component})=>
                <Route key={path} path={path} element={component} exact/>
            )}
            <Route path={'*'} element={<Navigate to={'/'}/>}/>

        </Routes>

    );
};


export default AppRouter;