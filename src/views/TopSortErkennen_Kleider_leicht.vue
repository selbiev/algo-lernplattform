<template>
  <div class="CodesErstellen">
    <Verifier 
        :correctSolution="this.result == 'korrekt.'"
        v-if="this.submitted" 
        :tip="hint()"
        @close-verifier="this.submitted = false" />

    <Header 
        :diff_level="'leicht'" 
        :task_name="'Kleider Reihenfolge einstufen'" 
        :task_name_code="'TopSortErkennen_Kleider'"
        :task_number="'9'" 
        :picture="'kleider'"
        :has_diff_levels="true"
        :has_leicht="true"
        :has_mittel="false"
        :has_schwer="true"
        :next_task="'TopSortErkennen_Kleider_schwer'"/> <br><br>

    Wenn du dir Kleider anziehst, musst du die Reihenfolge beachten. <br>
    Zum Beispiel (T-Shirt &rarr; Jacke) bedeutet: Zuerst muss das T-Shirt und erst dann die Jacke angezogen werden.<br> <br>

    
    <!--<img src="../assets/kleider/beispiel.png" class="main_img"/> <br>
    Man kann die Kleider jetzt in verschiedenen Reihenfolgen anziehen, jedoch sind nicht alle Reihenfolgen erlaubt. <br>
    <img src="../assets/kleider/riehenfolgen.png" class="main_img"/><br>
    Bei der letzten Reihenfolge kam die Mütze vor dem Pullover und deshalb ist diese Reihenfolge nicht erlaubt. <br>
    Betrachte jetzt die folgenden Kleider und ihre Beziehungen zueinander. <br>-->

    <img v-if="type[0]" src="../assets/kleider/leicht/1.png" class="types"/>
    <img v-if="type[1]" src="../assets/kleider/leicht/2.png" class="types"/>
    <img v-if="type[2]" src="../assets/kleider/leicht/3.png" class="types"/> <br>
    Können wir diese Kleider in der folgenden Reihenfolge anziehen? <br> <br>

    <img v-if="type[0] && corr" src="../assets/kleider/leicht/1_c.png" class="orderings"/>
    <img v-if="type[0] && !corr" src="../assets/kleider/leicht/1_f.png" class="orderings"/>

    <img v-if="type[1] && corr" src="../assets/kleider/leicht/2_c.png" class="orderings"/>
    <img v-if="type[1] && !corr" src="../assets/kleider/leicht/2_f.png" class="orderings"/>

    <img v-if="type[2] && corr" src="../assets/kleider/leicht/3_c.png" class="orderings"/>
    <img v-if="type[2] && !corr" src="../assets/kleider/leicht/3_f.png" class="orderings"/>

    <br> <br>
    
    <button id="ja" class="antwort_btn" @click="give_answer('ja')">
      Ja
    </button>
    <button id="nein" class="antwort_btn" @click="give_answer('nein')">
      Nein
    </button>

      <br><br>
      <Footer
        @next_task="reloadPage()"
        @check_answer="submitAnswer()"
        @reset="''"
        @info="''" />

    </div>
</template>

<script>
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
      answer: false,
      submitted: false,
      result: "",
      type: [false,false,false],
      corr: false,
      answer_given: false,
    }
  },
  created() {
    var type_ = Math.floor(Math.random()*3)
    this.corr = (Math.round(Math.random())==1) ? true : false
    this.type[type_] = true
    console.log(this.type)
  },
  props: {

  },
  methods : {
    reloadPage(){
      this.$router.go(0)
    },
    hint(){
      if(!this.answer_given){
        return "Bitte wähle aus, ob die Reihenfolge korrekt ist."
      }
    },
    submitAnswer(){
      if(this.answer_given && ((this.answer==true && this.corr) || (this.answer==false && !this.corr))){
        this.result = "korrekt."
      } else {
        this.result = "falsch."
      }
      this.submitted = true
    },
    give_answer(antwort){
      if(antwort == "ja" || antwort == "nein"){
        this.answer_given = true
        document.getElementById("ja").style.backgroundColor = "#ffe5b2"
        document.getElementById("ja").style.borderWidth="thin"
        document.getElementById("ja").style.fontWeight="400"
        document.getElementById("nein").style.backgroundColor = "#ffe5b2"
        document.getElementById("nein").style.borderWidth="thin"
        document.getElementById("nein").style.fontWeight="400"
        
        document.getElementById(antwort).style.backgroundColor = "#e1975a"
        document.getElementById(antwort).style.borderWidth="medium"
        document.getElementById(antwort).style.fontWeight="700"
        this.answer = (antwort=="ja")? true : false
        console.log("the answer is: ", this.answer)
      }
    },
  }
});





</script>
<style scoped>
    #c {
      border: 1px solid black;
    }

    .CodesErstellen{
        background-color: #FFE5B2;
        padding: 20px 20px 20px 20px;
        height: auto;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
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

    .kleider {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .main_img{
      height: 240px;
      width: auto;
    }

    .types{
      height: 150px;
      width: auto;
    }

    .orderings{
      height: 60px;
      width: auto;
    }

    .antwort_btn {
      margin: 0 5px 5px 0;
      width: 50px;
      height: 30px;
      border-radius: 3px;
      border-width: thin;
      background-color: #ffe5b2;
      font-weight: 500;
      cursor: pointer;
      border: solid black;
      border-width: thin;
    }

</style>
