import express from "express";
import cors from "cors";
import routes from "../src/routes/index.route.js";
import dotenv from "dotenv"
import { connect } from "./db.js";

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['content-Type', 'Authorization']
};

const app = express();
dotenv.config();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use("/", routes)

app.get("/", (req, res) =>{
    res.send("hello");
    console.log (`done`)
})
connect;
const Port = process.env.Port || 2000;
app.listen(Port, () => {
    console.log('server is running at $Port')
})