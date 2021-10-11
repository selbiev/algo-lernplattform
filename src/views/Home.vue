<template>
  <div class="home">
    <router-link to="/">Home</router-link> <br> <br>
    <router-link :to="{name: 'SfErkennen'}">Signalfolgen Erkennen</router-link> <br> <br>
    <router-link :to="{name: 'SfErstellen'}">Signalfolgen Erstellen</router-link> <br> <br>
    <router-link :to="{name: 'SfErgaenzen'}">Signalfolgen Ergänzen</router-link> <br> <br>
    <router-link :to="{name: 'SfAbstaende'}">Signalfolgen Abstände</router-link> <br> <br>
    <router-link :to="{name: 'SfAnzahlLoesungen'}">Signalfolgen Anzahl Lösungen</router-link>
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
