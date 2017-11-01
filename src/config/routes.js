import{
    Login,
    Main
} from '../component/index.js'

export const routes = [
    {
        path: '/login',
        component: Login,
        exact: false
    },{
        path:'/main',
        component: Main,
        exact: false
    }
]