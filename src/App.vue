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
        <button @click='startButtonClick' type="button" class="btn btn-success" :class='{sink: myChartShow}'>Run</button>
        <button @click='exportWithSheetJS' class="btn btn-primary">Export with SheetJS</button>
        <ourOutput :inputData.sync="finalGearMin" />
    </div>
</template>
<script>
import vue from 'vue';
import physics from './physics'
import mainWindow from './mainWindow'
import compute from './compute'
import store from './store.js'
import ourForm from './components/ourForm.vue'
import ourOutput from './components/ourOutput.vue'
import Chart from 'chart.js'
// import fixedMultipleGears from '../mixins/fixedMultipleGears.js'

export default {
    name: 'app',
    components: {
        ourForm,
        ourOutput
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
        exportWithSheetJS() {
            console.log(store)
        },
        startButtonClick() {
            let tanja = []
            let love = []

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
                var currentRpm
                var threshold
                isMaximumSpeedRun == true ? threshold = 0.0005 : threshold = -1
                var currentSpeed = 27.7
                var arrResult = []

                if ((executionTime < 300) && (currentSpeed < 5.0)) //pozor ker currentSpeed je v m/s
                {
                    speedGain = this.maxg * 0.9; //wheelspin na začetku pospeševanja, prve 3 desetinke
                }
                // while( distance < 1609 && executionTime < 60000 && speedGain > 0.0005)
                while (distance < maxDistance && executionTime < 180000 && speedGain > threshold) {
                    if (( (maxDistance-30) < distance) && (distance < (maxDistance+100)) && (interval == false)) //to pazi kako postaviš
                    {
                        /* this is for slowing down calculation when it approaches 1600m mark */
                        calculate_interval_ms = calculate_interval_ms / 1; //povecaj za povecat natancnost
                        interval = true;
                    }
                    step_count++;
                    executionTime = executionTime + calculate_interval_ms;
                    let cp = calculatePower(currentSpeed, executionTime, this, gearLength, this.selectedEngine)
                    power = cp[0]
                    currentRpm = cp[1]
                    acceleration = acceleration_calc(currentSpeed, power, this.weightKg, this.aeroCx, this.rollingRos, this.maximumAccG);
                    speedGain = acceleration * calculate_interval_ms;

                    currentSpeed += speedGain;
                    distance = distance + (currentSpeed + speedGain / 2) * calculate_interval_ms / 1000;
                    // console.warn('currentSpeed: ', Math.round(currentSpeed*3.6), 'km/h distance: ', Math.floor(distance), "m, exetime: ", executionTime/1000+'s')
                    arrResult.push([Math.round(currentSpeed * 3.6), Math.floor(distance), executionTime / 1000, power, currentRpm])
                }

                love.push([Number(gearLength).toFixed(0), arrResult[arrResult.length - 1][4], Number((currentSpeed * 3.6).toFixed(2)), 'km/h distance: ', Math.floor(distance), "m, exetime: ", executionTime / 1000 + 's'])
                // console.error('final speed: ', Math.round(currentSpeed*3.6), 'km/h distance: ', Math.floor(distance), "m, exetime: ", executionTime/1000+'s')
                return arrResult
            }

            var fixedMultipleGears = () => {
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
                var currentRpm
                let threshold = -1
                var currentSpeed = 0
                var arrResult = []
                let gearing = store.gearRatios
                let gearLength = []
                for( let i=0; i<gearing.length; i++) {
                    gearLength.push(700/gearing[i]/store.gearFinal)
                }
                let maxRpm = 5700
                let lastRpm = 0
                let currentGearIndex = 0
                // let gearLength = [66,108,147,187,230,320]
                console.log("%cContinue work here", "background: red; font-weight: bold;", store.gearRatios)

                if ((executionTime < 300) && (currentSpeed < 10.0)) //pozor ker currentSpeed je v m/s
                {
                    speedGain = this.maxg * 0.9; //wheelspin na začetku pospeševanja, prve 3 desetinke
                }
                // while( distance < 1609 && executionTime < 60000 && speedGain > 0.0005)
                while (distance < 1609 && executionTime < 180000 && speedGain > threshold) {
                    if (( (1609-30) < distance) && (distance < (1609+100)) && (interval == false)) //to pazi kako postaviš
                    {
                        /* this is for slowing down calculation when it approaches 1600m mark */
                        calculate_interval_ms = calculate_interval_ms / 1; //povecaj za povecat natancnost
                        interval = true;
                    }
                    step_count++;
                    executionTime = executionTime + calculate_interval_ms;
                    let cp = calculatePower(currentSpeed, executionTime, this, gearLength[currentGearIndex], this.selectedEngine)
                    power = cp[0]
                    currentRpm = cp[1]
                    lastRpm = currentRpm

                    if( currentRpm > 6000 && ((currentGearIndex+1) < gearLength.length)) currentGearIndex++

                    acceleration = acceleration_calc(currentSpeed, power, this.weightKg, this.aeroCx, this.rollingRos, this.maximumAccG);
                    speedGain = acceleration * calculate_interval_ms;
                    currentSpeed += speedGain;
                    distance = distance + (currentSpeed + speedGain / 2) * calculate_interval_ms / 1000;
                    // console.warn('currentSpeed: ', Math.round(currentSpeed*3.6), 'km/h distance: ', Math.floor(distance), "m, exetime: ", executionTime/1000+'s')
                    arrResult.push([Math.round(currentSpeed * 3.6), Math.floor(distance), executionTime / 1000, power, currentRpm])
                    // console.log("depaul", currentRpm, Math.round(currentSpeed*3.6), (currentGearIndex+1))
                }

                 // love.push([Number(gearLength).toFixed(0), arrResult[arrResult.length - 1][4], Number((currentSpeed * 3.6).toFixed(2)), 'km/h distance: ', Math.floor(distance), "m, exetime: ", executionTime / 1000 + 's'])
                 console.error('final speed: ', Math.round(currentSpeed*3.6), 'km/h gear:', (currentGearIndex+1), 'rpm:', lastRpm, ' distance:', Math.floor(distance), "m, exetime: ", executionTime/1000+'s')
                return arrResult
            }

            console.log("this mode : ", this.mode)

            if (this.mode == "oneGear") {
                for (let i = 0; i < this.splits; i++) {
                    let tmp = parseFloat(this.finalGearMin) + i * parseFloat((this.finalGearMax - this.finalGearMin) / (this.splits - 1))
                    tanja.push(singleRun(false, 1609, tmp))
                }
                store.tanja = tanja
                store.love = love
            } else if (this.mode == "topspeedRun") {
                for (let i = 0; i < this.splits; i++) {
                    let tmp = parseFloat(this.finalGearMin) + i * parseFloat((this.finalGearMax - this.finalGearMin) / (this.splits - 1))
                    tanja.push(singleRun(true, Infinity, tmp))
                }
                store.tanja = tanja
                store.love = love
            } else if (this.mode == "fixedMultipleGears") {
                tanja.push(fixedMultipleGears())
                store.tanja = tanja
                store.love = love

                    console.log("fixedMultipleGears")
                    console.log("%cTo moramo dobit gear ratios is form fixed tralala", "color: sienna")
                    // this.fixedMultipleGearsRun()
            }
            // this.$eventBus.$emit('calculationDone')
        },
        drawPowerAndTorqueChart() {
            var rpmLookupTable = []
            for (var currentRpm = 0; currentRpm <= store.engines[this.selectedEngine].maxRpm; currentRpm += this.divRpm) {
                rpmLookupTable.push(currentRpm)
            }

            var ctx = document.getElementById('myChart');
            while (ctx.firstChild)
                ctx.removeChild(ctx.firstChild);

            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: rpmLookupTable,
                    datasets: [{
                        label: 'torque nm',
                        data: store.engines[this.selectedEngine].torqueLookupTable,
                        backgroundColor: [
                            'rgba(54, 162, 235, 0.2)'
                        ],
                        borderWidth: 1
                    }, {
                        label: 'power hp',
                        data: store.engines[this.selectedEngine].powerLookupTable,
                        backgroundColor: [
                            'rgba(127, 127, 127, 1)'
                        ],
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

    },
    mounted() {
        console.warn("Da dela treba prvo spremenit vrednosti spodaj .. da zazna 'change' . Ja, to bo treba popravit v priliki")
        this.sendData()

        this.$eventBus.$on("finalGearInputChange", (e) => {
            this.maxgearlength = e
        })
        this.$eventBus.$on("initialSpeedInputChange", (e) => {
            this.initialSpeed = e
        })
        this.$eventBus.$on("finalGearMinChange", (e) => {
            this.finalGearMin = e
        })
        this.$eventBus.$on("finalGearMaxChange", (e) => {
            this.finalGearMax = e
        })
        this.$eventBus.$on('splitsChange', (e) => {
            this.splits = e
        })
        this.$eventBus.$on('seChange', (e) => {
            this.selectedEngine = e
            this.drawPowerAndTorqueChart()
        })
        this.$eventBus.$on('scpChange', (e) => {
            this.selectedCarPreset = e
            this.weightKg = store.carPresets[e].weightKg
            this.aeroCx = store.carPresets[e].aeroCx
            this.rollingRes = store.carPresets[e].rollingRes
            this.maximumAccG = store.carPresets[e].maximumAccG
        })
        this.$eventBus.$on('selectMode', (e) => {
            this.mode = e
        })
        this.drawPowerAndTorqueChart()
    }
}

const calculatePower = (speed, executionTime, _that, gearLength, selectedEngine) => {
    var currentRpm = null
    var IDs = new Object()
    if (executionTime < 500) {
        IDs[0] = 100
        IDs[1] = 2500
        return IDs
    } else {
        currentRpm = speed / gearLength * 3.6 * store.engines[selectedEngine].maxRpm
        // console.log(' current rpm: ', Math.round(currentRpm/50)*50, ' power: ', Math.round(_that.powerLookupTable[Math.floor(currentRpm / _that.divRpm)]), ' kW');
        /* HARDCODED */
        var res = store.engines[selectedEngine].powerLookupTable[Math.floor(currentRpm / _that.divRpm)]
        IDs[0] = res
        IDs[1] = Math.round(currentRpm / 50) * 50
        if (isNaN(res)) {
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
        margin: 0.875rem;
    }

    .myButContainer {
        display: inline-block;
        margin: 0;
        padding: 0;
        height: 30px;
    }

    .btn.btn-success {
        padding: 1.25rem 2.75rem;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        margin-top: -80px;

        &.sink {
            margin-top: 0px;
        }
    }
}

.myChartContainer {
    max-width: 750px;
    max-height: 500px;
    background-color: #fff;
    border: 1px solid $fg_0;
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

    input+.slider {
        background-color: #ccc;
    }

    input+.slider:before {
        -webkit-transform: translateX(0px);
        -ms-transform: translateX(0px);
        transform: translateX(0px);
    }

    input:checked+.slider {
        background-color: $fg_0;
    }

    input:focus+.slider {
        box-shadow: 0 0 1px #ccc;
    }

    input:checked+.slider:before {
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