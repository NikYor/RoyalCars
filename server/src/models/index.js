import { buildModelFromConfig } from "./dynamicModel.js";
import { loadConfig } from "../config/configLoader.js";
import mongoose from "mongoose";

const config = loadConfig()

const db = config.database
console.log('Connected to MongoDb successfully');

await mongoose.connect(`mongodb://${db.host}:${db.port}/${db.name}`);
const names = Object.keys(config.model)

const Item = buildModelFromConfig(names[0], config.model);
const Booking = buildModelFromConfig(names[1], config.model);
const User = buildModelFromConfig(names[2], config.model);

// async function ensureInitialAdmin(User) {
//   const admins = await User.find({ role: 'admin' });
//   if (admins.length === 0) {
//     await User.create({
//       email: 'init-admin@local',
//       password: 'admin',
//       role: 'admin',
//       isTemporary: true,
//     });
//     console.log('✅ Създаден временен админ: init-admin@local');
//   }
// }

// await ensureInitialAdmin(User);

export { Item, Booking, User };