import { getRandomInt, itExist } from "../config/index.js";
import Shop from "../models/shop.models.js";

export const deleteUserById = async (req, res) => {
	const sql = `DELETE FROM user WHERE id = ?`;
	const data = {
		id: req.params.id,
	};

	try {
		await Shop.queryWithData(sql, data);
		res.status(200).json({ result: "user deleted" });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: "error in request" });
	}
};

export const deleteProductById = async (req, res) => {
	const sql = `DELETE FROM product WHERE id = ?`;
	const data = {
		id: req.params.id,
	};

	try {
		await Shop.queryWithData(sql, data);
		res.status(200).json({ result: "product deleted" });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: "error in request" });
	}
};

export const deleteCategoryById = async (req, res) => {
	const sql = `DELETE FROM category WHERE id = ?`;
	const sql2 = `UPDATE product SET cat_id=0 WHERE cat_id = ?`;
	const data = {
		id: req.params.id,
	};
	const catExist = await itExist("id", data.id, Shop, "category");

	try {
		if (!catExist) {
			res.json({ error: "category does not exist" });
			return;
		}
		await Shop.queryWithData(sql, data);
		await Shop.queryWithData(sql2, data);
		res.status(200).json({ result: "category deleted" });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: "error in request" });
	}
};

export const editCategoryById = async (req, res) => {
	const sql = ` UPDATE category SET name= ? WHERE id = ?`;
	const data = {
		name: req.body.name,
		id: req.params.id,
	};

	const catExist = await itExist("id", data.id, Shop, "category");
	if (catExist) {
		try {
			await Shop.queryWithData(sql, data);
			res.status(200).json({ result: "category edited" });
		} catch (err) {
			console.log(err);
			return res.status(500).json({ error: "error in request" });
		}
	} else {
		res.status(200).json({ error: "this category does not exist" });
	}
};
