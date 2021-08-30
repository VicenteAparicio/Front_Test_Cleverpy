import IRoute from '../interfaces/route';
import PostsPage from '../pages/Posts/posts';
import HomePage from '../pages/Home/home';
import LoginPage from '../pages/Login/login';

const routes: IRoute[] = [
    {
        path: '/',
        name: 'Home',
        component: HomePage,
        exact: true
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginPage,
        exact: true
    },
    {
        path: '/posts',
        name: 'Posts',
        component: PostsPage,
        exact: true
    },
]

export default routes;