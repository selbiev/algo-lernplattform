<template>
  <h1>{{task_number}}. {{task_name}} ({{diff_level}})</h1>
  <img :src="getImage()" id="picture" />
  <div id="buttons">
    <button class="button" id="next_task" @click="reloadPage()">
      <img src="../assets/icons/skip.png" /> 
      <br> <span> Neue Aufgabe </span>
    </button>

    <router-link to="/" style="text-decoration: none; color: black">
      <button class="button" id="main_menu">
        
          <img id="main_menu_img" src="../assets/icons/home.png" />
          <br> <span> Zum Hauptmenü </span>
        
      </button>
    </router-link>
    
    <br> <br>
    <p v-if="has_diff_levels">Schwierigkeitsgrad wählen</p>
    <router-link v-if="has_leicht" :to="{name: this.task_name_code + '_leicht'}">
      <button v-if="has_leicht" class="button" id="leicht">
          <img src="../assets/icons/beaver1.png" />
      </button>
    </router-link>

    <router-link v-if="has_mittel" :to="{name: this.task_name_code + '_mittel'}">
      <button v-if="has_mittel" class="button" id="mittel">
          <img src="../assets/icons/beaver2.png" />
      </button>
    </router-link>

    <router-link v-if="has_schwer" :to="{name: this.task_name_code + '_schwer'}">
      <button v-if="has_schwer" class="button" id="schwer">
          <img src="../assets/icons/beaver3.png" />
      </button>
    </router-link>
  </div>
  
  
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HelloWorld',
  props: [
    'task_number',
    'task_name',
    'task_name_code',
    'diff_level',
    'picture',
    'has_diff_levels',
    'has_leicht',
    'has_mittel',
    'has_schwer',
  ],
  methods: {
    reloadPage(){
      location.reload()
    },
    getImage(){
      var pic = this.picture
      console.log(`../assets/${this.picture}.png`)
      return require(`../assets/${this.picture}.png`)
    },
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  span {
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-weight: normal;
  }

  img {
    height: 30px;
    width: auto;
  }

  .button {
    margin: 5px 13px 0 0;
    cursor: pointer;
    min-height: 60px;
    min-width: 60px;
    background-color: #ffe5b2;
    border-radius: 10px;
    border: solid black;
    border-width: thin;
  }

  #picture {
    width:50%; 
    height: auto
  }

  .button:hover {
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 90%);
  }

  #main_menu, #next_task {
    height: 80px;
    width: 150px;
  }

  router-link {
    text-decoration: none; 
    color: black;
  }
</style>
