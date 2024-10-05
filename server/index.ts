import { Nitro } from "nitropack";
import mongoose from "mongoose";

export default async (_nitroApp: Nitro) => {
  const config = useRuntimeConfig();

  mongoose
    .connect(config.mongodbUri)
    .then(() => {
      console.log("connection established to MongoDB");
    })
    .catch((err) => {
      console.log("error connecting to MongoDB", err);
    });
};
