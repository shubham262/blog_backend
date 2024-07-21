const express = require("express")
const { databaseConnection } = require("./src/DB");
const expressApp = require("./src/express-app");
require("dotenv").config();
const path = require("path")

const StartServer = async () => {
    const app = express();
    await expressApp(app);
    await databaseConnection(); 

    app.use(express.urlencoded({extended: true}))
    app.use(express.static(path.join(__dirname, 'Frontend', 'dist')));
    app.use("/public",express.static(__dirname + "/public"));


    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "Frontend", "dist", "index.html"))
    })
    
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Study Server is running on port ${process.env.PORT || 8000}`)
    }).on('error', (err) => {
        console.log(err);
        process.exit();
    })
}

StartServer();