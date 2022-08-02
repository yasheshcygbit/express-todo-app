import mongoose, { ConnectOptions } from "mongoose";

import { dbUrl } from "./index";

mongoose.connect(
	dbUrl,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		// useCreateIndex: true,
		// useFindAndModify: false
	},
	function (err: any) {
		if (err) {
			console.log("error", err);
		} else {
			console.log("info", "Database connected successfully");
		}
	}
);

//mongoose.set("debug", true)
