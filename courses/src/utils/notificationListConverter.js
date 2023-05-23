import {ListGroup, ListGroupItem} from "react-bootstrap";
import React from "react";

const NotificationsListConverter=(notifications)=>{
    return notifications.map((data) => {
        console.log(data)
        return <ListGroup variant="flush">
            <ListGroup.Item className={data.isImportant && "danger"}>
                {data.text}
            </ListGroup.Item>
        </ListGroup>
    });
}
export default NotificationsListConverter;