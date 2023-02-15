export default {
  selectedEngine: undefined,
  selectedCarPreset: undefined,
  gearFinal: undefined,
  weightKg: undefined,
  aeroCx: undefined,
  rollingRes: undefined,
  maximumAccG: undefined,
  gearRatios: [],
  tanja: [],
  love: [],
  resultsFixedMultipleGears: [],
  engines: [
    {
      label: 'Viper "700hp"',
      effectiveMaxHp: "-",
      maxRpm: 6000,
      shiftRpm: 5700,
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
      shiftRpm: 5450,
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
      shiftRpm: 6000,
      torqueData: [860, 860],
      torqueLookupTable: [],
      powerLookupTable: [],
    },
    {
      label: 'Peaky torque "748hp"',
      effectiveMaxHp: "-",
      maxRpm: 6000,
      shiftRpm: 6000,
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
      label:
        'Stock GTS from real-world dyno "450hp" (not working if maxRpm not 6000)',
      effectiveMaxHp: "-",
      maxRpm: 5750,
      shiftRpm: 5600,
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
    {
      label: "Porsche GT3 Cup 2009",
      effectiveMaxHp: "-",
      maxRpm: 8250,
      shiftRpm: 8250,
      rpmDataWIP: [
        2008,
        2502,
        3001,
        3508,
        4004,
        4520,
        5021,
        5525,
        6015,
        6525,
        7015,
        7524,
        8011,
        8263,
      ],
      torqueData: [
        222.6,
        232.8,
        249.6,
        262.9,
        262.4,
        312.3,
        342.2,
        355.4,
        382.5,
        386.4,
        385.2,
        382.9,
        351.8,
        340.7,
      ],
      psDataWIP: [
        63.7,
        82.9,
        106.6,
        131.3,
        149.6,
        201.0,
        244.6,
        279.6,
        327.6,
        359.0,
        384.7,
        410.2,
        401.3,
        400.9,
      ],
    },
    {
      label: "Aprilia RS125",
      effectiveMaxHp: "-",
      maxRpm: 11250,
      shiftRpm: 10750,
      torqueData: [
        3,
        3,
        3,
        3,
        3,
        3,
        3,
        3,
        3,
        3,
        3,
        3,
        3,
        3,
        3,
        3,
        4.5,
        5,
        6.75,
        7,
        7,
        6.75,
        7,
        7,
        7.5,
        6.75,
        7,
        7.75,
        8.5,
        10.75,
        11,
        11.25,
        11.5,
        13,
        13.25,
        13.5,
        13.75,
        13.25,
        13,
        14.25,
        14.5,
        14.5,
        14.25,
        12.5,
        7,
        4,
      ],
    },
    {
      label: "Aprilia RS125 multiplied x10",
      effectiveMaxHp: "-",
      maxRpm: 11250,
      shiftRpm: 10750,
      torqueData: [
        30,
        30,
        30,
        30,
        30,
        30,
        30,
        30,
        30,
        30,
        30,
        30,
        30,
        30,
        30,
        30,
        45,
        50,
        67.5,
        70,
        70,
        67.5,
        70,
        70,
        75,
        67.5,
        70,
        77.5,
        85,
        107.5,
        110,
        112.5,
        115,
        130,
        132.5,
        135,
        137.5,
        132.5,
        130,
        142.5,
        145,
        145,
        142.5,
        125,
        70,
        40,
      ],
    },
  ],
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
    {
      label: "Porsche GT3 cup 2009",
      weightKg: 1265,
      aeroCx: 2.04 * 0.4,
      rollingRes: 0.015,
      maximumAccG: 0.975,
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
    {
      name: "Porsche GT3 2009",
      gearRatios: [3.16, 2.13, 1.72, 1.4, 1.13, 0.93],
      finalDrive: 4.0,
    },
  ],
  transmissionConstant: 0.1258,
};
