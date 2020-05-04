const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const server = require('http').createServer(app);

var corsOptions = {
    origin: process.env.CORS_URL || "http://localhost:8080"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
//db.sequelize.sync();
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
});

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
});

//Basic Authentication
require("./app/helpers/auth.basic")(app);

// Router
require("./app/routes/alarm.routes")(app);

// Websocket
require("./app/socket/web.socket")(server);


(async () => {
    if(process.env.NODE_ENV == 'production'){
        console.log(`process.env.CORS_URL => ${process.env.CORS_URL}`);
        console.log(`process.env.POSTGRES_DATABASE_URL => ${process.env.POSTGRES_DATABASE_URL}`);
        console.log(`process.env.POSTGRES_HOST => ${process.env.POSTGRES_HOST}`);
        console.log(`process.env.POSTGRES_USER => ${process.env.POSTGRES_USER}`);
        console.log(`process.env.POSTGRES_PASSWORD => ${process.env.POSTGRES_PASSWORD}`);
        console.log(`process.env.POSTGRES_DB => ${process.env.POSTGRES_DB}`);
        console.log(`process.env.POSTGRES_DIALECT => ${process.env.POSTGRES_DIALECT}`);
    }
})();

// set port, listen for requests
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});