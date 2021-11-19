<template>
  <div class="CodesErstellen">
    <Tutorial 
        :video_name="'SfErstellen'"
        :description="task_description()"
        v-if="showTutorial == 'true'"
        @close-tutorial="showTutorial = 'false'" />

    <Verifier 
        :correctSolution="this.result == 'korrekt.'"
        v-if="this.submitted" 
        :tip="''"
        @close-verifier="this.submitted = false" />
        
    <Header 
        :diff_level="'leicht'" 
        :task_name="'Kodierung erstellen'" 
        :task_name_code="'SfErstellen'"
        :task_number="'6'" 
        :picture="'rauchzeichen'"
        :has_diff_levels="true"
        :has_leicht="true"
        :has_mittel="true"
        :has_schwer="true"
        :next_task="'SfErstellen_mittel'"/> <br><br>
      Erstelle für das Wetter eine Kodierung, sodass es zwischen den beiden Kodierungen ein Abstand von mindestens {{abstand}} gibt.
       <br> <br>
       Klicke auf eine Rauchwolke, um ihre Grösse zu verändern.
       <br> <br>
       
        <!-- Automatisierte Version, man muss einfach den css noch anpassen -->
        
      
      <table class="code_table">
        <tr> 
          <td>
            <div class="codes">
              <div v-for='index in 5' :key='index' id="index" @click="toggleNumber(0,index-1)">
                <img v-if="numbers[0][index-1] == 0" src="../assets/small-cloud.png" />
                <img v-else-if="numbers[0][index-1] == 1" src="../assets/big-cloud.png" />
                <img v-else src="../assets/empty.png" />
              </div>
            </div>
          </td>
          <td>
            Es wird sonnig.
          </td>
        </tr>

        <tr>
          <td>
            <div class="codes">
            <div v-for='index in 5' :key='index' @click="toggleNumber(1,index-1)">
              <img v-if="numbers[1][index-1] == 0" src="../assets/small-cloud.png" />
              <img v-else-if="numbers[1][index-1] == 1" src="../assets/big-cloud.png" />
              <img v-else src="../assets/empty.png" />
            </div>
          </div>
          </td>
          <td>
            Es wird regnen.
          </td>
        </tr>
      </table>

      <p style="display:none" id="hint1">Abstand zwischen den beiden Codes: {{abstand_0_1}}</p>

      <br v-if="!submitted">
      <Footer
        @next_task="reloadPage()"
        @check_answer="submitAnswer()"
        @reset="reloadPage()"
        @info="showTutorial = 'true'" />

    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from "../components/Header.vue"
import Footer from "../components/Footer.vue"
import Verifier from "../components/Verifier.vue"
import Tutorial from "../components/Tutorial.vue"

