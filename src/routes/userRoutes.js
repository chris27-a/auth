import { Router  } from "express";
import { Register, GetUser, Login } from "../controllers/userController.js"
// import { authenticate, checkType } from "../middleware/Auth.js";


const userRoutes = Router();

userRoutes.get("/", GetUser);
userRoutes.post("/", Register);
userRoutes.post("/login", Login);






export default userRoutes;