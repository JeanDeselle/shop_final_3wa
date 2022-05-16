import express from "express";
import { deleteCategoryById, deleteProductById, deleteUserById, editCategoryById } from "../controllers/admin.controller.js";

import isAdminMW from "../middlewares/isAdmin.js";

const router = express.Router();


router.delete("/delete_user/:id", deleteUserById);
router.delete("/delete_product/:id", deleteProductById);
router.delete("/delete_category/:id", deleteCategoryById);

// router.patch("/edit_product/:id", editproductById)
router.patch("/edit_category/:id", editCategoryById)


router.get("/test", isAdminMW, (req, res) => {
	res.json({ test: "c bon" });
});

export default router;
