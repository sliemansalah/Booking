
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior () {
        return { x: 0, y: 0 }
    },
    routes: [

        {
    // =============================================================================
    // MAIN LAYOUT ROUTES
    // =============================================================================
            path: '',
            component: () => import('./layouts/main/Main.vue'),
            children: [
        // =============================================================================
        // Theme Routes
        // =============================================================================
              {
                path: '/',
                name: 'appointments',
                component: () => import('./views/Appointments.vue')
              },
              {
                path: '/appointments',
                name: 'appointmentsTable',
                component: () => import('./views/AppointmentsTable.vue')
              },
              {
                path: '/services',
                name: 'services',
                component: () => import('./views/Services.vue')
              },
              {
                path: '/users',
                name: 'users',
                component: () => import('./views/Users.vue')
              },
            ],
        },
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
        {
            path: '',
            component: () => import('@/layouts/full-page/FullPage.vue'),
            children: [
        // =============================================================================
        // PAGES
        // =============================================================================
              {
                path: '/login',
                name: 'login',
                component: () => import('@/views/Login.vue')
              },
              {
                path: '/error',
                name: 'error',
                component: () => import('@/views/Error404.vue')
              },
            ]
        },
        // Redirect to 404 page, if no match found
        {
            path: '*',
            redirect: '/error'
        }
    ],
})

let token = localStorage.getItem("token") || null;

router.afterEach((to, from) => {
  const appLoading = document.getElementById('loading-bg')
    if (appLoading) {
        appLoading.style.display = "none";
    }
    if(!token) {
      router.push('/login');
    }
    else if (token && to.path== '/login') {
      router.push('/');
    }
})

export default router
