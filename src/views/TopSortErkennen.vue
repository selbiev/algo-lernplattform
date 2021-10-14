<template>
  <div class="CodesErstellen">
    <router-link to="/">Hauptmenü</router-link> <br> <br>
    <img src="../assets/small-cloud.png" id="img" style="display: none"/>
    <canvas
      id="canvas" width="600" height="400" style="border:1px solid #d3d3d3;"
    ></canvas>

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
      submitted: false,
      Q: [],
      canvas: null,
      ctx: null,
      message: "Hello Vue!",
      vueCanvas: null,
      painting: false,
      nodes: [
        {
          id: 0, posX: 130, posY: 85, active: true, text: "Hose"
        },
        {
          id: 1, posX: 390, posY: 170, active: true, text: "Socken"
        },
        {
          id: 2, posX: 490, posY: 70, active: true, text: "Schuhe"
        },
        {
          id: 3, posX: 550, posY: 210, active: true, text: "T-Shirt"
        },
        {
          id: 4, posX: 45, posY: 170, active: true, text: "Unterhose"
        },
        {
          id: 5, posX: 240, posY: 200, active: true, text: "Jacke"
        },
        {
          id: 6, posX: 210, posY: 350, active: true, text: "Mütze"
        },
        {
          id: 7, posX: 290, posY: 30, active: true, text: "Gürtel"
        },
        {
          id: 8, posX: 90, posY: 310, active: true, text: "Handschuhe"
        },
        {
          id: 9, posX: 500, posY: 340, active: true, text: "Sonnenbrille"
        },
        {
          id: 10, posX: 350, posY: 300, active: true, text: "Pullover"
        }
      ],
      node_size: 15,
      edges: [
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
    }
  },
  mounted() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    this.vueCanvas = ctx;
    //this.fillRect();
    
    this.connect_nodes()
    this.draw_nodes()
    
    
  },
  props: {

  },
  methods : {
    draw_nodes(){
      var ctx = this.vueCanvas
      var n = this.nodes.length
      //var asdf = this.nodes.push({id: 16, posX: 1360, posY: 1330})
      for(let i = 0; i < n; i++){
        var curr_node = this.nodes[i]
        if(!curr_node.active){
          continue
        }
        ctx.beginPath()
        ctx.arc(curr_node.posX, curr_node.posY, this.node_size, 0, 2 * Math.PI)
        ctx.fillStyle = "#1490a3";
        ctx.fill();
        ctx.font = "12px Georgia";
        ctx.fillStyle = "black";
        ctx.fillText(curr_node.text,curr_node.posX-18,curr_node.posY+30)
        ctx.stroke()
      }
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
          ctx.beginPath()
          this.canvas_arrow(ctx, u.posX, u.posY, v.posX, v.posY);
          ctx.stroke()
        }
      }
    },
    define_ratio(dx, dy){
      var len = Math.abs(dx)+Math.abs(dy)
      if(len>=400){
        return 0.96
      } else {
        return ((0.0005*len) + 0.7625)
      }
      
    },

    canvas_arrow(ctx, fromx, fromy, tox, toy) {
      var dX = tox-fromx
      var dY = toy-fromy
      var ratio = this.define_ratio(dX,dY)
      console.log(ratio)
      tox = fromx + ((ratio)*dX)
      toy = fromy + ((ratio)*dY)
      var headlen = 10; // length of head in pixels
      var dx = tox - fromx;
      var dy = toy - fromy;
      var angle = Math.atan2(dy, dx);
      ctx.moveTo(fromx, fromy);
      ctx.lineTo(tox, toy);
      ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
      ctx.moveTo(tox, toy);
      ctx.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
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

</style>
