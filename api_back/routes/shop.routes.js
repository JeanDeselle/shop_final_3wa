import express from "express";
import {
	addCategory,
	addImage,
	addProduct,
	getAllCategory,
	getAllProduct,
	getAllProductByCat,
	getOneProductById,
} from "../controllers/shop.controller.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get("/get_all_product", getAllProduct);
router.get("/details/:id", getOneProductById);
router.get("/get_all_category", getAllCategory);
router.get("/category/:id_cat", getAllProductByCat);

router.post("/add_product", auth, addProduct);
router.post("/add_image", auth, addImage);
router.post("/add_category", auth, addCategory);

export default router;
