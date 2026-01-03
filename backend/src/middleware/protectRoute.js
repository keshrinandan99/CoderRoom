import { requireAuth } from "@clerk/express";
import { user as UserModel } from "../model/User.js";

export const protectRoute = [
    requireAuth(),
    async (req, res, next) => {
        try {
            const clerkId = req.auth().userId;
            if (!clerkId) return res.status(401).json({ message: "Clerk id not found!" });
            const foundUser = await UserModel.findOne({ clerkId });
            if (!foundUser) return res.status(404).json({ message: "User not found!" });
            req.user = foundUser;
            next();

        } catch (error) {
            console.error("Clerk middleware error", error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
];