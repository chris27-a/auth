import userRoutes from '../routes/userRoutes.js'
import express from 'express';

const routes = express.Router();

routes.use("/user", userRoutes);

export default routes