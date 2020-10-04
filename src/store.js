export default {
    tanja: [],
    love: [],
    engines: [{
            label: "Viper \"700hp\"",
            effectiveMaxKw: "-",
            maxRpm: 6000,
            torqueData: [630, 685, 731, 779, 816, 854, 888, 924, 948, 971, 992, 1012, 1018, 1032, 1054, 1038, 1020, 1002, 992, 980, 958, 880, 800, 720],
            torqueLookupTable: [],
            powerLookupTable: []
        },
        {
            label: "Fat torque \"638hp\"",
            effectiveMaxKw: "-",
            maxRpm: 6000,
            torqueData: [685, 731, 779, 816, 854, 888, 924, 948, 971, 992, 1012, 1018, 1032, 1054, 1038, 1002, 992, 980, 969, 819, 785, 733, 695, 675],
            torqueLookupTable: [],
            powerLookupTable: []
        },
        {
            label: "Flat torque \"724hp\"",
            effectiveMaxKw: "-",
            maxRpm: 6000,
            torqueData: [860, 860],
            torqueLookupTable: [],
            powerLookupTable: []
        },
        {
            label: "Peaky torque \"761hp\"",
            effectiveMaxKw: "-",
            maxRpm: 6000,
            torqueData: [519, 576, 630, 685, 731, 779, 816, 854, 888, 924, 948, 971, 992, 1012, 1018, 1032, 1054, 1038, 1002, 992, 980, 969, 948, 819],
            torqueLookupTable: [],
            powerLookupTable: []
        },
        {
            label: "Stock GTS from real dyno \"450hp\"",
            effectiveMaxKw: "-",
            maxRpm: 5750,
            torqueData: [
                476,
                476,
                476,
                476,
                476,
                476,
                476,
                476,
                476,
                544,
                544,
                561,
                584,
                591,
                612,
                626,
                618,
                622,
                612,
                591,
                578,
                561,
                527,
                496
            ],
            torqueLookupTable: [],
            powerLookupTable: []
        }
    ],
    carPresets: [{
            label: "Viper fully-upgraded",
            weightKg: 1184,
            aeroCx: 0.35,
            rollingRes: 0.015,
            maximumAccG: 0.95
        },
        {
            label: "Viper base",
            weightKg: 1628,
            aeroCx: 0.35,
            rollingRes: 0.0125,
            maximumAccG: 0.775
        }
    ]
}