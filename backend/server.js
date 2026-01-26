const express = require("express"); 
const bodyParser = require("body-parser"); 
const cors = require("cors"); 
require("dotenv").config(); 
const routes = require("./routes.json");
const app = express(); 
 
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json()); 
app.use(express.json()); 
app.use(cors()); 

let windowData = [];
let bannedApplications = [];

app.post("/test", (req, res) => {
    console.log("Received window data:", JSON.stringify(req.body, null, 2));
    windowData = req.body.windows;
    res.sendStatus(200);
}); 

app.post("/applications", (req, res) => {
    bannedApplications = req.body.applications;
    res.sendStatus(200);
})

app.get("/applications", (req, res) => {
    res.json(bannedApplications);

})

app.get("/windows", (req, res) => {
    res.json(windowData);
});

app.get("/", (req, res) => {
    res.json(routes);
});

const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 
