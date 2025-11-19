import fs from "fs";

export function loadConfig(path = './src/config/appConfig.json') {
  try {
    const configData = fs.readFileSync(path, "utf-8");
    const config = JSON.parse(configData);

    if (!config.server || !config.database) {
      throw new Error("Missing required configuration sections: server or database");
    }

    return config;
  } catch (err) {
    console.error("❌ Error loading configuration:", err.message);
    process.exit(1);
  }
}
