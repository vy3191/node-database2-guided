const express = require("express");
const helmet = require("helmet");
const morgan = require('morgan');
const welcomeRouter = require("./welcome/welcome-router")
const fruitsRouter = require("./fruits/fruits-router")

const server = express()
const port = process.env.PORT || 5000;

server.use(helmet());
server.use(morgan('tiny'));
server.use(express.json());

server.use("/", welcomeRouter)
server.use("/fruits", fruitsRouter);

server.use((req,res,next) => {
	 res.status(404).json({
		  msg:'Route Not Found'
	 });
});

server.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
		message: "Something went wrong",
	})
});

server.listen(port, () => {
	console.log(`Running at http://localhost:${port}`)
});
