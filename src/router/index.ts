import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import SfErkennen_leicht from '../views/SfErkennen_leicht.vue'
import SfErkennen_schwer from '../views/SfErkennen_schwer.vue'
import SfErgaenzen_leicht from '../views/SfErgaenzen_leicht.vue'
import SfErgaenzen_mittel from '../views/SfErgaenzen_mittel.vue'
import SfErgaenzen_schwer from '../views/SfErgaenzen_schwer.vue'
import SfAbstaende_mittel from '../views/SfAbstaende_mittel.vue'
import SfAbstaende_schwer from '../views/SfAbstaende_schwer.vue'
import SfAnzahlLoesungen_schwer from '../views/SfAnzahlLoesungen_schwer.vue'
import SfAnzahlLoesungen_leicht from '../views/SfAnzahlLoesungen_leicht.vue'
import SfErstellen_leicht from '../views/SfErstellen_leicht.vue'
import SfErstellen_schwer from '../views/SfErstellen_schwer.vue'
import SfFehlerhafteFolge from '../views/SfFehlerhafteFolge.vue'
import TopSortErkennen_Kleider_leicht from '../views/TopSortErkennen_Kleider_leicht.vue'
import TopSortErkennen_Kleider_schwer from '../views/TopSortErkennen_Kleider_schwer.vue'
import TopSortErstellen_Kleider_schwer from '../views/TopSortErstellen_Kleider_schwer.vue'
import TopSortErkennen_Backen_schwer from '../views/TopSortErkennen_Backen_schwer.vue'
import TopSortErstellen_Backen_schwer from '../views/TopSortErstellen_Backen_schwer.vue'


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
    path: '/codes-abstaende-mittel',
    name: 'SfAbstaende_mittel',
    component: SfAbstaende_mittel
  },
  {
    path: '/codes-abstaende',
    name: 'SfAbstaende_schwer',
    component: SfAbstaende_schwer
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
    path: '/topsort-erkennen-kleider-leicht',
    name: 'TopSortErkennen_Kleider_leicht',
    component: TopSortErkennen_Kleider_leicht
  },
  {
    path: '/topsort-erkennen-kleider-schwer',
    name: 'TopSortErkennen_Kleider_schwer',
    component: TopSortErkennen_Kleider_schwer
  },
  {
    path: '/topsort-erstellen-kleider-schwer',
    name: 'TopSortErstellen_Kleider_schwer',
    component: TopSortErstellen_Kleider_schwer
  },
  {
    path: '/topsort-erkennen-backen-schwer',
    name: 'TopSortErkennen_Backen_schwer',
    component: TopSortErkennen_Backen_schwer
  },
  {
    path: '/topsort-erstellen-backen-schwer',
    name: 'TopSortErstellen_Backen_schwer',
    component: TopSortErstellen_Backen_schwer
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
