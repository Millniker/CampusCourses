import React, {useEffect} from 'react';
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link, NavLink, useNavigate, useRoutes} from "react-router-dom";
import {
    CAMPUS_GROUP_ROUTE,
    LOGIN_ROUTE,
    MAIN_PAGE_ROUTE,
    MY_COURSES, MY_TEACHING_COURSES,
    PROFILE_ROUTE,
    REGISTRATION_ROUTE
} from "../utils/consts";
import {useDispatch, useSelector} from "react-redux";
import {logout, setUser} from "../store/userReduser";
import {profile, roles} from "../api/authApi";


const NavBar = () => {
    const router = useNavigate()
    const isAuth=useSelector( state => state.user.isAuth)
    const isRoles=useSelector( state => state.user.roles)
    const user = useSelector(state => state.user.currentUser)
    const dispatch = useDispatch()

    useEffect(()=>{
        if(localStorage.getItem("token")) {
            dispatch(profile())
        }
    },[])
    return (
        <Navbar style={{backgroundColor:"#6c757d"}} variant="dark">
            <div className="ps-4">
                <Navbar.Brand href="/" onClick={() => router(MAIN_PAGE_ROUTE)}>Кампусные курсы</Navbar.Brand>
            </div>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        {isAuth && <Nav.Link onClick={() => router(CAMPUS_GROUP_ROUTE)}>Группы курсов</Nav.Link>}
                        {isRoles.isStudent && <Nav.Link onClick={() => router(MY_COURSES)}>Мои курсы</Nav.Link>}
                        {isRoles.isTeacher &&<Nav.Link onClick={() => router(MY_TEACHING_COURSES)}>Преподаваемые курсы</Nav.Link>}
                    </Nav>
                    <div className="pe-4">
                        <Nav>
                            {!isAuth && <Nav.Link href="/registration">Регистрация</Nav.Link>}
                            {!isAuth && <Nav.Link href="/login">Вход</Nav.Link>}
                            {isAuth && <Nav.Link onClick={() => router(PROFILE_ROUTE)}>{user.email}</Nav.Link>}
                            {isAuth && <Nav.Link onClick={()=> dispatch(logout())}>Выход</Nav.Link>}

                        </Nav>
                    </div>
                </Navbar.Collapse>
        </Navbar>
    );
};

export default NavBar;