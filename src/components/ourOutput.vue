<template>
  <section class="our-output">
    <div v-if="store.love.length > 0">
      <h1>Results for single gear</h1>
      <div v-for="(l, index) in store.love" :key="`store-love-${index}`">
        &nbsp;gear length: {{ l[0] }} km/h, max reached rpm: {{ l[1] }} rpm, max
        reached speed: {{ l[2] }} km/h, covered distance: {{ l[4] }} m, time
        needed: {{ l[6] }}&nbsp;
      </div>
      <div class="detailedTextContainer">
        <div v-for="(singleRun, index) of store.tanja" :key="`tanja-${index}`" class="detailedText">
          <div class="detailedText">
            <span>speed</span>
            <span>dist.</span>
            <span>time</span>
            <span>dist. inc.</span>
            <span>rpm</span>
          </div>
          <div v-for="(entry, innerIndex) of singleRun" :key="`singleRun-${innerIndex}`">
            <span v-for="(span, innerMostIndex) of entry" :key="`span-${innerMostIndex}`">
              <span v-if="innerMostIndex == 3">
                {{ span | decimalsShortenFilter }}
              </span>
              <span v-else>
                {{ span }}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="store.tanja.length > 0">
      <h1>Results for multiple gears</h1>
      <div class="shortText">
        <div v-for="(entry, index) of store.resultsFixedMultipleGears" :key="`resultsFixedMultipleGears-${index}`">
          <h5 style="display: flex">
            <span>Result n. {{ index }}</span>
            <span style="flex-grow: 1"></span>
            <span style="font-size: 0.625em; text-align: right; cursor: pointer">
              <button @click="deleteResult(index)">❌</button>
            </span>
          </h5>
          <div v-for="(o, innerIndex) in Object.entries(entry)" :key="`object-${innerIndex}`">
            <span>{{ o[0] }}: </span>
            <span>
              <span v-if="Array.isArray(o[1])">
                <div v-for="(a, innerMostIndex) of o[1]" :key="`div-array-${innerMostIndex}`">
                  {{ a | decimalsShortenFilter }}
                </div>
              </span>
              <span v-else>{{ o[1] }}</span>
            </span>
          </div>
        </div>
      </div>
      <div class="detailedText detailedText-multiple-gears header">
        <span>speed</span>
        <span>dist.</span>
        <span>time</span>
        <span>dist. inc.</span>
        <span>rpm</span>
        <span>gear</span>
      </div>
      <div class="detailedText detailedText-multiple-gears main">
        <!-- <div
          v-for="(entry, index) of store.tanja[0]"
          :key="`singleRun-tanja-${index}`"
        >
          <span
            v-for="(span, innerMostIndex) of entry"
            :key="`span-tanja-${innerMostIndex}`"
          >
            <span v-if="innerMostIndex == 3">
              {{ span | decimalsShortenFilter }}
            </span>
            <span v-else-if="innerMostIndex == 5">
              {{ span + 1 }}
            </span>
            <span v-else>
              {{ span }}
            </span>
          </span>
        </div> -->
      </div>
    </div>
    <div v-else>
      <h4>
        <i>Use the <strong>Run</strong> button to populate results.</i>
      </h4>
    </div>
  </section>
</template>

<script lang="js">
import store from '../store.js'
import { nextTick } from 'process'

