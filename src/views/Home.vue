<template>
  <div class="home">
    Signalfolgen erkennen | <router-link :to="{name: 'SfErkennen_leicht'}">leicht</router-link> | <router-link :to="{name: 'SfErkennen_schwer'}">schwer</router-link> <br> <br>  
    Signalfolgen ergänzen | <router-link :to="{name: 'SfErgaenzen_leicht'}">leicht</router-link> | <router-link :to="{name: 'SfErgaenzen_mittel'}">mittel</router-link>  | <router-link :to="{name: 'SfErgaenzen_schwer'}">schwer</router-link> <br> <br>  
    Signalfolgen Abstände <router-link :to="{name: 'SfAbstaende'}">mittel</router-link> <br> <br>
    Signalfolgen Anzahl Lösungen | <router-link :to="{name: 'SfAnzahlLoesungen_leicht'}">leicht</router-link> | <router-link :to="{name: 'SfAnzahlLoesungen_schwer'}">schwer</router-link> <br> <br> 
    Fehlerhafte Signalfolge korrigieren <router-link :to="{name: 'SfFehlerhafteFolge'}">mittel</router-link> <br> <br>
    Eigene Signalfolgen Erstellen <router-link :to="{name: 'SfErstellen_leicht'}">leicht</router-link> | <router-link :to="{name: 'SfErstellen_schwer'}">schwer</router-link> <br> <br>
    Topologische Sortierung erkennen <router-link :to="{name: 'TopSortErkennen_leicht'}">leicht</router-link> | <router-link :to="{name: 'TopSortErkennen_schwer'}">schwer</router-link> <br> <br>
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
});
</script>
