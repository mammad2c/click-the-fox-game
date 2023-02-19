import Container from "@/ui/container";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <main>
        <Container>
          <Outlet />
        </Container>
      </main>
    </>
  );
};

export {MainLayout};
