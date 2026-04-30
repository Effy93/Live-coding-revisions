import type { Request, Response } from "express";
import UserRepo from "../models/userRepository";
import type IUser from "../types/IUser";
import * as argon2 from 'argon2';

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

    async add(req: Request, res: Response) {

        const {email, lastname, firstname, password} = req.body

        if (!email || !lastname || !firstname || !password) {
            res.status(400).json( {message: "identifiant manquants"});
            return
        }
        const users = await UserRepo.readByEmail(email);
        const user = users[0];

        const hashedPassword = await argon2.hash(password);

        const newUser: Omit<IUser, "id" | "createdAt" | "updatedAt"> = {
            email: email,
            lastname: lastname,
            firstname: firstname,
            password: hashedPassword,
        }

        try {
            const insertId = await UserRepo.create(newUser)
            res.status(201).json({ id: insertId, message: "Utilisateur créé avec succès" })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Erreur lors de la création" })
        }
    }

    async edit(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const { email, lastname, firstname, password } = req.body;

            const updateData: Partial<Omit<IUser, "id" | "createdAt" | "updatedAt">> = {};
            if (email) updateData.email = email;
            if (lastname) updateData.lastname = lastname;
            if (firstname) updateData.firstname = firstname;
            if (password) updateData.password = await argon2.hash(password);

            const success = await UserRepo.update(id, updateData);
            if (success) {
                res.json({ message: "Utilisateur mis à jour avec succès" });
            } else {
                res.status(404).json({ message: "Utilisateur non trouvé" });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Erreur lors de la mise à jour" });
        }
    }

    async destroy(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const success = await UserRepo.delete(id);
            if (success) {
                res.json({ message: "Utilisateur supprimé avec succès" });
            } else {
                res.status(404).json({ message: "Utilisateur non trouvé" });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Erreur lors de la suppression" });
        }
    }
}

export default new UserController