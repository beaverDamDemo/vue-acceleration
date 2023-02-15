<template>
  <section class="form-fixed-multiple-gears">
    <h5>Gear ratios</h5>
    <div class="preset-container">
      <button
        class="preset btn btn-secondary"
        type="button"
        v-for="preset of store.gearingPresets"
        :key="`preset-${preset.name}`"
        @click="onSelectGearingPreset(preset)"
      >
        {{ preset.name }}
      </button>
    </div>
    <div class="form-group">
      <label for="customRange_0">1st gear</label>
      <div
        class="arrow arrow-left"
        :class="{ disabled: gear_0_left_isDisabled }"
        @click="arrowClick(['customRange_0', 'left'])"
      ></div>
      <input
        @input="g_0_change($event)"
        type="range"
        class="custom-range"
        min="0.08"
        max="4"
        step="0.02"
        id="customRange_0"
        v-model="gear_0_ratio"
        :disabled="isDisabled"
      />
      <div
        class="arrow arrow-right"
        :class="{ disabled: gear_0_right_isDisabled }"
        @click="arrowClick(['customRange_0', 'right'])"
      ></div>
      <span v-text="gear_0_ratio"></span>
      <span v-text="gear_0_computedSpeed" class="computedSpeed"></span>
      <span>(WIP)</span>
    </div>
    <div class="form-group">
      <label for="customRange_1">2nd gear</label>
      <div
        class="arrow arrow-left"
        :class="{ disabled: gear_1_left_isDisabled }"
        @click="arrowClick(['customRange_1', 'left'])"
      ></div>
      <input
        @input="g_1_change($event)"
        type="range"
        class="custom-range"
        min="0.08"
        max="4"
        step="0.02"
        id="customRange_1"
        v-model="gear_1_ratio"
        :disabled="isDisabled"
      />
      <div
        class="arrow arrow-right"
        :class="{ disabled: gear_1_right_isDisabled }"
        @click="arrowClick(['customRange_1', 'right'])"
      ></div>
      <span v-text="gear_1_ratio"></span>
      <span v-text="gear_1_computedSpeed" class="computedSpeed"></span>
    </div>
    <div class="form-group">
      <label for="customRange_2">3th gear</label>
      <div
        class="arrow arrow-left"
        :class="{ disabled: gear_2_left_isDisabled }"
        @click="arrowClick(['customRange_2', 'left'])"
      ></div>
      <input
        @input="g_2_change($event)"
        type="range"
        class="custom-range"
        min="0.08"
        max="4"
        step="0.02"
        id="customRange_2"
        v-model="gear_2_ratio"
        :disabled="isDisabled"
      />
      <div
        class="arrow arrow-right"
        :class="{ disabled: gear_2_right_isDisabled }"
        @click="arrowClick(['customRange_2', 'right'])"
      ></div>
      <span v-text="gear_2_ratio"></span>
      <span v-text="gear_2_computedSpeed" class="computedSpeed"></span>
    </div>
    <div class="form-group">
      <label for="customRange_3">4th gear</label>
      <div
        class="arrow arrow-left"
        :class="{ disabled: gear_3_left_isDisabled }"
        @click="arrowClick(['customRange_3', 'left'])"
      ></div>
      <input
        @input="g_3_change($event)"
        type="range"
        class="custom-range"
        min="0.08"
        max="4"
        step="0.02"
        id="customRange_3"
        v-model="gear_3_ratio"
        :disabled="isDisabled"
      />
      <div
        class="arrow arrow-right"
        :class="{ disabled: gear_3_right_isDisabled }"
        @click="arrowClick(['customRange_3', 'right'])"
      ></div>
      <span v-text="gear_3_ratio"></span>
      <span v-text="gear_3_computedSpeed" class="computedSpeed"></span>
    </div>
    <div class="form-group">
      <label for="customRange_4">5th gear</label>
      <div
        class="arrow arrow-left"
        :class="{ disabled: gear_4_left_isDisabled }"
        @click="arrowClick(['customRange_4', 'left'])"
      ></div>
      <input
        @input="g_4_change($event)"
        type="range"
        class="custom-range"
        min="0.08"
        max="4"
        step="0.02"
        id="customRange_4"
        v-model="gear_4_ratio"
        :disabled="isDisabled"
      />
      <div
        class="arrow arrow-right"
        :class="{ disabled: gear_4_right_isDisabled }"
        @click="arrowClick(['customRange_4', 'right'])"
      ></div>
      <span v-text="gear_4_ratio"></span>
      <span v-text="gear_4_computedSpeed" class="computedSpeed"></span>
    </div>
    <div class="form-group">
      <label for="customRange_5">6th gear</label>
      <div
        class="arrow arrow-left"
        :class="{ disabled: gear_5_left_isDisabled }"
        @click="arrowClick(['customRange_5', 'left'])"
      ></div>
      <input
        @input="g_5_change($event)"
        type="range"
        class="custom-range"
        min="0.08"
        max="4"
        step="0.02"
        id="customRange_5"
        v-model="gear_5_ratio"
        :disabled="isDisabled"
      />
      <div
        class="arrow arrow-right"
        :class="{ disabled: gear_5_right_isDisabled }"
        @click="arrowClick(['customRange_5', 'right'])"
      ></div>
      <span v-text="gear_5_ratio"></span>
      <span v-text="gear_5_computedSpeed" class="computedSpeed"></span>
    </div>
    <div class="form-group">
      <label for="customRange_final">final drive</label>
      <div
        class="arrow arrow-left"
        :class="{ disabled: gearFinalLeftArrowIsDisabled }"
        @click="arrowClick(['customRange_final', 'left'])"
      ></div>
      <input
        type="range"
        class="custom-range"
        min="2.54"
        max="4.74"
        step="0.1"
        id="customRange_final"
        :disabled="isDisabled"
        @input="onInputGearFinal($event)"
        v-model="gearFinal"
      />
      <div
        class="arrow arrow-right"
        :class="{ disabled: gearFinalRightArrowIsDisabled }"
        @click="arrowClick(['customRange_final', 'right'])"
      ></div>
      <span v-text="store.gearFinal"></span>
      <span class="computedSpeed"></span>
    </div>
  </section>
