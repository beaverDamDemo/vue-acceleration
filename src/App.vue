<template>
  <div id="app">
    <ourForm class="ourForm"></ourForm>
    <div>
      <input type="checkbox" name="showMyChart" v-model="showMyChart" />
      <label for="showMyChart">show dyno</label>
    </div>
    <div
      :class="{ active: false, myChartContainer: true }"
      v-show="showMyChart"
    >
      <canvas id="myChart"></canvas>
    </div>
    <div class="myButContainer">
      <button @click="startButtonClick" type="button" class="btn btn-success">
        Run
      </button>
      <button @click="exportWithSheetJS" class="btn btn-primary" disabled>
        Export with SheetJS (WIP)
      </button>
    </div>
    <ourOutput :inputData.sync="finalGearMin" />
  </div>
</template>
<script>
import vue from "vue";
import physics from "./physics";
import mainWindow from "./mainWindow";
import compute from "./compute";
import store from "./store.js";
import ourForm from "./components/ourForm.vue";
import ourOutput from "./components/ourOutput.vue";
import Chart from "chart.js";
// import fixedMultipleGears from '../mixins/fixedMultipleGears.js'

export default {
  name: "app",
  components: {
    ourForm,
    ourOutput,
  },
  // mixins: [fixedMultipleGears],
  data() {
    return {
      store: store,
      weightKg: 1184,
      aeroCx: 0.35,
      rollingRos: 0.015,
      maximumAccG: 0.95,
      maxgearlength: 290,
      divRpm: 50,
      maxg: 0.8,
      finalGearMin: 200,
      finalGearMax: 400,
      initialSpeed: 100,
      splits: 5,
      results: [],
      myChartShow: false,
      selectedEngine: 0,
      selectedCarPreset: 0,
      mode: "oneGear",
      showMyChart: false,
    };
  },
  created() {
    window.dispatchEvent(new Event("myPreloderEvent"));
  },
  methods: {
    sendData() {
      this.$eventBus.$emit("send-data", this.setup);
    },
    myCSchange(e) {
      this.myChartShow = !this.myChartShow;
    },
    exportWithSheetJS() {
      console.log("not done yet");
    },
    startButtonClick() {
      let tanja = [];
      let love = [];
      var t0 = performance.now();

      var singleRun = (isMaximumSpeedRun, maxDistance, gearLength) => {
        var acceleration, brakeforce, pushforce, netforce, power;
        var value = 0;
        var calculate_interval_ms = 100; //tested 100
        var distance = 0;
        var executionTime = 0;
        var speedGain = 1.0;
        var step_count = 0;
        var b = false;
        var c = false;
        var interval = false;
        var currentRpm;
        var threshold;
        isMaximumSpeedRun == true ? (threshold = 0.0005) : (threshold = -1);
        var currentSpeed = 27.7;
        var arrResult = [];

        if (executionTime < 300 && currentSpeed < 5.0) {
          //pozor ker currentSpeed je v m/s
          speedGain = this.maxg * 0.9; //wheelspin na začetku pospeševanja, prve 3 desetinke
        }
        // while( distance < 1609 && executionTime < 60000 && speedGain > 0.0005)
        while (
          distance < maxDistance &&
          executionTime < 180000 &&
          speedGain > threshold
        ) {
          if (
            maxDistance - 30 < distance &&
            distance < maxDistance + 100 &&
            interval == false
          ) {
            //to pazi kako postaviš
            /* this is for slowing down calculation when it approaches 1600m mark */
            calculate_interval_ms = calculate_interval_ms / 1; //povecaj za povecat natancnost
            interval = true;
          }
          step_count++;
          executionTime = executionTime + calculate_interval_ms;
          let cp = calculatePower(
            currentSpeed,
            executionTime,
            this,
            gearLength,
            this.selectedEngine
          );
          power = cp[0];
          currentRpm = cp[1];
          acceleration = acceleration_calc(
            currentSpeed,
            power,
            this.weightKg,
            this.aeroCx,
            this.rollingRos,
            this.maximumAccG
          );
          speedGain = acceleration * calculate_interval_ms;

          currentSpeed += speedGain;
          distance =
            distance +
            ((currentSpeed + speedGain / 2) * calculate_interval_ms) / 1000;
          // console.warn('currentSpeed: ', Math.round(currentSpeed*3.6), 'km/h distance: ', Math.floor(distance), "m, exetime: ", executionTime/1000+'s')
          arrResult.push([
            Math.round(currentSpeed * 3.6),
            Math.floor(distance),
            executionTime / 1000,
            power,
            currentRpm,
          ]);
        }

        love.push([
          Number(gearLength).toFixed(0),
          arrResult[arrResult.length - 1][4],
          Number((currentSpeed * 3.6).toFixed(2)),
          "km/h distance: ",
          Math.floor(distance),
          "m, exetime: ",
          executionTime / 1000 + "s",
        ]);
        // console.error('final speed: ', Math.round(currentSpeed*3.6), 'km/h distance: ', Math.floor(distance), "m, exetime: ", executionTime/1000+'s')
        return arrResult;
      };

      var fixedMultipleGears = () => {
        console.log("starting fixedMultipleGears");

        var acceleration, brakeforce, pushforce, netforce, power;
        var value = 0;
        var calculate_interval_ms = 10; //tested 10
        var distance = 0;
        var executionTime = 0;
        var speedGain = 1.0;
        var step_count = 0;
        var b = false;
        var c = false;
        var interval = false;
        var currentRpm;
        let threshold = -1;
        var currentSpeed = 0;
        var arrResult = [];

        console.log("take care that the follwoing part works fikne");
        let gearing = store.gearRatios;
        let currentGearing = []
        let gearLength = [];
        for (let i = 0; i < gearing.length; i++) {
          gearLength.push(700 / gearing[i] / store.gearFinal);
          currentGearing.push(store.gearRatios[i])
        }
        let maxRpm = 5700;
        let lastRpm = 0;
        let currentGearIndex = 0;
        // let gearLength = [66,108,147,187,230,320]
        console.log(
          "%cContinue work here, gear changes are not seamless",
          "background: sienna; font-weight: bold;"
        );

        if (executionTime < 300 && currentSpeed < 10.0) {
          //pozor ker currentSpeed je v m/s
          speedGain = this.maxg * 0.9; //wheelspin na začetku pospeševanja, prve 3 desetinke
        }
        // while( distance < 1609 && executionTime < 60000 && speedGain > 0.0005)
        while (
          distance < 1609 &&
          executionTime < 180000 &&
          speedGain > threshold
        ) {
          if (
            1609 - 30 < distance &&
            distance < 1609 + 100 &&
            interval == false
          ) {
            //to pazi kako postaviš
            /* this is for slowing down calculation when it approaches 1600m mark */
            calculate_interval_ms = calculate_interval_ms / 1; //povecaj za povecat natancnost
            interval = true;
          }
          step_count++;
          executionTime = executionTime + calculate_interval_ms;
          let cp = calculatePower(
            currentSpeed,
            executionTime,
            this,
            gearLength[currentGearIndex],
            this.selectedEngine
          );
          power = cp[0];
          currentRpm = cp[1];
          lastRpm = currentRpm;

          if (currentRpm > 6000 && currentGearIndex + 1 < gearLength.length)
            currentGearIndex++;

          acceleration = acceleration_calc(
            currentSpeed,
            power,
            this.weightKg,
            this.aeroCx,
            this.rollingRos,
            this.maximumAccG
          );
          speedGain = acceleration * calculate_interval_ms;
          currentSpeed += speedGain;
          distance =
            distance +
            ((currentSpeed + speedGain / 2) * calculate_interval_ms) / 1000;
          // console.warn('currentSpeed: ', Math.round(currentSpeed * 3.6), 'km/h distance: ', Math.floor(distance), "m, exetime: ", executionTime / 1000 + 's')
          arrResult.push([
            Math.round(currentSpeed * 3.6),
            Math.floor(distance),
            executionTime / 1000,
            power,
            currentRpm,
          ]);
          // console.log("depaul", currentRpm, Math.round(currentSpeed * 3.6), (currentGearIndex + 1))
          // console.log("Pushed fixed multiple gears to nevemkam")
        }

        // love.push([Number(gearLength).toFixed(0), arrResult[arrResult.length - 1][4], Number((currentSpeed * 3.6).toFixed(2)), 'km/h distance: ', Math.floor(distance), "m, exetime: ", executionTime / 1000 + 's'])
        console.error(
          "final speed: ",
          Math.round(currentSpeed * 3.6),
          "km/h gear:",
          currentGearIndex + 1,
          "rpm:",
          lastRpm,
          " distance:",
          Math.floor(distance),
          "m, exetime: ",
          executionTime / 1000 + "s"
        );
        var t1 = performance.now();
        console.log("Call took " + (t1 - t0) + " milliseconds.");
        store.resultsFixedMultipleGears.push({
          "final speed": Math.round(currentSpeed * 3.6) + " km/h",
          gear: currentGearIndex + 1,
          rpm: lastRpm + " rpm",
          distance: Math.floor(distance) + " m",
          "exetime ": executionTime / 1000 + " s",
          currentGearing: currentGearing,
          finalDrive: store.gearFinal,
          computedGearLength: gearLength,
        });
        return arrResult;
      };

      let allPossibleGears = (gearing, finalGear) => {
        let acceleration, power;
        let calculate_interval_ms = 10; //tested 10
        let distance = 0;
        let executionTime = 0;
        let speedGain = 1.0;
        let interval = false;
        let currentRpm;
        let threshold = -1;
        let currentSpeed = 0;
        let gearLength = [];
        for (let i = 0; i < gearing.length; i++) {
          gearLength.push(700 / gearing[i] / finalGear);
        }
        let maxRpm = 5700;
        let lastRpm = 0;
        let currentGearIndex = 0;

        if (executionTime < 300 && currentSpeed < 10.0) {
          //pozor ker currentSpeed je v m/s
          speedGain = this.maxg * 0.9; //wheelspin na začetku pospeševanja, prve 3 desetinke
        }
        // while( distance < 1609 && executionTime < 60000 && speedGain > 0.0005)
        while (
          distance < 1609 &&
          executionTime < 180000 &&
          speedGain > threshold
        ) {
          if (
            1609 - 30 < distance &&
            distance < 1609 + 100 &&
            interval == false
          ) {
            //to pazi kako postaviš
            /* this is for slowing down calculation when it approaches 1600m mark */
            calculate_interval_ms = calculate_interval_ms / 1; //povecaj za povecat natancnost
            interval = true;
          }
          executionTime = executionTime + calculate_interval_ms;
          let cp = calculatePower(
            currentSpeed,
            executionTime,
            this,
            gearLength[currentGearIndex],
            this.selectedEngine
          );
          power = cp[0];
          currentRpm = cp[1];
          lastRpm = currentRpm;

          if (currentRpm > maxRpm && currentGearIndex + 1 < gearLength.length)
            currentGearIndex++;

          acceleration = acceleration_calc(
            currentSpeed,
            power,
            this.weightKg,
            this.aeroCx,
            this.rollingRos,
            this.maximumAccG
          );
          speedGain = acceleration * calculate_interval_ms;
          currentSpeed += speedGain;
          distance =
            distance +
            ((currentSpeed + speedGain / 2) * calculate_interval_ms) / 1000;
        }

        return (
          executionTime / 1000,
          Number((currentSpeed * 3.6).toFixed(2)),
          Math.floor(lastRpm),
          currentGearIndex + 1,
          gearing[0],
          gearing[1],
          gearing[2],
          gearing[3],
          gearing[4],
          gearing[5]
        );
      };

      if (this.mode == "oneGear") {
        for (let i = 0; i < this.splits; i++) {
          let tmp =
            parseFloat(this.finalGearMin) +
            i *
              parseFloat(
                (this.finalGearMax - this.finalGearMin) / (this.splits - 1)
              );
          tanja.push(singleRun(false, 1609, tmp));
        }
        store.tanja = tanja;
        store.love = love;
      } else if (this.mode == "topspeedRun") {
        for (let i = 0; i < this.splits; i++) {
          let tmp =
            parseFloat(this.finalGearMin) +
            i *
              parseFloat(
                (this.finalGearMax - this.finalGearMin) / (this.splits - 1)
              );
          tanja.push(singleRun(true, Infinity, tmp));
        }
        store.tanja = tanja;
        store.love = love;
      } else if (this.mode == "fixedMultipleGears") {
        tanja.push(fixedMultipleGears());
        store.tanja = tanja;
        store.love = love;
      } else if (this.mode == "allPossibleGears") {
        var t0 = performance.now();
        let gear_0 = [3.2, 2.5, 2.0];
        let gear_1 = [2.0, 1.6, 1.4];
        let gear_2 = [1.7, 1.3];
        let gear_3 = [1.0, 0.9, 0.82];
        let gear_4 = [0.82, 0.72, 0.68];
        let gear_5 = [0.76, 0.7, 0.62, 0.56];
        let total = 0;

        for (let i = 0; i < gear_0.length; i++) {
          for (let j = 0; j < gear_1.length; j++) {
            for (let k = 0; k < gear_2.length; k++) {
              for (let l = 0; l < gear_3.length; l++) {
                for (let m = 0; m < gear_4.length; m++) {
                  for (let n = 0; n < gear_5.length; n++) {
                    if (gear_0[i] > gear_1[j]) {
                      if (gear_1[j] > gear_2[k]) {
                        if (gear_2[k] > gear_3[l]) {
                          if (gear_3[l] > gear_4[m]) {
                            if (gear_4[m] > gear_5[n]) {
                              total++;
                              tanja.push(
                                allPossibleGears(
                                  [
                                    gear_0[i],
                                    gear_1[j],
                                    gear_2[k],
                                    gear_3[l],
                                    gear_4[m],
                                    gear_5[n],
                                  ],
                                  2.99
                                )
                              );
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }

        store.tanja = tanja;
        store.love = love;

        console.table(store.tanja);
        var t1 = performance.now();
        console.log(
          "Call took " + (t1 - t0) + " milliseconds. Total of runs made: ",
          total
        );
        this.runPerformed += 1;
      }
      this.$eventBus.$emit("calculationDone", this.mode);
    },
    drawPowerAndTorqueChart() {
      var rpmLookupTable = [];
      for (
        var currentRpm = 0;
        currentRpm <= store.engines[this.selectedEngine].maxRpm;
        currentRpm += this.divRpm
      ) {
        rpmLookupTable.push(currentRpm);
      }

      var ctx = document.getElementById("myChart");
      while (ctx.firstChild) ctx.removeChild(ctx.firstChild);

      var myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: rpmLookupTable,
          datasets: [
            {
              label: "torque nm",
              data: store.engines[this.selectedEngine].torqueLookupTable,
              backgroundColor: ["rgba(54, 162, 235, 0.2)"],
              borderWidth: 1,
            },
            {
              label: "power hp",
              data: store.engines[this.selectedEngine].powerLookupTable,
              backgroundColor: ["rgba(127, 127, 127, 1)"],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        },
      });
    },
  },
  mounted() {
    //  let f= [630, 685, 731, 779, 816, 854, 888, 924, 948, 971, 992, 1012, 1018, 1032, 1054, 1038, 1020, 1002, 992, 980, 958, 880, 800, 720]
    //
    //          for(let i=0; i<f.length; i++) {
    //              f[i] = Math.round(f[i]*0.9857)
    //          }
    //  debugger
    this.sendData();

    this.$eventBus.$on("finalGearInputChange", (e) => {
      this.maxgearlength = e;
    });
    this.$eventBus.$on("initialSpeedInputChange", (e) => {
      this.initialSpeed = e;
    });
    this.$eventBus.$on("finalGearMinChange", (e) => {
      this.finalGearMin = e;
    });
    this.$eventBus.$on("finalGearMaxChange", (e) => {
      this.finalGearMax = e;
    });
    this.$eventBus.$on("splitsChange", (e) => {
      this.splits = e;
    });
    this.$eventBus.$on("seChange", (e) => {
      this.selectedEngine = e;
      this.drawPowerAndTorqueChart();
    });
    this.$eventBus.$on("scpChange", (e) => {
      this.selectedCarPreset = e;
      this.weightKg = store.carPresets[e].weightKg;
      this.aeroCx = store.carPresets[e].aeroCx;
      this.rollingRes = store.carPresets[e].rollingRes;
      this.maximumAccG = store.carPresets[e].maximumAccG;
    });
    this.$eventBus.$on("selectMode", (e) => {
      this.mode = e;
    });
    this.drawPowerAndTorqueChart();
  },
};

const calculatePower = (
  speed,
  executionTime,
  _that,
  gearLength,
  selectedEngine
) => {
  var currentRpm = null;
  var IDs = new Object();
  if (executionTime < 500) {
    IDs[0] = 100;
    IDs[1] = 2500;
    return IDs;
  } else {
    currentRpm =
      (speed / gearLength) * 3.6 * store.engines[selectedEngine].maxRpm;
    // console.log(' current rpm: ', Math.round(currentRpm/50)*50, ' power: ', Math.round(_that.powerLookupTable[Math.floor(currentRpm / _that.divRpm)]), ' kW');
    /* HARDCODED */
    var res =
      store.engines[selectedEngine].powerLookupTable[
        Math.floor(currentRpm / _that.divRpm)
      ];
    IDs[0] = res;
    IDs[1] = Math.round(currentRpm / 50) * 50;
    if (isNaN(res)) {
      res = 0;
      IDs[0] = 0;
      /* hitting rev limiter */
    }
    return IDs;
  }
};
</script>
<style>
html {
  min-width: 440px;
}

#app {
  background: rgb(109, 161, 174);
  color: rgb(184, 35, 126);
  font-family: Museo;
  padding: 10px;
}

#app .ourForm {
  margin: 0.875rem;
}

#app .myButContainer {
  display: flex;
  margin: 1.25rem;
}

#app .myButContainer button {
  padding: 1rem 2.75rem;
  margin: 0 auto;
  display: inline-block;
  min-width: 320px;
}

.myChartContainer {
  max-width: 750px;
  max-height: 500px;
  background-color: #fff;
  border: 1px solid rgb(184, 35, 126);
  border-radius: 9px;
  overflow: hidden;
  margin: 0 auto;
  /* Hide default HTML checkbox */
  /* The slider */
  /* Rounded sliders */
}

.myChartContainer .switch {
  position: absolute;
  display: inline-block;
  width: 60px;
  height: 34px;
  right: 4px;
  top: 4px;
}

.myChartContainer .switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.myChartContainer .slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.myChartContainer .slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.myChartContainer input + .slider {
  background-color: #ccc;
}

.myChartContainer input + .slider:before {
  -webkit-transform: translateX(0px);
  -ms-transform: translateX(0px);
  transform: translateX(0px);
}

.myChartContainer input:checked + .slider {
  background-color: rgb(184, 35, 126);
}

.myChartContainer input:focus + .slider {
  box-shadow: 0 0 1px #ccc;
}

.myChartContainer input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

.myChartContainer .slider.round {
  border-radius: 34px;
}

.myChartContainer .slider.round:before {
  border-radius: 50%;
}
</style>