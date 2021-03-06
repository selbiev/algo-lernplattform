<template>
    <div class="CodesAnzahlLoesungen">  
      <Tutorial 
        :video_name="'SfAnzahlLoesungen'"
        :description="task_description()"
        v-if="showTutorial == 'true'"
        @close-tutorial="showTutorial = 'false'" />

      <Verifier 
        :correctSolution="this.result == 'korrekt.'"
        v-if="this.submitted" 
        :tip="this.hint()"
        @close-verifier="this.submitted = false" />

      <Header 
        :diff_level="'leicht'" 
        :task_name="'Kodierung Anzahl Lösungen'" 
        :task_name_code="'SfAnzahlLoesungen'"
        :task_number="'3'" 
        :picture="'rauchzeichen'"
        :has_diff_levels="true"
        :has_leicht="true"
        :has_mittel="true"
        :has_schwer="false"
        :next_task="'SfAnzahlLoesungen_mittel'"/> <br><br>

      Biber Bob sendet folgende Rauchzeichen, um das Wetter für einen Tag vorauszusagen. <br> <br>
        <!-- Automatisierte Version, man muss einfach den css noch anpassen -->
        
      
      <table class="code_table">
        <tr> 
          <td>
            <div class="codes">
              <div v-for='index in 5' :key='index' id="index">
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
            <div v-for='index in 5' :key='index'>
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
              <div v-for='index in 5' :key='index'>
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
      
      <br>Welches Wetter könnte Bob mit diesen Zeichenfolgen gemeint haben? Klicke auf eins oder auf mehrere.<br><br>

      <div class="zeichenfolge">
        <!--<img v-if="seq_numbers[0][0] == 0" src="../assets/small-cloud.png" />
        <img v-if="seq_numbers[0][0] == 1" src="../assets/big-cloud.png" /> -->

        <div v-for="i in 5" :key="i">
          <img v-if="seq_numbers[0][i-1] == 0 && number_seq_set[0][i-1]" src="../assets/small-cloud.png" />
          <img v-else-if="seq_numbers[0][i-1] == 1 && number_seq_set[0][i-1]" src="../assets/big-cloud.png" />
          <img v-else src="../assets/question_mark.png">
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
      </button>

    <br> <br>
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
      seq_numbers: [] as number[][],
      number_set: [] as boolean[][],
      number_seq_set: [] as boolean[][],
      /* ans_wetter enthält die auswahl des wetters durch den benutzer, welches wetter auf die sequenz zutreffen kann */
      ans_wetter: [] as boolean[],  //0 für sonne, 1 für regen, 2 für schnee
      gew_kodierung_seq: 0,   //als sequenz habe ich numbers[gew_kodierung_seq], falls eindeutige lösung.
      antwort: "",
      special_gap: 0,   //die stelle in der sequenz, die als lücke erscheint
      idx_k: 0, //falls nicht eindeutige lösung, dann kommen idx_k und idx_l zum einsatz. siehe notizen bei checkAnswer() für mehr infos
      idx_l: 0,
      submitted: false as boolean,
      result: "falsch.",
      res: false,
      eindeutig: true,
      hinweis: "",
      correct_number_of_answers: false,
      ans_0_active: false,
      ans_1_active: false,
      ans_2_active: false,
    }
  },
  created: function(){
    /**
     * Die Idee dieses Programms: 
     * Mit 50% wahrscheinlichkeit wird eine aufstellung gewählt wo es eine eindeutige lösung gibt 
     * (nachfolgende programmzeile wo this.eindeutig randomly auf true/false gesetzt wird) und mit 50% eine 
     * mehrdeutige. 
     * Ist eine eindeutige lösung gewählt worden, wird wie in der komponente "CodesErkennen" eine aufstlelung der kodierung
     * gewählt, wo ein mindestabstand von 2 gewählt wird. Andernfalls wird das zwar auch gemacht, jedoch wird in
     * der Methode "createNumbers" eine kodierung 1 zu 1 zu einer anderen kodierung kopiert und eine einzige
     * stelle (special_gap) wird verändert. Diese special gap wird dann in der zeichenfolge später in der methode 
     * "createSequence" eine von drei gaps gewählt, zufällig.
     * Somit wird sichergestellt, dass es definitiv mehrere mögliche Lösungen gibt, falls das flag "this.eindeutig" falsch ist
     * und im anderen falle sorgt die methode "no_duplicates" dafür, dass es ein mindestabstand von 2 eingehalten wird
     * und somit kann eindeutigkeit bewahrt werden, auch wenn eine stelle als lücke gewählt wird.
     */
    this.eindeutig = Math.round(Math.random()) == 1? true : false
    if(this.eindeutig){
      console.log("Eindeutige Lösung")
    } else {console.log("Mehrere Lösungen")}

    this.createNumbers()
    this.createRandomSequence()
    
    
  },
  methods : {
    translate_ans(answer: string){
      if(answer.charAt(0)=='s'){
        return 0
      } else if(answer.charAt(0)=='b'){
        return 1
      }
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
    
    submitAnswer(){
      this.submitted = true;
      this.checkAnswer();
    },
    get_numbers_from_ans_wetter(){
      var arr = []
      for(let i = 0; i < 3; i++){
        if(this.ans_wetter[i]){
          arr.push(i)
        }
      }
      return arr
    },
    sort_arr(arr: number[]){
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
    reloadPage(){
      this.$router.go(0)
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
    /**
     * gew_kodierung_seq ist die nummer der gewählten kodierung für die sequenz, wobei 0 für sonnig, 1 für regen, 2 für schnee,
     * falls die lösung eindeutig ist. wenn sie nicht eindeutig ist, ist die lösung idx_k und idx_l. beispielsweise idx_k = 0, idx_l = 2,
     * das würde der situation entsprechen, dass es sonne oder schnee haben kann. natürlich wird sichergestellt (bei create_numbers unten)
     * dass dann auch beide darauf passen.
     * was wir hier bei checkAnswer() tun ist: 
     */
    checkAnswer(){
      console.log(this.ans_wetter)
      var ausgew_antworten = this.get_numbers_from_ans_wetter()
      console.log(ausgew_antworten)
      var richtige_antworten = []
      if(this.eindeutig){
        richtige_antworten.push(this.gew_kodierung_seq)
      } else{
        richtige_antworten.push(this.idx_k)
        richtige_antworten.push(this.idx_l)
      }

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
    allowDrop(event: any) {
      event.preventDefault();
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
      var mindestAbstand = 2

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
      var aaa = this.checkAbstand([1,1,1],[0,0,1])
      //zuerst wollen wir das array "numbers" befüllen
      let new_array_o: number[][]
      do {          //solange die codes nicht verschieden sind, wiederhole folgendes
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

      let k = 0
      let l = 0
      
      if(!this.eindeutig){
        //console.log(this.numbers)
        
        
        while(k == l){
          k = Math.floor((Math.random()*3))
          l = Math.floor((Math.random()*3))
          this.idx_k = k
          this.idx_l = l
        }
        console.assert(k != l)
        console.log("folgende Codes sind ähnlich")
        console.log("%d  und  %d",k+1,l+1)
        console.log("unterscheiden sich an folgender stelle:")
        this.special_gap = Math.floor((Math.random()*5))
        console.log(this.special_gap+1)

        this.copyArray(this.numbers[k],this.numbers[l])
        if(this.numbers[k][this.special_gap]==1){
          this.numbers[k][this.special_gap] = 0
        } else {
          this.numbers[k][this.special_gap] = 1
        }
        //console.log(this.numbers)
        
        //this.numbers[k][this.special_gap] = (this.numbers[k][this.special_gap] == 0)? 1 : 0

      }

      //jetzt das array number_set, das sagt aus, ob eine zahl/eine stelle 
      //in den kodierungen bekannt ist oder nicht (für lückentext)
      let new_array_s: boolean[][] = []
      for(let i = 0; i < 3; i++){
        let new_array_ss = []
        for(let i = 0; i < 5; i++){
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
        for(let i = 0; i < 5; i++){
          new_array_ss_s.push(true)
        }
        new_array_s_s.push(new_array_ss_s)
      }
      this.number_seq_set = new_array_s_s

      if(this.eindeutig){
        this.number_seq_set[0][Math.floor((Math.random()*5))] = false
      } else {
        this.number_seq_set[0][this.special_gap] = false
      }
      
    },
    createRandomSequence(){
      this.gew_kodierung_seq = Math.floor((Math.random()*3))

      if(!this.eindeutig){
        this.gew_kodierung_seq = this.idx_k
      } 
      
      this.seq_numbers.push(this.numbers[this.gew_kodierung_seq])
    },
    copyArray(arr1: number[], arr2: number[]){
      for(let i = 0; i < arr1.length; i++){
        arr1[i] = arr2[i]
      }
    },
    task_description(){
      return "Du hast unten eine Zeichenfolge, wo ein Zeichen fehlt. Wähle diejenige Kodierung oder "+
        "diejenigen Kodierungen aus, welche am besten zur Zeichenfolge passen."
    }
  }
});
</script>


<style scoped>
    .CodesAnzahlLoesungen{
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
      display: flex;
      align-items: center;
      justify-content: center;
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
      border: solid black;
      border-width: thin;
    }

</style>