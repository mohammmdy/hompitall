const path = require("path"); //core module

//therd party modules
const express = require("express");
const cors = require('cors');
const dotenv = require("dotenv");
const morgan = require("morgan"); //middelware

dotenv.config({ path: "config.env" });
const ApiError = require("./utils/apiError");
const dbConnection = require("./config/database");
//Routes
const userRoute = require("./routes/userRoute");
const authRout = require("./routes/authRoute");
const hospitalRoute = require('./routes/hospitalRoute')
const selectRoute = require('./routes/selectRoute')

const globalError = require("./middlewares/errorMiddleWare");

// const { createMachineState } = require('./services/machineService')


// //create machine field (in table machine ) :for admin 
// createMachineState()



//connect with db
dbConnection();

//express app
const app = express();

//middelware usage
app.use(express.json()); //parsing json
app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode:${process.env.NODE_ENV}`);
}

//Mount routes
app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRout);
app.use("/api/v1/hospital", hospitalRoute);
app.use("/api/v1/select", selectRoute);   

app.all("*", (req, res, next) => {
  next(new ApiError(`can't find this route:${req.originalUrl}`, 400));
});

//glopal error handling meddelware
app.use(globalError);

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

//handelling any error outside express
process.on("unhandledRejection", (err) => {
  console.error(`UnhandeledRejection Errors: ${err.name} <|> ${err.message}`);
  server.close(() => {
    console.error("shutting down ....");
    process.exit(1);
  });
});

// 2.plan with doctor
// 3.document with doctor
// 4.project recap . 
