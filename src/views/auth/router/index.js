
export default{
  name: 'auth',
  component: () => import(/* webpackChunkName: "AuthLayout" */ '@/views/auth/layouts/AuthLayout'),
  children: [
    {
      path: '',
      name: 'login',
      component: () => import(/* webpackChunkName: "Login" */ '@/views/auth/views/Login'),
    }
  ]
}
