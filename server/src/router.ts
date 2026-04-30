import express from "express";
import UserController from "./controllers/UserController";

const router = express.Router();

router.get("/users", UserController.browse)
router.get("/users/:id", UserController.readOne)
router.post("/users", UserController.add)
router.patch("/users/:id", UserController.edit)
router.delete("/users/:id", UserController.destroy)

export default router
