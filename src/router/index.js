import {createRouter, createWebHistory} from "vue-router";
import HomeView from "../views/HomeView.vue";
import {useAuthStore} from "../stores/auth";


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
        },
        {
            path: "/login",
            name: "login",
            component: () => import("../views/LoginView.vue"),
        },
        {
            path: "/album/:id",
            name: "detail",
            component: () => import("../views/DetailView.vue"),
        },
        {
            path: "/favorites",
            name: "favorites",
            component: () => import("../views/FavoritesView.vue"),
        },

    ],
});

router.beforeEach(async (to) => {
    const authStore = useAuthStore();

    if (
        // make sure the user is authenticated
        !authStore.isAuth &&
        // ❗️ Avoid an infinite redirect
        to.name !== 'login'
    ) {
        // redirect the user to the login page
        return {name: 'login'}
    }
})

export default router;
