import { ChakraProvider } from "@chakra-ui/react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { App } from "./app";

export function render(url: string) {
  return ReactDOMServer.renderToString(
    <StaticRouter location={url}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </StaticRouter>,
  );
}
