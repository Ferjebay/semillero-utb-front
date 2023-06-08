<template>
   <div class="wrapper">
    <Sidebar />

    <div class="main-panel">
      <Navbar />
        <router-view/>
      <Footer />
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
// import firebase from '@/utils/firebase';

export default {
 components: { 
    Sidebar: defineAsyncComponent(() => import('../components/Sidebar')),
    Navbar: defineAsyncComponent(() => import('../components/Navbar')),
    Footer: defineAsyncComponent(() => import('../components/Footer'))
 },
 setup(){

  // const { updateDataIot } = firebase();
  // updateDataIot()

  const ficheros = ['popper.min.js', 'bootstrap.min.js', 'black-dashboard.min.js?v=1.0.0', 'cP.js']

  ficheros.forEach(fichero => {
    let recaptchaScript = document.createElement('script') 
    recaptchaScript.setAttribute('src', `/assets/js/${fichero}`) 
    document.head.appendChild(recaptchaScript)
  })
 }
}
</script>

<style>
  @import '/assets/css/nucleo-icons.css';
  @import '/assets/css/black-dashboard.css';
</style>