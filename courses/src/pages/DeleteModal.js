import React, {useEffect, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {useDispatch} from "react-redux";

const DeleteModal = (props) => {
    const [show,setShow]=useState(false)
    const dispatch =useDispatch();
    const handleClose=()=>{
        setShow(false)
    }
    useEffect(()=>{
        setShow(props.props.isDelete)
    },[])
    return (
        <Modal
            show={show}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header>
                <Modal.Title>Вы уверены, что хотите удалить {props.props.currentGroup}?</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button variant="danger" onClick={()=>{handleClose();props.props.setIsdelete(false);props.props.deleteGroup(props.props.currentGroupId)}}>Удалить</Button>
                <Button variant="primary" onClick={()=>{handleClose();props.props.setIsdelete(false)}}>Отмена</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteModal;