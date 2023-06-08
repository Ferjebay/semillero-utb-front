<template>  
  <footer class="footer" :class="[ pantalla <= 950 ? 'py-0' : '']">
    <div class="container-fluid">
 <ul class="nav">
  <li class="nav-item" style="font-size: 15px;">
    UNIVERSIDAD TÉCNICA DE BABAHOYO - FAFI
  </li>
 </ul>
 <div class="copyright">   
   <img id="profile-img" class="profile-img-card" :class="[ pantalla <= 950 ? 'mt-5' : '']" src="/img/porti_utb.png"
    style="width: 80px;position: relative;bottom: 37px;" />
 </div>
</div>
  </footer>
</template>

<script>
export default {
  setup(){
    const pantalla = screen.width;
    return{ pantalla }
  }
}
</script>

<style>

</style>