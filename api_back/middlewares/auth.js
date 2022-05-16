import jwt from "jsonwebtoken";
import "dotenv/config";

const auth = async (req, res, next) => {
	try {
		// un string en 3 parties split avec des "." et la seconde est le token
		const token = req.headers.authorization;
		req.token = jwt.verify(token, process.env.TOKEN_KEY);
		next();
	} catch (error) {
		res.status(401).json({ error: "Token invalid" });
	}
};
export default auth;
