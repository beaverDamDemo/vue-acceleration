<template>
  <section class="our-form">
    <div class="form-group">
      <h5>Select Engine</h5>
      <div class="input-group mb-4">
        <select @change="selectEngineChange($event)" class="custom-select" v-model="selectedEngine">
          <option v-for="(e, index) in store.engines" :value="index" :key="'option-engine-' + index">
            {{ e.label }} {{ e.effectiveMaxHp }}
          </option>
        </select>
      </div>
      <h5>Select Car Preset</h5>
      <div class="input-group">
        <select @change="selectCarPresetChange($event)" class="custom-select" v-model="selectedCarPreset">
          <option v-for="(p, index) in store.carPresets" :value="index" :key="`option-car-preset-${index}`">
            {{ p.label }}
          </option>
        </select>
      </div>
    </div>
    <div class="form-group">
      <h5>Car Settings</h5>
      <div class="row">
        <label class="col col-sm-6" for="">Weight KG (WIP missing binding)</label>
        <input v-model="cskg" type="number" step="1" class="form-control form-control-sm col col-sm-6" />
      </div>
      <div class="row">
        <label class="col col-sm-6" for="">Aero Cx (WIP missing binding)</label>
        <input v-model="csac" type="number" step="0.005" class="form-control form-control-sm col col-sm-6" />
      </div>
      <div class="row">
        <label class="col col-sm-6" for="">Rolling Res (WIP missing binding)</label>
        <input v-model="csrr" type="number" step="0.001" class="form-control form-control-sm col col-sm-6" />
      </div>
      <div class="row">
        <label class="col col-sm-6" for="">Maximum acc G (WIP missing binding)</label>
        <input v-model="csmag" type="number" step="0.025" class="form-control form-control-sm col col-sm-6" />
      </div>
      <!-- <div class='row'>
                                                                                    <label class='col col-sm-6' for="">Initial speed km/h</label>
                                                                                    <input v-model="csin" @change="initialSpeedInputChange" type="number"
                                                                                        class="form-control form-control-sm col col-sm-6">
                                                                                </div> -->
    </div>
    <div class="form-group container">
      <h5>Choose Test Settings</h5>
      <div class="row justify-content-center">
        <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
          <div class="justify-content-start text-left">
            <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option0"
              @change="selectMode('oneGear')" />
            <label class="form-check-label" for="gridRadios1">one gear</label>
          </div>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
          <div class="justify-content-start text-left">
            <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option1"
              @change="selectMode('topspeedRun')" />
            <label class="form-check-label" for="gridRadios2">topspeed run</label>
          </div>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
          <div class="justify-content-start text-left">
            <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios3" value="option2"
              @change="selectMode('fixedMultipleGears')" />
            <label class="form-check-label" for="gridRadios3">fixed multiple gears</label>
          </div>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
          <div class="justify-content-start text-left">
            <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios4" value="option3"
              @change="selectMode('allPossibleGears')" />
            <label class="form-check-label" for="gridRadios4">all possible gears</label>
          </div>
        </div>
      </div>
    </div>
    <div class="form-group" v-if="myForm_0_isShown">
      <h5>Select Gearing Options For Single Gear</h5>
      <div class="row">
        <label class="col col-sm-6" for="">Initial speed km/h:</label>
        <input v-model="csin" @change="initialSpeedInputChange" type="number"
          class="form-control form-control-sm col col-sm-6" />
      </div>
      <div class="row">
        <label class="col col-sm-6" for="">Topspeed min</label>
        <input v-model="finalGearMin" @change="finalGearMinChange" type="number"
          class="form-control form-control-sm col col-sm-6" />
      </div>
      <div class="row">
        <label class="col col-sm-6" for="">Topspeed max</label>
        <input v-model="finalGearMax" @change="finalGearMaxChange" type="number"
          class="form-control form-control-sm col col-sm-6" />
      </div>
      <div class="row">
        <label class="col col-sm-6" for="">Splits</label>
        <input v-model="splits" @change="splitsChange" type="number" step="1"
          class="form-control form-control-sm col col-sm-6" />
      </div>
    </div>
    <div class="form-group" v-show="formfixShow">
      <formfix v-show="formfixShow" :selectedMode="selectedMode" />
    </div>
  </section>
