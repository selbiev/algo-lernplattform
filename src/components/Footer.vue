<template>
  
  <div id="buttons">
    <button class="button" id="next_task" @click="next_task()">
      <img src="../assets/icons/skip.png" /> 
      <br> <span> Nächste Aufgabe </span>
    </button>

    
    <button class="button" id="check" @click="check_answer()">
        <img src="../assets/icons/check.png" />
        <br> <span> Antwort prüfen </span>
    </button>

    <button class="button" id="restart" @click="reset()">
        <img src="../assets/icons/restart.png" />
        <br> <span> Neu starten </span>
    </button>

    <button class="button" id="info" @click="info()">
        <img src="../assets/icons/info.png" />
        <br> <span> Anleitung </span>
    </button>
    
  </div>
  
  
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HelloWorld',
  props: [
    
  ],
  created: function(){
    this.$emit('messageFromChild', "------------ hello from child to parent ------------")
  },
  methods: {
    reloadPage(){
      location.reload()
    },
    getImage(){
      var pic = this.picture
      console.log(`../assets/${this.picture}.png`)
      return require(`../assets/${this.picture}.png`)
    },
    next_task(){
      this.$emit('next_task')
    },
    check_answer(){
      this.$emit('check_answer')
    },
    reset(){
      this.$emit('reset')
    },
    info(){
      this.$emit('info')
    }

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

  #main_menu {
    height: 80px;
    width: 150px;
    margin: 5px 13px 0 0;
  }

  #next_task, #info, #check, #restart {
    height: 70px;
    width: 130px;
    margin: 5px 8px 0 0;
  } 

  router-link {
    text-decoration: none; 
    color: black;
  }
</style>
