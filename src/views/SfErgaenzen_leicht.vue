<template>
    <div class="CodesErgaenzen">

      <Tutorial 
        :video_name="'SfErgaenzen'"
        :description="task_description()"
        v-if="showTutorial == 'true'"
        @close-tutorial="showTutorial = 'false'" />

        <Verifier 
          :correctSolution="this.result == 'korrekt.'"
          v-if="this.submitted" 
          :tip="hint()"
          @close-verifier="this.submitted = false" />

        <Header 
        :diff_level="'leicht'" 
        :task_name="'Kodierung ergänzen'" 
        :task_name_code="'SfErgaenzen'"
        :task_number="'2'" 
        :picture="'rauchzeichen'"
        :has_diff_levels="true"
        :has_leicht="true"
        :has_mittel="true"
        :has_schwer="true"
        :next_task="'SfErgaenzen_mittel'"/> <br><br>
      Biber Bob sendet folgende Rauchzeichen, um das Wetter für einen Tag vorauszusagen. <br> <br>
        <!-- Automatisierte Version, man muss einfach den css noch anpassen -->
        
      
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
      
      <br> Um das Wetter für morgen vorauszusagen, sendet Bob die folgenden Zeichen. Der Wind hat leider ein Zeichen verwischt. Welches Zeichen fehlt? <br> <br>
      
      <div class="zeichenfolge">
        <!--<img v-if="seq_numbers[0][0] == 0" src="../assets/small-cloud.png" />
        <img v-if="seq_numbers[0][0] == 1" src="../assets/big-cloud.png" /> -->

        <div v-for="i in 4" :key="i">
          <img v-if="seq_numbers[0][i-1] == 0 && number_seq_set[0][i-1]" src="../assets/small-cloud.png" />
          <img v-else-if="seq_numbers[0][i-1] == 1 && number_seq_set[0][i-1]" src="../assets/big-cloud.png" />
          <div v-else droppable="true" class="drop-slot" id="drop-slot-1" @drop="drop($event,'2')" @click="pasteItem($event,'drop-slot-1')" @dragover="allowDrop($event)"/>
        </div>
      </div>

      <br> Ziehe ein Rauchzeichen in die Lücke. Falls du ein Tablet benutzt, klicke zuerst auf ein Rauchzeichen und danach auf eine Lücke. <br> <br>
      
      <div class="start-area" id="start-area" @dragover="allowDrop($event)" @drop="drop($event, '1')">
        <img id="big-cloud-1" src="../assets/big-cloud.png" @click="selectItem($event,'big-cloud-1')" draggable="true" @dragstart="drag($event)" width="336" height="69">
        <img id="small-cloud-1" src="../assets/small-cloud.png" @click="selectItem($event,'small-cloud-1')" draggable="true" @dragstart="drag($event)" width="336" height="69">
      </div>

       <br>
       <Footer
        @next_task="reloadPage()"
        @check_answer="submitAnswer()"
        @reset="clearDropslots()"
        @info="showTutorial = 'true'" />

    
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import Header from "../components/Header.vue"
import Footer from "../components/Footer.vue"
import Verifier from "../components/Verifier.vue"
import Tutorial from "../components/Tutorial.vue"

