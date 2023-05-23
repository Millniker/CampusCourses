import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import NavBar from "../components/NavBar";
import {useDispatch, useSelector} from "react-redux";
import {profile, putProfile} from "../api/authApi";
import {MAIN_PAGE_ROUTE} from "../utils/consts";
import {Navigate} from "react-router-dom";
import ErrorModal from "./ErrorModal";

const Profile = () => {
    const [fullName,setFullName] = useState('');
    const [birthDate,setBirthDate] = useState('');
    const user = useSelector(state => state.user.currentUser);
    const dispatch = useDispatch()
    const error = useSelector(state => state.error.error)
    const isFetchError = useSelector(state => state.error.isFetchError)

    useEffect(()=>{
        dispatch(profile());
    },[])
    useEffect(() => {
        setFullName(user.fullName)
            if(user.birthDate!=null) {
                const date = new Date(user.birthDate);
                date.setDate(date.getDate()+1);
                setBirthDate(date.toISOString().slice(0, 10))
            }
        },[user]);

    const changeProfile=(even)=>{
        even.preventDefault();
        dispatch(putProfile(fullName,birthDate))
    }
    return (
        localStorage.getItem('token')
            ?
        <div>
            <NavBar/>
            {isFetchError?<ErrorModal isFetchError={isFetchError} error={error}/>:""}
            <Container>
            <Form onSubmit={changeProfile}>
                <h1 className="my-3">Профиль</h1>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>
                        ФИО
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="text" value={fullName} onChange={e=>setFullName(e.target.value)} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                        Email
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control plaintext readOnly defaultValue={user.email} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>
                        Дата рождения
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="date" value={birthDate} onChange={e=>setBirthDate(e.target.value)}/>
                    </Col>
                </Form.Group>
                    <Button variant="primary" type="submit" className="float-end" >
                        Изменить
                    </Button>
            </Form>
            </Container>
        </div>
            :<Navigate to={MAIN_PAGE_ROUTE}/>
    );
};

export default Profile;