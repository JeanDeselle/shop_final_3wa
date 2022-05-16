import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import fileUpload from 'express-fileupload'

import router from "./routes/index.js";
import { PORT } from "./config/index.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.static(path.join(__dirname + "/public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(router);

app.listen(PORT, () => {
	console.log(`Listening at http://localhost:${PORT}`);
});