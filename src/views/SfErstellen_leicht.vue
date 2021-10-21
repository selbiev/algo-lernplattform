<template>
  <div class="CodesErstellen">
    <router-link to="/">Hauptmenü</router-link> <br> <br>
    <button @click="reloadPage()">Neue Aufgabe</button> <br> <br>
      Erstelle für jedes Wetter eine Kodierung, sodass es zwischen jedem Paar von Kodierungen ein Abstand von mindestens {{abstand}} Stellen gibt.
      
        <!-- Automatisierte Version, man muss einfach den css noch anpassen -->
        
      
      <div class="kodierungen">
        <div class="erste-reihe-kodierungen" >
          <div class="codes">
            <div v-for='index in 5' :key='index' id="index" @click="toggleNumber(0,index-1)">
              <img v-if="numbers[0][index-1] == 0" src="../assets/small-cloud.png" />
              <img v-else-if="numbers[0][index-1] == 1" src="../assets/big-cloud.png" />
              <img v-else src="../assets/empty.png" />
            </div>
          </div>

          <div class="beschreibung">
            <br />Es wird sonnig.
          </div>
          
        </div>

        <div class="zweite-reihe-kodierungen">
          <div class="codes">
            <div v-for='index in 5' :key='index' @click="toggleNumber(1,index-1)">
              <img v-if="numbers[1][index-1] == 0" src="../assets/small-cloud.png" />
              <img v-else-if="numbers[1][index-1] == 1" src="../assets/big-cloud.png" />
              <img v-else src="../assets/empty.png" />
            </div>
          </div>

          <div class="beschreibung">
            <br />Es wird regnen.
          </div>
        </div>

        <div class="dritte-reihe-kodierungen">
          <div class="codes">
            <div v-for='index in 5' :key='index' @click="toggleNumber(2,index-1)">
              <img v-if="numbers[2][index-1] == 0" src="../assets/small-cloud.png" />
              <img v-else-if="numbers[2][index-1] == 1" src="../assets/big-cloud.png" />
              <img v-else src="../assets/empty.png" />
            </div>
          </div>

          <div class="beschreibung">
            <br />Es wird schneien.
          </div>
        </div>
      </div>
      
      
      

      <form @submit.prevent="submitAnswer() ">
        <!-- <input v-model="prop_1" type="number" />
        <input v-model="prop_2" type="number" />
        <input v-model="prop_3" type="number" />
        -->
        <p>
          <button @click="submitAnswer()"
            type="button"
          >
          Prüfe Antwort
          </button>
        </p>
      </form>

      <p v-if="submitted">Die Antwort ist {{result}}</p>

    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SfErstellen',
  components: {
    
  },
  data() {
    return {
      numbers: [] as number[][],
      anz_tage: 3,
      seq_numbers: [] as number[][],
      number_set: [] as boolean[][],
      number_seq_set: [] as boolean[][],
      abstand: 2,
      zahl_1: 0,
      zahl_2: 0,
      zahl_3: 0,
      prop_1: 0,
      prop_2: 0,
      prop_3: 0,
      submitted: false as boolean,
      result: "falsch.",
      selected_1: "",
      selected_2: "",
      selected_3: ""
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
      let abstand_0_1 = 0
      for(let i = 0; i < 5; i++){
        if(this.numbers[k][i] != this.numbers[j][i]){
          abstand_0_1++
        }
      }

      k = 1
      j = 2
      let abstand_1_2 = 0
      for(let i = 0; i < 5; i++){
        if(this.numbers[k][i] != this.numbers[j][i]){
          abstand_1_2++
        }
      }

      k = 0
      j = 2
      let abstand_0_2 = 0
      for(let i = 0; i < 5; i++){
        if(this.numbers[k][i] != this.numbers[j][i]){
          abstand_0_2++
        }
      }
      if(abstand_0_1 >= this.abstand && abstand_1_2 >= this.abstand && abstand_0_2 >= this.abstand){
        this.result = "korrekt."
      }
      else {
        this.result = "falsch."
      }
      //console.log("abstände sind: 0 und 1: %d, 1 und 2: %d, 0 und 2: %d", abstand_0_1, abstand_1_2, abstand_0_2)
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
    }
  }
});
</script>
<style scoped>
    .CodesErstellen{
        background-color: #FFE5B2;
        padding: 20px 20px 20px 20px;
        width: 85%;
        height: auto;
        border-color: black;
        border-width: 5px;
        border-style: solid;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
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
      padding: 0 0 0 15px !important;
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

</style>
