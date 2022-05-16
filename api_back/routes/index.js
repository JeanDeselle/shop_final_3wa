import express from "express";
import connexionRoutes from "./connexion.routes.js";
import shopRoutes from "./shop.routes.js";
import adminRoute from "./admin.routes.js";

const router = express.Router();

router.use("/api/v1/connexion", connexionRoutes);
router.use("/api/v1/shop", shopRoutes);
router.use("/api/v1/admin", adminRoute);

export default router;
