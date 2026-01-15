import { requireAuth } from "@clerk/express";
import { user as User } from "../model/User.js";

export const protectRoute = [
  requireAuth(),
  async (req, res, next) => {
    try {
      const clerkId = req.auth.userId;

      if (!clerkId) return res.status(401).json({ message: "Unauthorized - invalid token" });

      // find user in db by clerk ID
      const userData = await User.findOne({ clerkId });

      if (!userData) return res.status(404).json({ message: "User not found" });

      // attach user to req
      req.user = userData;

      next();
    } catch (error) {
      console.error("Error in protectRoute middleware", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
];