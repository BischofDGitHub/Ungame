import { Router } from 'express';
import { validate } from './middleware/validate';
import { testSchema, TestSchemaType } from './schemas/testSchema';
import { initializeRedisClient } from './utils/client';
import { testKeyById } from './utils/keys';
import { generateUniqueId } from './utils/string';
import { checkTestExists } from './middleware/checkTestID';
import routesJson from "./routes.json";

const router = Router();

let windowData: string[] = [];
let bannedApplications: string[] = [];

router.post("/test", (req: any, res: any) => {
    console.log("Received window data:", JSON.stringify(req.body, null, 2));
    windowData = req.body.openedWindows;
    res.sendStatus(200);
});

router.post("/applications", (req: any, res: any) => {
    bannedApplications = req.body;
    res.sendStatus(200);
})

router.get("/applications", (req: any, res: any) => {
    res.json(bannedApplications);

})

router.get("/windows", (req: any, res: any) => {
    res.json(windowData);
});

router.get("/", (req: any, res: any) => {
    res.json(routesJson);
});


router.post('/test', validate(testSchema), async (req, res, next) => {
    const data = req.body as TestSchemaType;
    try {
        const client = await initializeRedisClient();
        const id = generateUniqueId();
        const restaurantKey = testKeyById(id);
        const hashData = {
            id: id,
            name: data.name,
            age: data.age ?? 0,
        };
        const result = await client.hSet(restaurantKey, hashData);
        console.log(`Added ${result} fields to ${restaurantKey}`);
        res.send({ success: true, message: "Data received", receivedData: hashData });
    } catch (err) {
        next(err);
    }
});

router.get("/test/:testID", checkTestExists, async (req, res, next) => {
    const testID = req.params.testID;
    if (typeof testID !== 'string') {
        res.status(400).json({ message: "Invalid Test ID" });
        return;
    }
    try {
        const client = await initializeRedisClient();
        const tKey = testKeyById(testID);
        const [viewCount, Test] = await Promise.all([
            client.hIncrBy(tKey, "viewCount", 1),
            client.hGetAll(tKey)
        ]);
        res.status(200).json({ message: "Test exists", test: Test });
    } catch (err) {
        next(err);
    }
});

export default router;