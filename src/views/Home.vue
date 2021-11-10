<template>
  <div class="home">
    <h1>Willkommen in der Lernumgebung <br>
    Einfach Informatik 3/4</h1>
    <p> 
      <img src="../assets/home.png"/>
    </p>
    <div id="aufgaben-kacheln">
      <div v-for="i in (tasks.length)" :key="i" :id="i">
        <router-link :to="{name: tasks[i-1].route}" style="text-decoration: none; color: black">
          <div class="card">
            <img src="../assets/home/bauen.png"/> <br>
            {{tasks[i-1].description}}
          </div>
        </router-link>
        
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld,
  },
  data() {
    return {
      tasks: [
        {description: "Kodierung erkennen", route: "SfErkennen_leicht", image: "../assets/home/tisch_decken.png"},
        {description: "Kodierung ergänzen", route: "SfErgaenzen_leicht", image: "../assets/home/bauen.png"},
        {description: "Kodierung Anzahl Lösungen", route: "SfAnzahlLoesungen_leicht", image: "../assets/home/bauen.png"},
        {description: "Kodierung Fehler korrigieren", route: "SfFehlerhafteFolge", image: "../assets/home/bauen.png"},
        {description: "Kodierung Abstände", route: "SfAbstaende_mittel", image: "../assets/home/bauen.png"},
        {description: "Kodierung erstellen", route: "SfErstellen_leicht", image: "../assets/home/bauen.png"},
        {description: "Bauteile bestellen", route: "SfBauen_bestellen_leicht", image: "../assets/home/bauen.png"},
        {description: "Bauteile erkennen", route: "SfBauen_erkennen_leicht", image: "../assets/home/bauen.png"},
        {description: "Kleider Reihenfolge einstufen", route: "TopSortErkennen_Kleider_leicht", image: "../assets/home/bauen.png"},
        {description: "Kleider Reihenfolge angeben", route: "TopSortErstellen_Kleider_schwer", image: "../assets/home/bauen.png"},
        {description: "Marathon Rangliste einstufen", route: "TopSortErkennen_Marathon_schwer", image: "../assets/home/bauen.png"},
        {description: "Marathon Rangliste angeben", route: "TopSortErstellen_Marathon_schwer", image: "../assets/home/bauen.png"},
        {description: "Kuchen Backen Reihenfolge einstufen", route: "TopSortErkennen_Backen_schwer", image: "../assets/home/bauen.png"},
        {description: "Kuchen Backen Reihenfolge angeben", route: "TopSortErstellen_Backen_schwer", image: "../assets/home/bauen.png"},
      ]
    }
  }
});
</script>

<style>
  img {
    width: 50%;
  }

  body {
    background-color: #FFE5B2;
  }

  #aufgaben-kacheln {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }

  #aufgaben-kacheln div img {
    width: 150px;
    height: auto;
  }

  .card {
    border-radius: 10px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 40%);
    transition: .3s;
    margin: 1em;
    padding: 5px;
    background-color: #d7ead9;
    width: 300px;
  }

  span {
    text-decoration: none !important;
  }

</style>
