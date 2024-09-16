require("dotenv").config()
let http = require("http");
let express = require("express");
let app = express();
app.use(express.json());
let mongoose = require("mongoose");
const routes = require("./routes");


// routes
app.use("/v1", routes)

// databse connection & http server
mongoose.connect(process.env.DB_URL).then(() => {
    http.createServer(app).listen(process.env.PORT, () => {
        console.log(`server states success ${process.env.PORT}`);
    });
    console.log("database connect suuccess");
}).catch((error) => {
    console.log(error, "database connection error");
});


