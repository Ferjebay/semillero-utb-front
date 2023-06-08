<template>
  <div class="content" :class="[ pantalla <= 900 ? 'pb-0' : '']">
    <div class="row" :class="[ pantalla <= 900 ? 'pt-4' : '']">
      <div class="col-12 col-lg-4">
        <div class="card card-chart">
          <div class="card-header">                
            <h3 class="card-title text-center">
              <img src="/assets/fonts/pos.svg" width="24" height="24">
              LUCES
            </h3>
          </div>
          <div class="card-body pt-0 d-flex justify-content-center pb-0">
              <div class="chart-area" style="height: 169px !important;">
                <main>
                  <input class="l" id="foco3" type="checkbox" style="font-size: 60px;" 
                  :checked="led1"
                  @click="updateStatusLed('led1')">
                </main>
              </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-4">
        <div class="card card-chart">
          <div class="card-header">                
            <h3 class="card-title text-center">
              <img src="/assets/fonts/pos.svg" width="24" height="24">
              LUCES
            </h3>
          </div>
          <div class="card-body pt-0 d-flex justify-content-center pb-0">
              <div class="chart-area" style="height: 169px !important;">
                <main>
                  <input class="l" id="foco3" type="checkbox" style="font-size: 60px;" 
                  :checked="led2"
                  @click="updateStatusLed('led2')">
                </main>
              </div>
          </div>
        </div>
      </div>
      <!-- <div class="col-12 col-lg-4">
        <div class="card card-chart">
          <div class="card-header">                
            <h3 class="card-title text-center">
              <img src="/assets/fonts/pos.svg" width="24" height="24">
              COCINA
            </h3>
          </div>
          <div class="card-body pt-0 d-flex justify-content-center pb-0">
              <div class="chart-area" style="height: 169px !important;">
                <main>
                  <input class="l" id="foco3" type="checkbox" style="font-size: 60px;" 
                  :checked="led3"
                  @click="updateStatusLed('led3')">
                </main>
              </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-4">
        <div class="card card-chart">
          <div class="card-header">                
            <h3 class="card-title text-center">
              <img src="/assets/fonts/pos.svg" width="24" height="24">
              BAÑO
            </h3>
          </div>
          <div class="card-body pt-0 d-flex justify-content-center pb-0">
              <div class="chart-area" style="height: 169px !important;">
                <main>
                  <input class="l" id="foco4" type="checkbox" style="font-size: 60px;" 
                  :checked="led4"
                  @click="updateStatusLed('led4')">
                </main>
              </div>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex'
import starCountRef from '@/utils/firebase2';
import { onValue } from "firebase/database";
import dashboardApi from '@/api/dashboardApi'

export default {
  setup(){
    const store = useStore()
    const led1 = ref(false);
    const led2 = ref(false);
    const led3 = ref(false);
    const led4 = ref(false);
    const pantalla = screen.width;

    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
        store.commit('auth/updateIotData', data)
        const fireled1 = computed (() => store.state.auth.iot.outputs.digital.led1)    
        const fireled2 = computed (() => store.state.auth.iot.outputs.digital.led2)    
        const fireled3 = computed (() => store.state.auth.iot.outputs.digital.led3)    
        const fireled4 = computed (() => store.state.auth.iot.outputs.digital.led4)    
        led1.value = fireled1.value
        led2.value = fireled2.value
        led3.value = fireled3.value
        led4.value = fireled4.value
    })      

    return{
      led1,
      led2,
      led3,
      pantalla,

      updateStatusLed: async (element) => {
        let config = {};
        switch (element) {
          case 'led1':
            led1.value = !led1.value
            config = { led1:  led1.value}
            break;
          case 'led2':
            led2.value = !led2.value
            config = { led2:  led2.value}
            break;
          case 'led3':
            led3.value = !led3.value
            config = { led3:  led3.value}
            break;
          case 'led4':
            led4.value = !led4.value
            config = { led4:  led4.value}
            break;
        }        
        const casa = store.state.auth.hogar
        await dashboardApi.patch(`/${casa}/outputs/digital.json`,  config)      
        
      }
    }    
  }
}
</script>

<style scoped>
  input {
    display: block;
    margin-bottom: 1.5em;
  }
  main {
    padding: 1.5em 0 0 0;
    text-align: center;	
  }
  .l {
    background-color: rgba(0,0,0,0.7);
    border-radius: 0.75em;
    box-shadow: 0.125em 0.125em 0 0.125em rgba(0,0,0,0.3) inset;
    color: #fdea7b;
    display: inline-flex;
    align-items: center;
    margin: auto;
    padding: 0.15em;
    width: 3em;
    height: 1.5em;
    transition: background-color 0.1s 0.3s ease-out, box-shadow 0.1s 0.3s ease-out;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
  .l:before, .l:after {
    content: "";
    display: block;
  }
  .l:before {
    background-color: #d7d7d7;
    border-radius: 50%;
    width: 1.2em;
    height: 1.2em;
    transition: background-color 0.1s 0.3s ease-out, transform 0.3s ease-out;
    z-index: 1;
  }
  .l:after {
    background:
    linear-gradient(transparent 50%, rgba(0,0,0,0.15) 0) 0 50% / 50% 100%,
    repeating-linear-gradient(90deg,#bbb 0,#bbb,#bbb 20%,#999 20%,#999 40%) 0 50% / 50% 100%,
    radial-gradient(circle at 50% 50%,#888 25%, transparent 26%);
    background-repeat: no-repeat;
    border: 0.25em solid transparent;
    border-left: 0.4em solid #d8d8d8;
    border-right: 0 solid transparent;
    transition: border-left-color 0.1s 0.3s ease-out, transform 0.3s ease-out;
    transform: translateX(-22.5%);
    transform-origin: 25% 50%;
    width: 1.2em;
    height: 1em;
  }
  /* Checked */
  .l:checked {
    background-color: rgba(0,0,0,0.45);
    box-shadow: 0.125em 0.125em 0 0.125em rgba(0,0,0,0.1) inset;
  }
  .l:checked:before {
    background-color: currentColor;
    transform: translateX(125%)
  }
  .l:checked:after {
    border-left-color: currentColor;
    transform: translateX(-2.5%) rotateY(180deg);
  }
  /* Other States */
  .l:focus {
    /* Usually an anti-A11Y practice but set to remove an annoyance just for this demo */
    outline: 0;
  }
</style>
