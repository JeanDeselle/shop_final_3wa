import { getRandomInt, itExist } from "../config/index.js";
import Shop from "../models/shop.models.js";

export const getAllProduct = async (req, res) => {
	const sql = `SELECT * FROM product`;

	try {
		const products = await Shop.query(sql);
		res.status(200).json({ result: products });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: "error in request" });
	}
};

export const getOneProductById = async (req, res) => {
	const data = {
		id: req.params.id,
	};
	const sql = `SELECT * FROM product Where id = ?`;

	try {
		const products = await Shop.queryWithData(sql, data);
		res.status(200).json({ result: products });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: "error in request" });
	}
};

export const addProduct = async (req, res) => {
	const sql = `INSERT INTO product( name, price, description, image, cat_id) VALUES (?,?,?,?,?)`;
	const data = {
		name: req.body.name,
		price: req.body.price,
		description: req.body.description,
		image: req.body.image ? req.body.image : "default.jpg",
		cat_id: req.body.cat_id,
	};
	console.log(data);

	if (
		!data.name.length ||
		data.price < 0 ||
		data.cat_id < 0 ||
		!data.description.length ||
		!data.image.length
	) {
		res.status(200).json({ error: "check each field" });
		return;
	}

	try {
		const products = await Shop.queryWithData(sql, data);
		res.status(200).json({ result: "products added" });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: "error in request" });
	}
};

export const addImage = async (req, res) => {
	const random = getRandomInt(1, 20000) + "-";
	const data = {
		imageFile: req.files?.image,
		image:
			req.files?.image !== undefined
				? random + req.files.image.name
				: null,
	};

	if (data.image !== null) {
		data.imageFile.mv(`public/img/${data.image}`, (err) => {
			if (err) {
				return res.status(500).send(err);
			}
			res.json({ name: data.image });
		});
	} else {
		res.status(500).json({ error: "problem with image" });
	}
};

export const getAllCategory = async (req, res) => {
	const sql = `SELECT * FROM category`;

	try {
		const cat = await Shop.query(sql);
		res.status(200).json({ result: cat });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: "error in request" });
	}
};

export const addCategory = async (req, res) => {
	const sql = `INSERT INTO category(name) VALUES (?)`;
	const data = {
		name: req.body.name,
	};

	try {
		await Shop.queryWithData(sql, data);
		res.status(200).json({ result: "category added" });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: "error in request" });
	}
};

export const getAllProductByCat = async (req, res) => {
	const sql = `SELECT * FROM product WHERE cat_id = ?`;
	const data = {
		id: req.params.id_cat,
	};

	try {
		const result = await Shop.queryWithData(sql, data);
		if (result.length) {
			res.status(200).json({ result: result });
		} else {
			const catExist = await itExist("id", data.id, Shop, "category");
			if (catExist) {
				res.status(200).json({ error: "0 product in this category " });
			} else {
				res.status(200).json({ error: "category does not exist" });
			}
		}
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: "error in request" });
	}
};
