import Profile from "./pages/Profile";
import Index from "./pages";
import {
    CAMPUS_GROUP_ROUTE,
    LOGIN_ROUTE,
    MAIN_PAGE_ROUTE,
    MY_COURSES, MY_TEACHING_COURSES,
    PROFILE_ROUTE,
    REGISTRATION_ROUTE
} from "./utils/consts";
import CampusGroup from "./pages/CampusGroup";
import Registration from "./pages/registration";
import Login from "./pages/login";
import MyCourses from "./pages/MyCourses";
import MyTeachingCourses from "./pages/MyTeachingCourses";

export const publicRoutes =[
    {
        path:CAMPUS_GROUP_ROUTE,
        exact:true,
        component:<CampusGroup/>
    },
    {
        path:PROFILE_ROUTE,
        exact:true,
        component:<Profile/>
    },
    {
        path:MAIN_PAGE_ROUTE,
        exact:true,
        component:<Index/>
    },
    {
        path:LOGIN_ROUTE,
        component:<Login/>
    },
    {
        path:REGISTRATION_ROUTE,
        exact:true,
        component:<Registration/>
    },
    {
        path:MY_COURSES,
        exact:true,
        component:<MyCourses/>
    },
    {
        path:MY_TEACHING_COURSES,
        exact:true,
        component:<MyTeachingCourses/>
    },

]