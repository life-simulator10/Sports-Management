import express from "express";
import { addMatch, getAllMatches, updateMatch, deleteMatch } from "../Controllers/match.js";

const router = express.Router();

router.post("/add", addMatch);
router.get("/all", getAllMatches);
router.put("/update", updateMatch);
router.delete("/delete", deleteMatch);


export default router;