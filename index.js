//Dependencies
const morgan = require('morgan');
const express = require('express');
const app = express();


//Ubicacion Routes
const empleados = require("./routes/empleados")
const login = require("./routes/login");


//Middleware
const index = require("./middleware/index");
const cors = require("./middleware/cors");
const notFound = require("./middleware/notFound");
const auth = require("./middleware/auth");
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors);

//Routes
app.get("/", index);
app.use("/login", login)
app.use(auth);
app.use("/empleados", empleados);
app.use(notFound);

//Server
app.listen(process.env.PORT || 3000, () => {
    console.log('server is running...');
})