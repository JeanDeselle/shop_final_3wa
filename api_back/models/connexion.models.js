import pool from "../config/database/bd.js";

export default class Connexion {
	static async query(sql) {
		const [query] = await pool.execute(sql);
		return query;
	}
	static async queryWithData(sql, data) {
		const [query] = await pool.execute(sql, [...Object.values(data)]);

		return query;
	}
}
