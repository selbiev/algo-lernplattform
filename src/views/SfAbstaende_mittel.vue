<template>
    <div class="CodesAbstaende">
      <Tutorial 
        :video_name="'SfAbstaende'"
        :description="task_description()"
        v-if="showTutorial == 'true'"
        @close-tutorial="showTutorial = 'false'" />

      <Verifier 
        :correctSolution="this.result == 'korrekt.'"
        v-if="this.submitted" 
        :tip="''"
        @close-verifier="this.submitted = false" />

      <Header 
        :diff_level="'mittel'" 
        :task_name="'Kodierung Abstände'" 
        :task_name_code="'SfAbstaende'"
        :task_number="'5'" 
        :picture="'rauchzeichen'"
        :has_diff_levels="true"
        :has_leicht="false"
        :has_mittel="true"
        :has_schwer="true"
        :next_task="'SfAbstaende_schwer'" /> <br><br>
      Betrachten wir uns mal zwei Kodierungen. Sie unterscheiden sich an 2 Stellen, die je mit einem farbigen Pfeil markiert sind. <br> <br>
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
              <img src="../assets/kein_abstand_1.png" />
              <img src="../assets/abstand_1.png" />
              <img src="../assets/kein_abstand_1.png" />
              <img src="../assets/kein_abstand_1.png" />
              <img src="../assets/abstand_1.png" />
            </div>
          </div>

          <div class="beschreibung">
          </div>
        </div>
      </div>
      
      
      <br /> Finde heraus, bei welchen Stellen sich die unteren Kodierungen unterscheiden. Klicke dazu auf die Pfeile. <br> <br>
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

        <div class="abstaende" >
          <div class="codes">
            <div v-for='index in 5' :key='index' id="index">
              <img v-if="ans_abst[index-1] == true" src="../assets/abstand_1.png" @click="toggleAbst($event, index-1)" />
              <img v-else-if="ans_abst[index-1] == false" src="../assets/kein_abstand_1.png" @click="toggleAbst($event, index-1)" />
            </div>
          </div>
        </div>

        <div v-if="submitted_" class="abstaende" >
          <div class="codes">
            <div v-for='index in 5' :key='index' id="index">
              <img v-if="!falsch_beantwortet[index-1] == true" src="../assets/korrekt.png" @click="toggleAbst($event, index-1)" />
              <img v-else-if="!falsch_beantwortet[index-1] == false" src="../assets/falsch.png" @click="toggleAbst($event, index-1)" />
            </div>
          </div>
        </div>
      <br v-if="!submitted && !(this.result=='korrekt.')">
      <p v-if="submitted_ && this.result=='korrekt.'">Der Abstand zwischen den beiden Kodierungen beträgt {{compute_abstand()}}</p>
        
      </div>

      
      
      <Footer
        @next_task="reloadPage()"
        @check_answer="submitAnswer()"
        @reset="''"
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
  name: 'SfAbstaende',
  components: {
    Header,
    Footer,
    Verifier,
    Tutorial,
  },
  data() {
    return {
      showTutorial: false,
      numbers: [] as number[][],
      anz_tage: 3,
      answer: 0,
      submitted: false as boolean,
      submitted_: false as boolean,
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
    compute_abstand(){
      var sum = 0
      for(let i = 0; i < this.numbers[0].length; i++){
        if(this.numbers[0][i] != this.numbers[1][i]){
          sum++
        }
      }
      return sum
    },
    reloadPage(){
      this.$router.go(0)
    },
    submitAnswer(){
      /* TODO */
      this.submitted = true
      this.submitted_ = true
      this.checkAnswer()
    },
    toggleAbst(ev: any, pos: number){
      this.ans_abst[pos] = !(this.ans_abst[pos])
      console.log("feld %d ist nun",pos+1,this.ans_abst[pos])
    },
    checkAnswer(){
      var all_good = true;
      for(let i = 0; i < this.ans_abst.length; i++){
        this.falsch_beantwortet[i] = true
        var they_differ = this.numbers[0][i] != this.numbers[1][i]
        if(they_differ == this.ans_abst[i]){    //whenever they_differ is true, ans_abst should be true since ans_abst[i] tells true if user says that the code positions differ
          this.falsch_beantwortet[i] = false
        }
        all_good = all_good && !this.falsch_beantwortet[i]
      }

      if(all_good){
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
    },
    task_description(){
      return "Bei dieser Aufgabe musst du herausfinden, an welchen Stellen sich die beiden unteren Codes unterscheiden. Klicke dafür "+
        "auf den jeweiligen Pfeil. Bei der schwierigeren Aufgabe (wenn du auf die 3 Biber oder auf \"Nächste Aufgabe\" klickst), "+
        "musst du angeben, an wie vielen Stellen sich die beiden Codes unterscheiden. Klicke dafür auf eine der Zahlen."
    }
  }
});
</script>


<style scoped>
    .CodesAbstaende{
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
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .beschreibung {
      text-align: start;
      padding: 10px 0 0 15px !important;
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

    .abstaende{
      cursor: pointer;
    }

</style>