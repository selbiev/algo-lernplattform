<template>
  <div class="home">
    <h1>Die Welt symbolisch und zeichnerisch darstellen</h1>
    <p> 
      <img src="../assets/home.png"/>
    </p>
    
    <div id="aufgaben-kacheln">
      <div v-for="i in tasks.length" :key="i">
        <router-link :to="{name: tasks[i-1].route}" style="text-decoration: none; color: black">
          <div class="card">
            <span>{{i}}. {{tasks[i-1].description}} </span> <br> <br>
            <img :src="getImage(i-1)" style="height: 180px; width: auto"/> <br>
            <span>{{tasks[i-1].class}}</span>
            
          </div>
        </router-link>
        
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from '../components/HelloWorld.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld,
  },
  data() {
    return {
      tasks: [
        {description: "Kodierung erkennen", class: "1. bis 4. Klasse", route: "SfErkennen_leicht", image: "../assets/home/SfErkennen_leicht.png"},
        {description: "Kodierung ergänzen", class: "2. bis 4. Klasse", route: "SfErgaenzen_leicht", image: "../assets/home/bauen.png"},
        {description: "Kodierung Anzahl Lösungen", class: "3. bis 6. Klasse", route: "SfAnzahlLoesungen_leicht", image: "../assets/home/bauen.png"},
        {description: "Kodierung Fehler korrigieren", class: "4. bis 6. Klasse", route: "SfFehlerhafteFolge", image: "../assets/home/bauen.png"},
        {description: "Kodierung Abstände", class: "1. bis 6. Klasse", route: "SfAbstaende_mittel", image: "../assets/home/bauen.png"},
        {description: "Kodierung erstellen", class: "5. bis 6. Klasse", route: "SfErstellen_leicht", image: "../assets/home/bauen.png"},
        {description: "Bauteile bestellen", class: "1. bis 3. Klasse", route: "SfBauen_bestellen_leicht", image: "../assets/home/bauen.png"},
        {description: "Bauteile erkennen", class: "1. bis 3. Klasse", route: "SfBauen_erkennen_leicht", image: "../assets/home/bauen.png"},
        {description: "Kleider Reihenfolge einstufen", class: "3. bis 6. Klasse", route: "TopSortErkennen_Kleider_leicht", image: "../assets/home/bauen.png"},
        {description: "Kleider Reihenfolge angeben", class: "3. bis 6. Klasse", route: "TopSortErstellen_Kleider_schwer", image: "../assets/home/bauen.png"},
        {description: "Marathon Rangliste einstufen", class: "5. bis 6. Klasse", route: "TopSortErkennen_Marathon_schwer", image: "../assets/home/bauen.png"},
        {description: "Marathon Rangliste angeben", class: "5. bis 6. Klasse", route: "TopSortErstellen_Marathon_schwer", image: "../assets/home/bauen.png"},
        {description: "Kuchen Backen Reihenfolge einstufen", class: "5. bis 6. Klasse", route: "TopSortErkennen_Backen_schwer", image: "../assets/home/bauen.png"},
        {description: "Kuchen Backen Reihenfolge angeben", class: "5. bis 6. Klasse", route: "TopSortErstellen_Backen_schwer", image: "../assets/home/bauen.png"},
      ],
      asdf: "../assets/home/SfErkennen_leicht.png",
    }
  },
  methods : {
    getImg(num: number){
      return this.tasks[num].image
    },
    getImage(num: number) {
        return require( `../assets/home/${this.tasks[num].route}.png`);
    }
  }
});
</script>

<style>
  img {
    width: 50%;
  }

  body {
    background-color: #ffe5b2;
  }

  h1 {
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-weight: bold;
  }

  span {
    text-decoration: none !important;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-weight: bold;
  }

  #aufgaben-kacheln {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }

  #aufgaben-kacheln div img {
    width: 250px;
    height: auto;
  }

  .card {
    border-radius: 10px;
    transition: box-shadow .3s;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 30%);
    transition: .3s;
    padding: 15px;
    background-color: #d39563;
    width: 300px;
    height: 250px;
    margin: 1em;
  }

  .card:hover {
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 90%);
  }

  .card:click {
    background-color: black;
  }

  

</style>
