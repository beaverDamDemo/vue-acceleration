<template lang="html">
    <section class="form-fixed-multiple-gears">
        <div class="preset-container">
            <div class="preset">Default</div>
            <div class="preset">Close-ratio</div>
            <div class="preset">Ibiza 1.6 75hp</div>
            <div class="preset">Rover 200vi</div>
            <div class="preset">Ibiza Cupra</div>
        </div>
        <h5>Gear ratios</h5>
        <div class='form-group'>
            <label for="customRange_0">1st gear</label>
            <div class="arrow arrow-left" :class='{disabled: gear_0_left_isDisabled}' @click="arrowClick(['customRange_0', 'left'])"></div>
            <input @input='g_0_change($event)' type="range" class="custom-range" min="0.08" max="4" step="0.02" id="customRange_0" v-model="gear_0" :disabled="isDisabled">
            <div class="arrow arrow-right" :class='{disabled: gear_0_right_isDisabled}' @click="arrowClick(['customRange_0', 'right'])"></div>
            <span v-text="gear_0"></span>
        </div>
        <div class='form-group'>
            <label for="customRange_1">2nd gear</label>
            <div class="arrow arrow-left" :class='{disabled: gear_1_left_isDisabled}' @click="arrowClick(['customRange_1', 'left'])"></div>
            <input @input='g_1_change($event)' type="range" class="custom-range" min="0.08" max="4" step="0.02" id="customRange_1" v-model="gear_1" :disabled="isDisabled">
            <div class="arrow arrow-right" :class='{disabled: gear_1_right_isDisabled}' @click="arrowClick(['customRange_1', 'right'])"></div>
            <span v-text="gear_1"></span>
        </div>
        <div class='form-group'>
            <label for="customRange_2">3th gear</label>
            <div class="arrow arrow-left" :class='{disabled: gear_2_left_isDisabled}' @click="arrowClick(['customRange_2', 'left'])"></div>
            <input @input='g_2_change($event)' type="range" class="custom-range" min="0.08" max="4" step="0.02" id="customRange_2" v-model="gear_2" :disabled="isDisabled">
            <div class="arrow arrow-right" :class='{disabled: gear_2_right_isDisabled}' @click="arrowClick(['customRange_2', 'right'])"></div>
            <span v-text="gear_2"></span>
        </div>
        <div class='form-group'>
            <label for="customRange_3">4th gear</label>
            <div class="arrow arrow-left" :class='{disabled: gear_3_left_isDisabled}' @click="arrowClick(['customRange_3', 'left'])"></div>
            <input @input='g_3_change($event)' type="range" class="custom-range" min="0.08" max="4" step="0.02" id="customRange_3" v-model="gear_3" :disabled="isDisabled">
            <div class="arrow arrow-right" :class='{disabled: gear_3_right_isDisabled}' @click="arrowClick(['customRange_3', 'right'])"></div>
            <span v-text="gear_3"></span>
        </div>
        <div class='form-group'>
            <label for="customRange_4">5th gear</label>
            <div class="arrow arrow-left" :class='{disabled: gear_4_left_isDisabled}' @click="arrowClick(['customRange_4', 'left'])"></div>
            <input @input='g_4_change($event)' type="range" class="custom-range" min="0.08" max="4" step="0.02" id="customRange_4" v-model="gear_4" :disabled="isDisabled">
            <div class="arrow arrow-right" :class='{disabled: gear_4_right_isDisabled}' @click="arrowClick(['customRange_4', 'right'])"></div>
            <span v-text="gear_4"></span>
        </div>
        <div class='form-group'>
            <label for="customRange_5">6th gear</label>
            <div class="arrow arrow-left" :class='{disabled: gear_5_left_isDisabled}' @click="arrowClick(['customRange_5', 'left'])"></div>
            <input @input='g_5_change($event)' type="range" class="custom-range" min="0.08" max="4" step="0.02" id="customRange_5" v-model="gear_5" :disabled="isDisabled">
            <div class="arrow arrow-right" :class='{disabled: gear_5_right_isDisabled}' @click="arrowClick(['customRange_5', 'right'])"></div>
            <span v-text="gear_5"></span>
        </div>
        <div class='form-group'>
            <label for="customRange_final">final drive</label>
            <div class="arrow arrow-left" :class='{disabled: gear_final_left_isDisabled}' @click="arrowClick(['customRange_final', 'left'])"></div>
            <input @input='g_final_change($event)' type="range" class="custom-range" min="2.54" max="4.74" step="0.1" id="customRange_final" v-model="gear_final" :disabled="isDisabled">
            <div class="arrow arrow-right" :class='{disabled: gear_final_right_isDisabled}' @click="arrowClick(['customRange_final', 'right'])"></div>
            <span v-text="gear_final"></span>
        </div>
        </div>
    </section>
