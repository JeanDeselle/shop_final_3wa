import bcrypt from "bcrypt";
import validator from "validator";
import "dotenv/config";
import jwt from "jsonwebtoken";

import Connexion from "../models/connexion.models.js";
import { saltRounds, itExist } from "../config/index.js";

export const addUser = async (req, res) => {
	const sql = `INSERT INTO user( firstname, lastname, pseudo, password, role, email) VALUES (?,?,?,?,?,?)`;
	const data = {
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		pseudo: req.body.pseudo,
		// hash le password
		password: await bcrypt.hash(req.body.password, saltRounds),
		role: req.body?.isAdmin ? "admin" : "user",
		email: req.body.email,
	};
	console.log(data);
	// verif si c est un mail
	if (!validator.isEmail(data.email)) {
		return res.json({ error: "not an email", field: "email" });
	}
	// verif si y'a un chiffre
	if (!validator.isAlpha(data.firstname)) {
		return res.json({
			error: "firstname is not valid",
			field: "firstname",
		});
	}
	// verif si y'a un chiffre
	if (!validator.isAlpha(data.lastname)) {
		return res.json({ error: "lastname is not valid", field: "lastname" });
	}
	// verif si le mail est utiliser
	if (await itExist("Email", data.email, Connexion, "user")) {
		return res.json({ error: "this mail is used" });
	}

	// const validPass = validator.isStrongPassword(req.body.password, {
	// 	minLength: 8,
	// 	minLowercase: 1,
	// 	minUppercase: 1,
	// 	minNumbers: 1,
	// 	minSymbols: 1,
	// });

	// if (!validPass) {
	// 	return res.status(500).json({ error: "not valid", field: "password" });
	// }

	try {
		await Connexion.queryWithData(sql, data);
		res.status(200).json({ result: "user added" });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: "error in request" });
	}
};

export const loginUser = async (req, res) => {
	const sql = `SELECT * FROM user WHERE email = ?`;
	const data = {
		email: req.body.email,
		password: req.body.password,
	};
	console.log(data);

	if (!validator.isEmail(data.email)) {
		return res.json({ error: "not an email" });
	}

	try {
		const user = await Connexion.queryWithData(sql, { data: data.email });
		// si user est dans la BDD
		if (user.length) {
			const isPwValid = await bcrypt.compare(
				data.password,
				user[0].password
			);
			// si c est le bon mdp
			if (isPwValid) {
				//si user a validé par mail
				if (user[0].validate === "true") {
					const token = jwt.sign(
						{
							user: {
								lastname: user[0].lastname,
								firstname: user[0].firstname,
								email: user[0].email,
								isAdmin:
									user[0].role === "admin" ? true : false,
							},
						},
						process.env.TOKEN_KEY
					);

					res.status(200).json({
						token: token,
					});
				} else {
					res.json({ error: "account is not validate" });
				}
			} else {
				return res.json({ error: "bad password" });
			}
		} else {
			return res.json({ error: "user not find" });
		}
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: "error in request" });
	}
};
