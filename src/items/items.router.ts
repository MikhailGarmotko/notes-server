/**
 * Required External Modules and Interfaces
 */
import express, { Request, Response } from "express";
import * as ItemService from "./items.service";
import { Note, Item, Summary } from "./item.interface";
import { validate, linkSchema } from "./items.validation";

/**
 * Router Definition
 */

export const itemsRouter = express.Router();

/**
 * Controller Definitions
 */

// GET items

itemsRouter.get("/", async (req: Request, res: Response) => {
  try {
    const notes: Item[] = await ItemService.findAll();
    res.status(200).send(notes);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

// GET items/stats

itemsRouter.get("/stats", async (req: Request, res: Response) => {
      try {
      const stats:Summary = await ItemService.statistics();
      return res.status(200).send(stats);
    } catch (e: any) {
      res.status(500).send(e.message);
    }
});

// GET items/:id

itemsRouter.get("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    const item: Item = await ItemService.find(id);
    if (item) {
      return res.status(200).send(item);
    }
    res.status(404).send("Items not found");
  } catch (e:any) {
    res.status(500).send(e.message);
  }
});


// POST items

itemsRouter.post("/", validate(linkSchema), async (req: Request, res: Response) => {
  try {
    const item: Note = req.body;
    const newItem = await ItemService.create(item);

    return res.status(200).send(newItem);
  } catch (e:any) {
    res.status(500).send(e.message);
  }
});

// PUT items/:id

itemsRouter.patch("/:id", validate(linkSchema), async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    const itemUpdate:Item = req.body;
    const existingItem: Item = await ItemService.find(id);
    if (existingItem) {
        const updatedItem = await ItemService.update(id, itemUpdate);
      return res.status(200).json(updatedItem);
    }
  } catch (e:any) {
    res.status(500).send(e.message);
  }
});

// DELETE items/:id
itemsRouter.delete("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    const item: Item = await ItemService.find(id);
    await ItemService.remove(id);
    res.sendStatus(404);
  } catch (e:any) {
    res.status(500).send(e.message);
  }
});
