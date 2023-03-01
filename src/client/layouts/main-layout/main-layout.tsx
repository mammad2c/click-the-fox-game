import { Container, Box } from "@/client/ui";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <Box as="main">
      <Container minHeight="100vh" maxW="none">
        <Outlet />
      </Container>
    </Box>
  );
};

export { MainLayout };
