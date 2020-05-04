import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: "/",
        alias: "/alarms",
        name: "alarms",
        component: () => import("../components/AlarmsList.vue")
    },
    {
        path: "/alarms/:id",
        name: "alarm-details",
        component: () => import("../components/Alarm.vue")
    },
    {
        path: "/add-alarm",
        name: "add-alarm",
        component: () => import("../components/AddAlarm.vue")
    }

];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;