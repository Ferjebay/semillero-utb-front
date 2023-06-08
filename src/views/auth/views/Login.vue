<template> 
  <div class="card card-container">
    <img
      id="profile-img"
      class="profile-img-card"
      src="/img/porti_utb.png"
      style="width: 140px; height: 140px"
    />
    <p id="profile-name" class="profile-name-card"></p>
    <form @submit.prevent="submit"
      class="form-signin"
      id="formLogin"
      style="position: relative; bottom: 27px"
    >
      <span id="reauth-email" class="reauth-email"></span>
      <input
        type="email"
        id="inputEmail"
        class="form-control"
        placeholder="Correo electronico"
        required
        autofocus
        v-model="user.email"
        autocomplete="off"
      />
      <input
        type="password"
        id="inputPassword"
        class="form-control mt-3"
        placeholder="Contraseña"
        v-model="user.password"
        required
      />
      <button
        class="btn btn-lg btn-primary btn-block btn-signin mt-3"
        type="submit"
      >
        Iniciar Sesión
      </button>
    </form>
  </div>    
</template>

<script>
import { ref } from 'vue';
import useAuth from '../composables/useAuth'
import Swal from 'sweetalert2';

export default {
  setup(){
      
    const user = ref({
      email: 'casa@gmail.com',
      password: '123456'
    })
    
    const { loginUser } = useAuth();

    return {
      user,
      submit: async () => {
          const { ok, msg } = await loginUser(user.value)
          if (!ok) return Swal.fire('Error', msg, 'error')

          window.location.href = '/dashboard'
      }
    }
  }
};
</script>