</template>
<script lang="js">
import store from '../store.js'
export default {
    name: 'form-fixed-multiple-gears',
    props: [],
    mounted() {
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
                this.gear_final_left_isDisabled = true
                this.gear_final_right_isDisabled = true
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
                this.gear_final_left_isDisabled = false
                this.gear_final_right_isDisabled = false
            }
        })

        this.gear_0 = store.gearRatios[0]
        this.gear_1 = store.gearRatios[1]
        this.gear_2 = store.gearRatios[2]
        this.gear_3 = store.gearRatios[3]
        this.gear_4 = store.gearRatios[4]
        this.gear_5 = store.gearRatios[5]
        this.gear_final = store.gearFinal
        console.log("%cAdd gear presets here", "color: dodgerblue; background: yellow; font-weight: 600")
    },
    data() {
        return {
            gear_0: undefined,
            gear_0_left_isDisabled: true,
            gear_0_right_isDisabled: true,
            gear_1: undefined,
            gear_1_left_isDisabled: true,
            gear_1_right_isDisabled: true,
            gear_2: undefined,
            gear_2_left_isDisabled: true,
            gear_2_right_isDisabled: true,
            gear_3: undefined,
            gear_3_left_isDisabled: true,
            gear_3_right_isDisabled: true,
            gear_4: undefined,
            gear_4_left_isDisabled: true,
            gear_4_right_isDisabled: true,
            gear_5: undefined,
            gear_5_left_isDisabled: true,
            gear_5_right_isDisabled: true,
            gear_final: undefined,
            gear_final_left_isDisabled: true,
            gear_final_right_isDisabled: true,
            isDisabled: true
        }
    },
    watch: {
        gear_0: function(val) {
            if (val >= 4) {
              this.gear_0_right_isDisabled = true
            } else if (val <= 0.10) {
              this.gear_0_left_isDisabled = true
            } else {
               this.gear_0_left_isDisabled = false
               this.gear_0_right_isDisabled = false
            }
        },
        gear_1: function(val) {
            if (val >= 3.98) this.gear_1_isDisabled = true
            else if (val <= 0.10) this.gear_1_isDisabled = true
        },
        gear_2: function(val) {
            if (val >= 3.96) this.gear_2_isDisabled = true
            else if (val <= 0.08) this.gear_2_isDisabled = true
        },
        gear_3: function(val) {
            if (val >= 3.94) this.gear_3_isDisabled = true
            else if (val <= 0.06) this.gear_3_isDisabled = true
        },
        gear_4: function(val) {
            if (val >= 3.92) this.gear_4_isDisabled = true
            else if (val <= 0.04) this.gear_4_isDisabled = true
        },
        gear_5: function(val) {
            if (val >= 3.9) this.gear_5_isDisabled = true
            else if (val <= 0.02) this.gear_5_isDisabled = true
        },
        gear_final: function(val) {
            if (val >= 4) this.gear_final_isDisabled = true
            else if (val <= 2.54) this.gear_final_isDisabled = true
        },
    },
    methods: {
        g_0_change: function(event) {
            if (this.gear_1 >= this.gear_0) {
                this.gear_0 = this.gear_1 + 0.02
                store.gearRatios[0] = this.gear_0
            }
            store.gearRatios[0] = this.gear_0
        },
        g_1_change: function() {
            if (this.gear_2 >= this.gear_1) {
                this.gear_1 = this.gear_2 + 0.02
                store.gearRatios[1] = this.gear_1
            }
            if (this.gear_0 < this.gear_1) {
                this.gear_0 = this.gear_1 - 0.02
                store.gearRatios[0] = this.gear_0
            }
            store.gearRatios[1] = this.gear_1
        },
        g_2_change: function() {
            if (this.gear_3 >= this.gear_2) {
                this.gear_2 = this.gear_3 + 0.02
                store.gearRatios[2] = this.gear_2
            }
            if (this.gear_1 < this.gear_2) {
                this.gear_1 = this.gear_2 - 0.02
                store.gearRatios[1] = this.gear_1
            }
            store.gearRatios[2] = this.gear_2
        },
        g_3_change: function() {
            if (this.gear_4 >= this.gear_3) {
                this.gear_3 = this.gear_4 + 0.02
                store.gearRatios[3] = this.gear_3
            }
            if (this.gear_2 < this.gear_3) {
                this.gear_2 = this.gear_3 - 0.02
                store.gearRatios[2] = this.gear_2
            }
            store.gearRatios[3] = this.gear_3
        },
        g_4_change: function() {
            if (this.gear_5 >= this.gear_4) {
                this.gear_4 = this.gear_5 + 0.02
                store.gearRatios[4] = this.gear_4
            }
            if (this.gear_3 < this.gear_4) {
                this.gear_3 = this.gear_4 - 0.02
                store.gearRatios[3] = this.gear_3
            }
            store.gearRatios[4] = this.gear_4
        },
        g_5_change: function() {
            if (this.gear_4 < this.gear_5) {
                this.gear_4 = this.gear_5 - 0.02
                store.gearRatios[4] = this.gear_4
                // Vue.set(store.gearRatios, 4, newValue)
            }
            store.gearRatios[5] = this.gear_5
        },
        g_final_change: function() {
            store.gearFinal = this.gear_final
        },
        arrowClick: function(e) {
            switch (e[0].split('_')[1]) {
                case "0":
                    if (e[1] == "left") {
                        this.gear_0 = parseInt(Math.round(100 * this.gear_0) - 2) / 100
                        store.gearRatios[0] = this.gear_0
                    } else {
                        this.gear_0 = parseInt(Math.round(100 * this.gear_0) + 2) / 100
                        store.gearRatios[0] = this.gear_0
                    }
                    break;
                case "1":
                    if (e[1] == "left") {
                        this.gear_1 = parseInt(Math.round(100 * this.gear_1) - 2) / 100
                        store.gearRatios[1] = this.gear_1
                    } else {
                        this.gear_1 = parseInt(Math.round(100 * this.gear_1) + 2) / 100
                        store.gearRatios[1] = this.gear_1
                    }
                    break;
                case "2":
                    if (e[1] == "left") {
                        this.gear_2 = parseInt(Math.round(100 * this.gear_2) - 2) / 100
                        store.gearRatios[2] = this.gear_2
                    } else {
                        this.gear_2 = parseInt(Math.round(100 * this.gear_2) + 2) / 100
                        store.gearRatios[2] = this.gear_2
                    }
                    break;
                case "3":
                    if (e[1] == "left") {
                        this.gear_3 = parseInt(Math.round(100 * this.gear_3) - 2) / 100
                        store.gearRatios[3] = this.gear_3
                    } else {
                        this.gear_3 = parseInt(Math.round(100 * this.gear_3) + 2) / 100
                        store.gearRatios[3] = this.gear_3
                    }
                    break;
                case "4":
                    if (e[1] == "left") {
                        this.gear_4 = parseInt(Math.round(100 * this.gear_4) - 2) / 100
                        store.gearRatios[4] = this.gear_4
                    } else {
                        this.gear_4 = parseInt(Math.round(100 * this.gear_4) + 2) / 100
                        store.gearRatios[4] = this.gear_4
                    }
                    break;
                case "5":
                    if (e[1] == "left") {
                        this.gear_5 = parseInt(Math.round(100 * this.gear_5) - 2) / 100
                        store.gearRatios[5] = this.gear_5
                    } else {
                        this.gear_5 = parseInt(Math.round(100 * this.gear_5) + 2) / 100
                        store.gearRatios[5] = this.gear_5
                    }
                    break;
                case "final":
                    if (e[1] == "left") {
                        this.gear_final = parseInt(Math.round(100 * this.gear_final) - 10) / 100
                        store.gearFinal = this.gear_final
                    } else {
                        this.gear_final = parseInt(Math.round(100 * this.gear_final) + 10) / 100
                        store.gearFinal = this.gear_final
                    }
                    break;
                default:
                    console.log("Unexpected value")
            }
        }
    },
    computed: {

    }
}
</script>
<style scoped lang="scss">
$fg_0: rgb(184, 35, 126);

