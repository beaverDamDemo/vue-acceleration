<template lang="html">

  <section class="form-fixed-multiple-gears">
    <h5>Gear ratios</h5>
      <div class="form-group">
        <label for="customRange_0">1st gear</label>
        <input @input='g_0_change($event)' type="range" class="custom-range" min="0.08" max="4" step="0.02" id="customRange_0" v-model="gear_0" :disabled="isDisabled">
        <span v-text="gear_0"></span>
      </div>
      <div class='form-group'>
        <label for="customRange_1">2nd gear</label>
        <input @input='g_1_change($event)' type="range" class="custom-range" min="0.08" max="4" step="0.02" id="customRange_1" v-model="gear_1" :disabled="isDisabled">
        <span v-text="gear_1"></span>
      </div>
      <div class='form-group'>
        <label for="customRange_2">3th gear</label>
        <input @input='g_2_change($event)' type="range" class="custom-range" min="0.08" max="4" step="0.02" id="customRange_2" v-model="gear_2" :disabled="isDisabled">
        <span v-text="gear_2"></span>
      </div>
      <div class='form-group'>
        <label for="customRange_3">4th gear</label>
        <input @input='g_3_change($event)' type="range" class="custom-range" min="0.08" max="4" step="0.02" id="customRange_3" v-model="gear_3" :disabled="isDisabled">
        <span v-text="gear_3"></span>
      </div>
      <div class='form-group'>
        <label for="customRange_4">5th gear</label>
        <input @input='g_4_change($event)' type="range" class="custom-range" min="0.08" max="4" step="0.02" id="customRange_4" v-model="gear_4" :disabled="isDisabled">
        <span v-text="gear_4"></span>
      </div>
      <div class='form-group'>
        <label for="customRange_5">6th gear</label>
        <input @input='g_5_change($event)' type="range" class="custom-range" min="0.08" max="4" step="0.02" id="customRange_5" v-model="gear_5" :disabled="isDisabled">
        <span v-text="gear_5"></span>
      </div>
    </div>
  </section>

</template>

<script lang="js">
  import store from '../store.js'
  export default  {
    name: 'form-fixed-multiple-gears',
    props: [],
    mounted() {
      this.$eventBus.$on('selectMode', (e) => {
          if(e == "oneGear" || e == "topspeedRun") {
            this.isDisabled = true
          } else {
            this.isDisabled = false
          }
        })

      this.gear_0 = store.gearRatios[0]
      this.gear_1 = store.gearRatios[1]
      this.gear_2= store.gearRatios[2]
      this.gear_3= store.gearRatios[3]
      this.gear_4 = store.gearRatios[4]
      this.gear_5 = store.gearRatios[5]
    },
    data() {
      return {
        gear_0: undefined,
        gear_1: undefined,
        gear_2: undefined,
        gear_3: undefined,
        gear_4: undefined,
        gear_5: undefined,
        isDisabled: true
      }
    },
    methods: {
      g_0_change: function(event) {
        if( this.gear_1 >= this.gear_0) {
          this.gear_0 = this.gear_1 + 0.02
          store.gearRatios[0] = this.gear_0
        }
        store.gearRatios[0] = this.gear_0
      },
      g_1_change: function() {
        if( this.gear_2 >= this.gear_1) {
          this.gear_1 = this.gear_2 + 0.02
          store.gearRatios[1] = this.gear_1
        }
        if( this.gear_0 < this.gear_1) {
          this.gear_0 = this.gear_1 - 0.02
          store.gearRatios[0] = this.gear_0
        }
        store.gearRatios[1] = this.gear_1
      },
      g_2_change: function() {
        if( this.gear_3 >= this.gear_2) {
          this.gear_2 = this.gear_3 + 0.02
          store.gearRatios[2] = this.gear_2
        }
        if( this.gear_1 < this.gear_2) {
          this.gear_1 = this.gear_2 - 0.02
          store.gearRatios[1] = this.gear_1
        }
        store.gearRatios[2] = this.gear_2
      },
      g_3_change: function() {
        if( this.gear_4 >= this.gear_3) {
          this.gear_3 = this.gear_4 + 0.02
          store.gearRatios[3] = this.gear_3
        }
        if( this.gear_2 < this.gear_3) {
          this.gear_2 = this.gear_3 - 0.02
          store.gearRatios[2] = this.gear_2
        }
        store.gearRatios[3] = this.gear_3
      },
      g_4_change: function() {
        if( this.gear_5 >= this.gear_4) {
          this.gear_4 = this.gear_5 + 0.02
          store.gearRatios[4] = this.gear_4
        }
        if( this.gear_3 < this.gear_4) {
          this.gear_3 = this.gear_4 - 0.02
          store.gearRatios[3] = this.gear_3
        }
        store.gearRatios[4] = this.gear_4
      },
      g_5_change: function() {
        if( this.gear_4 < this.gear_5) {
          this.gear_4 = this.gear_5 - 0.02
          store.gearRatios[4] = this.gear_4
          // Vue.set(store.gearRatios, 4, newValue)
        }
        store.gearRatios[5] = this.gear_5
      },
    },
    computed: {

    }
}
</script>

<style scoped lang="scss">
  .form-fixed-multiple-gears {
    border: 1px solid magenta;
    .form-group {
      margin-bottom: 0.1rem;
      h5 {
        text-align: center;
        margin-bottom: 0px;
      }
      label {
        text-align: right;
        margin-top: 0.2rem;
      }
      input {
        width: 66%;
        margin-left: 10px;
        margin-right: 10px;
      }
      input:disabled {
        color: darkgray;
      }
      span {

      }
    }
  }
</style>
