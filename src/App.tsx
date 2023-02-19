import { Routes, Route } from "react-router-dom";
import { HomePage } from "@/pages/home-page";
import { MainLayout } from "@/layouts/main-layout/main-layout";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
