<template>
   <!--Tip 1: You can change the color of the sidebar using: data-color="blue | green | orange | red"-->
  <div class="sidebar">
    <!--
      Tip 1: You can change the color of the sidebar using: data-color="blue | green | orange | red"
  -->
    <div class="sidebar-wrapper">
      <div class="logo">
        <a href="javascript:void(0)" class="simple-text logo-normal text-center">
          MENU
        </a>
      </div>
      <ul class="nav">
        <li>
          <a @click="changeView('sensores')" style="display: inline-flex;">          
            <img src="/assets/fonts/signal.svg" width="33" height="30">
            <p style="margin-left: 10px;">Sensores</p>          
          </a>
        </li>
        <li>
          <a @click="changeView('luces')" style="display: inline-flex;">          
            <img src="/assets/fonts/foco.svg" width="33" height="30">
            <p style="margin-left: 10px;">Leds</p>
          </a>
        </li>
        <li>
          <a @click="changeView('seguridad')" style="display: inline-flex;">          
            <i class="fas fa-shield-alt"></i>
            <p style="margin-left: -4px;">Seguridad</p>
          </a>
        </li>
        <!-- <li>
          <a @click="changeView('usuarios')" style="display: inline-flex;">          
            <img src="/assets/fonts/users.svg" width="33" height="30">
            <p style="margin-left: 10px;">Usuarios</p>          
          </a>
        </li> -->
      </ul>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  setup(){
    const router = useRouter();

    return{
      changeView: (name) => {
        document.querySelector('.navbar-toggler').click();
        router.push({name})
      }
    }
  }
}
</script>

<style>

</style>