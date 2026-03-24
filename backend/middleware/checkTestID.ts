import type { Request, Response, NextFunction } from "express";
import { initializeRedisClient } from "../utils/client";
import { testKeyById as keyTester } from "../utils/keys";

export const checkTestExists = async (req: Request, res: Response, next: NextFunction) => {
    const testID = req.params.testID;
    if (!testID || typeof testID !== 'string') {
        res.status(400).json({ message: "Invalid or missing Test ID" });
        return;
    }
    const TestClient = await initializeRedisClient();
    const testKey = keyTester(testID);
    const exists = await TestClient.exists(testKey);
    if (!exists) {
        res.status(404).json({ message: "Test not found" });
        return;
    }
    next();
};