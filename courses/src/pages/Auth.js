import React, {useState} from 'react';
import {Button, Container, Form} from "react-bootstrap";
import NavBar from "../components/NavBar";
import {login, registration} from "../api/authApi";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {MAIN_PAGE_ROUTE} from "../utils/consts";

const Auth = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [fullName,setFullName] = useState('');
    const [birthDate,setBirthDate] = useState('');
    const isAuth=useSelector(state => state.user.isAuth)
    const router = useNavigate()
    const dispatch = useDispatch()

    const register=(even)=>{
        even.preventDefault()
        console.log(isAuth);
        registration(
            fullName,
            birthDate,
            email,
            password,
            confirmPassword
        )
        dispatch(login(email,password))
        console.log(isAuth);
        if(isAuth) {
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setFullName('');
            setBirthDate('');
        }


    }

    return (
        !isAuth
        ?
        <div>
            <NavBar/>
            <Container>
            <Form onSubmit={register}>
                <h1>Регистрация нового пользователя</h1>
                <Form.Group className="mb-3">
                    <Form.Label>ФИО</Form.Label>
                    <Form.Control type="text" value={fullName} onChange={e=>setFullName(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Дата рождения</Form.Label>
                    <Form.Control type="date" value={birthDate} onChange={e=>setBirthDate(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={email} onChange={e=>setEmail(e.target.value)}/>
                    <Form.Text className="text-muted">
                        Email будет использоваться для входа в систему
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Повторите пароль</Form.Label>
                    <Form.Control type="password" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)}/>
                </Form.Group>
                <Button variant="primary" type="submit" >
                    Зарегестрироваться
                </Button>
            </Form>
            </Container>
        </div>
            :router(MAIN_PAGE_ROUTE)
    );
};

export default Auth;