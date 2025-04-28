import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import dotenv from "dotenv";

dotenv.config();

export const generateToken = (User = User) => {
    return jwt.sign({
        id: User.id,
        email: User.email,
        userName: User.name,
        profile: User.profile,
    },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
    );
};