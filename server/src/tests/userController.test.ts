import { describe } from "node:test";
import { db } from "../database/client";
import type {ResultSetHeader} from "mysql2/promise";
import UserController from "../controllers/UserController";
import type { Request, Response } from "express";

// ON test le controller
// on mock le repo
// simule les requetes et les reponses

afterEach(() => {
    jest.restoreAllMocks();
  });

jest.mock("../models/userRepository")

describe("UserController", () => {

    it("should create user", async () => {
        // 1
            // fausse reponse
        const fakeResult = {insertId: 1} as ResultSetHeader

            // fause user
        const fakeUser = {
            email: "eva@gmail.fr",
            firstname: "Eva",
            lastname: "Caroline",
            password: "123"
        }

        const querySpy = jest.spyOn(db, "query")
        .mockResolvedValue([fakeResult, []]);

        // attendu par controller
        const req = {
            body: fakeUser
        } as unknown as Request;

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        } as unknown as Response;

        // execute 
        const result = await UserController.add(req, res);

        // Verifie
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ id: 1, message: "Utilisateur créé avec succès" });
    })
   

})