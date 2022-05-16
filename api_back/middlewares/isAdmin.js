import jwt from "jsonwebtoken";
import "dotenv/config";

const isAdmin = async (req, res, next) => {
	try {
		// un string en 3 parties split avec des "." et la seconde est le token
		const token = req.headers.authorization;
		req.token = jwt.verify(token, process.env.TOKEN_KEY);
		if (req.token.user.isAdmin) {
			next();
		} else {
			res.status(401).json({ error: "this user is not admin" });
		}
	} catch (error) {
		res.status(401).json({ error: "Token invalid" });
	}
};
export default isAdmin;
