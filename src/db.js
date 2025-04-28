import { PrismaClient } from "@prisma/client";

const Prisma = new PrismaClient();

export const connect = async () => {
    try{
        await Prisma.$connect();
        console.log ("prisma connected")

        await Prisma.$queryRaw`SELECT 1`;
        console.log("database done connecting")
    }catch (error){
        console.error('Error connecting to the database:', error);
        process.exit(1);
    }
}
connect();


export default Prisma;