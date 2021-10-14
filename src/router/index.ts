import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import SfErkennen_leicht from '../views/SfErkennen_leicht.vue'
import SfErkennen_schwer from '../views/SfErkennen_schwer.vue'
import SfErgaenzen_leicht from '../views/SfErgaenzen_leicht.vue'
import SfErgaenzen_mittel from '../views/SfErgaenzen_mittel.vue'
import SfErgaenzen_schwer from '../views/SfErgaenzen_schwer.vue'
import SfAbstaende from '../views/SfAbstaende.vue'
import SfAnzahlLoesungen_schwer from '../views/SfAnzahlLoesungen_schwer.vue'
import SfAnzahlLoesungen_leicht from '../views/SfAnzahlLoesungen_leicht.vue'
import SfErstellen_leicht from '../views/SfErstellen_leicht.vue'
import SfErstellen_schwer from '../views/SfErstellen_schwer.vue'
import SfFehlerhafteFolge from '../views/SfFehlerhafteFolge.vue'
import TopSortErkennen from '../views/TopSortErkennen.vue'

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
    path: '/codes-erstellen-leicht',
    name: 'SfErstellen_leicht',
    component: SfErstellen_leicht
  },
  {
    path: '/codes-erstellen-schwer',
    name: 'SfErstellen_schwer',
    component: SfErstellen_schwer
  },
  {
    path: '/codes-ergaenzen-leicht',
    name: 'SfErgaenzen_leicht',
    component: SfErgaenzen_leicht
  },
  {
    path: '/codes-ergaenzen-mittel',
    name: 'SfErgaenzen_mittel',
    component: SfErgaenzen_mittel
  },
  {
    path: '/codes-ergaenzen-schwer',
    name: 'SfErgaenzen_schwer',
    component: SfErgaenzen_schwer
  },
  {
    path: '/codes-abstaende',
    name: 'SfAbstaende',
    component: SfAbstaende
  },
  {
    path: '/codes-anz-loesungen-schwer',
    name: 'SfAnzahlLoesungen_schwer',
    component: SfAnzahlLoesungen_schwer
  },
  {
    path: '/codes-anz-loesungen-leicht',
    name: 'SfAnzahlLoesungen_leicht',
    component: SfAnzahlLoesungen_leicht
  },
  {
    path: '/codes-fehlerhafte-folge',
    name: 'SfFehlerhafteFolge',
    component: SfFehlerhafteFolge
  },
  {
    path: '/topsort-erkennen',
    name: 'TopSortErkennen',
    component: TopSortErkennen
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
