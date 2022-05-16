import express from "express";

import { addUser, loginUser } from "../controllers/connexion.controller.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", addUser);
router.post("/login", loginUser);

router.post("/test", auth, (req, res) => {
	res.json({ test: "c est bon" });
});

export default router;
