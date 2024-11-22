'use server';
import bcrypt from "bcryptjs";

export async function createHash(password) {
    return bcrypt.hash(password, 10);
}