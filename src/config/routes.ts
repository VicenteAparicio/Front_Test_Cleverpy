import IRoute from '../interfaces/route';
import AboutPage from '../pages/About/about';
import PostsPage from '../pages/Posts/posts';
import HomePage from '../pages/Home/home';
// import Nav from '../components/Nav/nav';

const routes: IRoute[] = [
    {
        path: '/',
        name: 'Home Page',
        component: HomePage,
        exact: true
    },
    {
        path: '/about',
        name: 'About Page',
        component: AboutPage,
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