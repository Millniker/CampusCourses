import {Fragment, useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {setIsError} from "../store/coursesReduser";
import {useDispatch} from "react-redux";
import {setError} from "../store/errorReduser";

function ErrorModal(props) {
    const [show,setShow]=useState(false)
    const dispatch =useDispatch();
    const handleClose=()=>{
        setShow(false)
    }
    useEffect(()=>{
        setShow(props.isFetchError)
    },[])

    return (
            <Modal
                show={show}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>Внимание !</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.error}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={()=>{handleClose();dispatch(setError(false))}}>Принять</Button>
                </Modal.Footer>
            </Modal>
    );
}

export default ErrorModal;