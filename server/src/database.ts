import * as mongodb from "mongodb";
import { Round } from "./round";

export const collections: {
  rounds?: mongodb.Collection<Round>;
} = {};

export async function connectToDatabase(uri: string) {
  const client = new mongodb.MongoClient(uri);
  await client.connect();

  const db = client.db("mean-golf");
  await applySchemaValidation(db);

  const roundCollection = db.collection<Round>("rounds");
  collections.rounds = roundCollection;
}

async function applySchemaValidation(db: mongodb.Db) {
  const jsonSchema = {
    $jsonSchema: {
      bsonType: "object",
      additionalProperties: false,
    },
  };

await db.command({
  collMod: "rounds",
  validator: jsonSchema
}).catch(async (error: mongodb.MongoServerError) => {
  if (error.codeName === 'NamespaceNotFound') {
    await db.createCollection("rounds", {validator: jsonSchema});
  }
});
}