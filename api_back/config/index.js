export const PORT = process.env.PORT || process.env.SERVER_LOCAL_PORT || 9300;
export const saltRounds = 10;

export function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

export const itExist = async (field, param, model, table) => {
	const sql = `SELECT * FROM ${table} WHERE ${field} = ?`;
	const cat = await model.queryWithData(sql, { param: param });

	if (cat.length) {
		return true;
	} else {
		return false;
	}
};
