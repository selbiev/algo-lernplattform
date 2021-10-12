import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import SfErkennen_leicht from '../views/SfErkennen_leicht.vue'
import SfErkennen_schwer from '../views/SfErkennen_schwer.vue'
import SfErstellen from '../views/SfErstellen.vue'
import SfErgaenzen from '../views/SfErgaenzen.vue'
import SfAbstaende from '../views/SfAbstaende.vue'
import SfAnzahlLoesungen from '../views/SfAnzahlLoesungen.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/codes-erkennen-leicht',
    name: 'SfErkennen_leicht',
    component: SfErkennen_leicht
  },
  {
    path: '/codes-erkennen-schwer',
    name: 'SfErkennen_schwer',
    component: SfErkennen_schwer
  },
  {
    path: '/codes-erstellen',
    name: 'SfErstellen',
    component: SfErstellen
  },
  {
    path: '/codes-ergaenzen',
    name: 'SfErgaenzen',
    component: SfErgaenzen
  },
  {
    path: '/codes-abstaende',
    name: 'SfAbstaende',
    component: SfAbstaende
  },
  {
    path: '/codes-anz-loesungen',
    name: 'SfAnzahlLoesungen',
    component: SfAnzahlLoesungen
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
