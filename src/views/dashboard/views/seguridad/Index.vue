<template>
  <div class="content" :class="[ pantalla <= 900 ? 'pb-0' : '']">
    <div class="row" :class="[ pantalla <= 900 ? 'pt-4' : '']">

      <div class="col-12 col-lg-4 mb-3" style="height: 209px;">
        <div class="card card-chart" style="height: 100%;">
          <div class="card-header">                
            <h3 class="card-title text-center">              
              Seguridad
            </h3>
          </div>
          <div class="card-body pt-0 pb-0 d-flex justify-content-center">
            <div class="power-switch">
              <input type="checkbox" v-model="alarmaEncendida" />
              <div class="button">
                <svg class="power-off">
                  <use xlink:href="#line" class="line" />
                  <use xlink:href="#circle" class="circle" />
                </svg>
                <svg class="power-on">
                  <use xlink:href="#line" class="line" />
                  <use xlink:href="#circle" class="circle" />
                </svg>
              </div>
            </div>

            <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
              <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150" id="line">
                <line x1="75" y1="34" x2="75" y2="58"/>
              </symbol>
              <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150" id="circle">
                <circle cx="75" cy="80" r="35"/>
              </symbol>
            </svg>

          </div>
        </div>
      </div>

      <!-- <div class="col-12 col-lg-4 mb-3 mt-0" style="height: 209px;">
        <div class="card card-chart" style="height: 100%;">
          <div class="card-header">                
            <h3 class="card-title text-center">              
              Puerta 
              <span v-if="sensorMagnetico > 0">
                Cerrada
              </span>
              <span v-else>
                Abierta
              </span>
            </h3>
          </div>
          <div class="card-body pt-0 pb-0 d-flex justify-content-center align-items-center">
            <i class="fas fa-lock pb-4" v-if="sensorMagnetico > 0"
              style="font-size: 5.5rem;"></i>
            <i class="fas fa-unlock-alt pb-4" v-else
              style="font-size: 5.5rem;">
            </i>
          </div>
        </div>
      </div> -->

      <div class="col-12 col-lg-4 mb-4" style="height: 209px;">
        <div class="card card-chart" style="height: 100%;">
          <div class="card-header">                
            <h3 class="card-title text-center">                            
              <span v-if="sensorInfrarrojo">
                Movimiento Detectado
              </span>
              <span v-else>
                Area Despejada
              </span>
            </h3>
          </div>
          <div class="card-body pt-0 pb-0 d-flex justify-content-center align-items-center">
            <img src="/img/person-walking.svg" v-if="sensorInfrarrojo"
              style="width: 17%;margin-bottom: 25px">

            <img src="/img/house-lock.svg" v-else
            style="width: 29%;margin-bottom: 25px">            
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import starCountRef from '@/utils/firebase2';
import { onValue } from "firebase/database";
import { ref } from '@vue/reactivity';
import { watch, computed } from 'vue';
import dashboardApi from '@/api/dashboardApi'
import { useStore } from 'vuex'

export default {
  setup(){
    const pantalla = screen.width;
    const alarmaEncendida = ref(false);
    const sensorMagnetico = ref(0);
    const sensorInfrarrojo = ref(false);
    const store = useStore()

    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      store.commit('auth/updateIotData', data)
      const estadoAlarma = computed (() => store.state.auth.iot.outputs.digital.alarma)    
      const estadoSensorMagnetico = computed (() => store.state.auth.iot.sensor.magnetico)    
      const estadoSensorInfrarrojo = computed (() => store.state.auth.iot.sensor.infrarrojo)    
      alarmaEncendida.value = estadoAlarma.value
      sensorMagnetico.value = !estadoSensorMagnetico.value
      sensorInfrarrojo.value = estadoSensorInfrarrojo.value
    })
    
    watch(alarmaEncendida, async (newValue) => {
      const casa = store.state.auth.hogar
      const config = { alarma:  newValue}
      await dashboardApi.patch(`/${casa}/outputs/digital.json`,  config);     
    });

    return{
      pantalla,
      alarmaEncendida,
      sensorMagnetico,
      sensorInfrarrojo
    }    
  }
}
</script>

<style scoped>
.power-switch {
  --color-invert: #ffffff;
  --width: 150px;
  --height: 150px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: var(--width);
  height: var(--height);
}
.power-switch .button {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.power-switch .button:after {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  background: radial-gradient(circle closest-side, var(--color-invert), transparent);
  filter: blur(20px);
  opacity: 0;
  transition: opacity 1s ease, transform 1s ease;
  transform: perspective(1px) translateZ(0);
  backface-visibility: hidden;
}
.power-switch .button .power-on,
.power-switch .button .power-off {
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 1;
  fill: none;
  stroke: var(--color-invert);
  stroke-width: 8px;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.power-switch .button .power-on .line,
.power-switch .button .power-off .line {
  opacity: 0.2;
}
.power-switch .button .power-on .circle,
.power-switch .button .power-off .circle {
  opacity: 0.2;
  transform: rotate(-58deg);
  transform-origin: center 80px;
  stroke-dasharray: 220;
  stroke-dashoffset: 40;
}
.power-switch .button .power-on {
  filter: drop-shadow(0px 0px 6px rgba(255, 255, 255, 0.8));
}
.power-switch .button .power-on .line {
  opacity: 0;
  transition: opacity 0.3s ease 1s;
}
.power-switch .button .power-on .circle {
  opacity: 1;
  stroke-dashoffset: 220;
  transition: transform 0s ease, stroke-dashoffset 1s ease 0s;
}
.power-switch input {
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 2;
  cursor: pointer;
  opacity: 0;
}
.power-switch input:checked + .button:after {
  opacity: 0.15;
  transform: scale(2) perspective(1px) translateZ(0);
  backface-visibility: hidden;
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.power-switch input:checked + .button .power-on,
.power-switch input:checked + .button .power-off {
  animation: click-animation 0.3s ease forwards;
  transform: scale(1);
}
.power-switch input:checked + .button .power-on .line,
.power-switch input:checked + .button .power-off .line {
  animation: line-animation 0.8s ease-in forwards;
}
.power-switch input:checked + .button .power-on .circle,
.power-switch input:checked + .button .power-off .circle {
  transform: rotate(302deg);
}
.power-switch input:checked + .button .power-on .line {
  opacity: 1;
  transition: opacity 0.05s ease-in 0.55s;
}
.power-switch input:checked + .button .power-on .circle {
  transform: rotate(302deg);
  stroke-dashoffset: 40;
  transition: transform 0.4s ease 0.2s, stroke-dashoffset 0.4s ease 0.2s;
}

@keyframes line-animation {
  0% {
    transform: translateY(0);
  }
  10% {
    transform: translateY(10px);
  }
  40% {
    transform: translateY(-25px);
  }
  60% {
    transform: translateY(-25px);
  }
  85% {
    transform: translateY(10px);
  }
  100% {
    transform: translateY(0px);
  }
}
@keyframes click-animation {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}
/* body {
  background: #1B1A23;
  height: 100vh;
  font: 400 16px "Poppins", sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
} */
body .socials {
  position: fixed;
  display: block;
  left: 20px;
  bottom: 20px;
}
body .socials > a {
  display: block;
  width: 30px;
  opacity: 0.2;
  transform: scale(var(--scale, 0.8));
  transition: transform 0.3s cubic-bezier(0.38, -0.12, 0.24, 1.91);
}
body .socials > a:hover {
  --scale: 1;
}
</style>