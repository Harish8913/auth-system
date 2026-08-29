import app from "./app.js";
import { config } from "./config/config.js";

app.listen(config.server.port, () => {
  console.log(
    `Server Running on port: ${config.server.port} in ${config.server.nodeEnv} mode`,
  );
});
