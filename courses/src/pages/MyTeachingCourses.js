import React, {Fragment, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Navigate, useNavigate} from "react-router-dom";
import {getMyCourse, getMyTeachingCourse} from "../api/coursesApi";
import colorNameHandler from "../utils/statusConverter";
import {Card, Container, ListGroup, ListGroupItem, Spinner} from "react-bootstrap";
import semestersConverter from "../utils/semestersConverter";
import NavBar from "../components/NavBar";
import {MAIN_PAGE_ROUTE} from "../utils/consts";
import ErrorModal from "./ErrorModal";

const MyTeachingCourses = () => {
    const dispatch = useDispatch()
    const courses = useSelector(state => state.group.teachingCourses)
    const isFetching = useSelector(state => state.group.isFetching )
    const navigate = useNavigate();
    const error = useSelector(state => state.error.error)
    const isFetchError = useSelector(state => state.error.isFetchError)
    useEffect(()=>{
        dispatch(getMyTeachingCourse())
    },[])
    let items =[];
    if(courses.length!==undefined) {
        items = courses.map((data) => {
            const value = colorNameHandler(data.status);
            const statusColor = value[1]+" float-end text-end"
            const statusTitle = value[0]
            return <ListGroupItem key={data.id}>
                <b className={statusColor}>{statusTitle}</b>
                <h5  onClick={()=>{navigate('/courses/'+data.id)}}>{data.name}</h5>
                <div className="d-grid">
                    <div> Учебный год - {data.startYear}-{data.startYear + 1} </div>
                    <div className="pt-1">Семестр {semestersConverter(data.semester)[0]}</div>
                </div>
                <div className="d-grid">
                    <div className="pt-1 text-muted small"> Мест всего - {data.maximumStudentsCount} </div>
                    <div className="pt-1 text-muted small">Мест свободно - {data.remainingSlotsCount}</div>
                </div>
            </ListGroupItem>
        })
    }
    return (
        localStorage.getItem('token')
            ?
            <Fragment>
                <NavBar/>
                {isFetchError?<ErrorModal isFetchError={isFetchError} error={error}/>:""}
                <Container fluid="md" className="mt-3">
                    <div className="mb-4">
                        <h1 >
                            Группы кампусных курсов
                        </h1>
                    </div>
                    <Card style={{ width: '100%' }}>
                        {!isFetching?<ListGroup variant="flush" >
                            {items}
                        </ListGroup>:<Spinner animation="border" className="align-self-center" variant="dark"/>}
                    </Card>
                </Container>
            </Fragment>
            :<Navigate to={MAIN_PAGE_ROUTE}/>
    );
};

export default MyTeachingCourses;