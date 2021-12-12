// import the createRouter, and createWebHistory from vue-router
import { createRouter, createWebHistory } from 'vue-router'
// import Home from the views/Home.vue file
import Home from '../views/Home.vue'


// declare the routes here
// and map the route to component.
const routes = [
  {
    // home page for the website
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    // sign up form for individuals
    path: '/create',
    name: 'create',
    component: () => import('../components/CreateIndividualComponent')
  },
  {
    // router to display all locations availiable
    path: '/view',
    name: 'view',
    component: () => import('../components/ListLocationComponent')
  },
  {
    // router to edit the locations information
    path: '/edit/:id',
    name: 'edit',
    component: () => import('../components/EditComponent')
  },
  {
    // router to display the events 
    path: '/events/:id',
    name: 'events',
    component: () => import('../components/EventComponent')
  },
  {
    // router to edit the events.
    path: '/editEvents/:id',
    name: 'editEvents',
    component: () => import('../components/EditEventComponent')
  },
  {
    // router for to monitor individual activities
    path: '/activities',
    name: 'activities',
    component: () => import("../views/Activity.vue")
  },
  {
    // router for check individual history
    path: '/history',
    name: 'history',
    component: () => import('../components/HistoryOfIndividualComponent')
  },
  {
    // router to display graph about individuals use pattern
    path: '/graph',
    name: 'GraphChart',
    component: () => import("../views/GraphChart.vue")
  },
  {
    // router to thank the users to sign up for events 
    path: '/thanks',
    name: 'thanks',
    component: () => import('../components/ThankYouPageComponent')
  }
]

// create router history
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes // short for `routes: routes`
})

export default router
