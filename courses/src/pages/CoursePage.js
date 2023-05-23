import React, {Fragment, useEffect, useState} from 'react';
import NavBar from "../components/NavBar";
import {
    Badge,
    Button, ButtonGroup,
    Card,
    Col,
    Container, Form, FormText,
    ListGroup,
    ListGroupItem, Modal,
    Nav,
    Row, Spinner,
    Stack,
    Tab,
    Tabs
} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {
    addCoursesTeacher,
    addStudentMark, changeStudentStatus,
    editCoursesStatus,
    getCourse, getGroupCourses, getMyCourse,
    postCoursesNotif,
    putCoursesInfo, signUp, signUpStudent
} from "../api/coursesApi";
import {MAIN_PAGE_ROUTE} from "../utils/consts";
import {Navigate} from "react-router-dom";
import colorNameHandler from "../utils/statusConverter";
import semestersConverter from "../utils/semestersConverter";
import parse from 'html-react-parser'
import notificationsConverter from "../utils/notificationsConverter";
import notificationListConverter from "../utils/notificationListConverter";
import studentStatusConverter from "../utils/studentStatusConverter";
import JoditEditor from "jodit-react";
import {getUsers, profile} from "../api/authApi";
import {values} from "mobx";
import studenMarkConverter from "../utils/studenMarkConverter";
import ErrorModal from "./ErrorModal";
import DeleteModal from "./DeleteModal";



