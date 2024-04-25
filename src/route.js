import React from 'react';

const SignUp = React.lazy(() => import('./Demo/Authentication/SignUp/SignUp1'));
const Signin = React.lazy(() => import('./Demo/Authentication/SignIn/SignIn1'));

const Loader = React.lazy(() => import('../src/App/layout/Loader'));

const route = [
  { path: '/auth/signup', exact: true, name: 'Signup 1', component: SignUp },
  { path: '/auth/signin', exact: true, name: 'Signin 1', component: Signin },
  { path: '/auth/loader', exact: true, name: 'Signin 1', component: Loader },
];

export default route;
