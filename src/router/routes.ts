import Game from "@/pages/game";
import Home from "@/pages/home";

const routes = [
  {
    path: "/",
    index: true,
    component: Home,
  },
  {
    path: "/game",
    component: Game,
  },
];

export { routes };
