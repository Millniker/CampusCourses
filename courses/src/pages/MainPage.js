import React from 'react';
import NavBar from "../components/NavBar";
import {Container} from "react-bootstrap";
import {useSelector} from "react-redux";

const MainPage = () => {
    return (
        <div>
            <NavBar/>
            <Container>
            <h1 className="display-3 text-center text-secondary text-wrap">Добро пожаловать в систему кампусных курсов</h1>
            </Container>
        </div>
    );
};

export default MainPage;