import Profile from "./pages/Profile";
import MainPage from "./pages/MainPage";
import {CAMPUS_GROUP_ROUTE, LOGIN_ROUTE, MAIN_PAGE_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE} from "./utils/consts";
import CampusGroup from "./pages/CampusGroup";
import Auth from "./pages/Auth";
import Login from "./pages/Login";

export const authRoutes=[
    {
        path:PROFILE_ROUTE,
        exact:true,
        component:<Profile/>
    },
    {
        path:CAMPUS_GROUP_ROUTE,
        exact:true,
        component:<CampusGroup/>
    }
]
export const publicRoutes =[
    {
        path:MAIN_PAGE_ROUTE,
        exact:true,
        component:<MainPage/>
    },
    {
        path:LOGIN_ROUTE,
        component:<Login/>
    },
    {
        path:REGISTRATION_ROUTE,
        exact:true,
        component:<Auth/>
    },
]