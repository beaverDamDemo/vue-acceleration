import store from '../src/store.js'

export default {
    data() {

    },
    created: function() {

    },
    methods: {
        fillTorqueLookupTable(selectedEngine) {
            const en = store.engines[selectedEngine].torqueData
            const difference = store.engines[selectedEngine].maxRpm / (en.length - 1)
            let torStep = [],
                torqueLookupTable = [],
                rpmLookupTable = [],
                tmpPowerLookupTable = [],
                maxKw = 0,
                maxKwAtRpm = 0

            for (let i = 0; i <= en.length; i++) {
                torStep.push(i * store.engines[selectedEngine].maxRpm / (en.length - 1))
            }
            for (let currentRpm = 0; currentRpm <= store.engines[selectedEngine].maxRpm; currentRpm += this.divRpm) {
                let i = 0,
                    exitN = 83
                while (currentRpm > torStep[i] && i < exitN) {
                    i++
                }
                let result = ((torStep[i] - currentRpm) / difference) * en[i - 1]
                result += ((currentRpm - torStep[i - 1]) / difference) * en[i]
                torqueLookupTable.push(result)
                let tmp = (result) * currentRpm / 9549
                tmpPowerLookupTable.push(tmp)
                if (tmp > maxKw) {
                    maxKw = tmp
                    maxKwAtRpm = currentRpm
                }
                rpmLookupTable.push(currentRpm)
            }
            store.engines[selectedEngine].torqueLookupTable = torqueLookupTable
            store.engines[selectedEngine].powerLookupTable = tmpPowerLookupTable
            store.engines[selectedEngine].effectiveMaxKw = '(' + Math.round(maxKw) + "kW@" + maxKwAtRpm + "rpm)"
        }
    }
}