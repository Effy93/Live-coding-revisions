import  type { RowDataPacket, ResultSetHeader } from 'mysql2';
import {db} from '../database/client';
import type IUser from '../types/IUser';

class UserRepo {
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

    async readOne(id: number) {
        const [row] = await db.query<RowDataPacket[]>("SELECT * from user WHERE id=?", [id])
        return row
    }

    async readByEmail(email:string) {
        const [row] = await db.query<RowDataPacket[]>("SELECT * from user WHERE email=?", [email])
        return row
    }
    async update(id: number, user: Partial<Omit<IUser, "id" | "createdAt" | "updatedAt">>) {
        const fields: string[] = [];
        const values: any[] = [];

        if (user.email !== undefined) { fields.push("email = ?"); values.push(user.email); }
        if (user.firstname !== undefined) { fields.push("firstname = ?"); values.push(user.firstname); }
        if (user.lastname !== undefined) { fields.push("lastname = ?"); values.push(user.lastname); }
        if (user.password !== undefined) { fields.push("password = ?"); values.push(user.password); }

        if (fields.length === 0) return false;

        values.push(id);
        // requete patch dynamique
        const [result] = await db.query<ResultSetHeader>(`UPDATE user SET ${fields.join(", ")} WHERE id = ?`, values);
        return result.affectedRows > 0;
    }

    async delete(id : number) {
        const [result] = await db.query<ResultSetHeader>("DELETE FROM user WHERE id = ?", [id])
        return result.affectedRows > 0
    }
}

export default new UserRepo