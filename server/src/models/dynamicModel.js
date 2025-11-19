import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema } = mongoose;

const mapType = (type) => {
  if (!type) throw new Error("Type is missing in model config");
  switch (type.toLowerCase()) {
    case "string": return String;
    case "number": return Number;
    case "boolean": return Boolean;
    case "date": return Date;
    case "objectid": return Schema.Types.ObjectId;
    case "array<string>": return [String];
    case "array": return Array;
    default:
      throw new Error(`Unknown type: ${type}`);
  }
};

export function buildModelFromConfig(modelName, modelDefs) {
  const modelConfig = modelDefs?.[modelName];
  if (!modelConfig) {
    throw new Error(`Model "${modelName}" not found in config`);
  }

  const schemaDefinition = {};

 for (const [field, def] of Object.entries(modelConfig)) {
  const fieldDef = { type: mapType(def.type) }
  if (def.required) {fieldDef.required = [true, def.message || `${field} is required`]}
  if (def.min !== undefined) {fieldDef.min = [def.min, def.message || `${field} must be >= ${def.min}`]}
  if (def.max !== undefined) {fieldDef.max = [def.max, def.message || `${field} must be <= ${def.max}`]}
  if (def.minlength !== undefined) {fieldDef.minlength = [def.minlength, def.message || `${field} is too short (min ${def.minlength})`]}
  if (def.match) {fieldDef.match = [new RegExp(def.match), def.message || `${field} is invalid`]}
  if (def.enum) {fieldDef.enum = def.enum}
  if (def.ref) {fieldDef.ref = def.ref}

  schemaDefinition[field] = fieldDef;
}

  let schema;

  if (modelName === "user") {
    schema = new Schema(schemaDefinition, { timestamps: true });
    schema.pre("save", function (next) {
      if (this.isModified("password")) {
        this.password = bcrypt.hash(this.password, 10);
      }
      next();
    });
  } else {
    schema = new Schema(schemaDefinition, { timestamps: true });
  }

  const modelKey = modelName.charAt(0).toUpperCase() + modelName.slice(1);

  console.log(`Mongoose model "${modelKey}" built`);
  return mongoose.models[modelKey] || mongoose.model(modelKey, schema);
}

export function buildAllModels(modelDefs) {
  const models = {};
  for (const modelName of Object.keys(modelDefs)) {
    const model = buildModelFromConfig(modelName, modelDefs);
    const key = modelName.charAt(0).toUpperCase() + modelName.slice(1);
    models[key] = model;
  }
  return models;
}
