const express = require("express"); 
const bodyParser = require("body-parser"); 
const cors = require("cors"); 
require("dotenv").config(); 
 
const app = express(); 
 
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json()); 
app.use(express.json()); 
app.use(cors()); 

let windowData = [];

app.post("/test", (req, res) => {
    console.log("Received window data:", JSON.stringify(req.body, null, 2));
    windowData = req.body.windows;
    res.sendStatus(200);
}); 


app.get("/windows", (req, res) => {
    res.json(windowData);
});

const PORT = process.env.PORT || 6767; 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 