export default defineComponent({
  name: 'SfErstellen',
  components: {
    Header,
    Footer,
    Verifier,
    Tutorial,
  },
  data() {
    return {
      showTutorial: false,
      numbers: [],
      anz_tage: 3,
      seq_numbers: [],
      number_set: [],
      number_seq_set: [],
      zahl_1: 0,
      zahl_2: 0,
      zahl_3: 0,
      auswahl_1: "none",
      auswahl_2: "none",
      auswahl_3: "none",
      gap_1: 0,
      gap_2: 0,
      gap_3: 0,
      submitted: false,
      result: "falsch.",
      selected_1: "",
      selected_2: "",
      selected_3: "",
      counter: 0,
      selected: false,
      selectedItem: "",
    }
  },
  created: function(){
    this.createNumbers()
    this.createRandomSequence()
  },
  props: {
    msg: String
  },
  methods : {
    reloadPage(){
      this.$router.go(0)
    },
    hint(){
      var slot = document.getElementById("drop-slot-1")
      if(slot.childNodes.length <= 0){
        return "Bitte fülle die Lücke aus."
      }
    },
    translate_ans(answer){
      if(answer.charAt(0)=='s'){
        return 0
      } else if(answer.charAt(0)=='b'){
        return 1
      }
    },
    submitAnswer(){
      var ans_1 = this.translate_ans(this.auswahl_1)
      var correct_1 = ans_1 == this.seq_numbers[0][this.gap_1]? true : false

      if(correct_1){
        this.result = "korrekt."
      } else {
        this.result = "falsch."
      }
      this.submitted = true
    },
    clearDropslots(){
      var ds = document.getElementById("drop-slot-1")
      ds.innerHTML = ""
      this.result = "falsch."
      this.auswahl_1 = ""
      this.auswahl_2 = ""
      this.auswahl_3 = ""
      this.submitted = false
    },
    deselectAll(){
      document.getElementById("big-cloud-1").style.border = "none"
      document.getElementById("small-cloud-1").style.border = "none"
    },
    selectItem(event, id){
      event.stopPropagation()
      console.log("selectItem() ",id)
      if(this.selected){
        this.selected = false
        this.selectedItem = ""
        this.deselectAll()
        document.getElementById(id).style.border = "none"
      } else {
        this.selected = true;
        this.selectedItem = id
        this.deselectAll()
        document.getElementById(id).style.border = "3px solid red"
      }
    },
    pasteItem(event, target){
      event.stopPropagation()
      if(this.selected && document.getElementById(target).childNodes.length <= 0){
        this.result = ""
        var item = document.getElementById(this.selectedItem).cloneNode(true)
        document.getElementById(item.id).style.border = "none"
        item.id = item.id + this.counter
        this.counter++
        var targetplace = document.getElementById(target)
        targetplace.appendChild(item)
        this.selected = false
        document.getElementById(item.id).style.border = "none"

        var slot = event.target.id
        var cloud = item.id
        if(slot=="drop-slot-1"){
          this.auswahl_1 = cloud
          console.log(this.auswahl_1)
        } else if(slot=="drop-slot-2"){
          this.auswahl_2 = cloud
          console.log(this.auswahl_2)
        } else if(slot=="drop-slot-3"){
          this.auswahl_3 = cloud
          console.log(this.auswahl_3)
        }
      }
    },
    drag(event){
      event.dataTransfer.setData("text", event.target.id);
    },
    drop(event, detail) {
      event.preventDefault();
      var data = event.dataTransfer.getData("text");
      var nodeCopy = document.getElementById(data).cloneNode(true);
      nodeCopy.id = event.dataTransfer.getData("text") + this.counter
      this.counter++
      if(event.target.childNodes.length > 0){
        return
      }
      event.target.appendChild(nodeCopy);
      var slot = event.target.id
      var cloud = event.dataTransfer.getData("text")
      if(slot=="drop-slot-1"){
        this.auswahl_1 = cloud
        console.log(this.auswahl_1)
      } else if(slot=="drop-slot-2"){
        this.auswahl_2 = cloud
        console.log(this.auswahl_2)
      } else if(slot=="drop-slot-3"){
        this.auswahl_3 = cloud
        console.log(this.auswahl_3)
      }
    },
    allowDrop(event) {
      event.preventDefault();
    },
    translate_code(str){
      if(str == "Es wird sonnig."){
        return 1
      } else if(str == "Es wird regnen."){
        return 2
      } else {
        return 3;
      }
    },
    checkAbstand(arr1, arr2){
      let countAbstand = 0
      for(let i = 0; i < arr1.length; i++){
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
      //zuerst wollen wir das array "numbers" befüllen
      let new_array_o = []
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
      let new_array_s = []
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
      let new_array_s_s = []
      for(let i = 0; i < 3; i++){
        let new_array_ss_s = []
        for(let i = 0; i < 4; i++){
          new_array_ss_s.push(true)
        }
        new_array_s_s.push(new_array_ss_s)
      }
      this.number_seq_set = new_array_s_s
      this.gap_1 = Math.floor((Math.random()*4))
      this.number_seq_set[0][this.gap_1] = false
      console.log(this.gap_1)
    },
    createRandomSequence(){
      this.zahl_1 = Math.floor(1 + (Math.random()*3))
      this.seq_numbers.push(this.numbers[this.zahl_1-1])
      console.log("zahl_1: %d", this.zahl_1)
    },
    task_description(){
      return "Die Zeichenfolge unten entspricht einer oder mehreren Kodierungen von der oberen Tabelle. Du musst herausfinden, " + 
        "welche Kodierung(en) es darstellt und die fehlenden Zeichen in die Lücken ziehen."
    }
  }
});
</script>


<style scoped>
    .CodesErgaenzen{
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
      margin: 2px 2px 0 0;
      border: 1px solid black;
      border-style: dashed;
    }

    .start-area{
      width: 150px;
      min-height: 30px;
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

</style>