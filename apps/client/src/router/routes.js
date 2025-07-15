import Home from "@/Home.vue";
import PaymenInfo from "@/PaymenInfo.vue";

export const routes = [
  { path: "/", component: Home, name: "Home" },
  { path: "/payment", component: PaymenInfo, name: "Payment" },
];
