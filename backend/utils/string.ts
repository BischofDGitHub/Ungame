// utils/string.ts
import { randomUUID } from "crypto";

/**
 * Generiert eine eindeutige ID (UUID v4)
 */
export const generateUniqueId = (): string => {
    return randomUUID();
};