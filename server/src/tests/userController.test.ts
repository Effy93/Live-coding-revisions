import { describe, it, expect, jest, afterEach } from "@jest/globals";
import userRepository from "../models/userRepository";
import UserController from "../controllers/UserController";
import type { Request, Response } from "express";

// Mock the userRepository
jest.mock("../models/userRepository");

const mockUserRepo = userRepository as jest.Mocked<typeof userRepository>;

afterEach(() => {
    jest.clearAllMocks();
});

describe("UserController", () => {

    it("should create user", async () => {
        // fausse user
        const fakeUser = {
            email: "eva@gmail.fr",
            firstname: "Eva",
            lastname: "Caroline",
            password: "123"
        }

        // Mock the repo methods
        mockUserRepo.readByEmail.mockResolvedValue([]);
        mockUserRepo.create.mockResolvedValue(1);

        // attendu par controller
        const req = {
            body: fakeUser
        } as unknown as Request;

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;

        // execute
        await UserController.add(req, res);

        expect(mockUserRepo.readByEmail).toHaveBeenCalledWith(fakeUser.email);
        expect(mockUserRepo.create).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ id: 1, message: "Utilisateur créé avec succès" });
    })
   

})