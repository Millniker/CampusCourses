import React from 'react';

const StudentMarkConverter = (mark) => {
    switch (mark){
        case "NotDefined":{
            return[
                "secondary",
                "отметки нет"
            ]
        }
        case "Passed":{
            return [
                "success",
                "успешно пройдена"
            ]
        }
        case "Failed":{
            return [
                "danger",
                "зафейлена"
            ]
        }
    }
};

export default StudentMarkConverter;