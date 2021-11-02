<template>
    <div class="CodesErgaenzen">
        <router-link to="/">Hauptmenü</router-link> <br> <br>
        <button @click="reloadPage()">Neue Aufgabe</button> <br> <br>
      Biberin Bea möchte sich einen Damm bauen. Sie hat einen Katalog, aus dem Sie das nötige Material bestellen kann. <br> <br>
        <!-- Automatisierte Version, man muss einfach den css noch anpassen -->
        
      <table class="code_table">
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
      
      <br> Bea benötigt für den Damm das folgende Objekt. Fülle unten die Lücken mit der Kodierung aus, um es zu bestellen. <br> <br>
      
      <div class="to_order">
        <div v-for="i in 1" :key="i">
          <img v-if="to_order[i-1] == 0" src="../assets/bauen/grosser_stein.png"/>
          <img v-if="to_order[i-1] == 1" src="../assets/bauen/kleiner_stein.png"/>
          <img v-if="to_order[i-1] == 2" src="../assets/bauen/dickes_holz.png"/>
          <img v-if="to_order[i-1] == 3" src="../assets/bauen/duennes_holz.png"/>
          <img v-if="to_order[i-1] == 4" src="../assets/bauen/schlamm.png"/>
          <img v-if="to_order[i-1] == 5" src="../assets/bauen/wasser.png"/>
        </div>
      </div>

      <br>

      <div class="zeichenfolge">
        <div v-for="i in 3" :key="i">
          <div droppable="true" class="drop-slot" :id="'drop-slot-'+i" @drop="drop($event,'2')" @dragover="allowDrop($event)"/>
        </div>
      </div>

      <br> <br>
      
      <div class="start-area" id="start-area" @dragover="allowDrop($event)" @drop="drop($event, '1')">
        <img id="quadrat" src="../assets/bauen/quadrat.png" draggable="true" droppable="false" @dragstart="drag($event)" width="336" height="69">
        <img id="dreieck" src="../assets/bauen/dreieck.png" draggable="true" droppable="false" @dragstart="drag($event)" width="336" height="69">
        <img id="viereck" src="../assets/bauen/viereck.png" draggable="true" droppable="false" @dragstart="drag($event)" width="336" height="69">
        <img id="kreis" src="../assets/bauen/kreis.png" draggable="true" droppable="false" @dragstart="drag($event)" width="336" height="69">
      </div>

       <p>
          <button @click="submitAnswer()"
            type="button"
          >
          Prüfe Antwort
          </button>
        </p>
        <p>
          <button @click="clearDropslots()"
            type="button"
          >
          Alles rückgängig machen
          </button>
        </p>
      <!--<img id="remove" src="../assets/remove.png" @dragover="allowDrop($event)" @drop="drop($event, '1')" width="336" height="69">-->
    <p v-if="submitted">Die Antwort ist {{result}}</p>
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

export default defineComponent({
  name: 'SfErstellen',
  data() {
    return {
      numbers: [],
      submitted: false,
      result: "falsch.",
      to_order: [],     //to_order[i] ist das i-te, zu bestellende element (z.B. grosses holz)
      drop_slots: [],   //drop_slots[i] ist der inhalt vom i-ten drop-slot (abwurf-fläche). 0 => kreis, 1 => quadrat etc. siehe oben
      counter: 0,   //new copied elements get a new number as a suffix to their id's (see drop() method)
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
      console.log("this.to_order: ", this.to_order)
      console.log("this.numbers: ", this.numbers)
      console.log("this.drop_slots: ", this.drop_slots)
      var slots_answers = [this.drop_slots[0], this.drop_slots[1], this.drop_slots[2]]
      if(this.compare_arrays(slots_answers, this.numbers[this.to_order[0]])){
        this.result = "korrekt."
      } else {
        this.result = "falsch."
      }
      this.submitted = true

      /*var d = document.getElementById("kreis0")
      d.parentNode.removeChild(d)*/

    },
    clearDropslots() {
      console.log("bla")
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
      var fst_letter = name.charAt(0)
      return fst_letter == 'k'? 0 : (fst_letter == 'q'? 1 : (fst_letter == 'v'? 2 : (fst_letter = 'd'? 3 : -1)))
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
      event.target.appendChild(nodeCopy);
      /*var data = event.dataTransfer.getData("text");
      var node = document.getElementById(data)
      event.target.appendChild(node);*/
      var slot = event.target.id
      var cloud = nodeCopy.id
      var slot_index = slot.charAt(slot.length-1)-1
      this.drop_slots[slot_index] = this.translate_form(cloud)
      console.log(cloud)
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
        width: 85%;
        height: auto;
        border-color: black;
        border-width: 5px;
        border-style: solid;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
    }

    img {
      width: auto;
      height: 30px;
    }

    .material, .to_order div img {
      width: auto;
      height: 70px;
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
      padding: 5px 7px 0 7px;
      margin: 0 3px 0 0;
      border: 1px solid black;
    }

    .start-area{
      width: 25%;
      min-height: 30px;
      border: 1px solid black;
      margin: 0 auto;
    }
    
    .start-area img{
      padding: 5px 5px 5px 0;
    }

    .code_table{
      margin-left: auto;
      margin-right: auto;
    }

    td, th {
      padding: 0 0 0 25px;
    }

</style>