</template>
<script lang="js">
import store from '../store.js'
export default {
    name: 'form-fixed-multiple-gears',
    props: [],
    mounted () {
      console.log("setting default gear preset 0")
      this.gear_0_ratio = store.gearingPresets[0].gearRatios[0]
      store.gearRatios[0] = this.gear_0_ratio
      this.gear_1_ratio = store.gearingPresets[0].gearRatios[1]
      store.gearRatios[1] = this.gear_1_ratio
      this.gear_2_ratio = store.gearingPresets[0].gearRatios[2]
      store.gearRatios[2] = this.gear_2_ratio
      this.gear_3_ratio = store.gearingPresets[0].gearRatios[3]
      store.gearRatios[3] = this.gear_3_ratio
      this.gear_4_ratio = store.gearingPresets[0].gearRatios[4]
      store.gearRatios[4] = this.gear_4_ratio
      this.gear_5_ratio = store.gearingPresets[0].gearRatios[5]
      store.gearRatios[5] = this.gear_5_ratio
      this.gearFinal = store.gearingPresets[0].finalDrive
      store.gearFinal = store.gearingPresets[0].finalDrive

      this.$eventBus.$on('selectMode', (e) => {
            if (e == "oneGear" || e == "topspeedRun") {
                this.isDisabled = true
                this.gear_0_left_isDisabled = true
                this.gear_0_right_isDisabled = true
                this.gear_1_left_isDisabled = true
                this.gear_1_right_isDisabled = true
                this.gear_2_left_isDisabled = true
                this.gear_2_right_isDisabled = true
                this.gear_3_left_isDisabled = true
                this.gear_3_right_isDisabled = true
                this.gear_4_left_isDisabled = true
                this.gear_4_right_isDisabled = true
                this.gear_5_left_isDisabled = true
                this.gear_5_right_isDisabled = true
                this.gearFinalLeftArrowIsDisabled = true
                this.gearFinalRightArrowIsDisabled = true
            } else {
                this.isDisabled = false
                this.gear_0_left_isDisabled = false
                this.gear_0_right_isDisabled = false
                this.gear_1_left_isDisabled = false
                this.gear_1_right_isDisabled = false
                this.gear_2_left_isDisabled = false
                this.gear_2_right_isDisabled = false
                this.gear_3_left_isDisabled = false
                this.gear_3_right_isDisabled = false
                this.gear_4_left_isDisabled = false
                this.gear_4_right_isDisabled = false
                this.gear_5_left_isDisabled = false
                this.gear_5_right_isDisabled = false
                this.gearFinalLeftArrowIsDisabled = false
                this.gearFinalRightArrowIsDisabled = false
            }
        })
      this.$eventBus.$on('selectEngineChange', (e) => {
        this.gear_0_computedSpeed = Math.round(store.transmissionConstant * store.engines[store.selectedEngine].maxRpm / store.gearRatios[0] / store.gearFinal)
        this.gear_1_computedSpeed = Math.round(store.transmissionConstant * store.engines[store.selectedEngine].maxRpm / store.gearRatios[1] / store.gearFinal)
        this.gear_2_computedSpeed = Math.round(store.transmissionConstant * store.engines[store.selectedEngine].maxRpm / store.gearRatios[2] / store.gearFinal)
        this.gear_3_computedSpeed = Math.round(store.transmissionConstant * store.engines[store.selectedEngine].maxRpm / store.gearRatios[3] / store.gearFinal)
        this.gear_4_computedSpeed = Math.round(store.transmissionConstant * store.engines[store.selectedEngine].maxRpm / store.gearRatios[4] / store.gearFinal)
        this.gear_5_computedSpeed = Math.round(store.transmissionConstant * store.engines[store.selectedEngine].maxRpm / store.gearRatios[5] / store.gearFinal)
      })
    },

    data () {
        return {
            gear_0_ratio: undefined,
            gear_0_computedSpeed: undefined,
            gear_0_left_isDisabled: true,
            gear_0_right_isDisabled: true,
            gear_1_ratio: undefined,
            gear_1_computedSpeed: undefined,
            gear_1_left_isDisabled: true,
            gear_1_right_isDisabled: true,
            gear_2_ratio: undefined,
            gear_2_computedSpeed: undefined,
            gear_2_left_isDisabled: true,
            gear_2_right_isDisabled: true,
            gear_3_ratio: undefined,
            gear_3_computedSpeed: undefined,
            gear_3_left_isDisabled: true,
            gear_3_right_isDisabled: true,
            gear_4_ratio: undefined,
            gear_4_computedSpeed: undefined,
            gear_4_left_isDisabled: true,
            gear_4_right_isDisabled: true,
            gear_5_ratio: undefined,
            gear_5_computedSpeed: undefined,
            gear_5_left_isDisabled: true,
            gear_5_right_isDisabled: true,
            gearFinal: undefined,
            gearFinalLeftArrowIsDisabled: true,
            gearFinalRightArrowIsDisabled: true,
            isDisabled: true,
            store: store
        }
    },
    watch: {
        gear_0_ratio: function (val) {
            if (val >= 4) {
                this.gear_0_right_isDisabled = true
            } else if (val <= 0.10) {
                this.gear_0_left_isDisabled = true
            } else {
                this.gear_0_left_isDisabled = false
                this.gear_0_right_isDisabled = false
            }
        },
        gear_1_ratio: function (val) {
            if (val >= 3.98) this.gear_1_isDisabled = true
            else if (val <= 0.10) this.gear_1_isDisabled = true
        },
        gear_2_ratio: function (val) {
            if (val >= 3.96) this.gear_2_isDisabled = true
            else if (val <= 0.08) this.gear_2_isDisabled = true
        },
        gear_3_ratio: function (val) {
            if (val >= 3.94) this.gear_3_isDisabled = true
            else if (val <= 0.06) this.gear_3_isDisabled = true
        },
        gear_4_ratio: function (val) {
            if (val >= 3.92) this.gear_4_isDisabled = true
            else if (val <= 0.04) this.gear_4_isDisabled = true
        },
        gear_5_ratio: function (val) {
            if (val >= 3.9) this.gear_5_isDisabled = true
            else if (val <= 0.02) this.gear_5_isDisabled = true
        },
        gearFinal: function() {
          console.log("⛳ change on gear final")
          this.gear_0_computedSpeed = Math.round(store.transmissionConstant * store.engines[store.selectedEngine].maxRpm / store.gearRatios[0] / store.gearFinal)
          this.gear_1_computedSpeed = Math.round(store.transmissionConstant * store.engines[store.selectedEngine].maxRpm / store.gearRatios[1] / store.gearFinal)
          this.gear_2_computedSpeed = Math.round(store.transmissionConstant * store.engines[store.selectedEngine].maxRpm / store.gearRatios[2] / store.gearFinal)
          this.gear_3_computedSpeed = Math.round(store.transmissionConstant * store.engines[store.selectedEngine].maxRpm / store.gearRatios[3] / store.gearFinal)
          this.gear_4_computedSpeed = Math.round(store.transmissionConstant * store.engines[store.selectedEngine].maxRpm / store.gearRatios[4] / store.gearFinal)
          this.gear_5_computedSpeed = Math.round(store.transmissionConstant * store.engines[store.selectedEngine].maxRpm / store.gearRatios[5] / store.gearFinal)
        }
    },
    methods: {
        g_0_change: function (event) {
            if (this.gear_1_ratio >= this.gear_0_ratio) {
                this.gear_0_ratio = this.gear_1_ratio + 0.02
                store.gearRatios[0] = this.gear_0_ratio
            }
            store.gearRatios[0] = this.gear_0_ratio
            eval("this.gear_0_computedSpeed = " + Math.round(store.transmissionConstant / store.gearRatios[0] / store.gearFinal))
        },
        g_1_change: function () {
            if (this.gear_2_ratio >= this.gear_1_ratio) {
                this.gear_1_ratio = this.gear_2_ratio + 0.02
                store.gearRatios[1] = this.gear_1_ratio
            }
            if (this.gear_0_ratio < this.gear_1_ratio) {
                this.gear_0_ratio = this.gear_1_ratio - 0.02
                store.gearRatios[0] = this.gear_0_ratio
            }
            store.gearRatios[1] = this.gear_1_ratio
            eval("this.gear_0_computedSpeed = " + Math.round(store.transmissionConstant / store.gearRatios[0] / store.gearFinal))
            eval("this.gear_1_computedSpeed = " + Math.round(store.transmissionConstant / store.gearRatios[1] / store.gearFinal))
        },
        g_2_change: function () {
            if (this.gear_3_ratio >= this.gear_2_ratio) {
                this.gear_2_ratio = this.gear_3_ratio + 0.02
                store.gearRatios[2] = this.gear_2_ratio
            }
            if (this.gear_1_ratio < this.gear_2_ratio) {
                this.gear_1_ratio = this.gear_2_ratio - 0.02
                store.gearRatios[1] = this.gear_1_ratio
            }
            store.gearRatios[2] = this.gear_2_ratio
            eval("this.gear_1_computedSpeed = " + Math.round(store.transmissionConstant / store.gearRatios[1] / store.gearFinal))
            eval("this.gear_2_computedSpeed = " + Math.round(store.transmissionConstant / store.gearRatios[2] / store.gearFinal))
        },
        g_3_change: function () {
            if (this.gear_4_ratio >= this.gear_3_ratio) {
                this.gear_3_ratio = this.gear_4_ratio + 0.02
                store.gearRatios[3] = this.gear_3_ratio
            }
            if (this.gear_2_ratio < this.gear_3_ratio) {
                this.gear_2_ratio = this.gear_3_ratio - 0.02
                store.gearRatios[2] = this.gear_2_ratio
            }
            store.gearRatios[3] = this.gear_3_ratio
            eval("this.gear_2_computedSpeed = " + Math.round(store.transmissionConstant / store.gearRatios[2] / store.gearFinal))
            eval("this.gear_3_computedSpeed = " + Math.round(store.transmissionConstant / store.gearRatios[3] / store.gearFinal))
        },
        g_4_change: function () {
            if (this.gear_5_ratio >= this.gear_4_ratio) {
                this.gear_4_ratio = this.gear_5_ratio + 0.02
                store.gearRatios[4] = this.gear_4_ratio
            }
            if (this.gear_3_ratio < this.gear_4_ratio) {
                this.gear_3_ratio = this.gear_4_ratio - 0.02
                store.gearRatios[3] = this.gear_3_ratio
            }
            store.gearRatios[4] = this.gear_4_ratio
            eval("this.gear_3_computedSpeed = " + Math.round(store.transmissionConstant / store.gearRatios[3] / store.gearFinal))
            eval("this.gear_4_computedSpeed = " + Math.round(store.transmissionConstant / store.gearRatios[4] / store.gearFinal))
        },
        g_5_change: function () {
            if (this.gear_4_ratio < this.gear_5_ratio) {
                this.gear_4_ratio = this.gear_5_ratio - 0.02
                store.gearRatios[4] = this.gear_4_ratio
                // Vue.set(store.gearRatios, 4, newValue)
            }
            store.gearRatios[5] = this.gear_5_ratio
            eval("this.gear_4_computedSpeed = " + Math.round(store.transmissionConstant / store.gearRatios[4] / store.gearFinal))
            eval("this.gear_5_computedSpeed = " + Math.round(store.transmissionConstant / store.gearRatios[5] / store.gearFinal))
        },
        onInputGearFinal: function(e) {
          this.gear_0_computedSpeed = 257

          console.log("⛳ onInputGearFinal    ~ val")
          // store.gearFinal = e.target.value
          // this.gearFinal = e.target.value
          // eval("this.gear_0_computedSpeed = " + Math.round(store.transmissionConstant / store.gearRatios[0] / store.gearFinal))
          // eval("this.gear_1_computedSpeed = " + Math.round(store.transmissionConstant / store.gearRatios[1] / store.gearFinal))
          // eval("this.gear_2_computedSpeed = " + Math.round(store.transmissionConstant / store.gearRatios[2] / store.gearFinal))
          // eval("this.gear_3_computedSpeed = " + Math.round(store.transmissionConstant / store.gearRatios[3] / store.gearFinal))
          // eval("this.gear_4_computedSpeed = " + Math.round(store.transmissionConstant / store.gearRatios[4] / store.gearFinal))
          // eval("this.gear_5_computedSpeed = " + Math.round(store.transmissionConstant / store.gearRatios[5] / store.gearFinal))
        },
        arrowClick: function (e) {
            switch (e[0].split('_')[1]) {
                case "0":
                    if (e[1] == "left") {
                        this.gear_0_ratio = parseInt(Math.round(100 * this.gear_0_ratio) - 2) / 100
                        store.gearRatios[0] = this.gear_0_ratio
                    } else {
                        this.gear_0_ratio = parseInt(Math.round(100 * this.gear_0_ratio) + 2) / 100
                        store.gearRatios[0] = this.gear_0_ratio
                    }
                    break;
                case "1":
                    if (e[1] == "left") {
                        this.gear_1_ratio = parseInt(Math.round(100 * this.gear_1_ratio) - 2) / 100
                        store.gearRatios[1] = this.gear_1_ratio
                    } else {
                        this.gear_1_ratio = parseInt(Math.round(100 * this.gear_1_ratio) + 2) / 100
                        store.gearRatios[1] = this.gear_1_ratio
                    }
                    break;
                case "2":
                    if (e[1] == "left") {
                        this.gear_2_ratio = parseInt(Math.round(100 * this.gear_2_ratio) - 2) / 100
                        store.gearRatios[2] = this.gear_2_ratio
                    } else {
                        this.gear_2_ratio = parseInt(Math.round(100 * this.gear_2_ratio) + 2) / 100
                        store.gearRatios[2] = this.gear_2_ratio
                    }
                    break;
                case "3":
                    if (e[1] == "left") {
                        this.gear_3_ratio = parseInt(Math.round(100 * this.gear_3_ratio) - 2) / 100
                        store.gearRatios[3] = this.gear_3_ratio
                    } else {
                        this.gear_3_ratio = parseInt(Math.round(100 * this.gear_3_ratio) + 2) / 100
                        store.gearRatios[3] = this.gear_3_ratio
                    }
                    break;
                case "4":
                    if (e[1] == "left") {
                        this.gear_4_ratio = parseInt(Math.round(100 * this.gear_4_ratio) - 2) / 100
                        store.gearRatios[4] = this.gear_4_ratio
                    } else {
                        this.gear_4_ratio = parseInt(Math.round(100 * this.gear_4_ratio) + 2) / 100
                        store.gearRatios[4] = this.gear_4_ratio
                    }
                    break;
                case "5":
                    if (e[1] == "left") {
                        this.gear_5_ratio = parseInt(Math.round(100 * this.gear_5_ratio) - 2) / 100
                        store.gearRatios[5] = this.gear_5_ratio
                    } else {
                        this.gear_5_ratio = parseInt(Math.round(100 * this.gear_5_ratio) + 2) / 100
                        store.gearRatios[5] = this.gear_5_ratio
                    }
                    break;
                case "final":
                    if (e[1] == "left") {
                      store.gearFinal = parseInt(Math.round(100 * store.gearFinal) - 10) / 100
                      this.gearFinal = store.gearFinal
                    } else {
                      store.gearFinal = parseInt(Math.round(100 *store.gearFinal) + 10) / 100
                      this.gearFinal = store.gearFinal
                    }
                    break;
                default:
                    console.log("Unexpected value")
            }
            for(let i=0; i<store.gearRatios.length; i++) {
              eval("this.gear_" + i + "_computedSpeed = " + Math.round(store.transmissionConstant / store.gearRatios[i] / store.gearFinal))
            }
        },
        onSelectGearingPreset (preset) {
            this.gear_0_ratio = preset.gearRatios[0]
            store.gearRatios[0] = this.gear_0_ratio
            this.gear_1_ratio = preset.gearRatios[1]
            store.gearRatios[1] = this.gear_1_ratio
            this.gear_2_ratio = preset.gearRatios[2]
            store.gearRatios[2] = this.gear_2_ratio
            this.gear_3_ratio = preset.gearRatios[3]
            store.gearRatios[3] = this.gear_3_ratio
            this.gear_4_ratio = preset.gearRatios[4]
            store.gearRatios[4] = this.gear_4_ratio
            this.gear_5_ratio = preset.gearRatios[5]
            store.gearRatios[5] = this.gear_5_ratio
            this.gearFinal = preset.finalDrive
            store.gearFinal = preset.finalDrive

            // for(let i=0; i<preset.gearRatios.length; i++) {
            //   eval("this.gear_" + i + "_computedSpeed = " + Math.round(store.transmissionConstant / preset.gearRatios[i] / preset.finalDrive))
            // }
            // this.$eventBus.$emit('selectEngineChange')

        }
    },
}
</script>
<style scoped>
.preset-container {
  margin: 0.75rem 0;
}
.form-fixed-multiple-gears .preset-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.form-fixed-multiple-gears .preset-container .preset {
  padding: 2px 4px;
  width: 110px;
  border-radius: 6px;
  font-size: 0.75em;
  margin: 0 3px;
}

