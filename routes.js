import React from 'react';
import { Container } from 'reactstrap';
import information from './src/Views/Information/information';
import userinfo from './src/Views/Userinformation/userinfo';
const Dashboard = React.lazy(() => import('./src/Views/Dashboard/Dashboard'));
const Image = React.lazy(() => import('./src/Views/Upload/images'));
const userinfo = React.lazy(() => import('./src/Views/Userinformation/userinfo'));
const information = React.lazy(()=>import('./src/Views/Information/information'))


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', component: Dashboard },
  { path: '/images', component: Image },
  { path: '/userinformation', component: userinfo },
  { path: '/information', component: information },
  
];


export default routes;