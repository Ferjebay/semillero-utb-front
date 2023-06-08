<template>
  <div class="content" :class="[ pantalla <= 900 ? 'pb-0' : '']">
    <div class="row" :class="[ pantalla <= 900 ? 'pt-4' : '']">
      <div class="col-12 col-lg-4">
        <div class="card card-chart">
          <div class="card-header">                
            <h3 class="card-title text-center">
              <i class="fas fa-thermometer-three-quarters" style="color: #6c61c9;font-size: 23px"></i>
              Temperatura
            </h3>
          </div>
          <div class="card-body pt-0 d-flex justify-content-center" style="height: 180px">
            <div id="gauge" class="mt-2"></div>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-4">
        <div class="card card-chart">
          <div class="card-header">                
            <h3 class="card-title text-center">
              <i class="fas fa-tint" style="color: #6c61c9;font-size: 23px"></i>
              Humedad
            </h3>
          </div>
          <div class="card-body pt-0 d-flex justify-content-center" style="height: 180px">
             <div id="liquido" ref="liquido"></div>            
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-4">
        <div class="card card-chart">
          <div class="card-header pt-1">                
            <h3 class="card-title text-center">
              <img src="/assets/fonts/checked.svg" width="24" height="24">
              Altitud
            </h3>
          </div>
          <div class="card-body pt-0 d-flex justify-content-center align-items-center" 
          style="height: 190px;">
            <div id="value-altitud"></div>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-4">
        <div class="card card-chart">
          <div class="card-header pt-1">                
            <h3 class="card-title text-center">
              <img src="/assets/fonts/checked.svg" width="24" height="24">
              Presión
            </h3>
          </div>
          <div class="card-body pt-0 d-flex justify-content-center align-items-center">
            <div id="value-presion"></div>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-4 d-flex align-items-center">
        <div class="card card-chart">
          <div class="card-header pt-1">                
            <h3 class="card-title text-center">
              <i class="fas fa-sun" style="color: #6c61c9;font-size: 23px"></i>
              Luminosidad 
            </h3>
          </div>
          <div class="card-body pt-0 d-flex justify-content-center d-flex align-items-center" 
            style="height: 120px;">
            <h2 class="badge badge-warning my-2" id="txtLuminosidad" style="font-size: 22px;"></h2>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-4 d-flex align-items-center">
        <div class="card card-chart">
          <div class="card-header pt-1">                
            <h3 class="card-title text-center">
              <i class="fas fa-circle" style="color: #6c61c9;font-size: 23px"></i>
              Gas 
            </h3>
          </div>
          <div class="card-body py-0 d-flex justify-content-center d-flex align-items-center" 
            style="height: 120px;">
            <h2 class="badge badge-warning my-2" id="txtGas" 
              style="font-size: 22px;padding: 12px;position: relative;bottom: 6px;">
            </h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex'
import starCountRef from '@/utils/firebase2';
import { onValue} from "firebase/database";
import { useRoute } from "vue-router";

import JustGage from "justgage";
import * as echarts from "echarts/core";
import "echarts-liquidfill";

export default {
  setup(){
    const store = useStore()
    const liquido = ref(null);
    let valueTemperature = ref(34)
    let valueHumedad = ref(0)   
    let chartLiquid = null;
    const pantalla = screen.width;    
    let gauge = null;
    const route = useRoute();

    onMounted(() => {
      chartLiquid = echarts.init(liquido.value);

      montarChartTemperature(0);
      gauge.destroy()
      montarChartTemperature(0);

      firebase();
    });

    const montarChartHumedad = () => {
      chartLiquid.setOption({
        series: [{
            type: "liquidFill",
            data: [valueHumedad.value / 100],
        }]
      });
    }

    const montarChartTemperature = (valor) => {
      gauge = new JustGage({
        id: 'gauge',
        value: valor,
        min: 0,
        max: 100,
        symbol: '°C',
        pointer: true,
        pointerOptions: {
          toplength: -15,
          bottomlength: 10,
          bottomwidth: 12,
          color: '#8e8e93',
          stroke: '#ffffff',
          stroke_width: 3,
          stroke_linecap: 'round'
        },
        gaugeWidthScale: 0.6,
        counter: true,
        labelFontColor: '#ffffff',
        valueFontColor: '#ffffff',
      });
    }
         
    const firebase = () => {
      onValue(starCountRef, (snapshot) => {

        const data = snapshot.val();
        store.commit('auth/updateIotData', data)

        const humedad = computed (() => store.state.auth.iot.sensor.humedad)    
        const temperatura = computed (() => store.state.auth.iot.sensor.temperatura)            
        const luminosidad = computed (() => store.state.auth.iot.sensor.luminosidad)  
        const gas = computed (() => store.state.auth.iot.sensor.gas)  
        const altitud = computed (() => store.state.auth.iot.sensor.altitud)    
        const presion = computed (() => store.state.auth.iot.sensor.presion)    
        
        if (route.path == "/dashboard/sensores") {
          document.getElementById('txtLuminosidad').innerHTML = `${luminosidad.value.toFixed(2)} lux`          
          document.getElementById('txtGas').innerHTML = `${gas.value.toFixed(2)} KOhms`          
          document.getElementById('value-altitud').innerHTML = `${altitud.value.toFixed(2)} m`          
          document.getElementById('value-presion').innerHTML = `${presion.value.toFixed(2)} hPa`          
        }       

        valueHumedad.value = humedad.value
        montarChartHumedad();      

        gauge.refresh(temperatura.value);
      })  
    }

    return{      
      liquido,
      valueTemperature,
      valueHumedad,
      pantalla      
    }    
  }
}
</script>

<style scoped>
  text{
    color: white;
  }
  #liquido{
    width: 520px;
    height: 320px;
    position: absolute;
    top: 34px;
    left: -74px;
    right: 0;
    bottom: 0;
    margin: auto;
  }
  #value-altitud{
    border: 3px #ccc solid;
    color: #ccc;
    font-size: 25px;
    border-radius: 50%;
    line-height: 140px;
    height: 150px;
    width: 150px;
    text-align: center;
  }
  #value-presion{
    border: 3px #ccc solid;
    color: #ccc;
    font-size: 25px;
    border-radius: 50%;
    line-height: 140px;
    height: 150px;
    width: 150px;
    text-align: center;
  }
  .espaciado{
    height: 182px
  }
  #txtLuminosidad{
    height: 50px;
    width: 120px;
    line-height: 42px;
  }
</style>