.form-fixed-multiple-gears .preset-container .preset:hover {
  cursor: pointer;
}

.form-fixed-multiple-gears .form-group {
  margin-bottom: 0.1rem;
  display: flex;
}
.form-fixed-multiple-gears .form-group span {
  min-width: 3rem;
}
.form-fixed-multiple-gears .form-group span.computedSpeed {
  text-align: right;
  min-width: 7rem;
}
.form-fixed-multiple-gears .form-group span.computedSpeed::after {
  content: " km/h";
}
.form-fixed-multiple-gears
  .form-group:nth-of-type(8)
  span.computedSpeed::after {
  content: "";
}

.form-fixed-multiple-gears .form-group h5 {
  text-align: center;
  margin-bottom: 0px;
}

.form-fixed-multiple-gears .form-group label {
  text-align: right;
  margin-top: 0rem;
  margin-bottom: 0.3rem;
  width: 110px;
}

.form-fixed-multiple-gears .form-group input {
  width: 66%;
  margin-left: 10px;
  margin-right: 10px;
}

.form-fixed-multiple-gears .form-group input:disabled {
  color: darkgray;
}

.form-fixed-multiple-gears .form-group .arrow {
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 2px;
}

.form-fixed-multiple-gears .form-group .arrow.disabled {
  pointer-events: none;
}

.form-fixed-multiple-gears .form-group .arrow-right {
  border-left: 14px solid rgb(184, 35, 126);
  margin-right: 5px;
}

.form-fixed-multiple-gears .form-group .arrow-right.disabled {
  border-left: 14px solid #aaa;
}

.form-fixed-multiple-gears .form-group .arrow-left {
  border-right: 14px solid rgb(184, 35, 126);
  margin-left: 5px;
}

.form-fixed-multiple-gears .form-group .arrow-left.disabled {
  border-right: 14px solid #aaa;
}
</style>