<template>
  <div id="app">
    <ourForm class='ourForm'></ourForm>

    <div :class='{active: myChartShow, myChartContainer: true}'>
      <canvas id="myChart"></canvas>
      <label class="switch">
        <input @change='myCSchange' type="checkbox">
        <span class="slider round"></span>
      </label>
    </div>

    <div class="myButContainer">
      <div @click='startButtonClick' class="button"><p>Run</p></div>
      <!-- <div class="button"><p>Pause</p></div>
      <div class="button"><p>Stop calculations</p></div> -->
    </div>
    <ourOutput></ourOutput>
  </div>
</template>

<script>
import vue from 'vue';
import physics from './physics'
import mainWindow from './mainWindow'
import compute from './compute'
import ourForm from './components/ourForm.vue'
import ourOutput from './components/ourOutput.vue'
import Chart from 'chart.js'

export default {
  name: 'app',
  components: {
    ourForm,
    ourOutput
  },
  data() {
    return {
      weightKg: 1184,
      aeroCx: 0.35,
      rollingRos: 0.015,
      maximumAccG: 0.95,
      maxgearlength: 320,
      powerLookupTable: [],
      speed: null,
      maxRpm: 6000,
      divRpm: 50,
      tor: [416,455,495,528,563,590,617,642,668,685,702,717,731,736,746,762,750,724,717,708,700,685,592,567],
      finalGearMin: null,
      finalGearMax: null,
      splits: 5,
      results: [],
      myChartShow: false
    }
  },
  created() {
    window.dispatchEvent(new Event('myPreloderEvent'))
  },
  methods: {
    sendData() {
      this.$eventBus.$emit('send-data', this.setup)
    },
    myCSchange(e) {
      this.myChartShow = !this.myChartShow
    },
    startButtonClick(isMaximumSpeedRun) {
      var singleRun = (isMaximumSpeedRun, gearLength) => {
        var acceleration, brakeforce, pushforce, netforce, power;
        var value=0;
        var calculate_interval_ms = 100;//tested 100
        var distance = 0;
        var executionTime = 0;
        var speedGain = 1.0;
        var step_count = 0;
        var b = false;
        var c = false;
        var interval = false;
        var currentRpm
        var threshold
        isMaximumSpeedRun == true ? threshold = 0.0005 : threshold = -1
        this.speed = 27.7
        var currentSpeed = 27.7
        var arrResult = []

        if( (executionTime < 300) && (currentSpeed < 5.0))//pozor ker currentSpeed je v m/s
        {
          speedGain = this.maxg * 0.9;//wheelspin na začetku pospeševanja, prve 3 desetinke
        }
        // while( distance < 1609 && executionTime < 60000 && speedGain > 0.0005)
        while( distance < 1609 && executionTime < 60000 && speedGain > threshold)
        {
          if ((1578.0 < distance) && (distance < 1709.0) && (interval == false))//to pazi kako postaviš
          {
            /* this is for slowing down calculation when it approaches 1600m mark */
              calculate_interval_ms = calculate_interval_ms / 1;//povecaj za povecat natancnost
              interval = true;
          }
          step_count++;
          executionTime = executionTime + calculate_interval_ms;
          let cp = calculatePower(currentSpeed, executionTime, this, gearLength)
          power = cp[0]
          currentRpm = cp[1]
          acceleration = acceleration_calc(currentSpeed, power, this.weightKg, this.aeroCx, this.rollingRos, this.maximumAccG);
          speedGain = acceleration * calculate_interval_ms;

          currentSpeed+=speedGain;
          distance = distance + (currentSpeed + speedGain / 2) * calculate_interval_ms / 1000;
          // console.warn('currentSpeed: ', Math.round(currentSpeed*3.6), 'km/h distance: ', Math.floor(distance), "m, exetime: ", executionTime/1000+'s')
          arrResult.push([Math.round(currentSpeed*3.6), Math.floor(distance), executionTime/1000, power, currentRpm])
        }

        love.push([gearLength, arrResult[arrResult.length-1][4], Math.round(currentSpeed*3.6), 'km/h distance: ', Math.floor(distance), "m, exetime: ", executionTime/1000+'s'])
        // console.error('final speed: ', Math.round(currentSpeed*3.6), 'km/h distance: ', Math.floor(distance), "m, exetime: ", executionTime/1000+'s')
        return arrResult
      }

      let tanja = []
      let love = []
      for( let i=0; i<this.splits; i++ ) {
        let tmp = parseFloat(this.finalGearMin) + i*parseFloat((this.finalGearMax - this.finalGearMin) / (this.splits-1))
        tanja.push(singleRun(isMaximumSpeedRun, tmp))
      }
      console.table(tanja)
      console.table(love)
    }
  },
  mounted() {
    console.warn("Da dela treba prvo spremenit vrednosti spodaj .. da zazna 'change' . Ja, to bo treba popravit v priliki")
    this.sendData()

    this.$eventBus.$on("finalGearInputChange", (e)=>{
      this.maxgearlength = e
    })
    this.$eventBus.$on("finalGearMinChange", (e)=>{
      this.finalGearMin = e
    })
    this.$eventBus.$on("finalGearMaxChange", (e)=>{
      this.finalGearMax = e
    })
    this.$eventBus.$on('splitsChange', (e)=>{
      this.splits = e
    })


    var difference = this.maxRpm/ (this.tor.length-1)
    var torStep = []
    var torqueLookupTable = [], rpmLookupTable = []
    for( var i=0; i<=this.tor.length; i++) {
      torStep.push( i * this.maxRpm / (this.tor.length-1) )
    }
    for( var currentRpm=0; currentRpm<=this.maxRpm; currentRpm+=this.divRpm) {
      var i=0, exitN = 83
      while( currentRpm > torStep[i] && i < exitN) {
        i++
      }
      var result = ((torStep[i]-currentRpm)/difference) * this.tor[i-1]
      result += ((currentRpm - torStep[i-1])/difference) * this.tor[i]
      torqueLookupTable.push(result)
      this.powerLookupTable.push( (result) * currentRpm / 7030)
      rpmLookupTable.push(currentRpm)
    }

    var ctx = document.getElementById('myChart');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: rpmLookupTable,
            datasets: [{
                label: 'torque nm',
                data: torqueLookupTable,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)'
                ],
                // borderColor: [
                //     'rgba(255, 99, 132, 1)',
                //     'rgba(54, 162, 235, 1)',
                //     'rgba(255, 206, 86, 1)',
                //     'rgba(75, 192, 192, 1)',
                //     'rgba(153, 102, 255, 1)',
                //     'rgba(255, 159, 64, 1)'
                // ],
                borderWidth: 1
            },{
                label: 'power kW',
                data: this.powerLookupTable,
                backgroundColor: [
                  'rgba(127, 127, 127, 1)'
                ],
                // borderColor: [
                //     'rgba(255, 99, 132, 1)',
                //     'rgba(54, 162, 235, 1)',
                //     'rgba(255, 206, 86, 1)',
                //     'rgba(75, 192, 192, 1)',
                //     'rgba(153, 102, 255, 1)',
                //     'rgba(255, 159, 64, 1)'
                // ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
  }
}
const calculatePower = (speed, executionTime, _that, gearLength) => {0
  var currentRpm = null
  var IDs = new Object()
  if (executionTime < 500)
  {
    IDs[0] = 100
    IDs[1] = 2500
    return IDs
  }
  else
  {
    currentRpm = speed / gearLength * 3.6 * _that.maxRpm
    // console.log(' current rpm: ', Math.round(currentRpm/50)*50, ' power: ', Math.round(_that.powerLookupTable[Math.floor(currentRpm / _that.divRpm)]), ' kW');
    var res = _that.powerLookupTable[Math.floor(currentRpm / _that.divRpm)]
    IDs[0] = res
    IDs[1] = Math.round(currentRpm/50)*50
    if( isNaN(res) ) {
      res = 0
      IDs[0] = 0
      /* hitting rev limiter */
    }
    return IDs
  }
}
</script>

