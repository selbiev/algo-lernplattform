<template>
    <div class="CodesErkennen">
      <Verifier 
        :correctSolution="this.result == 'korrekt.'"
        v-if="this.submitted" 
        :tip="this.hint()"
        @close-verifier="this.submitted = false" />

      <Header 
        :diff_level="'mittel'" 
        :task_name="'Kodierung Fehler korrigieren'" 
        :task_name_code="'SfFehlerhafteFolge'"
        :task_number="'4'" 
        :picture="'rauchzeichen'"
        :has_diff_levels="false"
        :has_leicht="false"
        :has_mittel="false"
        :has_schwer="false"
        :next_task="'SfAbstaende_mittel'"/> <br><br>
      Biber Bob entscheidet sich, das Wetter mit folgenden Zeichenfolgen zu kodieren: <br><br> 
        
      
      <table class="code_table">
        <tr> 
          <td>
            <div class="codes">
              <div v-for='index in 5' :key='index' id="index">
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
            <div v-for='index in 5' :key='index'>
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

        <tr>
          <td>
            <div class="codes">
              <div v-for='index in 5' :key='index'>
                <img v-if="numbers[2][index-1] == 0" src="../assets/small-cloud.png" />
                <img v-else-if="numbers[2][index-1] == 1" src="../assets/big-cloud.png" />
                <img v-else src="../assets/empty.png" />
              </div>
            </div>
          </td>
          <td>
            Es wird schneien.
          </td>
        </tr>

        <tr>
          <td>
            <div class="codes">
              <div v-for='index in 5' :key='index'>
                <img v-if="numbers[3][index-1] == 0" src="../assets/small-cloud.png" />
                <img v-else-if="numbers[3][index-1] == 1" src="../assets/big-cloud.png" />
                <img v-else src="../assets/empty.png" />
              </div>
            </div>
          </td>
          <td>
            Es wird hageln.
          </td>
        </tr>
      </table>
      
      <br> Bei folgender Zeichenfolge ist ein Fehler aufgetreten. Eine Wolke wurde falsch gelesen. <br> Kannst du trotzdem herausfinden, welches Wetter Bob voraussagt? Eine oder zwei Antworten möglich.<br><br>
      
      <div class="zeichenfolge">
        <!--<img v-if="seq_numbers[0][0] == 0" src="../assets/small-cloud.png" />
        <img v-if="seq_numbers[0][0] == 1" src="../assets/big-cloud.png" /> -->

        <div v-for="i in 5" :key="i">
          <img v-if="faulty_array[i-1] == 0" src="../assets/small-cloud.png" />
          <img v-else-if="faulty_array[i-1] == 1" src="../assets/big-cloud.png" />
          <img v-else src="../assets/empty.png" droppable="true" />
        </div>
      </div>

      <br>
      <button id="btn_0" class="antwort_btn" @click="ans_0()">
        Es wird sonnig.
      </button> <br>
      <button id="btn_1" class="antwort_btn" @click="ans_1()">
        Es wird regnen.
      </button> <br>
      <button id="btn_2" class="antwort_btn" @click="ans_2()">
        Es wird schneien.
      </button> <br>
      <button id="btn_3" class="antwort_btn" @click="ans_3()">
        Es wird hageln.
      </button>

      <br><br>
      <Footer
        @next_task="reloadPage()"
        @check_answer="submitAnswer()"
        @reset="''"
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
  components: {
    Header,
    Footer,
    Verifier
  },
  data() {
    return {
      numbers: [] as number[][],
      submitted: false as boolean,
      result: "falsch.",
      faulty_array: [] as number[],
      code_1: 0,
      code_2: 0,
      pos_1: 0,
      pos_2: 0,
      ans_wetter: [false,false,false,false] as boolean[],
      hinweis: "",
      correct_number_of_answers: false,
    }
  },
  created: function(){
    this.createNumbers()
    this.create4thNumberArray()
  },
  methods : {
    reloadPage(){
      this.$router.go(0)
    },
    hint(){
      if(!this.correct_number_of_answers){
        return "Du hast " + this.hinweis + " Kästchen ausgewählt."
      }
    },
    ans_0(){
      if(this.ans_wetter[0]){
        this.ans_wetter[0] = false
        document.getElementById("btn_0")!.style.backgroundColor = "#ffe5b2"
        document.getElementById("btn_0")!.style.borderWidth="thin"
        document.getElementById("btn_0")!.style.fontWeight="400"
      } else {
        this.ans_wetter[0] = true
        document.getElementById("btn_0")!.style.backgroundColor = "#e1975a"
        document.getElementById("btn_0")!.style.borderWidth="medium"
        document.getElementById("btn_0")!.style.fontWeight="700"
      }
    },
    ans_1(){
      if(this.ans_wetter[1]){
        this.ans_wetter[1] = false
        document.getElementById("btn_1")!.style.backgroundColor = "#ffe5b2"
        document.getElementById("btn_1")!.style.borderWidth="thin"
        document.getElementById("btn_1")!.style.fontWeight="400"
      } else {
        this.ans_wetter[1] = true
        document.getElementById("btn_1")!.style.backgroundColor = "#e1975a"
        document.getElementById("btn_1")!.style.borderWidth="medium"
        document.getElementById("btn_1")!.style.fontWeight="700"
      }
    },
    ans_2(){
      if(this.ans_wetter[2]){
        this.ans_wetter[2] = false
        document.getElementById("btn_2")!.style.backgroundColor = "#ffe5b2"
        document.getElementById("btn_2")!.style.borderWidth="thin"
        document.getElementById("btn_2")!.style.fontWeight="400"
      } else {
        this.ans_wetter[2] = true
        document.getElementById("btn_2")!.style.backgroundColor = "#e1975a"
        document.getElementById("btn_2")!.style.borderWidth="medium"
        document.getElementById("btn_2")!.style.fontWeight="700"
      }
    },
    ans_3(){
      if(this.ans_wetter[3]){
        this.ans_wetter[3] = false
        document.getElementById("btn_3")!.style.backgroundColor = "#ffe5b2"
        document.getElementById("btn_3")!.style.borderWidth="thin"
        document.getElementById("btn_3")!.style.fontWeight="400"
      } else {
        this.ans_wetter[3] = true
        document.getElementById("btn_3")!.style.backgroundColor = "#e1975a"
        document.getElementById("btn_3")!.style.borderWidth="medium"
        document.getElementById("btn_3")!.style.fontWeight="700"
      }
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
      } else {
        return 3;
      }
    },
    get_numbers_from_ans_wetter(){
      var arr = []
      for(let i = 0; i < this.ans_wetter.length; i++){
        if(this.ans_wetter[i]){
          arr.push(i)
        }
      }
      return arr
    },
    sort_arr(arr: number[]){
      //precondition: length(arr) € {1,2}
      if(arr.length<=1){
        return arr
      } else{
        var sorted_arr = []
        if(arr[0] > arr[1]){
          sorted_arr.push(arr[1])
          sorted_arr.push(arr[0])
        } else {
          sorted_arr.push(arr[0])
          sorted_arr.push(arr[1])
        }
        return sorted_arr
      }
      
    },
    compare_arrays(arr1: number[], arr2: number[]){   //returns true if arr1 is same as arr2, false otherwise
      if(arr1.length != arr2.length){
        return false;
      } else{
        arr1 = this.sort_arr(arr1)
        arr2 = this.sort_arr(arr2)
        var all_good = true;
        for(let i = 0; i < arr1.length; i++){
          all_good = all_good && (arr1[i]==arr2[i])     //of each element of arr1 and arr2 is the same, then all_good will stay true
        }
        return all_good
      }
    },
    
    checkAnswer(){
      var ausgew_antworten = this.get_numbers_from_ans_wetter()
      var richtige_antworten = [this.code_1,this.code_2]

      var correct = this.compare_arrays(ausgew_antworten,richtige_antworten)

      if(correct){
        this.result = "korrekt."
      } else {
        this.result = "falsch."
      }

      if(ausgew_antworten.length > richtige_antworten.length){
        this.correct_number_of_answers = false
        this.hinweis = "zu viele"
      } else if(richtige_antworten.length > ausgew_antworten.length){
        this.correct_number_of_answers = false
        this.hinweis = "zu wenige"
      } else {
        this.correct_number_of_answers = true
      }
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
      var mindestAbstand = 3

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
        new_array_o = []
        for(let i = 0; i < 3; i++){
          let new_array = []
          for(let i = 0; i < 5; i++){
            new_array.push(Math.round(Math.random()))
          }
          new_array_o.push(new_array)
        }
        this.numbers = new_array_o
      } while(!(this.no_duplicates()));
    },
    create4thNumberArray(){
      var idx_of_seq_to_replace = Math.floor((Math.random()*3))   //wähle zufällige stelle s \in {0,1,2}
      this.numbers.push(this.copyArray(this.numbers[idx_of_seq_to_replace]))      //füge am ende von this.numbers den s-ten array aus this.numbers an
      
      //mache 2 stellen k und l sodass k != l. an diesen stellen vertauschen wir die bits, sodass sich
      //this.numbers[k] und this.numbers[l] an 2 stellen unterscheiden.
      var k = Math.floor((Math.random()*5))
      var l = Math.floor((Math.random()*5))
      while(k == l){    //wichtig, dass k nicht gleich l ist
        var l = Math.floor((Math.random()*5))
      }

      this.numbers[3][k] = (this.numbers[idx_of_seq_to_replace][k] == 1)? 0 : 1   //if in numbers[idx...] == 1, then 0 else 1 
      this.faulty_array = this.copyArray(this.numbers[3])
      this.numbers[3][l] = (this.numbers[idx_of_seq_to_replace][l] == 1)? 0 : 1

      //jetzt haben wir zwei codes (nämlich numbers[idx_of_....] und numbers[3]), die sich an 2 stellen unterscheiden

      this.code_1 = idx_of_seq_to_replace
      this.code_2 = 3
      this.pos_1 = k
      this.pos_2 = l

      this.shuffleNumbers()

      console.log("k: %d;   l: %d", k, l)
      console.log("codes %d und %d unterscheiden sich an 2 stellen", this.code_1+1, this.code_2+1)
      console.log(this.numbers)
      console.log(this.faulty_array)
    },
    shuffleNumbers(){
      //ziel: code_1 und code_2 beide an zufällige positionen s und t (s != t) verschieben
      //das stellt sicher, dass die zielcodes nicht immer an denselben stellen sind
      var tmp_arr_0 = this.copyArray(this.numbers[0])
      var tmp_arr_1 = this.copyArray(this.numbers[1])
      var tmp_arr_2 = this.copyArray(this.numbers[2])
      var tmp_arr_3 = this.copyArray(this.numbers[3])
      
      var permuted_positions = this.permutation()
      this.code_1 = permuted_positions[this.code_1]   //update code_1 gem. permutation
      this.code_2 = permuted_positions[this.code_2]   //update code_2 gem. permutation

      this.numbers = []
      this.numbers[permuted_positions[0]] = tmp_arr_0
      this.numbers[permuted_positions[1]] = tmp_arr_1
      this.numbers[permuted_positions[2]] = tmp_arr_2
      this.numbers[permuted_positions[3]] = tmp_arr_3
    },
    permutation(){
      var current_positions = [0,1,2,3]
      var first = Math.floor((Math.random()*4))
      var second = Math.floor((Math.random()*4))
      while(first == second){
        second = Math.floor((Math.random()*4))
      }
      var third = Math.floor((Math.random()*4))
      while(third == first || third == second){
        third = Math.floor((Math.random()*4))
      }
      var fourth = Math.floor((Math.random()*4))
      while(fourth == first || fourth == second || fourth == third){
        fourth = Math.floor((Math.random()*4))
      }
      current_positions[0] = first
      current_positions[1] = second
      current_positions[2] = third
      current_positions[3] = fourth

      console.log("permutation start")
      console.log(current_positions)
      console.log("permutation finish")
      return current_positions
    },
    copyArray(arr1: number[]){
      var newArr = []
      for(let i = 0; i < arr1.length; i++){
        newArr[i] = arr1[i]
      }
      return newArr
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
      flex-wrap: wrap;
    }

    .code_table{
      margin-left: auto;
      margin-right: auto;
    }

    td, th {
      padding: 0 0 0 25px;
      text-align: left;
    }

    .antwort_btn {
      margin: 0 5px 5px 0;
      width: 150px;
      height: 30px;
      border-radius: 3px;
      border-width: thin;
      background-color: #ffe5b2;
      font-weight: 500;
      cursor: pointer;
    }


</style>