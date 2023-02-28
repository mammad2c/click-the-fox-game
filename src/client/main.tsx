import { ChakraProvider } from "@chakra-ui/react";
import { App } from "./app";
import { ToastContainer } from "./helpers";

const Main = () => {
  return (
    <ChakraProvider>
      <App />
      <ToastContainer />
    </ChakraProvider>
  );
};

export { Main };
