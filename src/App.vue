<template>  
  <router-view/>
</template>

<script>
import useAuth from './views/auth/composables/useAuth'
// import firebase from './utils/firebase';
export default{
  setup(){
    
    const { checkAuthStatus } = useAuth()
    // const { updateDataIot } = firebase();

    checkAuthStatus()
    // updateDataIot();

    // firebase();
    
  }
}
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */

</style>
