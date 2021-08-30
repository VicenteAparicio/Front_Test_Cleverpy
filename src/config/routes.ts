import IRoute from '../interfaces/route';
import PostsPage from '../pages/Posts/posts';
import HomePage from '../pages/Home/home';
import LoginPage from '../pages/Login/login';

const routes: IRoute[] = [
    {
        path: '/',
        name: 'Home Page',
        component: HomePage,
        exact: true
    },
    {
        path: '/login',
        name: 'Login Page',
        component: LoginPage,
        exact: true
    },
    {
        path: '/posts',
        name: 'Posts Page',
        component: PostsPage,
        exact: true
    },
]

export default routes;