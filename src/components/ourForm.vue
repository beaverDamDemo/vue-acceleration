<template lang="html">
  <section class="our-form">
      <div class="form-group">
        <div class='row'>
          <label class='col col-sm-6' for="">Weight KG</label>
          <input type="number" step=100 class="form-control form-control-sm col col-sm-6" value=1184 disabled readonly>
        </div>
        <div class='row'>
          <label class='col col-sm-6' for="">Aero Cx</label>
          <input type="number" step=0.005 class="form-control form-control-sm col col-sm-6" value=0.35 disabled readonly>
        </div>
        <div class='row'>
          <label class='col col-sm-6' for="">Rolling Res</label>
          <input type="number" step=0.001 class="form-control form-control-sm col col-sm-6" value=0.015 disabled readonly>
        </div>
        <div class='row'>
          <label class='col col-sm-6' for="">Maximum acc G</label>
          <input type="number" step=0.025 class="form-control form-control-sm col col-sm-6" value=0.95 disabled readonly>
        </div>
        <div class='row'>
          <label class='col col-sm-6' for="finalGearInput">Final gear km/h</label>
          <input v-model='finalGear' @change='finalGearInputChange' id='finalGearInput' type="number" step=5 class="form-control form-control-sm col col-sm-6" disabled readonly>
        </div>
        <div class='row'>
          <label class='col col-sm-6' for="">Initial speed km/h</label>
          <input type="number" class="form-control form-control-sm col col-sm-6" disabled readonly>
        </div>

        <div class='row form-check'>
          <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option0" checked>
          <label class="form-check-label" for="gridRadios1">one gear</label>
        </div>
        <div class='row form-check'>
          <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" disabled>
          <label class="form-check-label" for="gridRadios1">fixed multiple gears</label>
        </div>
        <div class='row form-check'>
          <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option2" disabled>
          <label class="form-check-label" for="gridRadios1">all possible gears</label>
        </div>

        <div class='row'>
          <label class='col col-sm-6' for="">Topspeed min</label>
          <input v-model="finalGearMin" @change='finalGearMinChange' type="number" class="form-control form-control-sm col col-sm-6">
        </div>
        <div class='row'>
          <label class='col col-sm-6' for="">Topspeed max</label>
          <input v-model="finalGearMax" @change='finalGearMaxChange' type="number" class="form-control form-control-sm col col-sm-6">
        </div>
        <div class='row'>
          <label class='col col-sm-6' for="">Splits</label>
          <input v-model="splits" @change='splitsChange' type="number" step='1' class="form-control form-control-sm col col-sm-6">
        </div>

      </div>
    <details>
      <img src="../../public/Capture.png" alt="" width='460'>
    </details>
  </section>
</template>

<script lang="js">
  import vue from 'vue';
  export default  {
    name: 'our-form',
    data() {
      return {
        finalGear: 290,
        finalGearMin: 200,
        finalGearMax: 340,
        splits: 5
      }
    },
    created() {

    },
    methods: {
      finalGearInputChange(e) {
        this.$eventBus.$emit("finalGearInputChange", this.finalGear)
      },
      finalGearMinChange(e) {
        this.$eventBus.$emit("finalGearMinChange", this.finalGearMin)
      },
      finalGearMaxChange(e) {
        this.$eventBus.$emit("finalGearMaxChange", this.finalGearMax)
      },
      splitsChange(e) {
        this.$eventBus.$emit("splitsChange", this.splits)
      }
    }
}
</script>

<style scoped lang="scss">
.our-form {
  .form-group {
    width: 400px;
    label {
      text-align: right;
      margin-top: .5rem;
    }
    input:disabled {
      color: darkgray;
    }
  }
}
details {
  height: 320px;
  width: 460px;
  position: absolute;
  right: 0;
  top: 0;
}
</style>
