import React from 'react';

const StudentStatusConverter = (status) => {
    switch (status){
        case "InQueue":{
            return[
                "в очереди",
                "text-primary"
            ]
        }
        case "Accepted":{
            return [
                "принят",
                "text-success"
            ]
        }
        case "Declined":{
            return [
                "отклонен",
                "text-danger"
            ]

        }
    }
};

export default StudentStatusConverter;