.form-fixed-multiple-gears {
    border: 1px solid magenta;

    .preset-container {
        display: flex;
        flex-direction: row;
        justify-content: center;

        .preset {
            padding: 2px 4px;
            width: 110px;
            border: 1px solid $fg_0;
            border-radius: 6px;
            font-size: 0.75em;
            margin: 0 3px;
            background: #e0e0e0;

            &:hover {
                background: #fff;
                cursor: pointer;
            }
        }
    }

    .form-group {
        margin-bottom: 0.1rem;
        display: flex;

        h5 {
            text-align: center;
            margin-bottom: 0px;
        }

        label {
            text-align: right;
            margin-top: 0rem;
            margin-bottom: 0.3rem;
            width: 110px;
        }

        input {
            width: 66%;
            margin-left: 10px;
            margin-right: 10px;
        }

        input:disabled {
            color: darkgray;
        }

        span {}

        .arrow {
            width: 0;
            height: 0;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            border-radius: 4px;
            cursor: pointer;
            margin-top: 2px;

            &.disabled {
                pointer-events: none;
            }
        }

        .arrow-right {
            border-left: 14px solid $fg_0;
            margin-right: 5px;

            &.disabled {
                border-left: 14px solid #aaa;
            }
        }

        .arrow-left {
            border-right: 14px solid $fg_0;
            margin-left: 5px;

            &.disabled {
                border-right: 14px solid #aaa;
            }
        }
    }
}
</style>