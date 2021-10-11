import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import SfErkennen from '../views/SfErkennen.vue'
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
    path: '/codes-erkennen',
    name: 'SfErkennen',
    component: SfErkennen
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
