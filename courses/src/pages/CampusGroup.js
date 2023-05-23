import React, {Fragment, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button, Card, Container, Form, ListGroup, ListGroupItem, Modal, Spinner} from "react-bootstrap";
import NavBar from "../components/NavBar";
import {deleteGroupCourses, getGroupCourses, postGroupCourses, putGroupCourses} from "../api/coursesApi";
import {MAIN_PAGE_ROUTE} from "../utils/consts";
import {generatePath, Link, Navigate, useNavigate, useParams} from "react-router-dom";
import semestersConverter from "../utils/semestersConverter";
import ErrorModal from "./ErrorModal";
import DeleteModal from "./DeleteModal";

const CampusGroup = () => {
    const dispatch = useDispatch()
    const groups = useSelector(state => state.group.currentGroups)
    const isRoles=useSelector( state => state.user.roles)
    const isAuth=useSelector(state => state.user.isAuth)
    const [show, setShow] = useState(false);
    const [currentGroup, setCurrentGroup] = useState();
    const [currentGroupId, setCurrentGroupId] = useState();
    const [title, setTitle] =useState();
    const isFetching = useSelector(state => state.group.isFetching )
    const navigate = useNavigate();
    const error = useSelector(state => state.error.error)
    const [isDelete,setIsdelete]=useState(false);
    const isFetchError = useSelector(state => state.error.isFetchError)

    const handleClose = () => setShow(false);
    const handleShow = (name) => {
        setShow(true);
        setCurrentGroup(name)
        }

    useEffect(()=>{
        dispatch(getGroupCourses())
    },[])
    const changeNameGroup =()=>{
        if(title==="Создать группу"){
            createGroup();
        }
        else {
            dispatch(putGroupCourses(currentGroupId, currentGroup))
        }
    }
    const deleteGroup=(id)=>{
        dispatch(deleteGroupCourses(id))
    }
    const createGroup = () => {
        dispatch(postGroupCourses(currentGroup))
    }
    return (
        localStorage.getItem('token')
            ?
        <Fragment>
            <NavBar/>
            {isDelete&&<DeleteModal props={{isDelete,currentGroup,currentGroupId,deleteGroup,setIsdelete}}/>}
            {isFetchError&&<ErrorModal isFetchError={isFetchError} error={error.data.messages}/>}
            <Container fluid="md" className="mt-3">
                <div className="mb-4">
                    <h1 >
                        Группы кампусных курсов
                    </h1>
                    {isRoles.isAdmin && <Button variant="primary" onClick={()=>{handleShow("");setTitle("Создать группу")}}>Создать</Button>}
                </div>
            <Card style={{ width: '100%' }}>
                <ListGroup variant="flush" >
                    {!isFetching&& groups.length!=undefined ?groups.map((data)=>{
                        return <ListGroupItem key={data.id}>
                            <a className="link-primary" onClick={()=>{navigate('/groups/'+data.id)}}>{data.name}</a>
                            <div className="float-end">
                                {isRoles.isAdmin && <Button className="btn-warning me-3" onClick={()=>{handleShow(data.name);setCurrentGroupId(data.id)}}>РЕДАКТИРОВАТЬ</Button>}
                                {isRoles.isAdmin && <Button className="btn-danger" onClick={()=>{setCurrentGroupId(data.id);setCurrentGroup(data.name);setIsdelete(true)}}>УДАЛИТЬ</Button>}
                            </div>
                        </ListGroupItem>
                    }):<Spinner animation="border" className="align-self-center" variant="dark"/>}

                </ListGroup>
            </Card>
            </Container>
            <Modal show={show} onHide={handleClose} onSubmit={changeNameGroup}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>
                                Название группы
                            </Form.Label>
                            <Form.Control
                                autoFocus
                                value={currentGroup}
                                required
                                onChange={e=>setCurrentGroup(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">Укажите название группы</Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary"  onClick={handleClose}>
                        Отмена
                    </Button>
                    <Button variant="primary" type="submit" onClick={()=> {changeNameGroup(); handleClose()}}>
                        Сохранить
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
            :<Navigate to={MAIN_PAGE_ROUTE}/>
    );
};

export default CampusGroup;