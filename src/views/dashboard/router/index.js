export default{    
 name: 'Dashboard',
 component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/layouts/DashboardLayout.vue'),
 children: [
    {
       path: '',  
       redirect: { name: 'sensores'}       
    },
    {
      path: 'sensores',  
      name: 'sensores',
      component: () => import(/* webpackChunkName: "sensor" */ '@/views/dashboard/views/sensores/Index')
    },
    {
      path: 'luces',  
      name: 'luces',
      component: () => import(/* webpackChunkName: "sensor" */ '@/views/dashboard/views/luces/Index')
    },
    {
      path: 'seguridad',  
      name: 'seguridad',
      component: () => import(/* webpackChunkName: "sensor" */ '@/views/dashboard/views/seguridad/Index')
    },
    {
      path: 'usuarios',  
      name: 'usuarios',
      component: () => import(/* webpackChunkName: "sensor" */ '@/views/dashboard/views/usuarios/Index')
    },
 ]
}






