import { ChakraProvider } from "@chakra-ui/react";
import { App } from "./app";

const Main = () => {
  return (
    <ChakraProvider>
      <App />
    </ChakraProvider>
  );
};

export { Main };
