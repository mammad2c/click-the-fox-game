import { Routes, Route } from "react-router-dom";
import { MainLayout } from "@/client/layouts";
import { routes } from "@/client/router";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {routes.map((route) => {
            const Component = route.component;
            return (
              <Route
                key={route.path}
                path={route.path}
                index={route.index}
                element={<Component />}
              />
            );
          })}
        </Route>
      </Routes>
    </>
  );
};

export { App };