export default {
  name: 'our-output',
  data () {
    return {
      store: store,
    }
  },
  created () {
    this.$eventBus.$on('calculationDone', (mode) => {
      console.log("Calculation done ⚛ ~ mode", mode);

      let i = 0
      let upto_100_check = true
      let upto_150_check = true
      let upto_200_check = true

      while (i < this.store.tanja[0].length) {
        // console.log("⚛ ~ this.store.resultsFixedMultipleGears[i]", this.store.tanja[0][i]);

        if (upto_100_check && this.store.tanja[0][i][0] >= 100) {
          // console.log(`%c⚛ currentSpeed: ${this.store.tanja[0][i][0]} km/h; t= ${this.store.tanja[0][i][2]} s`, "background: midnightblue; color: white; font-weight: bold;");
          // console.log(`%c⚛ distance: ${this.store.tanja[0][i][1]} power: ${Math.round(this.store.tanja[0][i][3])} rpm: ${this.store.tanja[0][i][4]} gear: ${this.store.tanja[0][i][5] + 1}`, "background: midnightblue; color: white; font-weight: normal;");
          upto_100_check = false
        } else if (upto_150_check && this.store.tanja[0][i][0] >= 150) {
          // console.log(`%c⚛ currentSpeed: ${this.store.tanja[0][i][0]} km/h; t= ${this.store.tanja[0][i][2]} s`, "background: black; color: wheat; font-weight: bold;");
          // console.log(`%c⚛ distance: ${this.store.tanja[0][i][1]} power: ${Math.round(this.store.tanja[0][i][3])} rpm: ${this.store.tanja[0][i][4]} gear: ${this.store.tanja[0][i][5] + 1}`, "background: black; color: wheat; font-weight: normal;");
          upto_150_check = false
        } else if (upto_200_check && this.store.tanja[0][i][0] >= 200) {
          // console.log(`%c⚛ currentSpeed: ${this.store.tanja[0][i][0]} km/h; t= ${this.store.tanja[0][i][2]} s`, "background: purple; color: lightcyan; font-weight: bold;");
          // console.log(`%c⚛ distance: ${this.store.tanja[0][i][1]} power: ${Math.round(this.store.tanja[0][i][3])} rpm: ${this.store.tanja[0][i][4]} gear: ${this.store.tanja[0][i][5] + 1}`, "background: purple; color: lightcyan; font-weight: normal;");
          upto_200_check = false
          break
        } else {
          i++
        }
      }
    })
  },
  methods: {
    populateTable () {
      nextTick(() => {
        let i = 0;

        tanja(30, 5, 0);

        function tanja (min, tanjaLevel, n) {
          var answerIsInRange = false;
          var firstNumber;
          var secoundNumber;
          var ourMaxValue = Math.floor(min / 5) * 10;
          let count = 0;
          switch (tanjaLevel) {
            case 1:
              ourMaxValue = 10;
              while (answerIsInRange == false) {
                count++;
                if (count > 100) break;
                firstNumber = 2 + Math.round(Math.random() * 8);
                secoundNumber = Math.round(Math.random() * 10);
                if (firstNumber >= secoundNumber && (firstNumber - secoundNumber <= ourMaxValue) && (firstNumber - secoundNumber >= 0)) {
                  answerIsInRange = true;
                }
              }
              break;
            case 2:
              ourMaxValue = 20;
              while (answerIsInRange == false) {
                count++;
                if (count > 100) break;
                firstNumber = 15 + Math.round(Math.random() * 5);
                secoundNumber = Math.round(Math.random() * 10);
                if (firstNumber >= secoundNumber && (firstNumber - secoundNumber <= ourMaxValue) && (firstNumber - secoundNumber >= 10)) {
                  answerIsInRange = true;
                }
              }
              break;
            case 3:
              ourMaxValue = 20;
              while (answerIsInRange == false) {
                count++;
                if (count > 100) break;
                firstNumber = 20 + Math.round(Math.random() * 10);
                secoundNumber = Math.round(Math.random() * 20);
                if (firstNumber >= secoundNumber && (firstNumber - secoundNumber <= ourMaxValue) && (firstNumber - secoundNumber >= 10)) {
                  answerIsInRange = true;
                }
              }
              break;
            case 4:
              ourMaxValue = 30;
              while (answerIsInRange == false) {
                count++;
                if (count > 100) break;
                firstNumber = 25 + Math.round(Math.random() * 15);
                secoundNumber = Math.round(Math.random() * 20);
                if (firstNumber >= secoundNumber && (firstNumber - secoundNumber <= ourMaxValue) && (firstNumber - secoundNumber >= 20)) {
                  answerIsInRange = true;
                }
              }
              break;
            case 5:
              ourMaxValue = 30;
              while (answerIsInRange == false) {
                count++;
                if (count > 100) break;
                firstNumber = 35 + Math.round(Math.random() * 15);
                secoundNumber = 5 + Math.round(Math.random() * 25);
                if (firstNumber >= secoundNumber && (firstNumber - secoundNumber <= ourMaxValue) && (firstNumber - secoundNumber >= 20)) {
                  answerIsInRange = true;
                }
              }
              break;
            case 6:
              ourMaxValue = 40;
              while (answerIsInRange == false) {
                count++;
                if (count > 100) break;
                firstNumber = 40 + Math.round(Math.random() * 20);
                secoundNumber = Math.round(Math.random() * 30);
                if (firstNumber >= secoundNumber && (firstNumber - secoundNumber <= ourMaxValue) && (firstNumber - secoundNumber >= 30)) {
                  answerIsInRange = true;
                }
              }
              break;
            case 7:
              ourMaxValue = 40;
              while (answerIsInRange == false) {
                count++;
                if (count > 100) break;
                firstNumber = 45 + Math.round(Math.random() * 25);
                secoundNumber = 5 + Math.round(Math.random() * 35);
                if (firstNumber >= secoundNumber && (firstNumber - secoundNumber <= ourMaxValue) && (firstNumber - secoundNumber >= 30)) {
                  answerIsInRange = true;
                }
              }
              break;
            case 8:
              ourMaxValue = 50;
              while (answerIsInRange == false) {
                count++;
                if (count > 100) break;
                firstNumber = 50 + Math.round(Math.random() * 30);
                secoundNumber = Math.round(Math.random() * 40);
                if (firstNumber >= secoundNumber && (firstNumber - secoundNumber <= ourMaxValue) && (firstNumber - secoundNumber >= 40)) {
                  answerIsInRange = true;
                }
              }
              break;
            case 9:
              ourMaxValue = 50;
              while (answerIsInRange == false) {
                count++;
                if (count > 100) break;
                firstNumber = 55 + Math.round(Math.random() * 35);
                secoundNumber = 5 + Math.round(Math.random() * 45);
                if (firstNumber >= secoundNumber && (firstNumber - secoundNumber <= ourMaxValue) && (firstNumber - secoundNumber >= 40)) {
                  answerIsInRange = true;
                }
              }
              break;
            case 10:
              ourMaxValue = 60;
              while (answerIsInRange == false) {
                count++;
                if (count > 100) break;
                firstNumber = 60 + Math.round(Math.random() * 40);
                secoundNumber = Math.round(Math.random() * 50);
                if (firstNumber >= secoundNumber && (firstNumber - secoundNumber <= ourMaxValue) && (firstNumber - secoundNumber >= 50)) {
                  answerIsInRange = true;
                }
              }
              break;
            default:
              console.log("Unexpected value")
          }
          console.log("count: ", count, firstNumber, secoundNumber, 'result: ', firstNumber - secoundNumber)
          results[tanjaLevel][n] += 1;
        }
      })
    },
    deleteResult (index) {
      this.store.resultsFixedMultipleGears.splice(index, 1)
    }
  }
}
</script>

