import type { Request, Response } from "express";
import UserRepo from "../models/userRepository";

class UserController {
    async browse(req: Request, res: Response) {
        try {
            const users = await UserRepo.readAll()
            // console.log(users)
            res.json(users)
        } catch (error) {
           console.log(error)
        }
    }

    async readOne(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const user = await UserRepo.readOne(id)
            res.json(user)
            
        } catch (error) {
            console.log(error)
        }
    }

    async add(req: Request, res: Response) {}

    async edit() {}

    async destroy() {}
}

export default new UserController