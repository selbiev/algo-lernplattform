<template>
    <div class="CodesErgaenzen">
      <Verifier 
        :correctSolution="this.result == 'korrekt.'"
        v-if="this.submitted" 
        :tip="this.hint()"
        @close-verifier="this.submitted = false" />

        <Header 
        :diff_level="'mittel'" 
        :task_name="'Bauteile erkennen'" 
        :task_name_code="'SfBauen_erkennen'"
        :task_number="'8'" 
        :picture="'bauen'"
        :has_diff_levels="true"
        :has_leicht="true"
        :has_mittel="true"
        :has_schwer="false"
        :next_task="'TopSortErkennen_Kleider_leicht'"/> <br><br>
      Biberin Bea möchte sich einen Damm bauen. Sie hat einen Katalog, aus dem Sie das nötige Material bestellen kann. <br> <br>
        <!-- Automatisierte Version, man muss einfach den css noch anpassen -->
        
      <div class="tables">

        <table class="code_table" id="table_left">
          <tr> 
            <th>Kodierung</th>
            <th>Objekt</th>
            <th>Beschreibung</th>
          </tr>
          <tr>
            <td>
              <div class="codes">
                <div v-for='index in 3' :key='index'>
                  <img v-if="numbers[0][index-1] == 0" src="../assets/bauen/kreis.png" />
                  <img v-else-if="numbers[0][index-1] == 1" src="../assets/bauen/quadrat.png" />
                  <img v-else-if="numbers[0][index-1] == 2" src="../assets/bauen/viereck.png" />
                  <img v-else-if="numbers[0][index-1] == 3" src="../assets/bauen/dreieck.png" />
                </div>
              </div>
            </td>
            <td>
              <img class="material" src="../assets/bauen/grosser_stein.png"/>
            </td>
            <td>
              Grosser Stein
            </td>
          </tr>




          <tr>
            <td>
              <div class="codes">
                <div v-for='index in 3' :key='index'>
                  <img v-if="numbers[1][index-1] == 0" src="../assets/bauen/kreis.png" />
                  <img v-else-if="numbers[1][index-1] == 1" src="../assets/bauen/quadrat.png" />
                  <img v-else-if="numbers[1][index-1] == 2" src="../assets/bauen/viereck.png" />
                  <img v-else-if="numbers[1][index-1] == 3" src="../assets/bauen/dreieck.png" />
                </div>
              </div>
            </td>
            <td>
              <img class="material" src="../assets/bauen/kleiner_stein.png"/>
            </td>
            <td>
              Kleiner Stein
            </td>
          </tr>




          <tr>
            <td>
              <div class="codes">
                <div v-for='index in 3' :key='index'>
                  <img v-if="numbers[2][index-1] == 0" src="../assets/bauen/kreis.png" />
                  <img v-else-if="numbers[2][index-1] == 1" src="../assets/bauen/quadrat.png" />
                  <img v-else-if="numbers[2][index-1] == 2" src="../assets/bauen/viereck.png" />
                  <img v-else-if="numbers[2][index-1] == 3" src="../assets/bauen/dreieck.png" />
                </div>
              </div>
            </td>
            <td>
              <img class="material" src="../assets/bauen/dickes_holz.png"/>
            </td>
            <td>
              Dickes Holz
            </td>
          </tr>
        </table>

        <table class="code_table" id="table_right">
          <tr> 
            <th>Kodierung</th>
            <th>Objekt</th>
            <th>Beschreibung</th>
          </tr>

          <tr>
            <td>
              <div class="codes">
                <div v-for='index in 3' :key='index'>
                  <img v-if="numbers[3][index-1] == 0" src="../assets/bauen/kreis.png" />
                  <img v-else-if="numbers[3][index-1] == 1" src="../assets/bauen/quadrat.png" />
                  <img v-else-if="numbers[3][index-1] == 2" src="../assets/bauen/viereck.png" />
                  <img v-else-if="numbers[3][index-1] == 3" src="../assets/bauen/dreieck.png" />
                </div>
              </div>
            </td>
            <td>
              <img class="material" src="../assets/bauen/duennes_holz.png"/>
            </td>
            <td>
              Dünnes Holz
            </td>
          </tr>




          <tr>
            <td>
              <div class="codes">
                <div v-for='index in 3' :key='index'>
                  <img v-if="numbers[4][index-1] == 0" src="../assets/bauen/kreis.png" />
                  <img v-else-if="numbers[4][index-1] == 1" src="../assets/bauen/quadrat.png" />
                  <img v-else-if="numbers[4][index-1] == 2" src="../assets/bauen/viereck.png" />
                  <img v-else-if="numbers[4][index-1] == 3" src="../assets/bauen/dreieck.png" />
                </div>
              </div>
            </td>
            <td>
              <img class="material" src="../assets/bauen/schlamm.png"/>
            </td>
            <td>
              Schlamm
            </td>
          </tr>




          <tr>
            <td>
              <div class="codes">
                <div v-for='index in 3' :key='index'>
                  <img v-if="numbers[5][index-1] == 0" src="../assets/bauen/kreis.png" />
                  <img v-else-if="numbers[5][index-1] == 1" src="../assets/bauen/quadrat.png" />
                  <img v-else-if="numbers[5][index-1] == 2" src="../assets/bauen/viereck.png" />
                  <img v-else-if="numbers[5][index-1] == 3" src="../assets/bauen/dreieck.png" />
                </div>
              </div>
            </td>
            <td>
              <img class="material" src="../assets/bauen/wasser.png"/>
            </td>
            <td>
              Wasser
            </td>
          </tr>
        </table>
      
      </div>
      
      <br> Bob hat von Bea die folgende Bestellung erhalten. Welche Objekte hat Bea bestellt? <br> <br>
      
      <div class="to_order">
        <div v-for="i in 3" :key="i">
          <img v-if="numbers[to_order[0]][i-1] == 0" src="../assets/bauen/kreis.png"/>
          <img v-if="numbers[to_order[0]][i-1] == 1" src="../assets/bauen/quadrat.png"/>
          <img v-if="numbers[to_order[0]][i-1] == 2" src="../assets/bauen/viereck.png"/>
          <img v-if="numbers[to_order[0]][i-1] == 3" src="../assets/bauen/dreieck.png"/>
        </div>
        <div v-for="i in 3" :key="i">
          <img v-if="numbers[to_order[1]][i-1] == 0" src="../assets/bauen/kreis.png"/>
          <img v-if="numbers[to_order[1]][i-1] == 1" src="../assets/bauen/quadrat.png"/>
          <img v-if="numbers[to_order[1]][i-1] == 2" src="../assets/bauen/viereck.png"/>
          <img v-if="numbers[to_order[1]][i-1] == 3" src="../assets/bauen/dreieck.png"/>
        </div>
        <div v-for="i in 3" :key="i">
          <img v-if="numbers[to_order[2]][i-1] == 0" src="../assets/bauen/kreis.png"/>
          <img v-if="numbers[to_order[2]][i-1] == 1" src="../assets/bauen/quadrat.png"/>
          <img v-if="numbers[to_order[2]][i-1] == 2" src="../assets/bauen/viereck.png"/>
          <img v-if="numbers[to_order[2]][i-1] == 3" src="../assets/bauen/dreieck.png"/>
        </div>
      </div>

      <br> Ziehe die Materialien in die Lücken. Falls du ein Tablet benutzt, klicke zuerst auf ein Material und danach auf eine Lücke. <br> <br>

      <div class="zeichenfolge">
        <div v-for="i in 3" :key="i">
          <div droppable="true" class="drop-slot" :id="'drop-slot-'+i" @click="pasteItem($event,'drop-slot-'+i)" @drop="drop($event,'2')" @dragover="allowDrop($event)"/>
        </div>
      </div>

      <br>
      
      <div class="start-area" id="start-area" @dragover="allowDrop($event)" @drop="drop($event, '1')">
        <img id="grosser_stein" src="../assets/bauen/grosser_stein.png" @click="selectItem($event,'grosser_stein')" draggable="true" droppable="false" @dragstart="drag($event)" width="336" height="69">
        <img id="kleiner_stein" src="../assets/bauen/kleiner_stein.png" @click="selectItem($event,'kleiner_stein')" draggable="true" droppable="false" @dragstart="drag($event)" width="336" height="69">
        <img id="dickes_holz" src="../assets/bauen/dickes_holz.png" @click="selectItem($event,'dickes_holz')" draggable="true" droppable="false" @dragstart="drag($event)" width="336" height="69">
        <img id="duennes_holz" src="../assets/bauen/duennes_holz.png" @click="selectItem($event,'duennes_holz')" draggable="true" droppable="false" @dragstart="drag($event)" width="336" height="69">
        <img id="schlamm" src="../assets/bauen/schlamm.png" @click="selectItem($event,'schlamm')" draggable="true" droppable="false" @dragstart="drag($event)" width="336" height="69">
        <img id="wasser" src="../assets/bauen/wasser.png" @click="selectItem($event,'wasser')" draggable="true" droppable="false" @dragstart="drag($event)" width="336" height="69">
        </div>
    
    <br v-if="!submitted">
    <Footer
        @next_task="reloadPage()"
        @check_answer="submitAnswer()"
        @reset="clearDropslots()"
        @info="''" />
  </div>
