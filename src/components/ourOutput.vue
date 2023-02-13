<template>
  <section class="our-output">
    <div v-if="store.love.length > 0">
      <h1>Results</h1>
      <table>
        <div v-for='(l, index) in store.love' :key="`store-love-${index}`">&nbsp;gear length: {{ l[0]}} km/h,
          max reached rpm: {{ l[1]}} rpm,
          max reached speed: {{ l[2]}} km/h,
          covered distance: {{ l[4]}} m,
          time needed: {{ l[6] }}&nbsp;</div>
      </table>
    </div>
    <div v-else>
      <h4><i>Use the <strong>Run</strong> button to populate results.</i></h4>
    </div>
  </section>
</template>

<script lang="js">
import store from '../store.js'

export default {
  name: 'our-output',
  props: {

  },
  data () {
    return {
      store: store
    }
  },
  mounted () {
    // this.$eventBus.$on("calculationDone", (e)=>{

    // })
    // let i=0;
    // $('table').append("<tr id='tab-"+i+"'></tr>");
    // $('table tr#tab-'+i).append("<td>"+i+"</td>")
    // for(let j=1; j<11; j++) {
    //   $('table tr#tab-'+i).append("<td>"+j+"</td>")
    // }
    // for( let i=1; i<11; i++) {
    //   $('table').append("<tr id='tab-"+i+"'></tr>");
    //   $('table tr#tab-'+i).append("<td>"+i+"</td>")
    //   for(let j=1; j<11; j++) {
    //     $('table tr#tab-'+i).append("<td class='td-"+j+"'>0</td>")
    //   }
    // }

    // let results = [[]];
    // for( let a=0; a<10; a++) {
    //   for(let b=0; b<10; b++) {
    //     results[a].push('0');
    //     // $('table .td-'+b).text('corre');
    //   }
    // }

    // tanja(30, 5, 0);


    // function tanja(min, tanjaLevel, n) {
    //   var answerIsInRange = false;
    //   var answer;
    //   var firstNumber;
    //   var secoundNumber;
    //   var ourMaxValue = Math.floor(min/5)*10;
    //   let count = 0;
    //   switch(tanjaLevel) {
    //     case 1:
    //       ourMaxValue = 10;
    //       while ( answerIsInRange == false ) {
    //         count++;
    //         if( count > 100 ) break;
    //         firstNumber = 2 + Math.round(Math.random()*8);
    //         secoundNumber = Math.round(Math.random()*10);
    //         if( firstNumber >= secoundNumber && ( firstNumber-secoundNumber <= ourMaxValue) && (firstNumber-secoundNumber >= 0)) {
    //           answerIsInRange = true;
    //         }
    //       }
    //       break;
    //     case 2:
    //       ourMaxValue = 20;
    //       while ( answerIsInRange == false ) {
    //         count++;
    //         if( count > 100 ) break;
    //         firstNumber = 15 + Math.round(Math.random()*5);
    //         secoundNumber = Math.round(Math.random()*10);
    //         if( firstNumber >= secoundNumber && ( firstNumber-secoundNumber <= ourMaxValue) && (firstNumber-secoundNumber >= 10)) {
    //           answerIsInRange = true;
    //         }
    //       }
    //       break;
    //     case 3:
    //       ourMaxValue = 20;
    //       while ( answerIsInRange == false ) {
    //         count++;
    //         if( count > 100 ) break;
    //         firstNumber = 20 + Math.round(Math.random()*10);
    //         secoundNumber = Math.round(Math.random()*20);
    //         if( firstNumber >= secoundNumber && ( firstNumber-secoundNumber <= ourMaxValue) && (firstNumber-secoundNumber >= 10)) {
    //           answerIsInRange = true;
    //         }
    //       }
    //       break;
    //     case 4:
    //       ourMaxValue = 30;
    //       while ( answerIsInRange == false ) {
    //         count++;
    //         if( count > 100 ) break;
    //         firstNumber = 25 + Math.round(Math.random()*15);
    //         secoundNumber = Math.round(Math.random()*20);
    //         if( firstNumber >= secoundNumber && ( firstNumber-secoundNumber <= ourMaxValue) && (firstNumber-secoundNumber >= 20)) {
    //           answerIsInRange = true;
    //         }
    //       }
    //       break;
    //     case 5:
    //       ourMaxValue = 30;
    //       while ( answerIsInRange == false ) {
    //         count++;
    //         if( count > 100 ) break;
    //         firstNumber = 35 + Math.round(Math.random()*15);
    //         secoundNumber = 5 + Math.round(Math.random()*25);
    //         if( firstNumber >= secoundNumber && ( firstNumber-secoundNumber <= ourMaxValue) && (firstNumber-secoundNumber >= 20)) {
    //           answerIsInRange = true;
    //         }
    //       }
    //       break;
    //     case 6:
    //       ourMaxValue = 40;
    //       while ( answerIsInRange == false ) {
    //         count++;
    //         if( count > 100 ) break;
    //         firstNumber = 40 + Math.round(Math.random()*20);
    //         secoundNumber = Math.round(Math.random()*30);
    //         if( firstNumber >= secoundNumber && ( firstNumber-secoundNumber <= ourMaxValue) && (firstNumber-secoundNumber >= 30)) {
    //           answerIsInRange = true;
    //         }
    //       }
    //       break;
    //     case 7:
    //       ourMaxValue = 40;
    //       while ( answerIsInRange == false ) {
    //         count++;
    //         if( count > 100 ) break;
    //         firstNumber = 45 + Math.round(Math.random()*25);
    //         secoundNumber = 5 + Math.round(Math.random()*35);
    //         if( firstNumber >= secoundNumber && ( firstNumber-secoundNumber <= ourMaxValue) && (firstNumber-secoundNumber >= 30)) {
    //           answerIsInRange = true;
    //         }
    //       }
    //       break;
    //     case 8:
    //       ourMaxValue = 50;
    //       while ( answerIsInRange == false ) {
    //         count++;
    //         if( count > 100 ) break;
    //         firstNumber = 50 + Math.round(Math.random()*30);
    //         secoundNumber = Math.round(Math.random()*40);
    //         if( firstNumber >= secoundNumber && ( firstNumber-secoundNumber <= ourMaxValue) && (firstNumber-secoundNumber >= 40)) {
    //           answerIsInRange = true;
    //         }
    //       }
    //       break;
    //     case 9:
    //       ourMaxValue = 50;
    //       while ( answerIsInRange == false ) {
    //         count++;
    //         if( count > 100 ) break;
    //         firstNumber = 55 + Math.round(Math.random()*35);
    //         secoundNumber = 5 + Math.round(Math.random()*45);
    //         if( firstNumber >= secoundNumber && ( firstNumber-secoundNumber <= ourMaxValue) && (firstNumber-secoundNumber >= 40)) {
    //           answerIsInRange = true;
    //         }
    //       }
    //       break;
    //     case 10:
    //       ourMaxValue = 60;
    //       while ( answerIsInRange == false ) {
    //         count++;
    //         if( count > 100 ) break;
    //         firstNumber = 60 + Math.round(Math.random()*40);
    //         secoundNumber = Math.round(Math.random()*50);
    //         if( firstNumber >= secoundNumber && ( firstNumber-secoundNumber <= ourMaxValue) && (firstNumber-secoundNumber >= 50)) {
    //           answerIsInRange = true;
    //         }
    //       }
    //       break;
    //     default:
    //       console.log("Unexpected value")
    //   }

    //   console.log("count: ", count, firstNumber, secoundNumber, 'result: ', firstNumber-secoundNumber)

    //   results[tanjaLevel][n] += 1;
    //   var question = firstNumber + " - " + secoundNumber;
    // }
  }
}
</script>

<style scoped>
table {
  text-align: left;
}

td {
  height: 50px;
  width: 100px;
  border-top: 1px dashed #888;
  border-left: 1px dashed #888;
  font-style: italic;
}

tr:nth-child(1),
td:nth-child(1) {
  background: #444;
  font-style: normal;
  color: #faa;
}

</style>
