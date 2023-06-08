<template>
  <div class="contenedor">
   <header>
     <nav
       class="navbar navbar-expand-lg navbar-light shadow p-2"
       aria-labelledby="primary-navigation"
       style="background-color: #243c2b"
     >
       <div class="container-fluid">
         <a class="navbar-brand" href="./Index.html">
           <img
             src="/img/iot.png"
             width=""
             height="60"
             class="d-inline-block align-top"
             alt=""
           />
         </a>

         <button
           class="navbar-toggler"
           type="button"
           data-bs-toggle="collapse"
           data-bs-target="#navbarNavAltMarkup"
           aria-controls="navbarNavAltMarkup"
           aria-expanded="false"
           aria-label="Toggle navigation"
         >
           <span class="navbar-toggler-icon"></span>
         </button>

         <div class="collapse navbar-collapse" id="navbarNavAltMarkup"></div>
       </div>
     </nav>
   </header>

   <main>
    <div class="container">
     <router-view />
    </div>
   </main>
  </div>
</template>

<style scoped>
@import '/assets/css/bt.min.css';
 @import '/assets/css/login.css';
</style>