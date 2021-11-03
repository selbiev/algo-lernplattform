<template>
  <div class="CodesErstellen">
    <router-link to="/">Hauptmenü</router-link> <br> <br>
    <button @click="reloadPage()">Neue Aufgabe</button> <br> <br>

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
    Können wir diese Kleider in der folgenden Reihenfolge anziehen? <br>

    <img v-if="type[0] && corr" src="../assets/kleider/leicht/1_c.png" class="orderings"/>
    <img v-if="type[0] && !corr" src="../assets/kleider/leicht/1_f.png" class="orderings"/>

    <img v-if="type[1] && corr" src="../assets/kleider/leicht/2_c.png" class="orderings"/>
    <img v-if="type[1] && !corr" src="../assets/kleider/leicht/2_f.png" class="orderings"/>

    <img v-if="type[2] && corr" src="../assets/kleider/leicht/3_c.png" class="orderings"/>
    <img v-if="type[2] && !corr" src="../assets/kleider/leicht/3_f.png" class="orderings"/>

    <br>
    <input type="radio" id="true" value="True" name="answer_" v-model="answer">
    <label for="true">Ja</label>
    <br>
    <input type="radio" id="false" value="False" name="answer_" v-model="answer">
    <label for="false">Nein</label>
    <br>
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

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SfErstellen',
  components: {
    
  },
  data() {
    return {
      answer: false,
      submitted: false,
      result: "falsch.",
      type: [false,false,false],
      corr: false,
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
    submitAnswer(){
      if((this.answer=="True" && this.corr) || (this.answer=="False" && !this.corr)){
        this.result = "richtig."
      } else {
        this.result = "falsch."
      }
      this.submitted = true
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
        font-family: Verdana, Geneva, Tahoma, sans-serif;
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
      height: 200px;
      width: auto;
    }

    .orderings{
      height: 100px;
      width: auto;
    }

</style>
