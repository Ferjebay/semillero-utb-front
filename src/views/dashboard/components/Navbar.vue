<template>
   <nav class="navbar navbar-expand-lg navbar-absolute navbar-transparent">
        <div class="container-fluid">
          
          <div class="navbar-wrapper">
            <div class="navbar-toggle d-inline">
              <button type="button" class="navbar-toggler">
                <span class="navbar-toggler-bar bar1"></span>
                <span class="navbar-toggler-bar bar2"></span>
                <span class="navbar-toggler-bar bar3"></span>
              </button>
            </div>
            <a class="navbar-brand" href="javascript:void(0)">
              <img src="/img/iot.png" width="125" alt="">
            </a>
          </div>

          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-bar navbar-kebab"></span>
            <span class="navbar-toggler-bar navbar-kebab"></span>
            <span class="navbar-toggler-bar navbar-kebab"></span>
          </button>

          <div class="collapse navbar-collapse" id="navigation">
            <ul class="navbar-nav ml-auto">
              <li class="dropdown nav-item d-flex align-items-center pr-0">
                <a href="javascript:void(0)" class="nav-link pr-0" data-toggle="dropdown">
                  {{ usuario }}
                </a>
              </li>
              <li class="dropdown nav-item">
                <a href="#" class="dropdown-toggle nav-link" data-toggle="dropdown">
                  <div class="photo">                  
                    <img src="/img/anime3.png" alt="Profile Photo">
                  </div>
                  <b class="caret d-none d-lg-block d-xl-block"></b>
                  <p class="d-lg-none">
                    Cerrar Sesión
                  </p>
                </a>
                <ul class="dropdown-menu dropdown-navbar">
                  <li class="nav-link">
                    <a href="javascript:void(0)" class="nav-item dropdown-item" @click="logout">
                      Salir
                    </a>
                  </li>
                </ul>
              </li>
              <li class="separator d-lg-none"></li>
            </ul>
          </div>
        </div>

      </nav>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex'
import useAuth from '../../auth/composables/useAuth'
export default {
  setup(){

    const store = useStore()

    const { logout } = useAuth();

    const usuario = computed(() => store.getters['auth/username'])

    return{
      logout: () => {
        logout();
        window.location.href = '/'
      }, 
      usuario
    }
  }
}
</script>

<style>

</style>