<style scoped>
.detailedTextContainer {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

h1 {
  margin: 0 1rem 0rem 1rem;
}

.detailedTextContainer > div {
  margin: 0 1rem 1rem 1rem;
}

.detailedText {
  max-height: 650px;
  overflow-y: scroll;
}

.detailedText > div > span {
  display: inline-block;
  text-align: right;
  padding: 0 2px;
}

.detailedText > div > span:nth-child(1),
.detailedText > span:nth-child(1) {
  background-color: rgb(1, 83, 151);
  color: rgb(253, 67, 68);
  width: 4em;
}

.detailedText > div > span:nth-child(2),
.detailedText > span:nth-child(2) {
  background-color: rgb(242, 90, 16);
  color: rgb(102, 20, 200);
  width: 3em;
}

.detailedText > div > span:nth-child(3),
.detailedText > span:nth-child(3) {
  background-color: rgb(1, 83, 151);
  color: rgb(253, 67, 68);
  width: 3em;
}

.detailedText > div > span:nth-child(4),
.detailedText > span:nth-child(4) {
  background-color: rgb(242, 90, 16);
  color: rgb(102, 20, 200);
  width: 12em;
}

.detailedText > div > span:nth-child(5),
.detailedText > span:nth-child(5) {
  background-color: rgb(1, 83, 151);
  color: rgb(253, 67, 68);
  width: 3em;
}

.detailedText > div > span:nth-child(6),
.detailedText > span:nth-child(6) {
  background-color: rgb(242, 90, 16);
  color: rgb(102, 20, 200);
  width: 3em;
}

.detailedText.detailedText-multiple-gears.header span,
.detailedText.detailedText-multiple-gears.main span {
  display: inline-block;
  text-align: right;
  padding: 0 2px;
}

.detailedText.detailedText-multiple-gears.header > span:nth-child(1),
.detailedText.detailedText-multiple-gears.main > span:nth-child(1) {
  background-color: rgb(1, 83, 151);
  color: rgb(253, 67, 68);
  width: 4em;
}

.detailedText.detailedText-multiple-gears.header > span:nth-child(2),
.detailedText.detailedText-multiple-gears.main > span:nth-child(2) {
  background-color: rgb(242, 90, 16);
  color: rgb(102, 20, 200);
  width: 3em;
}

.detailedText.detailedText-multiple-gears.header > span:nth-child(3),
.detailedText.detailedText-multiple-gears.main > span:nth-child(3) {
  background-color: rgb(1, 83, 151);
  color: rgb(253, 67, 68);
  width: 3em;
}

.detailedText.detailedText-multiple-gears.header > span:nth-child(4),
.detailedText.detailedText-multiple-gears.main > span:nth-child(4) {
  background-color: rgb(242, 90, 16);
  color: rgb(102, 20, 200);
  width: 12em;
}

.detailedText.detailedText-multiple-gears.header > span:nth-child(5),
.detailedText.detailedText-multiple-gears.main > span:nth-child(5) {
  background-color: rgb(1, 83, 151);
  color: rgb(253, 67, 68);
  width: 3em;
}

.detailedText.detailedText-multiple-gears.header > span:nth-child(6),
.detailedText.detailedText-multiple-gears.main > span:nth-child(6) {
  background-color: rgb(242, 90, 16);
  color: rgb(102, 20, 200);
  width: 3em;
}

.shortText {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.shortText h5 {
  text-align: center;
}

.shortText > div {
  margin: 0.5rem 1.5rem;
  padding: 0.25rem;
  background: #222;
  border-radius: 0.25rem;
}

.shortText > div > div {
  display: flex;
}

.shortText > div > div > span:nth-child(1) {
  text-align: right;
  display: inline-block;
  min-width: 170px;
}

.shortText > div > div > span:nth-child(2) {
  text-align: right;
  display: inline-block;
  min-width: 90px;
}
</style>