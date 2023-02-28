import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { Main } from "./main";

export function render(url: string) {
  return ReactDOMServer.renderToString(
    <StaticRouter location={url}>
      <Main />
    </StaticRouter>,
  );
}
