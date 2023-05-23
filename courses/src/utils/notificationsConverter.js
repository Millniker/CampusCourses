import React from 'react';
import {ListGroup, ListGroupItem} from "react-bootstrap";

const NotificationsLenghtConverter = (notifications) => {
    if(notifications.length>3){
        return "3+"
    }
    else {
        console.log(notifications.length)
        return notifications.length
    }
};

export default NotificationsLenghtConverter;
