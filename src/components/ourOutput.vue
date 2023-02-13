<template>
  <section class="our-output">
    <div v-if="store.love.length > 0">
      <h1>Results</h1>
      <div v-for='(l, index) in store.love' :key="`store-love-${index}`">&nbsp;gear length: {{ l[0]}} km/h,
        max reached rpm: {{ l[1]}} rpm,
        max reached speed: {{ l[2]}} km/h,
        covered distance: {{ l[4]}} m,
        time needed: {{ l[6] }}&nbsp;</div>
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
                {{ span | decimalsShortenFilter}}
              </span>
              <span v-else>
                {{ span }}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <h4><i>Use the <strong>Run</strong> button to populate results.</i></h4>
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
      console.log("⚛ ~ mode", mode);

      // this.populateTable()

    })
  },
  filters: {

  },
  methods: {
    populateTable () {
      nextTick(() => {
        let i = 0;
        // document.querySelector('table').insertAdjacentHTML("beforeend", "<tr id='tab-" + i + "'></tr>");

        // document.querySelector('table tr#tab-' + i).insertAdjacentHTML("beforeend", "<td>" + i + "</td>")
        // for (let j = 1; j < 11; j++) {
        //   document.querySelector('table tr#tab-' + i).insertAdjacentHTML("beforeend", "<td>" + j + "</td>")
        // }
        // for (let i = 1; i < 11; i++) {
        //   document.querySelector('table').insertAdjacentHTML("beforeend", "<tr id='tab-" + i + "'></tr>");
        //   document.querySelector('table tr#tab-' + i).insertAdjacentHTML("beforeend", "<td>" + i + "</td>")
        //   for (let j = 1; j < 11; j++) {
        //     document.querySelector('table tr#tab-' + i).insertAdjacentHTML("beforeend", "<td class='td-" + j + "'>0</td>")
        //   }
        // }

        let results = [[]];
        for (let a = 0; a < 10; a++) {
          results[a].push([]);
          for (let b = 0; b < 10; b++) {
            results[a].push([]);
          }
        }

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
</style>
