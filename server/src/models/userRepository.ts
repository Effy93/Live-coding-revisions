import  type { RowDataPacket, ResultSetHeader } from 'mysql2';
import {db} from '../database/client';
import type IUser from '../types/IUser';

export default class User {
    async create(user: Omit<IUser, "id" | "createdAt" | "updatedAt">) {
        const [result] = await db.query<ResultSetHeader>("INSERT INTO user(email, firstname, lastname, password) VALUES (?, ?, ?, ?)" 
            ,[user.email, user.firstname, user.lastname, user.password]
        );
        return result.insertId
    }

    async readAll() {
        const [rows] = await db.query<RowDataPacket[]>("SELECT * from user")
        return rows
    }

    async update() {}

    async delete(id : number) {
        const [result] = await db.query<ResultSetHeader>("")
        return result.affectedRows > 0
    }
}
