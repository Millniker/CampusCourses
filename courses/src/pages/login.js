import React, {useEffect, useState} from 'react';
import {Alert, Button, Container, Form} from "react-bootstrap";
import NavBar from "../components/NavBar";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../api/authApi";
import {Navigate, useNavigate} from "react-router-dom";
import {MAIN_PAGE_ROUTE} from "../utils/consts";
import ErrorModal from "./ErrorModal";
import Modal from "react-bootstrap/Modal";

const Login = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const router = useNavigate()
    const isAuth = useSelector(state => state.user.isAuth)
    const error = useSelector(state => state.error.error)
    const isFetchError = useSelector(state => state.error.isFetchError)
    const [validated, setValidated] = useState(false);

    const dispatch = useDispatch();
    const Login =(event) =>{
        const form = event.currentTarget;
        if(form.checkValidity()===false){
            event.preventDefault()
            event.stopPropagation()
        }
        else {
            event.preventDefault();
            dispatch(login(
                email,
                password
            ))
        }
        setValidated(true)
    }
    return (
        !isAuth
        ?
        <div>
            <NavBar/>
            {isFetchError?<ErrorModal isFetchError={isFetchError} error={error.data.message}/>:""}
            <Container>
                <Form noValidate validated={validated} onSubmit={Login}>
                <h1>Авторизация</h1>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" required value={email} onChange={e=>setEmail(e.target.value)}/>
                    <Form.Control.Feedback type="invalid">
                        Введите email !
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control type="password" required value={password} onChange={e=>setPassword(e.target.value)}/>
                    <Form.Control.Feedback type="invalid">
                        Введите пароль !
                    </Form.Control.Feedback>
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