const CoursePage = () => {
    const id =window.location.pathname.slice(9,45)
    const course = useSelector(state => state.group.course)
    const dispatch = useDispatch()
    const isRoles=useSelector( state => state.user.roles)
    const myCourses=useSelector( state => state.group.myCurrentCourses)
    const user = useSelector(state=>state.user.currentUser)
    const [requirements, setRequirements] = useState("");
    const [annotations, setAnnotations] = useState("");
    const [status, setStatus] = useState("");
    const [showEdit, setEditShow] = useState(false);
    const users = useSelector(state => state.user.users)
    const [selectedUser,setSelectedUser] = useState();
    const [notification,setNotification]=useState("");
    const [important, setImportant] = useState(false);
    let [teacher,setTeacher]=useState("");
    const [markType,setMarkType]=useState("");
    const [studentId,setStudentId]=useState("");
    const [mark,setMark]=useState("");
    let iTeacher=false
    const [statusCourse, setStatusCourse] =useState("")
    const error = useSelector(state => state.error.error)
    const[addInCourse,setAddInCourse]=useState("rounded-1 p-2")
    const isFetchError = useSelector(state => state.error.isFetchError)
    const [isDelete,setIsdelete]=useState(false);

    let isMainTeacher=false
    let myCourse = false
    let inQueue = false

    const handleEditClose = () => {
        setEditShow(false);}
    const handleEditShow = () => {
        setEditShow(true);
    }
    const [showStatus, setStatusShow] = useState(false);
    const handleStatusClose = () => {
        setStatusShow(false);}
    const handleStatusShow = () => {
        setStatusShow(true);
    }
    const [showNotif, setNotifShow] = useState(false);
    const handleNotifClose = () => {
        setNotifShow(false);}
    const handleNotifShow = () => {
        setNotifShow(true);
    }
    const [showTeacher, setTeacherShow] = useState(false);
    const handleTeacherClose = () => {
        setTeacherShow(false);}
    const handleTeacherShow = () => {
        setTeacherShow(true);
    }
    const [showResult, setResultShow] = useState(false);
    const handleResultClose = () => {
        setResultShow(false);}
    const handleResultShow = () => {
        setResultShow(true);
    }
    const [showFinal, setFinalShow] = useState(false);
    const handleFinalClose = () => {
        setFinalShow(false);}
    const handleFinalShow = () => {
        setFinalShow(true);
    }
    let notif="";
    let items=[];
    let students=[];
    let teachers=[];

    useEffect(()=>{
        dispatch(getCourse(id))
        if(isRoles.isAdmin) {
            dispatch(getUsers())
        }
        dispatch(getGroupCourses())
        dispatch(profile());
        dispatch(getMyCourse());
    },[])
    const changeStatus=()=>{
        dispatch(editCoursesStatus(status,id))
    }
    const changeInfo=()=>{
        dispatch(putCoursesInfo(requirements,annotations,id))
    }
    const addNotif=()=>{
        dispatch(postCoursesNotif(notification,important,id))
        setImportant(false)
    }
    const addTeacher=()=>{
        dispatch(addCoursesTeacher(teacher,id))
    }
    const addMidtermMark=()=>{
        dispatch(addStudentMark(mark,markType,studentId,id))
    }
    const addFinalMark=()=>{
        dispatch(addStudentMark(mark,markType,studentId,id))
    }
    const changeStatusStudent=(studentId,studentStatus)=>{
        dispatch(changeStudentStatus(studentStatus,studentId,id))
    }
    const signUp=()=>{
        dispatch(signUpStudent(id))
        setAddInCourse("rounded-1 p-2 visually-hidden")
    }
    if(course!==undefined){
        notif= course.notifications.length===0?"":notificationsConverter(course.notifications);
        items = course.notifications.map((data) => {
            return <ListGroup variant="flush" key={Math.random()} className="pb-2">
                <ListGroup.Item key={Math.random()} className={(data.isImportant && "bg-danger bg-opacity-25 text-danger") || " border-bottom"}>
                    {data.text}
                </ListGroup.Item>
            </ListGroup>
        });
        if(myCourses!==undefined && myCourses.length) {
            myCourses.map((data) => {
                if (data.id === id) {
                    myCourse =  true
                }
            })
        }teachers=course.teachers.map((data)=>{
            if(user.email === data.email && data.isMain){
                isMainTeacher=true
                teacher=true
            }
            if(user.email === data.email){
                teacher=true
            }
            return <ListGroup key={data.id} variant="flush">
                <ListGroupItem key={Math.random()}>
                    <Container className="border-bottom">
                        <Row className="row-cols-1">
                            <Col>
                                <div className="fw-bold">{data.name}{data.isMain && <Badge bg="success" className="ms-1">основной</Badge>}</div>

                            </Col>
                            <Col>
                                <div className="text-muted">{data.email}</div>
                            </Col>
                        </Row>
                    </Container>
                </ListGroupItem>
            </ListGroup>
        })
            students=course.students.map((data)=> {
            if (data.email === user.email && data.status === "InQueue") {
                inQueue = true
            }
            return <ListGroup variant="flush" key={data.email} className="pb-2 mt-3">
                <ListGroupItem key={Math.random()}>
                    <Container className="border-bottom">
                        <Row className="row-cols-3">
                            <Col>
                                <div>{data.name}</div>
                                <div className="text-muted">Статус -<span
                                    className={studentStatusConverter(data.status)[1]}>{studentStatusConverter(data.status)[0]}</span>
                                </div>
                                <div className="text-muted">{data.email}</div>
                            </Col>
                            {data.status === "Accepted" && (data.email === user.email || teacher || isRoles.isAdmin) &&
                                <Col className="col-3 me-5">
                                    {teacher|| isRoles.isAdmin?<a href="#" onClick={() => {
                                        handleResultShow();
                                        setSelectedUser(data.name);
                                        setStudentId(data.id);
                                        setMarkType("Midterm")
                                    }}>Промежуточная аттестация -</a>:<a href="#">Промежуточная аттестация -</a>}<span>{<Badge
                                    bg={studenMarkConverter(data.midtermResult)[0]}>{studenMarkConverter(data.midtermResult)[1]}</Badge>}</span>
                                </Col>
                            }
                            {data.status === "Accepted" && (data.email === user.email ||teacher|| isRoles.isAdmin) &&
                                <Col className="col-3 ms-5">
                                    {teacher|| isRoles.isAdmin?<a href="#" onClick={() => {
                                        handleFinalShow();
                                        setSelectedUser(data.name);
                                        setStudentId(data.id);
                                        setMarkType("Final")
                                    }}>Финальная аттестация -</a>:<a href="#">Финальная аттестация -</a>}<span>{<Badge
                                    bg={studenMarkConverter(data.finalResult)[0]}>{studenMarkConverter(data.finalResult)[1]}</Badge>}</span>
                                </Col>
                            }
                            {data.status === "InQueue" && <Col className="text-end pe-0 offset-4">
                                <ButtonGroup size="lg" className="mb-2">
                                    <Button variant="primary" className="rounded-1 p-2" onClick={() => {
                                        changeStatusStudent(data.id, "Accepted")
                                    }}><small>принять</small></Button>
                                    <Button variant="danger" className="rounded-1 p-2 ms-1" onClick={() => {
                                        changeStatusStudent(data.id, "Declined")
                                    }}><small>отклонить <br/> заявку</small></Button>
                                </ButtonGroup>
                            </Col>}
                        </Row>
                    </Container>
                </ListGroupItem>
            </ListGroup>
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
           course!=undefined
            ?
        <Fragment>
            <NavBar/>
            {isFetchError&&<ErrorModal isFetchError={isFetchError} error={error.statusText}/>}
            <Container fluid="md" className="mt-3 ms-5 me-2">
                <h1 className="mb-3">
                    {course.name}
                </h1>
                <Container>
                    <Row>
                        <Col className="ps-0 align-self-end">
                            <h6 className="mb-1">Основные данные курса</h6>
                        </Col>
                        <Col className="text-end pe-0 ">
                            {(teacher||isRoles.isAdmin)&&<Button variant="warning" className="rounded-1 p-2" onClick={()=>{handleEditShow();setRequirements(course.requirements);setAnnotations(course.annotations)}}>РЕДАКТИРОВАТЬ</Button>}
                        </Col>
                    </Row>
                </Container>
                <Card className="mt-1">
                    <ListGroup>
                        <ListGroupItem>
                            <Container>
                                <Row>
                                    <Col md={4}>
                                        <div className="fw-bold">Статус курса</div>
                                        <div className={colorNameHandler(course.status)[1]}>{colorNameHandler(course.status)[0]}</div>
                                    </Col>
                                    <Col className="text-end pe-0 align-self-center">
                                        {(teacher||isRoles.isAdmin) &&<Button className="rounded-1 p-2" onClick={()=>{handleStatusShow();setStatusCourse(course.status)}} variant="warning">ИЗМЕНИТЬ</Button>}
                                        {(!teacher && !myCourse &&!isRoles.isAdmin && course.status!=="Finished"&&course.status!=="Started")&&<Button variant="success" className={addInCourse} onClick={()=>{signUp()}}>ЗАПИСАТЬСЯ НА КУРС</Button>}
                                    </Col>
                                </Row>
                            </Container>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Container>
                                <Row>
                                    <Col>
                                        <div className="fw-bold">Учебный год</div>
                                        <div>{course.startYear}-{course.startYear+1}</div>
                                    </Col>
                                    <Col>
                                        <div className="fw-bold">Семестр</div>
                                        <div>{semestersConverter(course.semester)[0]}</div>
                                    </Col>
                                </Row>
                            </Container>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Container>
                                <Row>
                                    <Col>
                                        <div className="fw-bold">Всего мест</div>
                                        <div>{course.maximumStudentsCount}</div>
                                    </Col>
                                    <Col>
                                        <div className="fw-bold">Студентов зачислено</div>
                                        <div>{course.studentsEnrolledCount}</div>
                                    </Col>
                                </Row>
                            </Container>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Container>
                                <Row>
                                    <Col>
                                        <div className="fw-bold">Заявок на рассмотрении</div>
                                        <div>{course.studentsInQueueCount}</div>
                                    </Col>
                                </Row>
                            </Container>
                        </ListGroupItem>
                    </ListGroup>
                </Card>
                <Card className="mt-4">
                    <Tabs className="justify-content-between nav-fill" defaultActiveKey="first">
                        <Tab eventKey="first" title={<span className="fw-bold text-primary">Требования к курсу</span>}>
                            <Container>
                                {parse(course.requirements)}
                            </Container>
                        </Tab>
                        <Tab eventKey="second" title={<span className="text-dark">Аннотация</span>}>
                            <Container>
                                {parse(course.annotations)}
                            </Container>
                        </Tab>
                        <Tab eventKey="third" title={<div className="text-dark">Уведомления <Badge bg="danger " >{notif}</Badge></div>}>
                            <Container>
                                {(teacher||isRoles.isAdmin) &&<Button className="btn-primary mt-3 rounded-1 ms-2 mb-2" onClick={()=>handleNotifShow()}>СОЗДАТЬ УВЕДОМЛЕНИЕ</Button>}
                                {items}
                            </Container>
                        </Tab>
                    </Tabs>
                </Card>
                <Card className="mt-4">
                    <Tabs className="justify-content-between nav-fill" defaultActiveKey="first">
                        <Tab eventKey="first" title={<span className="fw-bold text-primary">Преподаватели</span>}>
                            <Container>
                                {(isMainTeacher||isRoles.isAdmin) &&<Button className="btn-primary ms-4 rounded-1 mt-2 mb-2" onClick={()=>handleTeacherShow()}>Добавить преподавателя</Button>}
                                {teachers}
                            </Container>
                        </Tab>
                        <Tab eventKey="second" title={<span className="text-dark">Студенты</span>}>
                            <Container>
                                {students}
                            </Container>
                        </Tab>
                    </Tabs>
                </Card>
            </Container>
            <Modal show={showEdit} onHide={handleEditClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Редактирование курса</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mt-3">
                            <Form.Label>
                                Требования
                            </Form.Label>
                            <JoditEditor
                                value={requirements}
                                tabIndex={1} // tabIndex of textarea
                                onChange={e=>setRequirements(e)}
                            />
                        </Form.Group>
                        <Form.Group className="mt-3">
                            <Form.Label>
                                Аннотации
                            </Form.Label>
                            <JoditEditor
                                value={annotations}
                                tabIndex={1} // tabIndex of textarea
                                onChange={e=>setAnnotations(e)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary"  onClick={handleEditClose}>
                        Отмена
                    </Button>
                    <Button variant="primary" type="submit" onClick={()=>{handleEditClose();changeInfo()}}>
                        Сохранить
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showStatus} onHide={handleStatusClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Изменение статуса курса</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <div className="mt-1">
                                <Form.Check
                                    inline
                                    label="Открыт для записи"
                                    name="status"
                                    type="radio"
                                    checked={statusCourse === "OpenForAssigning"}
                                    disabled={statusCourse === "Started" || statusCourse === "OpenForAssigning" || statusCourse === "Finished"}
                                    onClick={()=>setStatus("OpenForAssigning")}
                                />
                                <Form.Check
                                    inline
                                    name="status"
                                    label="В процессе"
                                    type="radio"
                                    checked={statusCourse === "Started"}
                                    disabled={statusCourse === "Started" || statusCourse === "Finished"}
                                    onClick={()=>setStatus("Started")}
                                />
                                <Form.Check
                                    inline
                                    name="status"
                                    label="Завершен"
                                    type="radio"
                                    checked={statusCourse === "Finished"}
                                    disabled={statusCourse === "Finished"}
                                    onClick={()=>setStatus("Finished")}
                                />
                            </div>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary"  onClick={handleStatusClose}>
                        Отмена
                    </Button>
                    <Button variant="primary" type="submit" onClick={()=>{handleStatusClose();changeStatus()}}>
                        Сохранить
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showNotif} onHide={handleNotifClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Создание уведомления</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Control
                                as="textarea"
                                style={{ height: '100px'}}
                                onChange={e=>setNotification(e.target.value)}
                            />
                            <Form.Check
                                type={"checkbox"}
                                id={"important"}
                                label={"Важно"}
                                onClick={()=>setImportant(true)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary"  onClick={handleNotifClose}>
                        Отмена
                    </Button>
                    <Button variant="primary" type="submit" onClick={()=>{handleNotifClose();addNotif()}}>
                        Сохранить
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showTeacher} onHide={handleTeacherClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Добавление преподавателя на курс</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>
                                Выберите преподавателя на курс
                            </Form.Label>
                            <Form.Select onChange={e =>setTeacher(e.target.value)}>
                                {usersArray}
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary"  onClick={handleTeacherClose}>
                        Отмена
                    </Button>
                    <Button variant="primary" type="submit" onClick={()=>{handleTeacherClose();addTeacher()}}>
                        Сохранить
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showResult} onHide={handleResultClose} className="modal-lg">
                <Modal.Header closeButton>
                    <Modal.Title>Изменение отметки для "Промежуточная аттестация"</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <div>Студент - {selectedUser}</div>
                            <div className="mt-1">
                                <Form.Check
                                    inline
                                    label="Пройдено"
                                    name="final"
                                    type="radio"
                                    onClick={()=>{setMark("Passed")}}
                                />
                                <Form.Check
                                    inline
                                    name="final"
                                    label="Зафейлено"
                                    type="radio"
                                    onClick={()=>{setMark("Failed")}}
                                />
                            </div>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary"  onClick={handleResultClose}>
                        Отмена
                    </Button>
                    <Button variant="primary" type="submit" onClick={()=>{handleResultClose();addMidtermMark();}}>
                        Сохранить
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showFinal} onHide={handleFinalClose} className="modal-lg">
                <Modal.Header closeButton>
                    <Modal.Title>Изменение отметки для "Финальная аттестация"</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <div>Студент - {selectedUser}</div>
                            <div className="mt-1">
                                <Form.Check
                                    inline
                                    label="Пройдено"
                                    name="final"
                                    type="radio"
                                    onClick={()=>{setMark("Passed")}}
                                />
                                <Form.Check
                                    inline
                                    name="final"
                                    label="Зафейлено"
                                    type="radio"
                                    onClick={()=>{setMark("Failed")}}
                                />
                            </div>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary"  onClick={handleFinalClose}>
                        Отмена
                    </Button>
                    <Button variant="primary" type="submit" onClick={()=>{handleFinalClose();addFinalMark();}}>
                        Сохранить
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
                :<Spinner animation="border" className="text-center" variant="dark"/>
            :<Navigate to={MAIN_PAGE_ROUTE}/>
    );
};

export default CoursePage;