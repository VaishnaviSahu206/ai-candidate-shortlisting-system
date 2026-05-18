const express = require("express");

const router = express.Router();

const {
    addCandidate,
    getCandidates,
    matchCandidates,
    aiShortlist
} = require("../controllers/candidateController");

router.post("/candidates", addCandidate);

router.get("/candidates", getCandidates);

router.post("/match", matchCandidates);

router.post("/ai/shortlist", aiShortlist);

module.exports = router;