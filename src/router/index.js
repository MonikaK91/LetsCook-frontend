import Vue from 'vue'
import VueRouter from 'vue-router'
import Signin from '../views/Signin.vue'
import {Auth} from "@/services"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Signin',
    component: Signin
  },
  {
    path: '/signup',
    name: 'Signup',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Signup.vue')
  },
  {
    path: '/pocetna',
    name: 'Pocetna',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Pocetna.vue')
  },
  {
    path: '/dodaj-recept',
    name: 'Dodaj-recept',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Dodaj-recept.vue')
  },
  {
    path: '/recepti',
    name: 'Recepti',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Recepti.vue')
  },
  {
    path: '/recept-detalji/:id',
    name: 'ReceptDetalji',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ReceptDetalji.vue'),
    props: true,
  },
  {
    path: '/moji-oglasi/:username',
    name: 'MojiOglasi',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/MojiOglasi.vue'),
    props: true,
  }, 
  {
    path: '/recepti-filter/:filter',
    name: 'ReceptiFilter',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ReceptiFilter.vue'),
    props: true,
  },
  {
    path: '/lozinka',
    name: 'Lozinka',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Lozinka.vue'),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
})
// scrollBehavior služi da nas uvijek prebaci na početak nove stranice prilikom mijenjanja rute 

router.beforeEach((to, from, next) => {
  //stranice na koje korisnik može otići bez prijave
  const javneStranice = ["/", "/signup"]
  //prijava je potrebna kada stranica na koju korisnik želi doći nije u javnim stranicama 
  const loginPotreban  = !javneStranice.includes(to.path)
  //provjera da li korisnik postoji pomoću getUser metode iz services
  const user = Auth.getUser()

  //ako je potreban login i nemamo korisnika
  if (loginPotreban && !user) {
    next("/") //idi na signin rutu
    return
  }
  next() //ako je sve ok
})

export default router
