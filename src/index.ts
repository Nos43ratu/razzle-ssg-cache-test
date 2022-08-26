import fastifyInstance from "./server";

let server = fastifyInstance;

const config = {
  port: (process.env.PORT as unknown as number) || 3000,
  host: "0.0.0.0",
};

server.listen(config).catch((err) => console.error("ERROR", err));

if (module.hot) {
  console.info("✅  Server-side HMR Enabled!");
  module.hot.accept("./server", async () => {
    console.info("🔁  HMR Reloading `./server`...");

    try {
      server.close(() => {
        server = require("./server").default;

        server.listen(config).catch((err) => console.error("ERROR", err));
      });
    } catch (err) {
      console.error("ERROR", err);
    }
    console.info("🚀 Server-side HMR Complete");
  });
  console.info("✅  Server-side HMR Enabled!");
}
