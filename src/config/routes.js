import{
    Login,
    Home
} from '../component/index.js'

export const routes = [
    {
        path: '/login',
        component: Login,
        exact: false
    },{
        path:'/home',
        component: Home,
        exact: false
    }
]