export default defineComponent({
  name: 'SfErstellen',
  components: {
    Header,
    Footer,
    Verifier,
    Tutorial
  },
  data() {
    return {
      showTutorial: false,
      numbers: [] as number[][],
      anz_tage: 3,
      seq_numbers: [] as number[][],
      number_set: [] as boolean[][],
      number_seq_set: [] as boolean[][],
      abstand: 2, //einziger unterschied zur schwierigen version
      zahl_1: 0,
      zahl_2: 0,
      zahl_3: 0,
      prop_1: 0,
      prop_2: 0,
      prop_3: 0,
      submitted: false as boolean,
      result: "falsch.",
      abstand_0_1: 0,
      abstand_1_2: 0,
      abstand_0_2: 0,
    }
  },
  created: function(){
    this.createNumbers()
  },
  props: {
    msg: String
  },
  methods : {
    reloadPage(){
      this.$router.go(0)
    },
    submitAnswer(){
      this.submitted = true
      this.checkAnswer()
    },
    toggleNumber(i: number, j: number){
      if(this.numbers[i][j]==0){
        this.numbers[i][j] = 1
      } else {
        this.numbers[i][j] = 0
      }
    },
    translate_code(str: string){
      if(str == "Es wird sonnig."){
        return 1
      } else if(str == "Es wird regnen."){
        return 2
      } else {
        return 3;
      }
    },
    checkAnswer(){
      let k = 0
      let j = 1
      this.abstand_0_1 = 0
      for(let i = 0; i < 5; i++){
        if(this.numbers[k][i] != this.numbers[j][i]){
          this.abstand_0_1++
        }
      }

      if(this.abstand_0_1 >= this.abstand){
        this.result = "korrekt."
      }
      else {
        this.result = "falsch."
      }

      document.getElementById("hint1")!.style.display = "block"

      if(this.abstand_0_1>=this.abstand){
        document.getElementById("hint1")!.style.color = "green"
      } else {
        document.getElementById("hint1")!.style.color = "red"
      }
    },

    no_duplicates(){
      //dieses programm checkt, ob doppelte codes existieren und gibt true false aus, wenn es keine gibt
      //fine_1 ist true, wenn code 1 und 2 sich an mind. einer stelle unterscheiden
      //fine_2 ist true, wenn code 1 und 3 sich an mind. einer stelle unterscheiden
      //fine_3 ist true, wenn code 2 und 3 sich an mind. einer stelle unterscheiden
      let fine_1 = false
      for(let i = 0; i < 5; i++){
        fine_1 = fine_1 || (this.numbers[0][i] != this.numbers[1][i])
      }

      let fine_2 = false
      for(let i = 0; i < 5; i++){
        fine_2 = fine_2 || (this.numbers[0][i] != this.numbers[2][i])
      }

      let fine_3 = false
      for(let i = 0; i < 5; i++){
        fine_3 = fine_3 || (this.numbers[1][i] != this.numbers[2][i])
      }

      return fine_1 && fine_2 && fine_3
    },
    
    createNumbers(){
      //zuerst wollen wir das array "numbers" befüllen
      let new_array_o: number[][]
      new_array_o = []
      for(let i = 0; i < 3; i++){
        let new_array = []
        for(let i = 0; i < 5; i++){
          //new_array.push(Math.round(Math.random()))
          new_array.push(0)
        }
        new_array_o.push(new_array)
      }
      this.numbers = new_array_o
    },
    task_description(){
      return "Erstelle 2 Codes, indem du auf die Wolken klickst. Achte darauf, dass zwischen den beiden Kodierungen ein Abstand "+
      "von mindestens 2 existiert. Das bedeutet, die beiden Kodierungen müssen sich an mindestens 2 Stellen unterscheiden."
    }
  }
});
</script>
<style scoped>
    .CodesErstellen{
        background-color: #FFE5B2;
        padding: 20px 20px 20px 20px;
        height: auto;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    }

    img {
      width: auto;
      height: 50px;
    }

    .kodierungen {
      /*background-color: #7CC7FF;*/
      
    }

    .kodierungen div {
      /*align-content: left;
      align-items: left;
      text-align: left;*/
      display: flex;
      padding: 10px 0 0 17%;
    }

    .beschreibung {
      text-align: start;
      padding: 10px 0 0 15px !important;
    }

    input, select {
      padding: 12px 20px;
      margin: 8px 5px 0 0;
      box-sizing: border-box;
      text-align: center;
    }

    .auswahl_tag {
      display: block !important;
    }

    .auswahl {
      display: flex !important;
      padding: 3px 3px 3px 25%;
    }

    .codes {
      display: flex !important;
      cursor: pointer;
    }

    .codes div {
      padding: 0 0 0 0 !important;
    }

    .zeichenfolge {
      display: flex !important;
      flex-wrap: wrap;
      padding: 0 0 0 10% !important;
    }

    .code_table{
      margin-left: auto;
      margin-right: auto;
    }

    td, th {
      padding: 0 0 0 25px;
      text-align: left;
    }

</style>
