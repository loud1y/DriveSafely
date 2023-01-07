import About from "../pages/About.jsx";
import Posts from "../pages/Posts.jsx";
import PostPage from "../pages/PostPage.jsx";
import Login from "../pages/Login.jsx";

export const privateRoutes = [
    {path: '/about', component: <About/>, exact: true},
    {path: '/posts', component: <Posts/>, exact: true},
    {path: '/posts/:id', component: <PostPage/>, exact: true},
    {path: '*', component: <Login/>, exact: true},
]

export const publicRoutes = [
    {path: '/login', component: <Login/>, exact: true},
    {path: '*', component: <Login/>, exact: true},
]