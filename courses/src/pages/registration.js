import React, {useEffect, useState} from 'react';
import {Button, Container, Form} from "react-bootstrap";
import NavBar from "../components/NavBar";
import {login, registration} from "../api/authApi";
import {useDispatch, useSelector} from "react-redux";
import {Navigate, useNavigate} from "react-router-dom";
import {MAIN_PAGE_ROUTE} from "../utils/consts";
import ErrorModal from "./ErrorModal";

const Registration = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [fullName,setFullName] = useState('');
    const [birthDate,setBirthDate] = useState('');
    const isAuth=useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()
    const [validated, setValidated] = useState(false);
    const error = useSelector(state => state.error.error)
    const isFetchError = useSelector(state => state.error.isFetchError)
    const register=(event)=>{
        const form = event.currentTarget;
        if(form.checkValidity()===false) {
            event.preventDefault()
            event.stopPropagation()
        }
        else {
            event.preventDefault()
            dispatch(registration(
                fullName,
                birthDate,
                email,
                password,
                confirmPassword
            ))
        }
        setValidated(true)
    }
    return (
        !isAuth
            ?
            <div>
                <NavBar/>
                {isFetchError?<ErrorModal isFetchError={isFetchError} error={error.statusText}/>:""}
                <Container>
                    <Form noValidate validated={validated} onSubmit={register}>
                        <h1>Регистрация нового пользователя</h1>
                        <Form.Group className="mb-3">
                            <Form.Label>ФИО</Form.Label>
                            <Form.Control type="text" required value={fullName} onChange={e=>setFullName(e.target.value)}/>
                            <Form.Control.Feedback type="invalid">Укажите ФИО!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Дата рождения</Form.Label>
                            <Form.Control type="date" required value={birthDate} onChange={e=>setBirthDate(e.target.value)}/>
                            <Form.Control.Feedback type="invalid">Укажите дату рождения !</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" required value={email} onChange={e=>setEmail(e.target.value)}/>
                            <Form.Control.Feedback type="invalid">Укажите email !</Form.Control.Feedback>
                            <Form.Text className="text-muted">
                                Email будет использоваться для входа в систему
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control type="password" name="ps1" required value={password} onChange={e=>setPassword(e.target.value)}/>
                            <Form.Control.Feedback type="invalid">Укажите пароль !</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Повторите пароль</Form.Label>
                            <Form.Control type="password" name="ps2" required value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)}/>
                            <Form.Control.Feedback type="invalid">Укажите пароль !</Form.Control.Feedback>
                        </Form.Group>
                        <Button variant="primary" type="submit" >
                            Зарегестрироваться
                        </Button>
                    </Form>
                </Container>
            </div>
            :<Navigate to={MAIN_PAGE_ROUTE}/>
    );
};

export default Registration;