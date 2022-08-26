import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";

import fastify from "fastify";
import fastifyStatic from "@fastify/static";

import App from "./app";
import { getFakeData } from "shared/lib/getFakeData";

import fs from "fs";
import path from "path";

let assets: any;

const syncLoadAssets = () => {
  assets = require(process.env.RAZZLE_ASSETS_MANIFEST!);
};
syncLoadAssets();

const cssLinksFromAssets = (assets: Record<string, any>, entryPoint: string) =>
  (assets &&
    assets[entryPoint]?.css
      ?.map((asset: string) => `<link rel="stylesheet" href="${asset}">`)
      .join("")) ||
  "";

const jsScriptTagsFromAssets = (
  assets: Record<string, any>,
  entryPoint: string,
  extra = ""
) =>
  (assets &&
    assets[entryPoint]?.js
      .map((asset: string) => `<script src="${asset}"${extra}></script>`)
      .join("")) ||
  "";

const fastifyInstance = fastify({ logger: false });

fastifyInstance.register(fastifyStatic, {
  root: process.env.RAZZLE_PUBLIC_DIR!,
  prefix: "/public",
});

fastifyInstance.get("/*", async (req, res) => {
  const pathStr = path.join(__dirname, "../public", `${req.url}.html`);

  if (fs.existsSync(pathStr)) {
    console.log("cached");
    return res.status(200).type("text/html").sendFile(`${req.url}.html`);
  }

  const data = getFakeData(req.url);

  if (!data) {
    return res.redirect(req.url);
  }

  const html = renderToString(
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>
  );

  const marckup = `
  <!doctype html>
  <html lang="en-GB">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />
        <title>Welcome to Razzle</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${cssLinksFromAssets(assets, "client")}
    </head>
    <body>
        <div id="root">${html}</div>
        <script id="DATA" type="application/json">${JSON.stringify(
          data
        )}</script>
        ${jsScriptTagsFromAssets(assets, "client", " defer crossorigin")}
    </body>
  </html>
`;

  if (data) {
    fs.writeFile(pathStr, marckup, function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    });
  }
  console.log("rendered");
  res.status(200).type("text/html").send(marckup);
});

export default fastifyInstance;
