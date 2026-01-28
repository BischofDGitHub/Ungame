import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import routes from "./routes.json" with { type: "json" };
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

let windowData: JSON[] = [];
let bannedApplications: JSON[] = [];

app.post("/test", (req: any, res: any) => {
    console.log("Received window data:", JSON.stringify(req.body, null, 2));
    windowData = req.body.windows;
    res.sendStatus(200);
});

app.post("/applications", (req: any, res: any) => {
    bannedApplications = req.body.applications;
    res.sendStatus(200);
})

app.get("/applications", (req: any, res: any) => {
    res.json(bannedApplications);

})

app.get("/windows", (req: any, res: any) => {
    res.json(windowData);
});

app.get("/", (req: any, res: any) => {
    res.json(routes);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 
