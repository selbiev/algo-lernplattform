<template>
    <div class="CodesErgaenzen">
        <router-link to="/">Hauptmenü</router-link> <br> <br>
      Biber Bob sendet folgende Rauchzeichen, um das Wetter für einen Tag vorauszusagen. <br>
        <!-- Automatisierte Version, man muss einfach den css noch anpassen -->
        
      
      <div class="kodierungen">
        <div class="erste-reihe-kodierungen" >
          <div class="codes">
            <div v-for='index in 5' :key='index'>
              <img v-if="numbers[0][index-1] == 0 && number_set[0][index-1]" src="../assets/small-cloud.png" />
              <img v-else-if="numbers[0][index-1] == 1 && number_set[0][index-1]" src="../assets/big-cloud.png" />
              <img v-else src="../assets/empty.png" />
            </div>
          </div>

          <div class="beschreibung">
            <br />Es wird sonnig.
          </div>
          
        </div>

        <div class="zweite-reihe-kodierungen">
          <div class="codes">
            <div v-for='index in 5' :key='index'>
              <img v-if="numbers[1][index-1] == 0 && number_set[1][index-1]" src="../assets/small-cloud.png" />
              <img v-else-if="numbers[1][index-1] == 1 && number_set[1][index-1]" src="../assets/big-cloud.png" />
              <img v-else src="../assets/empty.png" />
            </div>
          </div>

          <div class="beschreibung">
            <br />Es wird regnen.
          </div>
        </div>

        <div class="dritte-reihe-kodierungen">
          <div class="codes">
            <div v-for='index in 5' :key='index'>
              <img v-if="numbers[2][index-1] == 0 && number_set[2][index-1]" src="../assets/small-cloud.png" />
              <img v-else-if="numbers[2][index-1] == 1 && number_set[2][index-1]" src="../assets/big-cloud.png" />
              <img v-else src="../assets/empty.png" />
            </div>
          </div>

          <div class="beschreibung">
            <br />Es wird schneien.
          </div>
        </div>
      </div>
      
      
      <br />Bob hat heute die nachfolgenden Rauchzeichen für die nächsten {{ anz_tage }} Tage gesendet. 
      Leider hat der Wind einige der Zeichen unkenntlich gemacht. Nutze die obigen Kodierungen, um Bobs Nachricht zu vervollständigen. <br /> <br />

      <div class="zeichenfolge">
        <!--<img v-if="seq_numbers[0][0] == 0" src="../assets/small-cloud.png" />
        <img v-if="seq_numbers[0][0] == 1" src="../assets/big-cloud.png" /> -->

        <div v-for="i in 5" :key="i">
          <img v-if="seq_numbers[0][i-1] == 0 && number_seq_set[0][i-1]" src="../assets/small-cloud.png" />
          <img v-else-if="seq_numbers[0][i-1] == 1 && number_seq_set[0][i-1]" src="../assets/big-cloud.png" />
          <div v-else droppable="true" class="drop-slot" id="drop-slot-1" @drop="drop($event,'2')" @dragover="allowDrop($event)"/>
        </div>

        <div v-for="i in 5" :key="i">
          <img v-if="seq_numbers[1][i-1] == 0 && number_seq_set[1][i-1]" src="../assets/small-cloud.png" />
          <img v-else-if="seq_numbers[1][i-1] == 1 && number_seq_set[1][i-1]" src="../assets/big-cloud.png" />
          <div v-else droppable="true" class="drop-slot" id="drop-slot-2" @drop="drop($event,'2')" @dragover="allowDrop($event)"/>
        </div>

        <div v-for="i in 5" :key="i">
          <img v-if="seq_numbers[2][i-1] == 0 && number_seq_set[2][i-1]" src="../assets/small-cloud.png" />
          <img v-else-if="seq_numbers[2][i-1] == 1 && number_seq_set[2][i-1]" src="../assets/big-cloud.png" />
          <div v-else droppable="true" class="drop-slot" id="drop-slot-3" @drop="drop($event,'2')" @dragover="allowDrop($event)"/>
        </div>
      </div>

      <br> Ziehe die unteren Rauchzeichen mit der Maus in die entsprechenden Lücken, um Bobs Nachricht zu vervollständigen. Um es zu löschen, ziehe es wieder zurück. <br> <br>
      <!--<img class="drag-el" draggable="true" @dragstart="drag($event)" src="../assets/small-cloud.png" />
      <img src="../assets/big-cloud.png" draggable="true"/>

      <br /> 

      <div class="drop-zone" @dragover="allowDrop($event)" @drop="drop($event)" >Drop-Zone</div>
      <div class="drop-zone">Drop-Zone</div>-->

      <!--<div id="div1" @drop="drop($event)" @dragover="allowDrop($event)"></div>-->

      <div class="start-area" id="start-area" @dragover="allowDrop($event)" @drop="drop($event, '1')">
        <img id="big-cloud-1" src="../assets/big-cloud.png" draggable="true" @dragstart="drag($event)" width="336" height="69">
        <img id="big-cloud-2" src="../assets/big-cloud.png" draggable="true" @dragstart="drag($event)" width="336" height="69">
        <img id="big-cloud-3" src="../assets/big-cloud.png" draggable="true" @dragstart="drag($event)" width="336" height="69">
        <img id="small-cloud-1" src="../assets/small-cloud.png" draggable="true" @dragstart="drag($event)" width="336" height="69">
        <img id="small-cloud-2" src="../assets/small-cloud.png" draggable="true" @dragstart="drag($event)" width="336" height="69">
        <img id="small-cloud-3" src="../assets/small-cloud.png" draggable="true" @dragstart="drag($event)" width="336" height="69">
      </div>

       <p>
          <button @click="submitAnswer()"
            type="button"
          >
          Prüfe Antwort
          </button>
        </p>
      <!--<img id="remove" src="../assets/remove.png" @dragover="allowDrop($event)" @drop="drop($event, '1')" width="336" height="69">-->
    <p v-if="submitted">Die Antwort ist {{result}}</p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SfErstellen',
  data() {
    return {
      numbers: [] as number[][],
      anz_tage: 3,
      seq_numbers: [] as number[][],
      number_set: [] as boolean[][],
      number_seq_set: [] as boolean[][],
      zahl_1: 0,
      zahl_2: 0,
      zahl_3: 0,
      auswahl_1: "none",
      auswahl_2: "none",
      auswahl_3: "none",
      gap_1: 0,
      gap_2: 0,
      gap_3: 0,
      submitted: false as boolean,
      result: "falsch.",
      selected_1: "",
      selected_2: "",
      selected_3: ""
      
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
    translate_ans(answer: string){
      if(answer.charAt(0)=='s'){
        return 0
      } else if(answer.charAt(0)=='b'){
        return 1
      }
    },
    submitAnswer(){
      var ans_1 = this.translate_ans(this.auswahl_1)
      var ans_2 = this.translate_ans(this.auswahl_2)
      var ans_3 = this.translate_ans(this.auswahl_3)
      var correct_1 = ans_1 == this.seq_numbers[0][this.gap_1]? true : false
      var correct_2 = ans_2 == this.seq_numbers[1][this.gap_2]? true : false
      var correct_3 = ans_3 == this.seq_numbers[2][this.gap_3]? true : false
      if(correct_1 && correct_2 && correct_3){
        this.result = "richtig."
      } else {
        this.result = "falsch."
      }
      this.submitted = true
    },
    drag(event: any){
      event.dataTransfer.setData("text", event.target.id);
    },
    drop_detail(event: any, detail: string){
      if(detail=='2'){  //in diesem fall wird element kopiert
        var data = event.dataTransfer.getData("text");
        var nodeCopy = document.getElementById(data)!.cloneNode(true);
        (nodeCopy as Element).id = "asdf";
        event.target.appendChild(nodeCopy);
      } else if(detail=='1'){ //in diesem fall wird element nicht kopiert
        var data = event.dataTransfer.getData("text");
        var node = document.getElementById(data)
        event.target.appendChild(node);
      }
      
    },
    drop(event: any, detail: string) {
      event.preventDefault();
      var data = event.dataTransfer.getData("text");
      var node = document.getElementById(data)
      event.target.appendChild(node);
      var slot = event.toElement.id
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
      //zuerst wollen wir das array "numbers" befüllen
      let new_array_o: number[][]
      do {          //solange die codes nicht verschieden sind, wiederhole folgendes
        console.log('duplikat gefunden, codes neu generiert')
        console.log(this.numbers)
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
      this.gap_1 = Math.floor((Math.random()*5))
      this.gap_2 = Math.floor((Math.random()*5))
      this.gap_3 = Math.floor((Math.random()*5))
      this.number_seq_set[0][this.gap_1] = false
      this.number_seq_set[1][this.gap_2] = false
      this.number_seq_set[2][this.gap_3] = false
      console.log(this.gap_1)
      console.log(this.gap_2)
      console.log(this.gap_3)
    },
    createRandomSequence(){
      this.zahl_1 = Math.floor(1 + (Math.random()*3))
      this.zahl_2 = Math.floor(1 + (Math.random()*3))
      this.zahl_3 = Math.floor(1 + (Math.random()*3))
      this.seq_numbers.push(this.numbers[this.zahl_1-1])
      this.seq_numbers.push(this.numbers[this.zahl_2-1])
      this.seq_numbers.push(this.numbers[this.zahl_3-1])
      console.log("zahl_1: %d; zahl_2: %d; zahl_3: %d", this.zahl_1, this.zahl_2, this.zahl_3)
    }
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