<style lang="scss">
$bgr_0: rgb(109, 161, 174);
$fg_0: rgb(184, 35, 126);
html {
  min-width: 440px;
}
#app {
  background: $bgr_0;
  color: $fg_0;
  font-family: Museo;
  padding: 10px;
  .ourForm {
    margin: 20px;
  }

  .myButContainer {
    display: inline-block;
    margin: 0;
    padding: 0;
    height: 30px;
  }
  .button {
    position: relative;
    left: 0;
    top: 0px;
    height: 30px;
    cursor: pointer;
    margin-bottom: 3px;
    & p {
      background: #fff;
      color: $fg_0;
      border: 2px solid $fg_0;
      border-radius: 9px;
      font-size: 12px;
      font-weight: bold;
      user-select: none;
      margin: 0;
      padding: 0 16px;
      height: 30px;
      line-height: 30px;
      text-align: center;
    }
    &.active {
      cursor: pointer;
    }
    &.active p {
      background: $bgr_0;
      color: #fff;
    }
    &.active:hover {
      filter: brightness(1.07);
    }
    &.active:active {
      transform-origin: center bottom;
      transform: scaleY(0.94);
    }
    &:active {
      p {
        background: $fg_0;
        color: #fff;
      }
    }
  }
}
.myChartContainer {
  max-width: 750px;
  max-height: 500px;
  background-color: #fff;
  border: 2px solid $fg_0;
  border-radius: 9px;
  position: relative;
  left: 60px;
  margin-bottom: 8px;
  transform: translateX(-100%);
  transition: all 0.2s;
  max-height: 44px;
  overflow: hidden;
  &.active {
    left: 50%;
    max-height: 100%;
    transform: translateX(-50%);
    transition: all 0.2s;
  }
  .switch {
    position: absolute;
    display: inline-block;
    width: 60px;
    height: 34px;
    right: 4px;
    top: 4px;
  }

  /* Hide default HTML checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
  }
  input + .slider {
    background-color: #ccc;
  }
  input + .slider:before {
    -webkit-transform: translateX(0px);
    -ms-transform: translateX(0px);
    transform: translateX(0px);
  }
  input:checked + .slider {
    background-color: $fg_0;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #ccc;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
}
</style>
