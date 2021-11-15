<template>
    <div class="CodesErkennen">
      <Verifier 
        :correctSolution="this.result == 'korrekt.'"
        :tip="''"
        v-if="this.submitted" 
        @close-verifier="this.submitted = false" />

      <Header 
        :diff_level="'leicht'" 
        :task_name="'Kodierung erkennen'" 
        :task_name_code="'SfErkennen'"
        :task_number="'1'" 
        :picture="'rauchzeichen'"
        :has_diff_levels="true"
        :has_leicht="true"
        :has_mittel="false"
        :has_schwer="true"
        :next_task="'SfErkennen_schwer'"
        @messageFromChild="childMessageReceived"/> <br><br>
      Biber Bob entscheidet sich, das Wetter mit folgenden Rauchzeichen zu kodieren: <br> <br>
        
      <table class="code_table">
        <tr> 
          <td>
            <div class="codes">
              <div v-for='index in 4' :key='index' id="index">
                <img v-if="numbers[0][index-1] == 0 && number_set[0][index-1]" src="../assets/small-cloud.png" />
                <img v-else-if="numbers[0][index-1] == 1 && number_set[0][index-1]" src="../assets/big-cloud.png" />
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
            <div v-for='index in 4' :key='index'>
              <img v-if="numbers[1][index-1] == 0 && number_set[1][index-1]" src="../assets/small-cloud.png" />
              <img v-else-if="numbers[1][index-1] == 1 && number_set[1][index-1]" src="../assets/big-cloud.png" />
              <img v-else src="../assets/empty.png" />
            </div>
          </div>
          </td>
          <td>
            Es wird regnen.
          </td>
        </tr>

        <tr>
          <td>
            <div class="codes">
              <div v-for='index in 4' :key='index'>
                <img v-if="numbers[2][index-1] == 0 && number_set[2][index-1]" src="../assets/small-cloud.png" />
                <img v-else-if="numbers[2][index-1] == 1 && number_set[2][index-1]" src="../assets/big-cloud.png" />
                <img v-else src="../assets/empty.png" />
              </div>
            </div>
          </td>
          <td>
            Es wird schneien.
          </td>
        </tr>
      </table>
      
      <br> Um das Wetter für morgen vorauszusagen, sendet Bob die folgenden Zeichen. Wie wird das Wetter morgen? <br> <br>

      <div class="zeichenfolge">
        <!--<img v-if="seq_numbers[0][0] == 0" src="../assets/small-cloud.png" />
        <img v-if="seq_numbers[0][0] == 1" src="../assets/big-cloud.png" /> -->

        <div v-for="i in 4" :key="i">
          <img v-if="seq_numbers[0][i-1] == 0 && number_seq_set[0][i-1]" src="../assets/small-cloud.png" />
          <img v-else-if="seq_numbers[0][i-1] == 1 && number_seq_set[0][i-1]" src="../assets/big-cloud.png" />
          <img v-else src="../assets/empty.png" droppable="true" />
        </div>
      </div>

      <div class="auswahl">

        <div class="auswahl_tag">
          <label for="dd_tag_1"></label>
          <select id="dd_tag_1" v-model="selected_1">
            <option disabled value="">Wähle aus...</option>
            <option>Es wird sonnig.</option>
            <option>Es wird regnen.</option>
            <option>Es wird schneien.</option>
          </select>
        </div>
      </div>
      <br> 
      <Footer
        @next_task="reloadPage()"
        @check_answer="submitAnswer()"
        @reset="reloadPage()"
        @info="''" />

    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from "../components/Header.vue"
import Footer from "../components/Footer.vue"
import Verifier from "../components/Verifier.vue"

