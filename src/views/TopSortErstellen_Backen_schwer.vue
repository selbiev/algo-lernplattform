<template>
  <div class="CodesErstellen">
    <Tutorial 
        :video_name="'TopSortErstellen_Backen'"
        :description="task_description()"
        v-if="showTutorial == 'true'"
        @close-tutorial="showTutorial = 'false'" />

    <Verifier 
        :correctSolution="this.result == 'korrekt.'"
        v-if="this.submitted" 
        :tip="hint()"
        @close-verifier="this.submitted = false" />

    <Header 
        :diff_level="'schwer'" 
        :task_name="'Kuchen Backen Reihenfolge angeben'" 
        :task_name_code="'TopSortErstellen_Backen'"
        :task_number="'14'" 
        :picture="'tisch_decken'"
        :has_diff_levels="false"
        :has_leicht="false"
        :has_mittel="false"
        :has_schwer="false"
        :next_task="'SfErkennen_leicht'"/> <br><br>

    Du willst einen Kuchen backen und ihn zusammen mit deinen Freunden essen.  <br> <br>
    <img src="../assets/backen/beschreibungs_bild.png" style="width: 350px; height: auto"/> <br> <br>
    Beim obigen Bild muss man zuerst die linke Aktivität und danach die rechte Aktivität durchführen. <br> <br>
    <canvas id="canvas" width="870" height="500" style="border:1px solid #d3d3d3;"></canvas> <br><br>
    In welcher Reihenfolge kannst du das machen? Ziehe die Aufgaben in die Lücken. <br><br>Um die Wahl rückgängig zu machen, ziehe die sie wieder zurück. Falls du ein Tablet benutzt, klicke zuerst auf eine Aktivität und danach auf eine Lücke.
    <br> <br>

    <div class="drop-slots">
      <div v-for="i in top_ordering.length" :key="i">
        <div class="drop-slot" droppable="true" :id=(i-1) @drop="drop($event)" @dragover="allowDrop($event)" @click="pasteItem($event, i-1)"/>
      </div>
    </div>
    <br>

    <div class="start-area" id="start-area" @dragover="allowDrop($event)" @drop="drop($event)" @click="pasteItem($event, 'start-area')">
      <img v-if="nodes[0].active" id="k_auftischen" src="../assets/backen/k_auftischen.png" draggable="true" @click="selectItem($event,'k_auftischen')" @dragstart="drag($event)" width="336" height="69">
      <img v-if="nodes[1].active" id="b_lassen" src="../assets/backen/b_lassen.png" draggable="true" @click="selectItem($event,'b_lassen')" @dragstart="drag($event)" width="336" height="69">
      <img v-if="nodes[2].active" id="bm_fuellen" src="../assets/backen/bm_fuellen.png" draggable="true" @click="selectItem($event,'bm_fuellen')" @dragstart="drag($event)" width="336" height="69">
      <img v-if="nodes[3].active" id="bm_vorbereiten" src="../assets/backen/bm_vorbereiten.png" draggable="true" @click="selectItem($event,'bm_vorbereiten')" @dragstart="drag($event)" width="336" height="69">
      <img v-if="nodes[4].active" id="freunde_einladen" src="../assets/backen/freunde_einladen.png" draggable="true" @click="selectItem($event,'freunde_einladen')" @dragstart="drag($event)" width="336" height="69">
      <img v-if="nodes[5].active" id="essen" src="../assets/backen/essen.png" draggable="true" @click="selectItem($event,'essen')" @dragstart="drag($event)" width="336" height="69">
      <img v-if="nodes[6].active" id="e_guete" src="../assets/backen/e_guete.png" draggable="true" @click="selectItem($event,'e_guete')" @dragstart="drag($event)" width="336" height="69">
      <img v-if="nodes[7].active" id="t_decken" src="../assets/backen/t_decken.png" draggable="true" @click="selectItem($event,'t_decken')" @dragstart="drag($event)" width="336" height="69">
      <img v-if="nodes[8].active" id="o_vorheizen" src="../assets/backen/o_vorheizen.png" draggable="true" @click="selectItem($event,'o_vorheizen')" @dragstart="drag($event)" width="336" height="69">
    </div>

    <p v-if="submitted_ && result=='falsch.' && !this.reset && !check_ordering(this.answers) && all_slots_used()">Folgende Aktivität zu früh gewählt: </p>
        <p>
        <img v-if="submitted_ && result=='falsch.' && !this.reset && !check_ordering(this.answers) && all_slots_used() && wrong_cloth=='k_auftischen'" src="../assets/backen/k_auftischen.png" />
        <img v-if="submitted_ && result=='falsch.' && !this.reset && !check_ordering(this.answers) && all_slots_used() && wrong_cloth=='b_lassen'" src="../assets/backen/b_lassen.png" />
        <img v-if="submitted_ && result=='falsch.' && !this.reset && !check_ordering(this.answers) && all_slots_used() && wrong_cloth=='bm_fuellen'" src="../assets/backen/bm_fuellen.png" />
        <img v-if="submitted_ && result=='falsch.' && !this.reset && !check_ordering(this.answers) && all_slots_used() && wrong_cloth=='bm_vorbereiten'" src="../assets/backen/bm_vorbereiten.png" />
        <img v-if="submitted_ && result=='falsch.' && !this.reset && !check_ordering(this.answers) && all_slots_used() && wrong_cloth=='freunde_einladen'" src="../assets/backen/freunde_einladen.png" />
        <img v-if="submitted_ && result=='falsch.' && !this.reset && !check_ordering(this.answers) && all_slots_used() && wrong_cloth=='essen'" src="../assets/backen/essen.png" />
        <img v-if="submitted_ && result=='falsch.' && !this.reset && !check_ordering(this.answers) && all_slots_used() && wrong_cloth=='e_guete'" src="../assets/backen/e_guete.png" />
        <img v-if="submitted_ && result=='falsch.' && !this.reset && !check_ordering(this.answers) && all_slots_used() && wrong_cloth=='t_decken'" src="../assets/backen/t_decken.png" />
        <img v-if="submitted_ && result=='falsch.' && !this.reset && !check_ordering(this.answers) && all_slots_used() && wrong_cloth=='o_vorheizen'" src="../assets/backen/o_vorheizen.png" />
      </p>
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
    Tutorial
  },
  data() {
    return {
      showTutorial: false,
      submitted: false,
      submitted_: false,
      result: "falsch.",
      Q: [],
      canvas: null,
      ordering_correct: true,
      top_ordering: [],
      wrong_cloth: "",
      answers: [],
      ctx: null,
      message: "Hello Vue!",
      vueCanvas: null,
      painting: false,
      images: [],
      selected: false,
      selectedItem: "",
      reset: false,
      nodes: [
        {id: 0, posX: 750, posY: 220, active: true, text: "k_auftischen"},
        {id: 1, posX: 530, posY: 120, active: true, text: "b_lassen"},
        {id: 2, posX: 310, posY: 120, active: true, text: "bm_fuellen"},
        {id: 3, posX: 135, posY: 220, active: true, text: "bm_vorbereiten"},
        {id: 4, posX: 120, posY: 100, active: true, text: "freunde_einladen"},
        {id: 5, posX: 370, posY: 450, active: true, text: "essen"},
        {id: 6, posX: 390, posY: 300, active: true, text: "e_guete"},
        {id: 7, posX: 670, posY: 390, active: true, text: "t_decken"},
        {id: 8, posX: 740, posY: 70, active: true, text: "o_vorheizen"},
      ],
      edges: [
        /**brauchts id überhaupt??? */
        {id: 1, from_node: 4, to_node: 3},
        {id: 1, from_node: 3, to_node: 2},
        {id: 1, from_node: 2, to_node: 1},
        {id: 1, from_node: 1, to_node: 0},
        {id: 1, from_node: 8, to_node: 1},
        {id: 1, from_node: 0, to_node: 6},
        {id: 1, from_node: 7, to_node: 6},
        {id: 1, from_node: 6, to_node: 5},
      ],
      adj_list: [],   //klassische adjazenzliste, d.h. adj_list[i] = liste von nachbarsknoten von knoten i
      previously_selected_items: [],
    }
  },
  mounted() {
    //initialisierung des graphen
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    this.vueCanvas = ctx;
    this.create_adj_list()
    this.take_subset_of_nodes()   //nimm zufällige teilmenge der nodes
    
    while(!this.at_least_one_edge()){   //prof. hromkovic will, dass immer mindestens eine kante im graphen ist
      this.take_subset_of_nodes()   
    }
    
    
    this.keep_trans_relation()
    this.connect_nodes()
    
    
    //mit 50% wahrscheinlichkeit geben wir eine korrekte topologische sortierung
    //und mit 50% geben wir eine zufällige sortierung (vllt richtig vllt falsch) aus
    //warum so? weil wenn wir immer eine zufällige sortierung ausgeben, habe ich das gefühl
    //dass sie meistens falsch sein wird.
    this.ordering_correct = (Math.round(Math.random())==1)? true : false
    
    if(this.ordering_correct){
      this.create_valid_ordering()
    } else {
      this.create_random_ordering()
    }

    //console.log("Die Sortierung ist %s", this.ordering_correct? "korrekt" : "möglicherweise inkorrekt")
    //this.top_ordering = (this.ordering_correct)? this.create_valid_ordering() : this.create_random_ordering()
    this.draw_nodes()
    this.prepare_image_names()
    this.initialize_answers()    
    
  },
  props: {

  },
  methods : {
    reloadPage(){
      this.$router.go(0)
    },
    hint(){
      if(this.submitted_ && this.result=='falsch.' && !this.all_slots_used()){
        return "Bitte fülle alle Lücken aus."
      }
      //<p v-if="submitted_ && result=='falsch.' && !all_slots_used()">Bitte fülle alle Lücken aus.</p>
    },  
    deselectAll(){
      for(let i = 0; i < this.previously_selected_items.length; i++){
        document.getElementById(this.previously_selected_items[i]).style.border = "none"
      }
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
        this.previously_selected_items.push(id)
      }
    },
    clearDropslots(){
      for(let i = 0; i < this.top_ordering.length; i++){
        var curr_slot = document.getElementById(i)
        if(curr_slot.childNodes.length==0){
          continue
        }
        document.getElementById("start-area").appendChild(curr_slot.childNodes[0])
        curr_slot.innerHTML = ""
      }
      for(let i = 0; i < this.answers.length; i++){
        this.answers[i] = -1
      }
      this.reset = true
    },
    move_item(targetplace_id,item_id){
      console.log("targetplace_id = ", targetplace_id, "   item_id = ", item_id)
      var item_to_move_nr = this.get_id_by_name(item_id)

      //räume den alten slot im antworten-array auf, falls es das item enthielt
      for(let i = 0; i < this.answers.length; i++){
        if(this.answers[i]==item_to_move_nr){
          this.answers[i] = -1
          console.log("the objekt ", item_to_move_nr, " was before in slot ", i, " and now answers[",i,"] has been cleared")
        }
      }

      //nun verschieben wir effektiv das objekt
      document.getElementById(targetplace_id).appendChild(document.getElementById(item_id))

      //nun machen wir fallunterscheidung: was ist targetplace?
      if(targetplace_id=='start-area'){   //es ist start-area
        this.reset = true
      } else if(isNaN(parseInt(targetplace_id))){   //es ist ein anderes bild
        console.log("falscher slot, das objekt wird in nun in das start-area gelegt")
        document.getElementById("start-area").appendChild(document.getElementById(targetplace_id).childNodes[0])   //verschiebe es in das start-area
        document.getElementById(targetplace_id).innerHTML = ""
        this.reset = true   //immer wenn wir etwas ins start-area schieben, setzen wir das auf true
      } else {    //es ist ein slot
        this.reset = false
        this.answers[parseInt(targetplace_id)] = item_to_move_nr  //answers-array anpassen mit neuem objekt
      }
    },
    pasteItem(event, target){   //target ist der ORT wo ein neues objekt eingefügt wurde, z.B. start-area oder zahl zwischen 0 und #slots-1
      event.stopPropagation()
      //nur handeln in einem der folgenden fälle: element wurde ausgewählt und target enthält noch kein element
      //ODER target ist start-area. in allen anderen fällen mache gar nichts.
      if((this.selected && document.getElementById(target).childNodes.length <= 0) || event.target.id == 'start-area'){
        this.result = ""

        var targetplace_id = target
        var item_id = this.selectedItem

        this.move_item(targetplace_id,item_id)   //die ganze move-logik ist in dieser methode enthalten
        
        this.selected = false
        document.getElementById(item_id).style.border = "none"
      }
    },
    submitAnswer(){
      if(this.check_ordering(this.answers)){
        this.result = "korrekt."
      } else {
        this.result = "falsch."
      }
      if(this.reset){
        this.result = "falsch."
      }
      this.submitted = true
      this.submitted_ = true
    },
    
    all_slots_used(){
      for(let i = 0; i < this.answers.length; i++){
        if(this.answers[i]==-1){
          return false
        }
      }
      return true
    },
    drag(event){
      event.dataTransfer.setData("text", event.target.id);
    },
    drop(event) {
      this.result = ""
      event.preventDefault();
      this.reset = false
      var data = event.dataTransfer.getData("text");
      //var node = document.getElementById(data)
      if(event.target.childNodes.length > 0 && event.target.id != 'start-area'){
        return
      }
      var targetplace_id = event.target.id
      var item_id = data
      this.move_item(targetplace_id,item_id)
    },
    allowDrop(event) {
      event.preventDefault();
    },
    at_least_one_edge(){
      for(let i = 0; i < this.edges.length; i++){
        var edge = this.edges[i]
        if(this.nodes[edge.from_node].active && this.nodes[edge.to_node].active){
          return true
        }
      }
      console.log("no edge in the graph")
      return false    //wenn wir bis hierher keine kante gefunden haben, returne false
    },
    get_id_by_name(name){
      for(let i = 0; i < this.nodes.length; i++){
        if(this.nodes[i].text==name){
          return i
        }
      }
      return -1
    },
    prepare_image_names(){
      //console.log("top ord len")
      //console.log(this.top_ordering)
      for(let i = 0; i < this.top_ordering.length; i++){
        var node = this.top_ordering[i]
        //console.log(node)
        var node_name = this.nodes[node].text + ".png"
        this.images.push(node_name)
      }
    },
    draw_node(image, curr_node){

    },
    contained_in_to(node_number){
      for(let i = 0; i < this.top_ordering.length; i++){
        
        if(this.top_ordering[i]==node_number){
          
          return true
        }
      }
      return false
    },
    draw_nodes(){
      var ctx = this.vueCanvas
      var image0 = document.getElementById('k_auftischen');
      var image1 = document.getElementById('b_lassen')
      var image2 = document.getElementById('bm_fuellen')
      var image3 = document.getElementById('bm_vorbereiten')
      var image4 = document.getElementById('freunde_einladen')
      var image5 = document.getElementById('essen')
      var image6 = document.getElementById('e_guete')
      var image7 = document.getElementById('t_decken')
      var image8 = document.getElementById('o_vorheizen')

      var x_offset = -60
      var y_offset = -33
      if(this.contained_in_to(0)){
        image0.addEventListener('load', e => {
          ctx.drawImage(image0, this.nodes[0].posX + x_offset, this.nodes[0].posY + y_offset);
        });
      } 

      if(this.contained_in_to(1)){
        image1.addEventListener('load', e => {
          ctx.drawImage(image1, this.nodes[1].posX + x_offset, this.nodes[1].posY + y_offset);
        });
      }

      if(this.contained_in_to(2)){
        image2.addEventListener('load', e => {
          ctx.drawImage(image2, this.nodes[2].posX + x_offset, this.nodes[2].posY + y_offset);
        });
      }

      if(this.contained_in_to(3)){
        image3.addEventListener('load', e => {
          ctx.drawImage(image3, this.nodes[3].posX + x_offset, this.nodes[3].posY + y_offset);
        });
      }

      if(this.contained_in_to(4)){
        image4.addEventListener('load', e => {
          ctx.drawImage(image4, this.nodes[4].posX + x_offset, this.nodes[4].posY + y_offset);
        });
      }

      if(this.contained_in_to(5)){
        image5.addEventListener('load', e => {
          ctx.drawImage(image5, this.nodes[5].posX + (-50), this.nodes[5].posY + (-40));
        });
      }

      if(this.contained_in_to(6)){
        image6.addEventListener('load', e => {
          ctx.drawImage(image6, this.nodes[6].posX + x_offset, this.nodes[6].posY + y_offset);
        });
      }

      if(this.contained_in_to(7)){
        image7.addEventListener('load', e => {
          ctx.drawImage(image7, this.nodes[7].posX + x_offset, this.nodes[7].posY + y_offset);
        });
      }

      if(this.contained_in_to(8)){
        image8.addEventListener('load', e => {
          ctx.drawImage(image8, this.nodes[8].posX + x_offset, this.nodes[8].posY + y_offset);
        });
      }
/*
      if(this.contained_in_to(9)){
        image9.addEventListener('load', e => {
          ctx.drawImage(image9, this.nodes[9].posX + x_offset, this.nodes[9].posY + y_offset);
        });
      }

      if(this.contained_in_to(10)){
        image10.addEventListener('load', e => {
          ctx.drawImage(image10, this.nodes[10].posX + x_offset, this.nodes[10].posY + y_offset);
        });
      }

      if(this.contained_in_to(11)){
        image11.addEventListener('load', e => {
          ctx.drawImage(image11, this.nodes[11].posX + x_offset, this.nodes[11].posY + y_offset);
        });
      }
*/
      var n = this.nodes.length
      //var asdf = this.nodes.push({id: 16, posX: 1360, posY: 1330})
      for(let i = 0; i < n; i++){
        var curr_node = this.nodes[i]
        if(!curr_node.active){
          continue
        }
        /*var image = document.getElementById(curr_node.text)
        image.addEventListener('load', e => {
          ctx.drawImage(image, curr_node.posX, curr_node.posY);
        });*/
        /*ctx.beginPath()
        ctx.arc(curr_node.posX, curr_node.posY, 15, 0, 2 * Math.PI)
        ctx.fillStyle = "#1490a3";
        ctx.fill();
        ctx.font = "12px Georgia";
        ctx.fillStyle = "black";
        ctx.fillText(curr_node.id + ": " + curr_node.text,curr_node.posX-18,curr_node.posY+30)
        ctx.stroke()*/
      }
    },
    make_edge(ctx, u, v){
      ctx.beginPath()
      this.canvas_arrow(ctx, u.posX, u.posY, v.posX, v.posY);
      //console.log("edge (%d,%d) made",u.id, v.id)
      ctx.stroke()
    },
    connect_nodes(){
      var ctx = this.vueCanvas

      var ctx = this.vueCanvas
      var m = this.edges.length
      
      for(let i = 0; i < m; i++) {
        var e = this.edges[i]
        var u = this.nodes[(e.from_node)]
        var v = this.nodes[(e.to_node)]
        if(u.active && v.active){
          this.make_edge(ctx,u,v)
        }
      }
    },
    create_adj_list(){
      for(let i = 0; i < this.nodes.length; i++){
        this.adj_list.push([])    //initiale, leere nachbarsliste von jedem knoten
      }

      for(let i = 0; i < this.edges.length; i++){
        var e = this.edges[i]
        var u = this.nodes[e.from_node]
        var v = this.nodes[e.to_node]
        
        
        if(u.active && v.active){
          this.adj_list[u.id].push(v.id)
        }
        
      }
    },
    edges_contains(u,v){
      for(let i = 0; i < this.edges.length; i++){
        if(this.edges[i].from_node==u && this.edges[i].to_node==v){
          return true
        }
      }
      return false
    },
    /**
     * diese funktion hat zum ziel, dass wenn z.B. (a) -> (b) -> (c) abhängigkeiten bestehen und (b)
     * nicht aktiviert wurde, dass trotzdem die relation (a) -> (c) beibehalten wird, für den ganzen graphen
     * den algorithmus habe ich woanders dokumentiert, ich erkläre ihn hier nicht
     */
    keep_trans_relation(){
      for(let i = 0; i < this.edges.length; i++){
        var e = this.edges[i]
        var u = e.from_node
        var v = e.to_node
        if((this.nodes[u].active) && !(this.nodes[v].active)){
            
          //bzgl. push() und pop() funktioniert der array wie ein stack. das kommt uns gelegen,
          //weil wir eine tiefensuche machen möchten
          var Q = []  
          var neighbours = this.adj_list[this.nodes[u].id]
          for(let j = 0; j < neighbours.length; j++){
            Q.push(neighbours[j])
          }
          while(!(Q.length <= 0)){
            var node = Q.pop()
            if(this.nodes[node].active){
              if(!this.edges_contains(u,node)){
                this.edges.push({id:0, from_node: u, to_node: node})
                this.adj_list[u].push(node)
                
              }
              //this.make_trans_edge(u,node)
            } else {
              var neighbours_node = this.adj_list[node]
              for(let j = 0; j < neighbours_node.length; j++){
                Q.push(neighbours_node[j])
              }
            }
          }
        }
      }
    },
    take_subset_of_nodes(){
      for(let i = 0; i < this.nodes.length; i++){
        
        //aktiviere den knoten mit 50% wahrscheinlichkeit
        this.nodes[i].active = (Math.round(Math.random())==1)? true : false
      }
      //this.keep_trans_relation()  //stelle sicher, dass transitive abhängigkeiten bewahrt werden
    },
    create_in_degrees(){
      var in_degrees = []
      for(let i = 0; i < this.nodes.length; i++){
        in_degrees.push(0)
      }
      for(let i = 0; i < this.edges.length; i++){
        var u = this.edges[i].from_node;
        var v = this.edges[i].to_node;
        if(this.nodes[u].active && this.nodes[v].active){
          in_degrees[v]++
        }
      }
      return in_degrees
    },
    get_text(id){
      switch (id) {
        case 0:
          return "k_auftischen"
        case 1:
          return "b_lassen"
        case 2:
          return "bm_fuellen"
        case 3:
          return "bm_vorbereiten"
        case 4:
          return "freunde_einladen"
        case 5:
          return "essen"
        case 6:
          return "e_guete"
        case 7:
          return "t_decken"
        case 8:
          return "o_vorheizen"
      }
    },
    /**
     * nimmt eine topologische sortierung und gibt true zurück, wenn sie korrekt ist und false andernfalls
     */
    check_ordering(ordering){
      console.log("ordering",ordering)
      var in_degrees = this.create_in_degrees()
      
      for(let i = 0; i < ordering.length; i++){
        if(ordering[i]==-1){
          return false
        }
        var node = ordering[i]
        if(in_degrees[node]>0){   //wenns eine kante auf sich zeigen hat, darf knoten noch nicht genommen werden
          this.wrong_cloth = this.get_text(node)
          console.log("wrong cloth: ", this.wrong_cloth)
          return false
        }
        for(let j = 0; j < this.adj_list[node].length; j++){
          var neighbour = this.adj_list[node][j]
          in_degrees[neighbour]--
        }
      }

      return true
    },

    create_random_ordering(){
      var ordering = []
      var num_active_nodes = 0
      var active_nodes = []
      var already_taken = []
      for(let i = 0; i < this.nodes.length; i++){
        if(this.nodes[i].active){
          num_active_nodes++
          active_nodes.push(i)
        }
        already_taken.push(false)
      }
      while(ordering.length < num_active_nodes){
        var n = this.nodes.length
        var next_in_ordering = Math.floor(Math.random()*n)
        next_in_ordering = (next_in_ordering>=n)? next_in_ordering-1 : next_in_ordering    //in rare situations, Math.random() might be exactly 1
        if(this.nodes[next_in_ordering].active && !already_taken[next_in_ordering]){
          ordering.push(next_in_ordering)
          already_taken[next_in_ordering] = true
        }
      }
      //console.log(ordering)
      this.top_ordering = ordering
    },
    number_of_active_nodes(){
      var num_active_nodes = 0
      for(let i = 0; i < this.nodes.length; i++){
        if(this.nodes[i].active){
          num_active_nodes++
        }
      }
      return num_active_nodes
    },
    initialize_answers(){
      var nans = this.number_of_active_nodes()
      for(let i = 0; i < nans; i++){
        this.answers.push(-1)
      }
    },

    create_valid_ordering(){
      var num_active_nodes = 0
      for(let i = 0; i < this.nodes.length; i++){
        if(this.nodes[i].active){
          num_active_nodes++
        }
      }
      var in_degrees = this.create_in_degrees()
      var top_ordering = []
      while(top_ordering.length < num_active_nodes){
        for(let i = 0; i < in_degrees.length; i++){
          var node = i
          if(this.nodes[node].active && in_degrees[i]==0){
            top_ordering.push(node)
            in_degrees[i] = -1

            for(let j = 0; j < this.adj_list[node].length; j++){
              var neighbour = this.adj_list[node][j]
              //console.log("nachbar %d gefunden. dessen degree ist zuerst %d",neighbour,in_degrees[neighbour])
              in_degrees[neighbour]--
              //console.log("in_degrees[%d] ist jetzt %d", neighbour, in_degrees[neighbour])
            }
          }
        }
      }
      this.top_ordering = top_ordering
    },


    define_ratio(dx, dy){
      var len = Math.abs(dx)+Math.abs(dy)
      
      if(len>=600){
        var a = 0.00035
        var b = 0.610448
        var r = len*a + b
        return r
      } 
      else if(len>=400){
        var a = 0.0003
        var b = 0.610448
        var r = len*a + b
        return r
      } 
      else if(len>=250){
        var a = 0.0002
        var b = 0.610448
        var r = len*a + b
        return r
      } 
      else {
        var a = 0.00012
        var b = 0.610448
        var r = len*a + b
        return r
      }
    },

    /**
     * das meiste von diesem code habe ich aus stackoverflow
     * https://stackoverflow.com/questions/808826/draw-arrow-on-canvas-tag
     * die erste antwort. weil ich aber wollte, dass die pfeile nicht bis
     * zur mitte der knoten gehen (sieht nicht gut aus) habe ich noch
     * einen faktor (ratio) definiert, der die pfeile kürzer macht.
     * weil das nicht gleich funktioniert für lange und kurze pfeile, habe ich
     * zwei extreme grössen (lange und kurzer pfeil) genommen und geschaut,
     * welche faktoren für sie eignen und dann den rest interpoliert.
     * die lineare funktion davon ist in define_ratio().
     */
    canvas_arrow(ctx, fromx, fromy, tox, toy) {
      var dX = tox-fromx
      var dY = toy-fromy
      var ratio = this.define_ratio(dX,dY)
      tox = fromx + ((ratio)*dX)
      toy = fromy + ((ratio)*dY)
      var headlen = 10; // length of head in pixels     ab hier code aus internet, bis hier eigener code
      var dx = tox - fromx;
      var dy = toy - fromy;
      var angle = Math.atan2(dy, dx);
      ctx.moveTo(fromx, fromy);
      ctx.lineTo(tox, toy);
      ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
      ctx.moveTo(tox, toy);
      ctx.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
    },
    task_description(){
      return "Regel: Ein Pfeil von einer Aktivität A zu einer Aktivität B bedeutet, dass A früher ausgeführt werden muss als B."+
        " Versuche mit dieser Regel eine korrekte Abfolge der Back-Aktivitäten anzugeben. Sie ist genau dann korrekt, "+
        "wenn die genannte Regel nie verletzt wird."
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

    img {
      width: auto;
      height: 80px;
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

    .drop-slots {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
    }

    .drop-slot {
      height: 73px;
      width: 125px;
      padding: 0 7px 10px 0px;
      margin: 2px 2px 0 0;
      border: 1px solid black;
      border-style: dashed;
      justify-content: center;
      align-items: center;
    }

    .start-area{
      width: 60%;
      min-height: 60px;
      border: 1px solid black;
      margin: 0 auto;
    }

</style>
