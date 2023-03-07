// require the express module
import express from "express";
import { ObjectId } from "mongodb";
import { getClient } from "../db";
import Favorite from "../models/Favorite";

const favoriteRouter = express.Router();

const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};

favoriteRouter.get("/users/:userId/favorites", async (req, res) => {
  try {
    const userId = new ObjectId(req.params.userId);
    const client = await getClient();
    const results = await client
      .db()
      .collection<Favorite>("favorites")
      .find({ userId })
      .toArray();
    res.status(200).json(results);
  } catch (err) {
    errorResponse(err, res);
  }
});

favoriteRouter.post("/users/:userId/favorites", async (req, res) => {
  try {
    const newFavorite: Favorite = req.body as Favorite;
    const userId = new ObjectId(req.params.userId);
    newFavorite.userId = userId;
    const client = await getClient();
    await client.db().collection<Favorite>("favorites").insertOne(newFavorite);
    res.status(201).json(newFavorite);
  } catch (err) {
    errorResponse(err, res);
  }
});

favoriteRouter.delete("/users/:userId/favorites/:id", async (req, res) => {
  try {
    const userId = new ObjectId(req.params.userId);
    const id = req.params.id;
    const client = await getClient();
    const result = await client
      .db()
      .collection<Favorite>("favorites")
      .deleteOne({ userId: userId, "event.id": id });
    if (result.deletedCount) {
      res.sendStatus(204);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch {}
});

export default favoriteRouter;
