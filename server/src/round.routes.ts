import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "./database";

export const roundRouter = express.Router();
roundRouter.use(express.json());

roundRouter.get("/", async (_req, res) => {
  try {
    const rounds = await collections.rounds.find({}).toArray();
    res.status(200).send(rounds);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

roundRouter.get("/:id", async (req, res) => {
  try {
    const id = req?.params?.id;
    const query = { _id: new mongodb.ObjectId(id) };
    const round = await collections.rounds.findOne(query);

    if (round) {
      res.status(200).send(round);
    } else {
      res.status(404).send(`Failed to find round: ID ${id}`);
    }
  } catch (error) {
    res.status(404).send(`Failed to find round: ID ${req?.params?.id}`);
  }
});

roundRouter.post("/", async (req, res) => {
  try {
    const round = req.body;
    const result = await collections.rounds.insertOne(round);
  
    if(result.acknowledged) {
      res.status(201).send(`Created a new round: ID ${result.insertedId}.`);
    } else {
      res.status(500).send("Failed to create round");
    }
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
});

roundRouter.put("/:id", async (req, res) => {
  try {
    const id = req?.params?.id;
    const round = req.body;
    const query = { _id: new mongodb.ObjectId(id)};
    const result = await collections.rounds.updateOne(query, { $set: round });

    if(result && result.matchedCount) {
      res.status(200).send(`updated a round: id ${id}.`);
    } else if (!result.matchedCount) {
      res.status(404).send(`Failed to find round: id ${id}.`)
    } else {
      res.status(304).send(`Failed to update round id ${id}`);
    }
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
});

roundRouter.delete("/:id", async (req, res) => {
  try {
    const id = req?.params?.id;
    const query = { _id: new mongodb.ObjectId(id) };
    const result = await collections.rounds.deleteOne(query);

    if (result && result.deletedCount) {
      res.status(202).send(`Removed a round: id ${id}`);
    } else if (!result) {
      res.status(400).send(`Failed to delete round: ID ${id}`);
    } else if (!result.deletedCount) {
      res.status(404).send(`Failed to find round: id ${id}`)
    }
  } catch (error) {
    console.error(error.message);
    res.status(400).send(error.message);
  }
});
