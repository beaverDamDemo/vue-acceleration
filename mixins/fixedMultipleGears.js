import store from '../src/store.js'

export default {
    created() {
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
            },
    },
    methods: {
        fixedMultipleGearsRun() {
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
            let threshold = -1
            var currentSpeed = 27.7
            var arrResult = []

            let gearing = [2.66, 1.78, 1.30, 1.00, 0.74, 0.50]
            let maxRpm = 6000
            let currentGearIndex = 0

            if ((executionTime < 300) && (currentSpeed < 5.0)) //pozor ker currentSpeed je v m/s
            {
                speedGain = this.maxg * 0.9; //wheelspin na začetku pospeševanja, prve 3 desetinke
            }

            while (distance < 1609 && executionTime < 180000 && speedGain > threshold) {
                if (((1609 - 30) < distance) && (distance < (1609 + 100)) && (interval == false)) //to pazi kako postaviš
                {
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
                console.warn('currentSpeed: ', Math.round(currentSpeed * 3.6), 'km/h distance: ', Math.floor(distance), "m, exetime: ", executionTime / 1000 + 's')
                arrResult.push([Math.round(currentSpeed * 3.6), Math.floor(distance), executionTime / 1000, power, currentRpm])
            }

            love.push([Number(gearLength).toFixed(0), arrResult[arrResult.length - 1][4], Number((currentSpeed * 3.6).toFixed(2)), 'km/h distance: ', Math.floor(distance), "m, exetime: ", executionTime / 1000 + 's'])
            console.error('final speed: ', Math.round(currentSpeed * 3.6), 'km/h distance: ', Math.floor(distance), "m, exetime: ", executionTime / 1000 + 's')
            return arrResult
        }
    }
}