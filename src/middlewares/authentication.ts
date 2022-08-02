import jwt from "jsonwebtoken";
import { JWT_KEY } from "../config/index";

export const generateJWTtoken = async (payload: any, expiry = 8640000) => {
	return new Promise((resolve, reject) => {
		jwt.sign(payload, JWT_KEY, { expiresIn: expiry }, (err: any, token: any) => {
			if (err) reject(err);
			else resolve(token);
		});
	});
};

export const authMiddleware = async (req: any, res: any, next: any) => {
	//get the token from the header if present
	const token = req.headers["x-access-token"] || req.headers["authorization"];
	//if no token found, return response (without going to the next middelware)
	if (!token) return res.status(401).send({ status: 'ERROR', message: "Access denied. No token provided.", data: 'UNAUTHORIZED' });
	try {
		//if can verify the token, set req.user and pass to next middleware
		const decoded = jwt.verify(token, JWT_KEY);
		req.user = decoded;
		next();
	} catch (e) {
		console.log(e);
		res.status(401).send({ status: 'ERROR', message: "Access denied. No token provided.", data: 'INVALID_USER' });
	}
};
