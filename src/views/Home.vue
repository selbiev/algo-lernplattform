<template>
  <div class="home">
    1. Signalfolgen erkennen | <router-link :to="{name: 'SfErkennen_leicht'}">leicht</router-link> | <router-link :to="{name: 'SfErkennen_schwer'}">schwierig</router-link> <br> <br>  
    2. Signalfolgen ergänzen | <router-link :to="{name: 'SfErgaenzen_leicht'}">leicht</router-link> | <router-link :to="{name: 'SfErgaenzen_mittel'}">mittel</router-link>  | <router-link :to="{name: 'SfErgaenzen_schwer'}">schwierig</router-link> <br> <br>  
    3. Signalfolgen Anzahl Lösungen | <router-link :to="{name: 'SfAnzahlLoesungen_leicht'}">leicht</router-link> | <router-link :to="{name: 'SfAnzahlLoesungen_schwer'}">schwierig</router-link> <br> <br> 
    4. Fehlerhafte Signalfolge korrigieren | <router-link :to="{name: 'SfFehlerhafteFolge'}">mittel</router-link> <br> <br>
    5. Signalfolgen Abstände | <router-link :to="{name: 'SfAbstaende_mittel'}">mittel</router-link> | <router-link :to="{name: 'SfAbstaende_schwer'}">schwierig</router-link><br> <br>
    6. Eigene Signalfolgen Erstellen | <router-link :to="{name: 'SfErstellen_leicht'}">leicht</router-link> | <router-link :to="{name: 'SfErstellen_schwer'}">schwierig</router-link> <br> <br>
    7. <b>(Neu)</b> Bauteile für Biberdamm bestellen | <router-link :to="{name: 'SfBauen_bestellen_leicht'}">leicht</router-link> | <router-link :to="{name: 'SfBauen_bestellen_schwer'}">schwierig</router-link><br><br>
    8. <b>(Neu)</b> Bauteile für Biberdamm erkennen | <router-link :to="{name: 'SfBauen_erkennen_leicht'}">leicht</router-link> | <router-link :to="{name: 'SfBauen_erkennen_schwer'}">schwierig</router-link><br><br>
    9. Topologische Sortierung erkennen (Kleider) | <router-link :to="{name: 'TopSortErkennen_Kleider_leicht'}">leicht</router-link> | <router-link :to="{name: 'TopSortErkennen_Kleider_schwer'}">schwierig</router-link> <br> <br>
    10. Topologische Sortierung erstellen (Kleider) | <router-link :to="{name: 'TopSortErstellen_Kleider_schwer'}">schwierig</router-link> <br> <br>
    11. <b>(Neu)</b> Topologische Sortierung erkennen (Backen) | <router-link :to="{name: 'TopSortErkennen_Backen_schwer'}">schwierig</router-link> <br> <br>
    12. <b>(Neu)</b> Topologische Sortierung erstellen (Backen) | <router-link :to="{name: 'TopSortErstellen_Backen_schwer'}">schwierig</router-link> <br> <br>
    13. <b>(Neu)</b> Topologische Sortierung erkennen (Marathon) | <router-link :to="{name: 'TopSortErkennen_Marathon_schwer'}">schwierig</router-link> <br> <br>
    14. <b>(Neu)</b> Topologische Sortierung erstellen (Marathon) | <router-link :to="{name: 'TopSortErstellen_Marathon_schwer'}">schwierig</router-link> <br> <br>
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
