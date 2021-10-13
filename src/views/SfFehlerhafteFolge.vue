<template>
    <div class="CodesErkennen">
      <router-link to="/">Hauptmenü</router-link> <br> <br>
      Biber Bob entscheidet sich, das Wetter mit folgenden Zeichenfolgen zu kodieren: <br>
        
      
      <div class="kodierungen">
        <div class="erste-reihe-kodierungen" > 
          <div class="codes">
            <div v-for='index in 5' :key='index' id="index">
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
            <div v-for='index in 5' :key='index'>
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
            <div v-for='index in 5' :key='index'>
              <img v-if="numbers[2][index-1] == 0" src="../assets/small-cloud.png" />
              <img v-else-if="numbers[2][index-1] == 1" src="../assets/big-cloud.png" />
              <img v-else src="../assets/empty.png" />
            </div>
          </div>

          <div class="beschreibung">
            <br />Es wird schneien.
          </div>
        </div>

        <div class="vierte-reihe-kodierungen">
          <div class="codes">
            <div v-for='index in 5' :key='index'>
              <img v-if="numbers[3][index-1] == 0" src="../assets/small-cloud.png" />
              <img v-else-if="numbers[3][index-1] == 1" src="../assets/big-cloud.png" />
              <img v-else src="../assets/empty.png" />
            </div>
          </div>

          <div class="beschreibung">
            <br />Es wird hageln.
          </div>
        </div>
      </div>
      
      <br> Als du Bobs Signale angeschaut hast, hast du eines der Rauchzeichen verwechselt und somit ist die untere Zeichenfolge fehlerhaft. Welche Kodierungen von oben könnte damit gemeint sein? <br> <br>

      <div class="zeichenfolge">
        <!--<img v-if="seq_numbers[0][0] == 0" src="../assets/small-cloud.png" />
        <img v-if="seq_numbers[0][0] == 1" src="../assets/big-cloud.png" /> -->

        <div v-for="i in 5" :key="i">
          <img v-if="faulty_array[i-1] == 0" src="../assets/small-cloud.png" />
          <img v-else-if="faulty_array[i-1] == 1" src="../assets/big-cloud.png" />
          <img v-else src="../assets/empty.png" droppable="true" />
        </div>
      </div>

      <p class="antwort">
        <input type="checkbox" id="sonne" value="sonne" v-model="ans_wetter[0]">
        <label for="sonne">Es wird sonnig.</label> <br>
        <input type="checkbox" id="regen" value="regen" v-model="ans_wetter[1]">
        <label for="regen">Es wird regnen.</label> <br>
        <input type="checkbox" id="schnee" value="schnee" v-model="ans_wetter[2]">
        <label for="schnee">Es wird schneien.</label> <br>
        <input type="checkbox" id="hagel" value="hagel" v-model="ans_wetter[3]">
        <label for="hagel">Es wird hageln.</label> <br>
      </p>



      <form @submit.prevent="submitAnswer()">
        <p>
          <button class="btn" @click="submitAnswer()"
            type="button"
          >
          Prüfe Antwort
          </button>
        </p>
      </form>

      <p class="ans" v-if="submitted">Die Antwort ist {{result}}</p>

    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SfErstellen',
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
    }
  },
  created: function(){
    this.createNumbers()
    this.create4thNumberArray()
  },
  methods : {
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
        this.result = "richtig."
      } else {
        this.result = "falsch."
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
      console.log("codes %d und %d unterscheiden sich an 2 stellen", this.code_1, this.code_2)
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
      display: block !important;
    }

    .codes {
      display: flex !important;
      
    }

    .codes div {
      padding: 0 0 0 0 !important;
    }

    .zeichenfolge {
      display: flex !important;
      flex-wrap: wrap;
      padding: 0 0 0 35% !important;
    }


</style>