import React, {useState} from 'react';
import {Button, Container, Form} from "react-bootstrap";
import NavBar from "../components/NavBar";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../api/authApi";
import {Navigate, useNavigate} from "react-router-dom";
import {MAIN_PAGE_ROUTE} from "../utils/consts";

const Login = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const router = useNavigate()
    const isAuth = useSelector(state => state.user.isAuth)


    const dispatch = useDispatch();
    const Login =(event) =>{
        event.preventDefault();
        dispatch(login(
            email,
            password
        ))
        if(isAuth) {
            setEmail('');
            setPassword('');
        }
    }
    return (
        !isAuth
        ?
        <div>
            <NavBar/>
            <Container>
                <Form onSubmit={Login}>
                <h1>Авторизация</h1>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={email} onChange={e=>setEmail(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
                </Form.Group>
                <Button variant="primary" type="submit" >
                    Войти
                </Button>
                </Form>
            </Container>
        </div>
            :<Navigate to={MAIN_PAGE_ROUTE}/>
    );
};

export default Login;