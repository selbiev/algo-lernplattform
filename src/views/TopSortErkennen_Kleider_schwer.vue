<template>
  <div class="CodesErstellen">
    <Tutorial 
        :video_name="'TopSortErkennen_Kleider'"
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
        :task_name="'Kleider Reihenfolge einstufen'" 
        :task_name_code="'TopSortErkennen_Kleider'"
        :task_number="'9'" 
        :picture="'kleider'"
        :has_diff_levels="true"
        :has_leicht="true"
        :has_mittel="false"
        :has_schwer="true"
        :next_task="'TopSortErstellen_Kleider_schwer'"/> <br><br>
    <img src="../assets/kleider/Hose.png" id="Hose" style="display: none;" lenx="333" leny="111"/>
    <img src="../assets/kleider/Socken.png" id="Socken" style="display: none"/>
    <img src="../assets/kleider/Schuhe.png" id="Schuhe" style="display: none"/>
    <img src="../assets/kleider/T-Shirt.png" id="T-Shirt" style="display: none"/>
    <img src="../assets/kleider/Unterhose.png" id="Unterhose" style="display: none"/>
    <img src="../assets/kleider/Jacke.png" id="Jacke" style="display: none"/>
    <img src="../assets/kleider/Mütze.png" id="Mütze" style="display: none"/>
    <img src="../assets/kleider/Gürtel.png" id="Gürtel" style="display: none"/>
    <img src="../assets/kleider/Handschuhe.png" id="Handschuhe" style="display: none"/>
    <img src="../assets/kleider/Sonnenbrille.png" id="Sonnenbrille" style="display: none"/>
    <img src="../assets/kleider/Pullover.png" id="Pullover" style="display: none"/>

    Wenn du dir Kleider anziehst, musst du die Reihenfolge beachten. <br>
    Zum Beispiel T-Shirt &rarr; Jacke bedeutet: Zuerst muss das T-Shirt und erst dann die Jacke angezogen werden.<br> <br>
    <canvas id="canvas" width="500" height="330" style="border:1px solid #d3d3d3;"></canvas> <br><br>
    Du möchtest die Kleider in der folgenden Reihenfolge anziehen. Ist das möglich?  <br><br>
    <div class="kleider">
      <div v-for='index in (top_ordering.length)' :key='index'>
        <img v-if="top_ordering[index-1]==0" src="../assets/kleider/Hose.png" />
        <img v-if="top_ordering[index-1]==1" src="../assets/kleider/Socken.png" />
        <img v-if="top_ordering[index-1]==2" src="../assets/kleider/Schuhe.png" />
        <img v-if="top_ordering[index-1]==3" src="../assets/kleider/T-Shirt.png" />
        <img v-if="top_ordering[index-1]==4" src="../assets/kleider/Unterhose.png" />
        <img v-if="top_ordering[index-1]==5" src="../assets/kleider/Jacke.png" />
        <img v-if="top_ordering[index-1]==6" src="../assets/kleider/Mütze.png" />
        <img v-if="top_ordering[index-1]==7" src="../assets/kleider/Gürtel.png" />
        <img v-if="top_ordering[index-1]==8" src="../assets/kleider/Handschuhe.png" />
        <img v-if="top_ordering[index-1]==9" src="../assets/kleider/Sonnenbrille.png" />
        <img v-if="top_ordering[index-1]==10" src="../assets/kleider/Pullover.png" />
      </div>
    </div>
    <br>
    <button id="ja" class="antwort_btn" @click="give_answer('ja')">
      Ja
    </button>
    <button id="nein" class="antwort_btn" @click="give_answer('nein')">
      Nein
    </button>

      <p v-if="submitted_ && result=='falsch.' && this.show && this.answer_given && !check_ordering(this.answers)">Folgendes Kleidungsstück zu früh gewählt: </p>
        <p>
        <img v-if="submitted_ && result=='falsch.' && this.show && this.answer_given && !check_ordering(this.answers) && wrong_cloth=='Handschuhe'" src="../assets/kleider/Handschuhe.png" />
        <img v-if="submitted_ && result=='falsch.' && this.show && this.answer_given && !check_ordering(this.answers) && wrong_cloth=='Socken'" src="../assets/kleider/Socken.png" />
        <img v-if="submitted_ && result=='falsch.' && this.show && this.answer_given && !check_ordering(this.answers) && wrong_cloth=='Gürtel'" src="../assets/kleider/Gürtel.png" />
        <img v-if="submitted_ && result=='falsch.' && this.show && this.answer_given && !check_ordering(this.answers) && wrong_cloth=='Schuhe'" src="../assets/kleider/Schuhe.png" />
        <img v-if="submitted_ && result=='falsch.' && this.show && this.answer_given && !check_ordering(this.answers) && wrong_cloth=='Jacke'" src="../assets/kleider/Jacke.png" />
        <img v-if="submitted_ && result=='falsch.' && this.show && this.answer_given && !check_ordering(this.answers) && wrong_cloth=='Mütze'" src="../assets/kleider/Mütze.png" />
        <img v-if="submitted_ && result=='falsch.' && this.show && this.answer_given && !check_ordering(this.answers) && wrong_cloth=='Pullover'" src="../assets/kleider/Pullover.png" />
        <img v-if="submitted_ && result=='falsch.' && this.show && this.answer_given && !check_ordering(this.answers) && wrong_cloth=='Unterhose'" src="../assets/kleider/Unterhose.png" />
        <img v-if="submitted_ && result=='falsch.' && this.show && this.answer_given && !check_ordering(this.answers) && wrong_cloth=='Hose'" src="../assets/kleider/Hose.png" />
        <img v-if="submitted_ && result=='falsch.' && this.show && this.answer_given && !check_ordering(this.answers) && wrong_cloth=='Sonnenbrille'" src="../assets/kleider/Sonnenbrille.png" />
        <img v-if="submitted_ && result=='falsch.' && this.show && this.answer_given && !check_ordering(this.answers) && wrong_cloth=='T-Shirt'" src="../assets/kleider/T-Shirt.png" />
      </p>

      <br>
      <Footer
        @next_task="reloadPage()"
        @check_answer="submitAnswer()"
        @reset="''"
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
      answer: false,
      submitted: false,
      submitted_: false,
      result: "falsch.",
      Q: [],
      canvas: null,
      reset: true,
      ordering_correct: true,
      top_ordering: [],
      answers: [],
      wrong_cloth: "",
      ctx: null,
      message: "Hello Vue!",
      vueCanvas: null,
      painting: false,
      images: [],
      nodes: [
        {id: 0, posX: 130, posY: 60, active: true, text: "Hose"},
        {id: 1, posX: 270, posY: 130, active: true, text: "Socken"},
        {id: 2, posX: 450, posY: 70, active: true, text: "Schuhe"},
        {id: 3, posX: 440, posY: 185, active: true, text: "T-Shirt"},
        {id: 4, posX: 45, posY: 125, active: true, text: "Unterhose"},
        {id: 5, posX: 170, posY: 160, active: true, text: "Jacke"},
        {id: 6, posX: 175, posY: 260, active: true, text: "Mütze"},
        {id: 7, posX: 290, posY: 30, active: true, text: "Gürtel"},
        {id: 8, posX: 55, posY: 200, active: true, text: "Handschuhe"},
        {id: 9, posX: 420, posY: 280, active: true, text: "Sonnenbrille"},
        {id: 10, posX: 290, posY: 200, active: true, text: "Pullover"}
      ],
      node_size: 15,
      edges: [
        /**brauchts id überhaupt??? */
        {id: 0, from_node: 0, to_node: 7},
        {id: 0, from_node: 4, to_node: 0},
        {id: 0, from_node: 1, to_node: 2},
        {id: 0, from_node: 10, to_node: 5},
        {id: 0, from_node: 3, to_node: 10},
        {id: 0, from_node: 0, to_node: 2},
        {id: 0, from_node: 10, to_node: 6},
        {id: 0, from_node: 10, to_node: 9},
        {id: 0, from_node: 5, to_node: 8},
      ],
      adj_list: [],   //klassische adjazenzliste, d.h. adj_list[i] = liste von nachbarsknoten von knoten i
      answer_given: false,
      show: false,
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

    console.log("Die Sortierung ist %s", this.ordering_correct? "korrekt" : "möglicherweise inkorrekt")
    //this.top_ordering = (this.ordering_correct)? this.create_valid_ordering() : this.create_random_ordering()
    this.draw_nodes()
    this.prepare_image_names()
    this.answers = this.top_ordering
    
    
  },
  props: {

  },
  methods : {
    reloadPage(){
      this.$router.go(0)
    },
    /**
     * <p v-if="submitted && result=='falsch.' && !check_ordering(this.top_ordering)">{{wrong_cloth}} zu früh gewählt.</p>
      <p v-if="submitted && result=='falsch.' && check_ordering(this.top_ordering)">Ist diese Reihenfolge wirklich falsch? Schau genauer hin.</p>

     */
    hint(){
      if(!this.answer_given){
        return "Bitte wähle aus, ob die Reihenfolge korrekt ist."
      }
      if(this.answer_given && this.submitted && this.result == 'falsch.' && this.check_ordering(this.top_ordering))
      {
        return "Ist diese Reihenfolge wirklich falsch? Schau genauer hin."
      }
      if(this.answer_given && this.submitted && this.result=='falsch.' && !this.check_ordering(this.top_ordering)){
        return this.wrong_cloth + " zu früh gewählt."
      }
      return ""
    },
    give_answer(antwort){
      this.show = false
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
    submitAnswer(){
      this.show = true
      var solution = this.check_ordering(this.top_ordering)
      console.log(this.answer)
      console.log(solution)
      if(this.answer_given && solution==true && this.answer==true){
        this.result = "korrekt."
      } else if(this.answer_given && solution==false && this.answer==false){
        this.result = "korrekt."
      } else {
        this.result = "falsch."
      }
      this.submitted = true
      this.submitted_ = true
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
      //console.log(this.top_ordering)
      var image1 = document.getElementById('Hose');
      var image2 = document.getElementById('Socken')
      var image3 = document.getElementById('Schuhe')
      var image4 = document.getElementById('T-Shirt')
      var image5 = document.getElementById('Unterhose')
      var image6 = document.getElementById('Jacke')
      var image7 = document.getElementById('Mütze')
      var image8 = document.getElementById('Gürtel')
      var image9 = document.getElementById('Handschuhe')
      var image10 = document.getElementById('Sonnenbrille')
      var image11 = document.getElementById('Pullover')

      var x_offset = -20
      var y_offset = -25
      if(this.contained_in_to(0)){
        image1.addEventListener('load', e => {
          ctx.drawImage(image1, this.nodes[0].posX + x_offset, this.nodes[0].posY + y_offset);
        });
      } 

      if(this.contained_in_to(1)){
        image2.addEventListener('load', e => {
          ctx.drawImage(image2, this.nodes[1].posX + x_offset, this.nodes[1].posY + y_offset);
        });
      }

      if(this.contained_in_to(2)){
        image3.addEventListener('load', e => {
          ctx.drawImage(image3, this.nodes[2].posX + x_offset, this.nodes[2].posY + y_offset);
        });
      }

      if(this.contained_in_to(3)){
        image4.addEventListener('load', e => {
          ctx.drawImage(image4, this.nodes[3].posX + x_offset, this.nodes[3].posY + y_offset);
        });
      }

      if(this.contained_in_to(4)){
        image5.addEventListener('load', e => {
          ctx.drawImage(image5, this.nodes[4].posX + x_offset, this.nodes[4].posY + y_offset);
        });
      }

      if(this.contained_in_to(5)){
        image6.addEventListener('load', e => {
          ctx.drawImage(image6, this.nodes[5].posX + x_offset, this.nodes[5].posY + y_offset);
        });
      }

      if(this.contained_in_to(6)){
        image7.addEventListener('load', e => {
          ctx.drawImage(image7, this.nodes[6].posX + x_offset, this.nodes[6].posY + y_offset);
        });
      }

      if(this.contained_in_to(7)){
        image8.addEventListener('load', e => {
          ctx.drawImage(image8, this.nodes[7].posX + x_offset, this.nodes[7].posY + y_offset);
        });
      }

      if(this.contained_in_to(8)){
        image9.addEventListener('load', e => {
          ctx.drawImage(image9, this.nodes[8].posX + x_offset, this.nodes[8].posY + y_offset);
        });
      }

      if(this.contained_in_to(9)){
        image10.addEventListener('load', e => {
          ctx.drawImage(image10, this.nodes[9].posX + x_offset, this.nodes[9].posY + y_offset);
        });
      }

      if(this.contained_in_to(10)){
        image11.addEventListener('load', e => {
          ctx.drawImage(image11, this.nodes[10].posX + x_offset, this.nodes[10].posY + y_offset);
        });
      }

      var n = this.nodes.length
      //var asdf = this.nodes.push({id: 16, posX: 1360, posY: 1330})
      for(let i = 0; i < n; i++){
        var curr_node = this.nodes[i]
        if(!curr_node.active){
          continue
        }
        /*var image = document.getElementById(curr_node.text)
        console.log(image)
        image.addEventListener('load', e => {
          ctx.drawImage(image, curr_node.posX, curr_node.posY);
        });*/
        /*ctx.beginPath()
        ctx.arc(curr_node.posX, curr_node.posY, this.node_size, 0, 2 * Math.PI)
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
    /**
     * nimmt eine topologische sortierung und gibt true zurück, wenn sie korrekt ist und false andernfalls
     */
    check_ordering(ordering){
      var in_degrees = this.create_in_degrees()
      
      for(let i = 0; i < ordering.length; i++){
        var node = ordering[i]
        if(in_degrees[node]>0){   //wenns eine kante auf sich zeigen hat, darf knoten noch nicht genommen werden
          this.wrong_cloth = this.nodes[node].text
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
      if(len>=400){
        return 0.86
      } else {
        return (0.0012*len + 0.46)
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
      return "Regel: Ein Pfeil von T-Shirt zu Jacke bedeutet, dass das T-Shirt vor der Jacke angezogen werden muss. Versuche, mit dieser "+
        "Regel zu sehen, ob die untere Reihenfolge korrekt ist oder nicht. Sie ist genau dann korrekt, wenn die genannte Regel "+
        "nie verletzt wird."
    }
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
