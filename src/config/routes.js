import{
    Login,
    Home
} from '../component/index.js'

export const routes = [
    {
        path: '/bot/login',
        component: Login,
        exact: false
    },{
        path:'/bot/chat',
        component: Home,
        exact: false
    }
]