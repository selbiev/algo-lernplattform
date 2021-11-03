<template>
    <div class="CodesAbstaende">
      <router-link to="/">Hauptmenü</router-link> <br> <br>
      <button @click="reloadPage()">Neue Aufgabe</button> <br> <br>
      Betrachten wir uns mal zwei Kodierungen. Sie unterscheiden sich an 2 Stellen, die je mit einem Pfeil markiert sind. <br>
        <!-- Automatisierte Version, man muss einfach den css noch anpassen -->
        
      
      <div class="kodierungen">
        <div class="erste-reihe-kodierungen" >
          <div class="codes">
            <div>
              <img src="../assets/big-cloud.png" />
              <img src="../assets/big-cloud.png" />
              <img src="../assets/small-cloud.png" />
              <img src="../assets/big-cloud.png" />
              <img src="../assets/small-cloud.png" />
            </div>
          </div>

          <div class="beschreibung">
          </div>
          
        </div>

        <div class="zweite-reihe-kodierungen">
          <div class="codes">
            <div>
              <img src="../assets/big-cloud.png" />
              <img src="../assets/small-cloud.png" />
              <img src="../assets/small-cloud.png" />
              <img src="../assets/big-cloud.png" />
              <img src="../assets/big-cloud.png" />
            </div>
          </div>

          <div class="beschreibung">
          </div>
        </div>

        <div class="dritte-reihe-kodierungen">
          <div class="codes">
            <div>
              <img src="../assets/kein_abstand.png" />
              <img src="../assets/abstand.png" />
              <img src="../assets/kein_abstand.png" />
              <img src="../assets/kein_abstand.png" />
              <img src="../assets/abstand.png" />
            </div>
          </div>

          <div class="beschreibung">
          </div>
        </div>
      </div>
      
      
      <br /> Finde heraus, bei wie vielen Stellen sich die unteren Kodierungen unterscheiden.
      <div class="kodierungen">
        <div class="erste-reihe-kodierungen" >
          <div class="codes">
            <div v-for='index in 5' :key='index' id="index">
              <img v-if="numbers[0][index-1] == 0" src="../assets/small-cloud.png" />
              <img v-else-if="numbers[0][index-1] == 1" src="../assets/big-cloud.png" />
              <img v-else src="../assets/empty.png" />
            </div>
          </div>
        </div>

        <div class="zweite-reihe-kodierungen" >
          <div class="codes">
            <div v-for='index in 5' :key='index' id="index">
              <img v-if="numbers[1][index-1] == 0" src="../assets/small-cloud.png" />
              <img v-else-if="numbers[1][index-1] == 1" src="../assets/big-cloud.png" />
              <img v-else src="../assets/empty.png" />
            </div>
          </div>
        </div>

        

        
      </div>
      <br>
      <form @submit.prevent="submitAnswer()">
        <!-- <input v-model="prop_1" type="number" />
        <input v-model="prop_2" type="number" />-->
        <input v-model="answer" type="number" />
        <br>
        <p>
          <button class="btn" @click="submitAnswer()" type="button"> Prüfe Antwort </button>
        </p>
      </form>

      <p class="ans" v-if="submitted">Die Antwort ist {{result}}</p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SfAbstaende',
  data() {
    return {
      numbers: [] as number[][],
      anz_tage: 3,
      answer: 0,
      submitted: false as boolean,
      result: "falsch.",
      ans_abst: [false,false,false,false,false],
      falsch_beantwortet: [true,true,true,true,true]
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
    compute_abstand(){
      var sum = 0
      for(let i = 0; i < this.numbers[0].length; i++){
        if(this.numbers[0][i] != this.numbers[1][i]){
          sum++
        }
      }
      return sum
    },
    submitAnswer(){
      /* TODO */
      this.submitted = true
      this.checkAnswer()
    },
    toggleAbst(ev: any, pos: number){
      this.ans_abst[pos] = !(this.ans_abst[pos])
      console.log("feld %d ist nun",pos+1,this.ans_abst[pos])
    },
    checkAnswer(){
      var num_diff = 0
      for(let i = 0; i < this.numbers[0].length; i++){
        if(this.numbers[0][i] != this.numbers[1][i]){
          num_diff++
        }
      }

      if(num_diff == this.answer){
        this.result = "richtig.";
      } else {
        this.result = "falsch."
      }
    },
    
    createNumbers(){
      //zuerst wollen wir das array "numbers" befüllen
      let new_array_o: number[][]
        console.log('duplikat gefunden, codes neu generiert')
        console.log(this.numbers)
        new_array_o = []
        for(let i = 0; i < 2; i++){
          let new_array = []
          for(let i = 0; i < 5; i++){
            new_array.push(Math.round(Math.random()))
          }
          new_array_o.push(new_array)
        }
        this.numbers = new_array_o
    }
  }
});
</script>


<style scoped>
    .CodesAbstaende{
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
      padding: 10px 0 0 20%;
    }

    .beschreibung {
      text-align: start;
      padding: 10px 0 0 15px !important;
    }

    input, select {
      line-height: 30px; 
      height: 30px;
      width: 70px;
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
      
    }

    .codes div {
      padding: 0 0 0 0 !important;
    }

    .zeichenfolge {
      display: flex !important;
      flex-wrap: wrap;
      padding: 0 0 0 10% !important;
    }

    .drop-slot {
      height: 40px;
      width: 60px;
      padding: 0 7px 10px 7px;
      border: 1px solid black;
    }

    .start-area{
      width: 45%;
      min-height: 30px;
      border: 1px solid black;
      margin: 0 auto;
    }

    .abstaende{
      cursor: pointer;
    }

</style>