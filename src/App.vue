<template>
  <div id="app">
    <button style="position: absolute; right: 20px; top: 10px" class="btn btn-warning" @click="onLogStore">
      log store
    </button>
    <button style="position: absolute; right: 120px; top: 10px" class="btn btn-danger" @click="onTableStore">
      Table Store
    </button>
    <ourForm class="ourForm" @onModeChanged=onModeChanged($event)></ourForm>
    <div class="row justify-content-center">
      <input type="checkbox" name="showMyChart" v-model="showMyChart" />
      <label for="showMyChart">&nbsp; show dyno</label>
    </div>
    <div :class="{ active: false, myChartContainer: true }" class="mb-1" v-show="showMyChart">
      <canvas id="myChart"></canvas>
    </div>
    <div class="container">
      <div class="myButContainer row justify-content-center">
        <button @click="startButtonClick" type="button" class="btn btn-success ml-1 mr-1 col-lg-5 col-md-9 col-xs-12 "
          :disabled="
            store.selectedEngine == undefined ||
            store.selectedCarPreset == undefined
          ">
          Run
        </button>
        <button @click="exportWithSheetJS" class="btn btn-primary ml-1 mr-1 col-xs-12 col-md-9 col-lg-5">
          Export with SheetJS (WIP)
        </button>
      </div>
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
import {
  acceleration_calc,
  aero_drag,
  rolling_drag,
  pushforce,
  sample,
} from "./physics.js";
export default {
  name: "app",
  components: {
    ourForm,
    ourOutput,
  },
  // mixins: [fixedMultipleGears],
  data () {
    return {
      store: store,
      divRpm: 50,
      maxg: 0.8,
      finalGearMin: 200,
      finalGearMax: 400,
      initialSpeed: 100,
      splits: 5,
      results: [],
      myChartShow: false,
      mode: undefined,
      showMyChart: false,
      calculate_interval_ms: 50
    };
  },
  created () {
    window.dispatchEvent(new Event("myPreloderEvent"));
  },
  methods: {
    onModeChanged (e) {
      this.mode = e
    },
    onLogStore () {
      Object.entries(this.store).forEach((e) => {
        console.log(e[0] + ": " + e[1]);
      });
    },
    onTableStore () {
      for (let i = 0; i < this.store.runWithGearShifting.length; i++) {
        console.log(`%c⚛ ${i}: ${this.store.runWithGearShifting[i].exetime}`, "font-weight: bold;");
        console.log(`⚛ `, this.store.runWithGearShifting[i].currentGearing);
        console.log(`⚛ `, this.store.runWithGearShifting[i]["final speed"]);
        console.log(`⚛ `, Math.round(this.store.runWithGearShifting[i].computedGearLength[0]));
        console.log(`⚛ `, Math.round(this.store.runWithGearShifting[i].computedGearLength[1]));
        console.log(`⚛ `, Math.round(this.store.runWithGearShifting[i].computedGearLength[2]));
        console.log(`⚛ `, Math.round(this.store.runWithGearShifting[i].computedGearLength[3]));
        console.log(`⚛ `, Math.round(this.store.runWithGearShifting[i].computedGearLength[4]));
        console.log(`⚛ `, Math.round(this.store.runWithGearShifting[i].computedGearLength[5]));
      }
      // here we must create a custom sorting
    },
    sendData () {
      this.$eventBus.$emit("send-data", this.setup);
    },
    myCSchange (e) {
      this.myChartShow = !this.myChartShow;
    },
    exportWithSheetJS () {
      console.log("not done yet");
      const ExportJsonExcel = require("js-export-excel");

      var option = {};
      option.fileName = "vue-acceleration-export";
      option.datas = []

      console.log("⚛ ~ store.runWithGearShifting.length:", store.runWithGearShifting[50]["computedGearLength"]);

      let tmpSheetData = [];
      let sheetHeader = ["final speed", "gear", "rpm", "exetime", "currentGearing", "finalDrive", "1st gear len", "2nd gear len", "3rd gear len", "4th gear len", "5th gear len", "6th gear len", "currentWeightKg", "currentAeroCx", "currentRollingRes", "currentMaximumAccG",]

      for (let i = 0; i < 1; i++) {
        tmpSheetData.push(
          {
            one: store.runWithGearShifting[i]["final speed"],
            two: store.runWithGearShifting[i]["gear"],
            three: store.runWithGearShifting[i]["rpm"],
            four: store.runWithGearShifting[i]["exetime"],
            five: store.runWithGearShifting[i]["currentGearing"],
            six: store.runWithGearShifting[i]["finalDrive"],
            seven: Math.round(store.runWithGearShifting[i]["computedGearLength"][0]),
            eight: Math.round(store.runWithGearShifting[i]["computedGearLength"][1]),
            nine: Math.round(store.runWithGearShifting[i]["computedGearLength"][2]),
            ten: Math.round(store.runWithGearShifting[i]["computedGearLength"][3]),
            eleven: Math.round(store.runWithGearShifting[i]["computedGearLength"][4]),
            twelve: Math.round(store.runWithGearShifting[i]["computedGearLength"][5]),
            thirteen: store.runWithGearShifting[i]["currentWeightKg"],
            fourteen: store.runWithGearShifting[i]["currentAeroCx"],
            fifteen: store.runWithGearShifting[i]["currentRollingRes"],
            sixteen: store.runWithGearShifting[i]["currentMaximumAccG"],
          })
      }
      for (let i = 1; i < store.runWithGearShifting.length; i++) {
        tmpSheetData.push(
          {
            one: store.runWithGearShifting[i]["final speed"],
            two: store.runWithGearShifting[i]["gear"],
            three: store.runWithGearShifting[i]["rpm"],
            four: store.runWithGearShifting[i]["exetime"],
            five: store.runWithGearShifting[i]["currentGearing"],
            six: "",
            seven: Math.round(store.runWithGearShifting[i]["computedGearLength"][0]),
            eight: Math.round(store.runWithGearShifting[i]["computedGearLength"][1]),
            nine: Math.round(store.runWithGearShifting[i]["computedGearLength"][2]),
            ten: Math.round(store.runWithGearShifting[i]["computedGearLength"][3]),
            eleven: Math.round(store.runWithGearShifting[i]["computedGearLength"][4]),
            twelve: Math.round(store.runWithGearShifting[i]["computedGearLength"][5]),
          })
      }

      option.datas.push({
        sheetName: "prvi list",
        sheetHeader: sheetHeader,
        columnWidths: [4, 2, 4, 4, 10, 3, 3, 3, 3, 3, 3, 3, 7, 7, 7, 8],
        sheetData: tmpSheetData
      })

      var toExcel = new ExportJsonExcel(option); //new
      toExcel.saveExcel();
    },
    startButtonClick () {
      let tanja = [];
      let love = [];
      // var t0 = performance.now();
      let bestResult = {}

      var singleRun = (isMaximumSpeedRun, maxDistance, gearLength) => {
        var acceleration, brakeforce, pushforce, netforce, power;
        var value = 0;
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
            interval = true;
          }

          step_count++;
          executionTime = executionTime + this.calculate_interval_ms;
          let cp = calculatePower(
            currentSpeed,
            executionTime,
            this,
            gearLength,
            store.selectedEngine
          );
          power = cp[0];
          currentRpm = cp[1];
          acceleration = acceleration_calc(
            currentSpeed,
            power,
            this.store.weightKg,
            this.store.aeroCx,
            this.store.rollingRes,
            this.store.maximumAccG
          );
          speedGain = acceleration * this.calculate_interval_ms;

          currentSpeed += speedGain;
          distance =
            distance +
            ((currentSpeed + speedGain / 2) * this.calculate_interval_ms) / 1000;
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

      var runWithGearShifting = (gearRatios, gearFinal) => {
        // console.log("⚛ ~ runWithGearShifting:", runWithGearShifting);
        var acceleration, brakeforce, pushforce, netforce, inertia, power;
        var distance = 0;
        var executionTime = 0;
        var speedGain = 1.0;
        var interval = false;
        var currentRpm;
        let threshold = -1;
        var currentSpeed = 0;
        var arrResult = [];
        let currentGearing = [];
        let gearLength = [];
        let lastRpm = 0;
        let currentGearIndex = 0;
        let step_count = 0;

        for (let i = 0; i < gearRatios.length; i++) {
          gearLength.push(
            (store.transmissionConstant *
              this.store.engines[this.store.selectedEngine].maxRpm) /
            gearRatios[i] /
            gearFinal
          );
          currentGearing.push(gearRatios[i]);
        }

        speedGain = this.maxg * 0.9; //wheelspin na začetku pospeševanja, prve 3 desetinke

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
            interval = true;
          }

          step_count++;
          executionTime = executionTime + this.calculate_interval_ms;

          let cp = calculatePower(
            currentSpeed,
            executionTime,
            this,
            gearLength[currentGearIndex],
            store.selectedEngine
          );
          power = cp[0];
          currentRpm = cp[1];
          lastRpm = currentRpm;

          if (
            currentRpm >
            this.store.engines[this.store.selectedEngine].shiftRpm &&
            currentGearIndex + 1 < gearLength.length
          )
            currentGearIndex++;

          acceleration = acceleration_calc(
            currentSpeed,
            power,
            this.store.weightKg,
            this.store.aeroCx,
            this.store.rollingRes,
            this.store.maximumAccG
          );
          speedGain = acceleration * this.calculate_interval_ms;
          currentSpeed += speedGain;
          distance =
            distance +
            ((currentSpeed + speedGain / 2) * this.calculate_interval_ms) / 1000;

          // if (executionTime < 3000 && currentSpeed < 20.0 && executionTime % 100 == 0) {
          //   console.log("⚛ ~ ", Math.round((10000 * speedGain / this.calculate_interval_ms)) / 10, "m/s2 ", Math.round(currentSpeed * 3.6), "km/h", Math.round(currentRpm), "rpm");
          // }

          // if (executionTime < 6000 && executionTime % 1000 == 0) {
          //   console.log("☢️", "time: ", executionTime / 1000, " acceleration ", Math.round((10000 * speedGain / this.calculate_interval_ms)) / 10, "m/s2 ", Math.round(currentSpeed * 3.6), "km/h", currentRpm, "rpm");
          // }

          // arrResult.push([
          //   Math.round(currentSpeed * 3.6),
          //   Math.floor(distance),
          //   executionTime / 1000,
          //   power,
          //   currentRpm,
          //   currentGearIndex,
          // ]);

          // if (executionTime < 2000) {
          //   console.log("⚛ ~ power:", Math.round(power), "hp ", Math.round(currentRpm) + " rpm ", Math.round(currentSpeed * 3.6), " km/h", acceleration);
          // }
        }

        // love.push([Number(gearLength).toFixed(0), arrResult[arrResult.length - 1][4], Number((currentSpeed * 3.6).toFixed(2)), 'km/h distance: ', Math.floor(distance), "m, exetime: ", executionTime / 1000 + 's'])
        // console.error(
        //   "final speed: ",
        //   Math.round(currentSpeed * 3.6),
        //   "km/h gear:",
        //   currentGearIndex + 1,
        //   "rpm:",
        //   lastRpm,
        //   " distance:",
        //   Math.floor(distance),
        //   "m, exetime: ",
        //   executionTime / 1000 + "s"
        // );
        // var t1 = performance.now();
        // console.log("Call took " + (t1 - t0) + " milliseconds.");

        let currentWeightKg = this.store.weightKg;
        let currentAeroCx = this.store.aeroCx;
        let currentRollingRes = this.store.rollingRes;
        let currentMaximumAccG = this.store.maximumAccG;

        function pushToStore () {
          store.runWithGearShifting.push({
            "final speed": Math.round(currentSpeed * 3.6),
            gear: currentGearIndex + 1,
            rpm: lastRpm,
            exetime: executionTime,
            currentGearing: currentGearing,
            finalDrive: gearFinal,
            computedGearLength: gearLength,
            currentWeightKg: currentWeightKg,
            currentAeroCx: currentAeroCx,
            currentRollingRes: currentRollingRes,
            currentMaximumAccG: currentMaximumAccG,
          });
        }

        if (Object.keys(bestResult).length == 0) {
          bestResult.executionTime = executionTime
          bestResult.finalSpeed = Math.round(currentSpeed * 3.6)
          bestResult.gear = currentGearIndex + 1
          bestResult.rpm = lastRpm
          bestResult.exetime = executionTime
          bestResult.currentGearing = currentGearing
        }

        if (executionTime < bestResult.executionTime) {
          bestResult.executionTime = executionTime
          bestResult.finalSpeed = Math.round(currentSpeed * 3.6)
          bestResult.gear = currentGearIndex + 1
          bestResult.rpm = lastRpm
          bestResult.exetime = executionTime
          bestResult.currentGearing = currentGearing
          // pushToStore()
        }
        // if (Math.random() < 0.0005) {
        //   pushToStore()
        // }

        pushToStore()

        return arrResult;
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
        tanja.push(runWithGearShifting(store.gearRatios, store.gearFinal));
        store.tanja = tanja;
        store.love = love;
      } else if (this.mode == "allPossibleGears") {
        // var t0 = performance.now();
        // const gear_0 = [3.2, 3.1, 3, 2.9, 2.8, 2.7, 2.6, 2.5, 2.4, 2.3, 2.2];
        // const gear_1 = [3.2, 3.1, 3, 2.9, 2.8, 2.7, 2.6, 2.5, 2.4, 2.3, 2.2, 2.1, 2.0, 1.9, 1.8, 1.7];
        // const gear_2 = [2.9, 2.8, 2.7, 2.6, 2.5, 2.4, 2.3, 2.2, 2.1, 2.0, 1.9, 1.8, 1.7];
        // const gear_3 = [2.5, 2.4, 2.3, 2.2, 2.1, 2.0, 1.9, 1.8, 1.7, 1.6, 1.5, 1.4, 1.3, 1.2];
        // const gear_4 = [2.2, 2.1, 2.0, 1.9, 1.8, 1.7, 1.6, 1.5, 1.4, 1.3, 1.2, 1.1, 1.0, 0.9, 0.8, 0.7];
        // const gear_5 = [2.2, 2.1, 2.0, 1.9, 1.8, 1.7, 1.6, 1.5, 1.4, 1.3, 1.2, 1.1, 1.0, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4];
        // 300.000 runs, 5 minut, 136 MB

        const gear_0 = [3.6, 3.2, 2.8, 2.6, 2.4, 2.2];
        const gear_1 = [2.8, 2.6, 2.4, 2.2, 2.0, 1.8, 1.7];
        const gear_2 = [2.2, 1.9, 1.8, 1.7, 1.6, 1.5, 1.4];
        const gear_3 = [1.6, 1.5, 1.4, 1.3, 1.2, 1.1];
        const gear_4 = [1.1, 1.0, 0.9, 0.8, 0.72, 0.64, 0.56];
        const gear_5 = [0.8, 0.72, 0.65, 0.58, 0.52];
        // 20.000 runs, 17 sekund za 10 ms, 9 MB
        // 20.000 runs, 3 sekunde za 50 ms

        // const gear_0 = [3.2, 2.3, 2.2];
        // const gear_1 = [3.2, 1.9, 1.8, 1.7];
        // const gear_2 = [2.4, 2.3, 1.7];
        // const gear_3 = [2.3, 2.0, 1.4, 1.3, 1.2];
        // const gear_4 = [1.9, 1.8, 0.9, 0.8, 0.7];
        // const gear_5 = [1.6, 1.5, 0.7, 0.6, 0.5, 0.4];

        let total = 0;

        for (let i = 0; i < gear_0.length; i++) {
          for (let j = 0; j < gear_1.length; j++) {
            if (gear_0[i] <= gear_1[j]) continue;
            for (let k = 0; k < gear_2.length; k++) {
              if (gear_1[j] <= gear_2[k]) continue;
              for (let l = 0; l < gear_3.length; l++) {
                if (gear_2[k] <= gear_3[l]) continue;
                for (let m = 0; m < gear_4.length; m++) {
                  if (gear_3[l] <= gear_4[m]) continue;
                  for (let n = 0; n < gear_5.length; n++) {
                    if (gear_4[m] <= gear_5[n]) continue;

                    total++;
                    const tmp = [gear_0[i],
                    gear_1[j],
                    gear_2[k],
                    gear_3[l],
                    gear_4[m],
                    gear_5[n],]
                    // tanja.push(runWithGearShifting(tmp, 2.875));
                    runWithGearShifting(tmp, 4.5)
                  }
                }
              }
            }
          }
        }

        store.tanja = tanja;
        store.love = love;
        // const t1 = performance.now();
        console.log(
          "Total of runs made: ",
          total
        );
        console.log(" best result: ", bestResult);
      }
      console.log(`%cwill not work properly until we manage to limit tyre grip at beginning`, "color: red");
      this.$eventBus.$emit("calculationDone", this.mode);
    },
    drawPowerAndTorqueChart () {
      var rpmLookupTable = [];
      for (
        var currentRpm = 0;
        currentRpm <= store.engines[store.selectedEngine].maxRpm;
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
              data: store.engines[store.selectedEngine].torqueLookupTable,
              backgroundColor: ["rgba(54, 162, 235, 0.2)"],
              borderWidth: 1,
            },
            {
              label: "power hp",
              data: store.engines[store.selectedEngine].powerLookupTable,
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
  mounted () {
    this.sendData();
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
    this.$eventBus.$on("selectEngineChange", (e) => {
      store.selectedEngine = e;
      this.drawPowerAndTorqueChart();
    });
    this.$eventBus.$on("selectCarPresetChange", (e) => {
      store.selectedCarPreset = e;
      store.weightKg = store.carPresets[e].weightKg;
      store.aeroCx = store.carPresets[e].aeroCx;
      store.rollingRes = store.carPresets[e].rollingRes;
      store.maximumAccG = store.carPresets[e].maximumAccG;
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
  const clutchSlipStartTimeMs = 1301

  if (executionTime < clutchSlipStartTimeMs) {
    IDs[0] = store.engines[selectedEngine].powerLookupTable[Math.floor(store.engines[selectedEngine].powerLookupTable.length * 1 / 2)];
    IDs[1] = store.engines[selectedEngine].maxRpm * 2 / 3;
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
#app {
  background-color: rgb(30, 59, 52);
  color: rgb(255, 140, 139);
  font-family: Museo;
  padding: 10px;
  min-height: 100vh;
}

#app .ourForm {
  margin: 0.875rem;
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