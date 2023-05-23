import React, {Fragment, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getCourses, postCourse} from "../../api/coursesApi";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import NavBar from "../../components/NavBar";
import {Button, Card, Container, Form, ListGroup, ListGroupItem, Modal, Spinner} from "react-bootstrap";
import {MAIN_PAGE_ROUTE} from "../../utils/consts";
import JoditEditor from "jodit-react";
import {getUsers, users} from "../../api/authApi";
import colorNameHandler from "../../utils/statusConverter";
import semestersConverter from "../../utils/semestersConverter";
import ErrorModal from "../ErrorModal";

const Id = () => {
    const dispatch = useDispatch()
    const courses = useSelector(state => state.group.currentCourses)
    const users = useSelector(state => state.user.users)
    const isFetching = useSelector(state => state.group.isFetching )
    const {id} =useParams()
    const [show, setShow] = useState(false);
    const [courseName, setCourseName] =useState("");
    const [courseYear, setCourseYear] =useState("");
    const [courseMax, setCourseMax] =useState("");
    const [semester, setSemester] =useState("");
    const [requirements, setRequirements] = useState("");
    const [annotations, setAnnotations] = useState("");
    const [teacher, setTeacher] = useState("");
    const isRoles=useSelector( state => state.user.roles)
    const navigate = useNavigate();
    const error = useSelector(state => state.error.error)
    const isFetchError = useSelector(state => state.error.isFetchError)
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        setCourseMax("");
        setCourseYear("");
        setCourseName("");
    }
    useEffect(()=>{
        dispatch(getCourses(id))
        if(isRoles.isAdmin) {
            dispatch(getUsers())
        }
    },[])
    const addCourse=()=>{
        dispatch(postCourse(
            id,
            courseName,
            courseYear,
            courseMax,
            semester,
            requirements,
            annotations,
            teacher
        ))
    }

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
    let usersArray =[];
    if(users.length!==undefined) {
        usersArray = users.map((data) => {
            return <option key={data.id} value={data.id}>{data.fullName}</option>
        })
    }
    return (
        localStorage.getItem('token')
            ?
                <Fragment>
                    <NavBar/>
                    {isFetchError?<ErrorModal isFetchError={isFetchError} error={error.statusText}/>:""}
                    <Container fluid="md" className="mt-3">
                        <div className="mb-4">
                            <h1 >
                                Группы кампусных курсов
                            </h1>
                            {isRoles.isAdmin && <Button variant="primary" className="mt-4 mb-2" onClick={()=>handleShow()}>СОЗДАТЬ КУРС</Button>}
                        </div>
                        <Card style={{ width: '100%' }}>
                            {!isFetching?<ListGroup variant="flush" >
                                {items}
                            </ListGroup>:<Spinner animation="border" className="align-self-center" variant="dark"/>}
                        </Card>
                    </Container>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Создание курса</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group>
                                    <Form.Label>
                                        Название курса
                                    </Form.Label>
                                    <Form.Control
                                        autoFocus
                                        value={courseName}
                                        onChange={e=>setCourseName(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>
                                        Год начала курса
                                    </Form.Label>
                                    <Form.Control
                                        value={courseYear}
                                        onChange={e=>setCourseYear(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>
                                        Общее количество мест
                                    </Form.Label>
                                    <Form.Control
                                        value={courseMax}
                                        onChange={e=>setCourseMax(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>
                                        Семестр
                                    </Form.Label>
                                    <div className="mt-1">
                                        <Form.Check
                                            inline
                                            label="Осенний"
                                            name="semestrs"
                                            type="radio"
                                            onClick={()=>setSemester("Autumn")}
                                        />
                                        <Form.Check
                                            inline
                                            name="semestrs"
                                            label="Весенний"
                                            type="radio"
                                            onClick={()=>setSemester("Spring")}
                                        />
                                    </div>
                                </Form.Group>
                                <Form.Group className="mt-3">
                                    <Form.Label>
                                        Требования
                                    </Form.Label>
                                    <JoditEditor
                                        value={""}
                                        tabIndex={1} // tabIndex of textarea
                                        onChange={e=>setRequirements(e)}
                                    />
                                </Form.Group>
                                <Form.Group className="mt-3">
                                    <Form.Label>
                                        Аннотации
                                    </Form.Label>
                                    <JoditEditor
                                        value={""}
                                        tabIndex={1} // tabIndex of textarea
                                        onChange={e=>setAnnotations(e)}
                                    />
                                </Form.Group>
                                <Form.Group className="mt-2">
                                    <Form.Label>
                                        Основной преподаватель
                                    </Form.Label>
                                    <Form.Select onChange={e =>setTeacher(e.target.value)}>
                                        {usersArray}
                                    </Form.Select>
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary"  onClick={handleClose}>
                                Отмена
                            </Button>
                            <Button variant="primary" type="submit" onClick={()=>{addCourse(); handleClose()}}>
                                Сохранить
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Fragment>
                :<Navigate to={MAIN_PAGE_ROUTE}/>
    );
};

export default Id;