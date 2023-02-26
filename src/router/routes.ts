import { Home, Game } from "@/pages";

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
