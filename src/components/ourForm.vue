<template>
  <section class="our-form">
    <div class="form-group">
      <h5>Select Engine</h5>
      <div class="input-group mb-4">
        <select @change="seChange($event)" class="custom-select">
          <option
            v-for="(e, index) in store.engines"
            :value="index"
            :key="'option-engine-' + index"
          >
            {{ e.label }} {{ e.effectiveMaxHp }}
          </option>
        </select>
      </div>
      <h5>Select Car Preset</h5>
      <div class="input-group">
        <select @change="scpChange($event)" class="custom-select">
          <option selected value="0">Viper fully-upgraded</option>
          <option value="1">Viper base</option>
          <option value="2">Fiat OM 50</option>
        </select>
      </div>
    </div>
    <div class="form-group">
      <h5>Car Settings</h5>
      <div class="row">
        <label class="col col-sm-6" for="">Weight KG</label>
        <input
          v-model="cskg"
          type="number"
          step="1"
          class="form-control form-control-sm col col-sm-6"
        />
      </div>
      <div class="row">
        <label class="col col-sm-6" for="">Aero Cx</label>
        <input
          v-model="csac"
          type="number"
          step="0.005"
          class="form-control form-control-sm col col-sm-6"
        />
      </div>
      <div class="row">
        <label class="col col-sm-6" for="">Rolling Res</label>
        <input
          v-model="csrr"
          type="number"
          step="0.001"
          class="form-control form-control-sm col col-sm-6"
        />
      </div>
      <div class="row">
        <label class="col col-sm-6" for="">Maximum acc G</label>
        <input
          v-model="csmag"
          type="number"
          step="0.025"
          class="form-control form-control-sm col col-sm-6"
        />
      </div>
      <!-- <div class='row'>
                <label class='col col-sm-6' for="finalGearInput">Final gear km/h</label>
                <input v-model='finalGear' @change='finalGearInputChange' id='finalGearInput' type="number" step=5
                    class="form-control form-control-sm col col-sm-6">
            </div> -->
      <!-- <div class='row'>
                <label class='col col-sm-6' for="">Initial speed km/h</label>
                <input v-model="csin" @change="initialSpeedInputChange" type="number"
                    class="form-control form-control-sm col col-sm-6">
            </div> -->
    </div>
    <div class="form-group">
      <h5>Choose Test Settings</h5>
      <div class="row form-check">
        <input
          class="form-check-input"
          type="radio"
          name="gridRadios"
          id="gridRadios1"
          value="option0"
          checked
          @change="selectMode('oneGear')"
        />
        <label class="form-check-label" for="gridRadios1">one gear</label>
      </div>
      <div class="row form-check">
        <input
          class="form-check-input"
          type="radio"
          name="gridRadios"
          id="gridRadios2"
          value="option1"
          @change="selectMode('topspeedRun')"
        />
        <label class="form-check-label" for="gridRadios2">topspeed run</label>
      </div>
      <div class="row form-check">
        <input
          class="form-check-input"
          type="radio"
          name="gridRadios"
          id="gridRadios3"
          value="option2"
          @change="selectMode('fixedMultipleGears')"
        />
        <label class="form-check-label" for="gridRadios3"
          >fixed multiple gears</label
        >
      </div>
      <div class="row form-check">
        <input
          class="form-check-input"
          type="radio"
          name="gridRadios"
          id="gridRadios4"
          value="option3"
          @change="selectMode('allPossibleGears')"
        />
        <label class="form-check-label" for="gridRadios4"
          >all possible gears</label
        >
      </div>
      <div class="form-check form-initial-speed">
        <span for="">Initial speed km/h: </span>
        <input
          v-model="csin"
          @change="initialSpeedInputChange"
          type="number"
          class="form-control form-control-sm"
        />
      </div>
    </div>
    <div class="form-group" v-if="myForm_0_isShown">
      <h5>Select Gearing Options For Single Gear</h5>
      <div class="row">
        <label class="col col-sm-6" for="">Topspeed min</label>
        <input
          v-model="finalGearMin"
          @change="finalGearMinChange"
          type="number"
          class="form-control form-control-sm col col-sm-6"
        />
      </div>
      <div class="row">
        <label class="col col-sm-6" for="">Topspeed max</label>
        <input
          v-model="finalGearMax"
          @change="finalGearMaxChange"
          type="number"
          class="form-control form-control-sm col col-sm-6"
        />
      </div>
      <div class="row">
        <label class="col col-sm-6" for="">Splits</label>
        <input
          v-model="splits"
          @change="splitsChange"
          type="number"
          step="1"
          class="form-control form-control-sm col col-sm-6"
        />
      </div>
    </div>
    <div class="form-group" v-show="formfixShow">
      <formfix v-show="formfixShow" />
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
            // finalGear: 290,
            finalGearMin: 200,
            finalGearMax: 400,
            splits: 5,
            cskg: 1184,
            csac: 0.35,
            csrr: 0.015,
            csmag: 0.95,
            csin: 100,
            divRpm: 50,
            selectedEngine: 0,
            myForm_0_isShown: true,
            formfixShow: false,
        }
    },
    mounted () {
        for (let i = 0; i < store.engines.length; i++) {
            this.fillTorqueLookupTable(i)
        }
        console.log("⚛ ~ Vue.version", Vue.version);
    },

    methods: {
        // finalGearInputChange (e) {
        //     this.$eventBus.$emit("finalGearInputChange", this.finalGear)
        // },
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
        seChange (e) {
            this.selectedEngine = event.target.value
            if (store.engines[this.selectedEngine].powerLookupTable.length == 0) {
                this.fillTorqueLookupTable(this.selectedEngine)
            }
            this.$eventBus.$emit('seChange', event.target.value)
        },
        scpChange (e) {
            this.$eventBus.$emit('scpChange', event.target.value)
            switch (event.target.value) {
                case '0':
                    this.cskg = 1184
                    this.csac = 0.35
                    this.csrr = 0.015
                    this.csmag = 0.95
                    break;
                case '1':
                    this.cskg = 1628
                    this.csac = 0.35
                    this.csrr = 0.012
                    this.csmag = 0.825
                    break;
                default:
                    ;
            }
        },
        selectMode (e) {
            if (e == "oneGear" || e == "topspeedRun") {
                this.myForm_0_isShown = true
                this.formfixShow = false
            } else if (e == "fixedMultipleGears") {
                this.myForm_0_isShown = false
                this.formfixShow = true
            } else {
                this.myForm_0_isShown = false
                this.formfixShow = false
            }
            this.$eventBus.$emit("selectMode", e)
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

.our-form .row {
  margin-right: 8px;
}

.our-form .form-group {
  width: 600px;
}

.our-form .form-group h5 {
  text-align: center;
  margin-bottom: 14px;
}

.our-form .form-group label {
  text-align: right;
  margin-top: 0.5rem;
}

.our-form .form-group input:disabled {
  color: darkgray;
}

.our-form .form-group .form-check {
  margin-left: 196px;
}

.our-form .form-group .form-check label {
  margin-top: 0px;
}

.our-form .form-group .form-check:nth-of-type(4) label {
  margin-bottom: 8px;
}

.form-initial-speed {
  display: flex;
  flex-direction: row;
}

.form-initial-speed input {
  margin-left: 5px;
  width: 160px;
}
</style>