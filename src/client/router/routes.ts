import { Home, Game, Scoreboard } from "@/client/pages";

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
  {
    path: "/scoreboard",
    component: Scoreboard,
  },
];

export { routes };
