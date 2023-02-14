export default {
  tanja: [],
  love: [],
  resultsFixedMultipleGears: [],
  engines: [
    {
      label: 'Viper "700hp"',
      effectiveMaxHp: "-",
      maxRpm: 6000,
      torqueData: [
        621,
        675,
        721,
        768,
        804,
        842,
        875,
        911,
        934,
        957,
        978,
        998,
        1003,
        1017,
        1039,
        1023,
        1005,
        988,
        978,
        966,
        944,
        867,
        789,
        710,
      ],
      torqueLookupTable: [],
      powerLookupTable: [],
    },
    {
      label: 'Fat torque "675hp"',
      effectiveMaxHp: "-",
      maxRpm: 6000,
      torqueData: [
        731,
        779,
        816,
        854,
        888,
        924,
        948,
        971,
        992,
        1012,
        1018,
        1032,
        1054,
        1053,
        1038,
        1020,
        1002,
        992,
        980,
        958,
        880,
        810,
        730,
        640,
      ],
      torqueLookupTable: [],
      powerLookupTable: [],
    },
    {
      label: 'Flat torque "734hp"',
      effectiveMaxHp: "-",
      maxRpm: 6000,
      torqueData: [860, 860],
      torqueLookupTable: [],
      powerLookupTable: [],
    },
    {
      label: 'Peaky torque "748hp"',
      effectiveMaxHp: "-",
      maxRpm: 6000,
      torqueData: [
        503,
        559,
        611,
        664,
        709,
        756,
        792,
        828,
        861,
        896,
        920,
        942,
        962,
        982,
        987,
        1001,
        1022,
        1007,
        972,
        962,
        951,
        940,
        920,
        794,
      ],
      torqueLookupTable: [],
      powerLookupTable: [],
    },
    {
      label: 'Stock GTS from real-world dyno "450hp" (not working if maxRpm not 6000)',
      effectiveMaxHp: "-",
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
        496,
      ],
      torqueLookupTable: [],
      powerLookupTable: [],
    },
  ],
  gearRatios: [],
  gearFinal: 3.74,
  weightKg: undefined,
  aeroCx: undefined,
  rollingRes: undefined,
  maximumAccG: undefined,
  carPresets: [
    {
      label: "Viper fully-upgraded",
      weightKg: 1184,
      aeroCx: 0.35,
      rollingRes: 0.015,
      maximumAccG: 0.95,
    },
    {
      label: "Viper base",
      weightKg: 1628,
      aeroCx: 0.35,
      rollingRes: 0.0125,
      maximumAccG: 0.775,
    },
    {
      label: "Fiat OM 50",
      weightKg: 4900,
      aeroCx: 1.5,
      rollingRes: 0.03,
      maximumAccG: 0.6,
    },
  ],
  gearingPresets: [
    {
      name: "Default",
      gearRatios: [2.66, 1.78, 1.3, 1.0, 0.74, 0.5],
      finalDrive: 3.07,
    },
    {
      name: "VR 700 Dayton",
      gearRatios: [2.08, 1.48, 1.14, 0.92, 0.78, 0.72],
      finalDrive: 2.64,
    },
    {
      name: "VR 700 Sunset Mesa",
      gearRatios: [1.88, 1.4, 1.1, 0.96, 0.86, 0.78],
      finalDrive: 3.1,
    },
    {
      name: "Ibiza 1.6 75hp",
      gearRatios: [3.455, 1.955, 1.25, 0.891, 0.74, 0.5],
      finalDrive: 4,
    },
    {
      name: "Rover 200vi",
      gearRatios: [3.167, 1.842, 1.308, 1.033, 0.765, 0.5],
      finalDrive: 4.2,
    },
    {
      name: "Opel Astra 1.6",
      gearRatios: [3.4, 1.9, 1.2, 0.89, 0.7, 0.5],
      finalDrive: 3.74,
    },
    {
      name: "Ibiza Cupra",
      gearRatios: [3.3, 1.944, 1.308, 1.029, 0.837, 0.5],
      finalDrive: 4,
    },
    {
      name: "Fiat Croma jtd",
      gearRatios: [3.82, 2.05, 1.3, 0.96, 0.74, 0.61],
      finalDrive: 3.65,
    },
  ],
  transmissionConstant: 755,
};
