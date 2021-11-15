<template>
    <div class="CodesAbstaende">
      <Verifier 
        :correctSolution="this.result == 'korrekt.'"
        v-if="this.submitted" 
        :tip="''"
        @close-verifier="this.submitted = false" />

      <Header 
        :diff_level="'schwer'" 
        :task_name="'Kodierung Abstände'" 
        :task_name_code="'SfAbstaende'"
        :task_number="'5'" 
        :picture="'rauchzeichen'"
        :has_diff_levels="true"
        :has_leicht="false"
        :has_mittel="true"
        :has_schwer="true"
        :next_task="'SfErstellen_leicht'"/> <br><br>
      Betrachten wir uns mal zwei Kodierungen. Sie unterscheiden sich an 2 Stellen, die je mit einem Pfeil markiert sind. <br> <br>
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
      
      
      <br /> Finde heraus, bei wie vielen Stellen sich die unteren Kodierungen unterscheiden. <br> <br>
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

        <br>
      <button id="btn_0" class="antwort_btn" @click="answer_abstand(0)">
        1
      </button>
      <button id="btn_1" class="antwort_btn" @click="answer_abstand(1)">
        2
      </button>
      <button id="btn_2" class="antwort_btn" @click="answer_abstand(2)">
        3
      </button>
      <button id="btn_3" class="antwort_btn" @click="answer_abstand(3)">
        4
      </button>
       <button id="btn_4" class="antwort_btn" @click="answer_abstand(4)">
        5
      </button>

      </div>

      <br>
      <Footer
        @next_task="reloadPage()"
        @check_answer="submitAnswer()"
        @reset="reset_all()"
        @info="''" />

      
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from "../components/Header.vue"
import Footer from "../components/Footer.vue"
import Verifier from "../components/Verifier.vue"

export default defineComponent({
  name: 'SfAbstaende',
  components: {
    Header,
    Footer,
    Verifier
  },
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
    reset_all(){
      this.deactivate_all_btns()
      this.submitted = false
      this.answer = -1
      this.result = "falsch."
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
    deactivate_all_btns(){
      for(let i = 0; i < 5; i++){
        document.getElementById('btn_'+i)!.style.backgroundColor = "grey"
        this.ans_abst[i] = false
      }
    },
    answer_abstand(zahl: number){
      if(zahl >= 0 && zahl <= 4){
        this.deactivate_all_btns()
        this.ans_abst[zahl] = true;
        document.getElementById("btn_"+zahl)!.style.backgroundColor = "#e1975a"
        this.answer = zahl+1
      }
    },
    submitAnswer(){
      /* TODO */
      this.submitted = true
      this.checkAnswer()
    },
    checkAnswer(){
      var num_diff = 0
      for(let i = 0; i < this.numbers[0].length; i++){
        if(this.numbers[0][i] != this.numbers[1][i]){
          num_diff++
        }
      }

      if(num_diff == this.answer){
        this.result = "korrekt.";
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
        height: auto;
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
      display: flex;
      align-items: center;
      justify-content: center;
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

    .antwort_btn {
      margin: 0 5px 5px 0;
      width: 30px;
      height: 30px;
      border-radius: 3px;
      background-color: grey;
      font-weight: 700;
    }

</style>