</template>

<script>
/**
 * Kodierungen:
 * 
 * kreis                0
 * quadrat              1
 * viereck (rechteck)   2
 * dreieck              3
 * 
 * grosser stein  0
 * kleiner stein  1
 * dickes holz    2
 * duennes holz   3
 * schlamm        4
 * wasser         5
 */

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
      numbers: [],
      submitted: false,
      result: "falsch.",
      selected: false,
      selectedItem: "",
      to_order: [],     //to_order[i] ist das i-te, zu bestellende element (z.B. grosses holz)
      drop_slots: [],   //drop_slots[i] ist der inhalt vom i-ten drop-slot (abwurf-fläche). 0 => kreis, 1 => quadrat etc. siehe oben
      counter: 0,   //new copied elements get a new number as a suffix to their id's (see drop() method)
      falsche_bestellungen: [],
    }
  },
  created: function(){
    this.createNumbers()
    this.to_order[0] = Math.floor(Math.random()*6)
    this.to_order[1] = Math.floor(Math.random()*6)
    this.to_order[2] = Math.floor(Math.random()*6)
  },
  props: {
    msg: String
  },
  methods : {
    reloadPage(){
      this.$router.go(0)
    },
    hint(){

      for(let i = 1; i <= 3; i++){
        if(document.getElementById("drop-slot-"+i).childNodes.length <= 0){
          return "Bitte fülle alle Lücken aus."
        }
      }

      var tip = "Folgende Objekte wurden falsch erkannt: "
      if(!this.falsche_bestellungen[0]){
        tip += "1     "
      }
      if(!this.falsche_bestellungen[1]){
        tip += "2     "
      }
      if(!this.falsche_bestellungen[2]){
        tip += "3"
      }
      return tip
    },

    translate_ans(answer){
      if(answer.charAt(0)=='s'){
        return 0
      } else if(answer.charAt(0)=='b'){
        return 1
      }
    },
    compare_arrays(arr1, arr2){
      var res = true
      if(arr1.length != arr2.length){return false}

      for(let i = 0; i < arr1.length; i++){
        res = res && (arr1[i] == arr2[i])
      }
      return res
    },
    submitAnswer(){
      var corr_1 = this.drop_slots[0] == this.to_order[0]
      var corr_2 = this.drop_slots[1] == this.to_order[1]
      var corr_3 = this.drop_slots[2] == this.to_order[2]

      if(!corr_1){
        document.getElementById("drop-slot-1").style.borderColor = "red";
        document.getElementById("drop-slot-1").style.borderWidth = "thick";
      } else {
        document.getElementById("drop-slot-1").style.borderColor = "black";
        document.getElementById("drop-slot-1").style.borderWidth = "thin";
      }
      if(!corr_2){
        document.getElementById("drop-slot-2").style.borderColor = "red";
        document.getElementById("drop-slot-2").style.borderWidth = "thick";
      } else{
        document.getElementById("drop-slot-2").style.borderColor = "black";
        document.getElementById("drop-slot-2").style.borderWidth = "thin";
      }
      if(!corr_3){
        document.getElementById("drop-slot-3").style.borderColor = "red";
        document.getElementById("drop-slot-3").style.borderWidth = "thick";
      } else{
        document.getElementById("drop-slot-3").style.borderColor = "black";
        document.getElementById("drop-slot-3").style.borderWidth = "thin";
      }

      if(corr_1 && corr_2 && corr_3){
        this.result = "korrekt."
      } else {
        this.result = "falsch."
      }

      this.falsche_bestellungen[0] = corr_1
      this.falsche_bestellungen[1] = corr_2
      this.falsche_bestellungen[2] = corr_3

      this.submitted = true

      /*var d = document.getElementById("kreis0")
      d.parentNode.removeChild(d)*/

    },
    clearDropslots() {
      document.getElementById("drop-slot-1").style.borderColor = "black";
      document.getElementById("drop-slot-1").style.borderWidth = "thin";
      document.getElementById("drop-slot-2").style.borderColor = "black";
      document.getElementById("drop-slot-2").style.borderWidth = "thin";
      document.getElementById("drop-slot-3").style.borderColor = "black";
      document.getElementById("drop-slot-3").style.borderWidth = "thin";
      console.log("drop slots cleared")
      var ds1 = document.getElementById("drop-slot-1")
      var ds2 = document.getElementById("drop-slot-2")
      var ds3 = document.getElementById("drop-slot-3")
      ds1.innerHTML = ''
      ds2.innerHTML = ''
      ds3.innerHTML = ''
      this.submitted = false
      this.result = "falsch."
      this.drop_slots = []
    },
    //siehe zu beginn des <script> tags für beschreibung
    translate_form(name){
      var fst_2_letters = name.charAt(0) + name.charAt(1)
      return fst_2_letters == "gr"? 0 : (fst_2_letters == 'kl'? 1 : (fst_2_letters == 'di'? 2 : (fst_2_letters == 'du'? 3 : (fst_2_letters == "sc"? 4 : (fst_2_letters == "wa"? 5 : -1)))))
    },
    deselectAll(){
      document.getElementById("grosser_stein").style.border = "none"
      document.getElementById("kleiner_stein").style.border = "none"
      document.getElementById("dickes_holz").style.border = "none"
      document.getElementById("duennes_holz").style.border = "none"
      document.getElementById("schlamm").style.border = "none"
      document.getElementById("wasser").style.border = "none"
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
        var material = item.id
        var slot_index = slot.charAt(slot.length-1)-1
        this.drop_slots[slot_index] = this.translate_form(material)
      }
    },
    drag(event){
      event.dataTransfer.setData("text", event.target.id);
    },
    drop(event, detail) {
      event.preventDefault();
      
      if(event.target.childNodes.length <= 0){
        var data = event.dataTransfer.getData("text");
        var nodeCopy = document.getElementById(data).cloneNode(true);
        nodeCopy.id = event.dataTransfer.getData("text") + this.counter
        this.counter++
        event.target.appendChild(nodeCopy);
        /*var data = event.dataTransfer.getData("text");
        var node = document.getElementById(data)
        event.target.appendChild(node);*/
        var slot = event.target.id
        var cloud = nodeCopy.id
        var slot_index = slot.charAt(slot.length-1)-1
        this.drop_slots[slot_index] = this.translate_form(cloud)
        console.log(cloud)
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
    same_array(arr1, arr2){

      if(arr1.length != arr2.length){return false}

      for(let i = 0; i < arr1.length; i++){
        if((arr1[i] != arr2[i])){
          return false
        }
      }
      return true
    },
    no_duplicates(){
      
      for(let i = 0; i < this.numbers.length-1; i++){
        for(let j = i+1; j < this.numbers.length; j++){
          if(i==j){continue}  //kann zwar nicht passieren da j immer i + 1 ist... aber egal
          if(this.same_array(this.numbers[i],this.numbers[j])){
            return false
          }
        }
      }
      return true
    },
    
    createNumbers(){
      //zuerst wollen wir das array "numbers" befüllen
      let new_array_o = []
      do {          //solange die codes nicht verschieden sind, wiederhole folgendes
        new_array_o = []
        for(let i = 0; i < 6; i++){
          let new_array = []
          for(let i = 0; i < 3; i++){
            new_array.push(Math.floor((Math.random()*4)))
          }
          new_array_o.push(new_array)
        }
        this.numbers = new_array_o
      } while(!(this.no_duplicates()));
      
      
    },
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
      height: 30px;
    }

    .material {
      width: auto;
      height: 50px;
    }

    .to_order div img {
      width: auto;
      height: 70px;
    }

    .to_order div img {
      width: auto;
      height: 30px;
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
      flex-wrap: wrap;
    }

    .to_order{
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .drop-slot {
      height: 60px;
      width: 90px;
      padding: 5px 7px 0 7px;
      margin: 0 3px 0 0;
      border: 1px solid black;
      border-style: dashed;
    }


    .start-area{
      width: 50%;
      min-height: 30px;
      margin: 0 auto;
    }
    
    .start-area img, .drop-slot img{
      padding: 5px 5px 5px 0;
      width: auto;
      height: 50px;
    }

    .code_table{
      margin-left: auto;
      margin-right: auto;
    }

    td, th {
      padding: 0 0 0 25px;
    }

    .tables {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
    }

    #table_right {
      margin-left: 0;
    }


    #table_left {
      margin-right: 10px;
      padding-right: 30px;
      border-right: 1px solid black;
    }

    @media (max-width: 1100px) {   /* hälfte meines screens ist 760px */
      .tables {
        display: block;
      }

      #table_right {
        margin-left: auto;
        margin-right: auto;
        margin-bottom: auto;
        margin-top: 20px;
        padding: 0;
      }


      #table_left {
        margin-left: auto;
        margin-right: auto;
        margin-top: auto;
        margin-bottom: 20px;
        border-right: none;
        padding: 0;
      }
    }

</style>