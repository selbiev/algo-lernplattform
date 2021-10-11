<template>
    <div class="CodesAbstaende">
      <router-link to="/">Hauptmenü</router-link> <br> <br>
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
      
      
      <br /> Finde heraus, um wie viele Stellen sich die beiden nachfolgenden Kodierungen unterscheiden.
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
        <div class="eingabe">
          <div>
            <input v-model="answer" class="eingabe" type="number"> &nbsp; &nbsp;
            <p>
              <button @click="submitAnswer()"
                type="button"
              >
              Prüfe Antwort
              </button>
            </p>
          </div>
        </div>
      </div>
    

      
      <!--<img id="remove" src="../assets/remove.png" @dragover="allowDrop($event)" @drop="drop($event, '1')" width="336" height="69">-->
    <p v-if="submitted">Die Antwort ist {{result}}</p>
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
      result: "falsch."
    }
  },
  created: function(){
    this.createNumbers()
  },
  props: {
    msg: String
  },
  methods : {
    submitAnswer(){
      /* TODO */
      this.submitted = true
      this.checkAnswer()
    },
    checkAnswer(){
      var diff = 0
      for(let i = 0; i < 5; i++){
        if(this.numbers[0][i]!=this.numbers[1][i]){
          diff++
        }
      }
      if(this.answer != diff){
        this.result = "falsch.";
      } else {
        this.result = "richtig."
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
      padding: 10px 0 0 17%;
    }

    .beschreibung {
      text-align: start;
      padding: 0 0 0 15px !important;
    }

    input, select {
      padding: 12px 30px 20px 0;
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

</style>