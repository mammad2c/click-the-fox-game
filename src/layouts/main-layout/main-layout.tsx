import { Container, Box } from "@/ui";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <Box as="main">
      <Container minHeight="100vh">
        <Outlet />
      </Container>
    </Box>
  );
};

export { MainLayout };
