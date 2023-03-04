import fs from "fs";
import path from "path";
import { createServer as createViteServer } from "vite";
import express from "express";
import { PORT } from "../config";
import { app } from "./app";

async function createServer() {
  const isProduction = process.env.NODE_ENV === "production";

  // Create Vite server in middleware mode and configure the app type as
  // 'custom', disabling Vite's own HTML serving logic so parent server
  // can take control
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "custom",
  });

  // use vite's connect instance as middleware
  // if you use your own express router (express.Router()), you should use router.use
  app.use(vite.middlewares);

  if (isProduction) {
    app.use(
      "/assets",
      express.static(path.join(__dirname, "../", "entry-client", "assets")),
    );
  }

  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      // 1. Read index.html
      const templatePath = isProduction
        ? path.join(__dirname, "../", "entry-client", "index.html")
        : "index.html";

      let template = fs.readFileSync(path.resolve(templatePath), "utf-8");

      // 2. Apply Vite HTML transforms. This injects the Vite HMR client, and
      //    also applies HTML transforms from Vite plugins, e.g. global preambles
      //    from @vitejs/plugin-react
      template = await vite.transformIndexHtml(url, template);

      // 3. Load the server entry. vite.ssrLoadModule automatically transforms
      //    your ESM source code to be usable in Node.js! There is no bundling
      //    required, and provides efficient invalidation similar to HMR.

      const entryServer = isProduction
        ? path.join(__dirname, "../", "entry-server", "entry-server.mjs")
        : "/src/client/entry-server.tsx";

      const { render } = await vite.ssrLoadModule(entryServer);

      // 4. render the app HTML. This assumes entry-server.js's exported `render`
      //    function calls appropriate framework SSR APIs,
      //    e.g. ReactDOMServer.renderToString()
      const appHtml = await render(url);

      // 5. Inject the app-rendered HTML into the template.
      const html = template.replace(`<!--ssr-outlet-->`, appHtml);

      // 6. Send the rendered HTML back.
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      // If an error is caught, let Vite fix the stack trace so it maps back to
      // your actual source code.
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });

  app.listen(PORT);
  console.log(`application is ready: http://localhost:${PORT}`);
}

createServer();
