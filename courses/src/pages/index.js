import React, {useEffect} from 'react';
import NavBar from "../components/NavBar";
import {Container} from "react-bootstrap";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const Index = () => {

    return (
        <div>
            <NavBar/>
            <Container>
            <h1 className="display-3 text-center text-secondary text-wrap">Добро пожаловать в систему кампусных курсов</h1>
            </Container>
        </div>
    );
};

export default Index;