export default defineComponent({
  name: 'SfErstellen',
  data() {
    return {
      numbers: [] as number[][],
      anz_tage: 3,
      seq_numbers: [] as number[][],
      number_set: [] as boolean[][],
      number_seq_set: [] as boolean[][],
      zahl_1: 0,
      prop_1: -1,
      submitted: false as boolean,
      result: "falsch.",
      selected_1: "",
      selected_2: "",
      selected_3: ""
    }
  },
  components: {
    Header,
    Footer,
    Verifier
  },
  created: function(){
    this.createNumbers()
    this.createRandomSequence()
  },
  methods : {
    reloadPage(){
      this.$router.go(0)
    },
    childMessageReceived(arg1:any){
      console.log(arg1)
    },
    submitAnswer(){
      this.submitted = true
      this.checkAnswer()
    },
    translate_code(str: string){
      if(str == "Es wird sonnig."){
        return 1
      } else if(str == "Es wird regnen."){
        return 2
      } else if(str == "Es wird schneien.") {
        return 3;
      } else {
        return -1;
      }
    },
    checkAnswer(){
      this.prop_1 = this.translate_code(this.selected_1)
      if(this.zahl_1===this.prop_1){
        this.result = "korrekt."
      } else{
        this.result = "falsch."
      }
      console.log("zahl_1: %d", this.zahl_1)
      console.log("prop_1: %d", this.prop_1)
      console.log(this.numbers)
      console.log(this.seq_numbers)
    },

    checkAbstand(arr1: number[], arr2: number[]){
      let countAbstand = 0
      for(let i = 0; i < 5; i++){
        if((arr1[i] != arr2[i])){
          countAbstand ++
        }
      }
      return countAbstand
    },
    no_duplicates(){
      //diese methode checkt, ob der abstand zwischen 2 codes mind. mindestAbstand ist, in dem fall return es true, sonst false
      //fine_1 ist true, wenn code 1 und 2 sich an mind. mindestAbstand stelle unterscheiden
      //fine_2 ist true, wenn code 1 und 3 sich an mind. mindestAbstand stelle unterscheiden
      //fine_3 ist true, wenn code 2 und 3 sich an mind. mindestAbstand stelle unterscheiden
      var mindestAbstand = 1

      let fine_1 = false
      let fine_2 = false
      let fine_3 = false
      
      if(this.checkAbstand(this.numbers[0],this.numbers[1]) >= mindestAbstand){
        fine_1 = true
      }

      if(this.checkAbstand(this.numbers[0],this.numbers[2]) >= mindestAbstand){
        fine_2 = true
      }

      if(this.checkAbstand(this.numbers[1],this.numbers[2]) >= mindestAbstand){
        fine_3 = true
      }

      return fine_1 && fine_2 && fine_3
    },
    
    createNumbers(){
      //zuerst wollen wir das array "numbers" befüllen
      let new_array_o: number[][]
      do {          //solange die codes nicht verschieden sind, wiederhole folgendes
        console.log('duplikat gefunden, codes neu generiert')
        console.log(this.numbers)
        new_array_o = []
        for(let i = 0; i < 3; i++){
          let new_array = []
          for(let i = 0; i < 4; i++){
            new_array.push(Math.round(Math.random()))
          }
          new_array_o.push(new_array)
        }
        this.numbers = new_array_o
      } while(!(this.no_duplicates()));
      
      //jetzt das array number_set, das sagt aus, ob eine zahl/eine stelle 
      //in den kodierungen bekannt ist oder nicht (für lückentext)
      let new_array_s: boolean[][] = []
      for(let i = 0; i < 3; i++){
        let new_array_ss = []
        for(let i = 0; i < 4; i++){
          new_array_ss.push(true)
        }
        new_array_s.push(new_array_ss)
      }
      this.number_set = new_array_s
      
      //jetzt das array number_seq_set, das sagt aus, ob eine zahl/eine stelle 
      //in den sequenzen/zeichenfolge bekannt ist oder nicht (für lückentext)
      let new_array_s_s: boolean[][] = []
      for(let i = 0; i < 3; i++){
        let new_array_ss_s = []
        for(let i = 0; i < 4; i++){
          new_array_ss_s.push(true)
        }
        new_array_s_s.push(new_array_ss_s)
      }
      this.number_seq_set = new_array_s_s
      //this.number_seq_set[0][0] = false
    },
    createRandomSequence(){
      this.zahl_1 = Math.floor(1+(Math.random()*3))
      this.seq_numbers.push(this.numbers[this.zahl_1-1])
      console.log("zahl_1: %d", this.zahl_1)
    }
  }
});
</script>


<style scoped>
    .CodesErkennen{
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
      background-color: #f1f1f1;
      border-radius: 5px;
    }

    .auswahl_tag {
      display: block !important;
    }

    .auswahl {
      display: block !important;
    }

    .codes {
      display: flex !important;
      
    }

    .codes div {
      padding: 0 0 0 0 !important;
    }

    .zeichenfolge {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .code_table{
      margin-left: auto;
      margin-right: auto;
    }

    td, th {
      padding: 0 0 0 25px;
      text-align: left;
    }

    /*img:hover {
  animation: shake 0.5s;
  animation-iteration-count: 1s;
}

@keyframes shake {
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
}*/

</style>