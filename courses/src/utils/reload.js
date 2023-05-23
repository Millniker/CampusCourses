import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const withReloadOnParamChange = (Component) => {
    const navigate = useNavigate();
    const WrappedComponent = ({ history, location, ...rest }) => {
        useEffect(() => {
            // проверяем, есть ли параметр id в URL
            const params = new URLSearchParams(location.search);
            const id = params.get('id');

            if (id) {
                // добавляем локальную переменную, чтобы избежать
                // зацикливания переходов
                let isFirstLoad = true;

                const handleBeforeUnload = () => {
                    // сохраняем ID в localStorage перед перезагрузкой страницы
                    localStorage.setItem('lastVisitedId', id);
                };

                const handleAfterLoad = () => {
                    if (isFirstLoad) {
                        isFirstLoad = false;
                        return;
                    }

                    // если мы попали на страницу с нужным ID, ничего не делаем
                    if (params.get('id') === id) {
                        return;
                    }

                    // если ID изменился, переходим на нужную страницу
                    history.push(`/path/to/page?id=${id}`);
                };

                window.addEventListener('beforeunload', handleBeforeUnload);
                window.addEventListener('load', handleAfterLoad);

                return () => {
                    window.removeEventListener('beforeunload', handleBeforeUnload);
                    window.removeEventListener('load', handleAfterLoad);
                };
            }
        }, [location.search]);

        return <Component {...rest} />;
    };

    return navigate(WrappedComponent);
};

export default withReloadOnParamChange;