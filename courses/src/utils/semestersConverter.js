const semesterNameHandler = (semester) => {
    switch (semester) {
        case "Autumn": {
            return[
                "Осенний",
            ];
        }
        case "Spring":{
            return[
                "Весенний",
            ];
        }
    }
}
export default semesterNameHandler;