</template>
<script lang="js">
import store from '../store.js'
import formfix from './form-fixed-multiple-gears'
import mixin from '../../mixins/mixin.js'
import Vue from 'vue'
export default {
  name: 'our-form',
  components: {
    formfix
  },
  mixins: [mixin],
  data () {
    return {
      store: store,
      finalGearMin: 200,
      finalGearMax: 400,
      splits: 5,
      cskg: undefined,
      csac: undefined,
      csrr: undefined,
      csmag: undefined,
      csin: 100,
      divRpm: 50,
      selectedEngine: undefined,
      selectedCarPreset: undefined,
      myForm_0_isShown: true,
      formfixShow: false,
      selectedMode: undefined,
    }
  },
  mounted () {
    for (let i = 0; i < store.engines.length; i++) {
      this.fillTorqueLookupTable(i)
    }
    console.log("⚛ ~ Vue.version", Vue.version);
    console.log("setting default engine and preset and mode.")

    const localStorageMode = localStorage.selectedMode || undefined

    this.selectMode(localStorageMode)
    localStorage.setItem('selectedMode', localStorageMode)

    if (localStorage.getItem('selectedEngine')) {
      this.selectEngineChange(parseInt(localStorage.getItem('selectedEngine')))
    } else {
      this.selectEngineChange(4)
    }

    if (localStorage.getItem('selectedCarPreset')) {
      this.selectCarPresetChange(parseInt(localStorage.getItem('selectedCarPreset')))
    } else {
      this.selectCarPresetChange(1)
    }
  },

  methods: {
    initialSpeedInputChange (e) {
      this.$eventBus.$emit("initialSpeedInputChange", this.csin)
    },
    finalGearMinChange (e) {
      this.$eventBus.$emit("finalGearMinChange", this.finalGearMin)
    },
    finalGearMaxChange (e) {
      this.$eventBus.$emit("finalGearMaxChange", this.finalGearMax)
    },
    splitsChange (e) {
      this.$eventBus.$emit("splitsChange", this.splits)
    },
    selectEngineChange (e) {
      if (typeof (e) == "object") {
        this.selectedEngine = e.target.value
        this.store.selectedEngine = e.target.value
        if (store.engines[this.selectedEngine].powerLookupTable.length == 0) {
          this.fillTorqueLookupTable(this.selectedEngine)
        }
        this.$eventBus.$emit('selectEngineChange', e.target.value)
        localStorage.setItem('selectedEngine', e.target.value)
      } else if (typeof (e) == "number") {
        this.selectedEngine = e
        this.store.selectedEngine = e
        if (store.engines[this.selectedEngine].powerLookupTable.length == 0) {
          this.fillTorqueLookupTable(this.selectedEngine)
        }
        this.$eventBus.$emit('selectEngineChange', e)
        localStorage.setItem('selectedEngine', e)
      }
    },
    selectCarPresetChange (e) {
      if (typeof (e) == "object") {
        this.selectedCarPreset = e.target.value
        this.$eventBus.$emit('selectCarPresetChange', e.target.value)
        this.cskg = store.carPresets[e.target.value].weightKg
        this.csac = store.carPresets[e.target.value].aeroCx
        this.csrr = store.carPresets[e.target.value].rollingRes
        this.csmag = store.carPresets[e.target.value].maximumAccG
        this.store.weightKg = this.cskg
        this.store.aeroCx = this.csac
        this.store.rollingRes = this.csrr
        this.store.maximumAccG = this.csmag
        this.store.selectedCarPreset = e.target.value
        localStorage.setItem('selectedCarPreset', e.target.value)
      } else if (typeof (e) == "number") {
        this.selectedCarPreset = e
        this.$eventBus.$emit('selectCarPresetChange', 0)
        this.cskg = store.carPresets[e].weightKg
        this.csac = store.carPresets[e].aeroCx
        this.csrr = store.carPresets[e].rollingRes
        this.csmag = store.carPresets[e].maximumAccG
        this.store.weightKg = this.cskg
        this.store.aeroCx = this.csac
        this.store.rollingRes = this.csrr
        this.store.maximumAccG = this.csmag
        this.store.selectedCarPreset = e
        localStorage.setItem('selectedCarPreset', e)
      }
    },

    selectMode (e) {
      let radiobutton = undefined
      if (e == "oneGear") {
        this.myForm_0_isShown = true
        this.formfixShow = false
        radiobutton = document.getElementById("gridRadios1")
      } else if (e == "topspeedRun") {
        this.myForm_0_isShown = true
        this.formfixShow = false
        radiobutton = document.getElementById("gridRadios2")
      } else if (e == "fixedMultipleGears") {
        this.myForm_0_isShown = false
        this.formfixShow = true
        radiobutton = document.getElementById("gridRadios3")
      } else {
        this.myForm_0_isShown = false
        this.formfixShow = false
        radiobutton = document.getElementById("gridRadios4")
      }
      radiobutton.checked = true
      localStorage.setItem('selectedMode', e)
      this.$emit("onModeChanged", e)
      this.selectedMode = e
    },
  },
  watch: {
    cskg: function (val) {
      this.store.weightKg = val
    },
    csac: function (val) {
      this.store.aeroCx = val
    },
    csrr: function (val) {
      this.store.rollingRes = val
    },
    csmag: function (val) {
      this.store.maximumAccG = val
    },
  }
}
</script>
<style scoped>
.our-form {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

.our-form .form-group h5 {
  text-align: center;
}

.our-form .form-group input:disabled {
  color: darkgray;
}

.our-form .form-group .form-check label {
  margin-top: 0px;
}

.form-initial-speed {
  display: flex;
  flex-direction: row;
}

.form-initial-speed input {
  /* margin-left: 5px; */
  /* width: 160px; */
}
</style>