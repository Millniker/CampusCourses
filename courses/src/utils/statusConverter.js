const colorNameHandler = (status) => {
    switch (status) {
        case "Created": {
            return[
                "Создан",
                "text-secondary"
            ];
        }
        case "OpenForAssigning":{
            return[
                "Открыт для записи",
                "text-success"
            ];
        }
        case "Started" :{
            return[
                "В процессе обучения",
                "text-primary"
            ];            }
        case "Finished":{
            return[
                "Зыкрыт",
                "text-danger"
            ];
        }
    }
}
export default colorNameHandler;