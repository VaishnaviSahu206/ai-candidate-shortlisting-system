const Candidate = require("../models/Candidate");

exports.addCandidate = async (req, res) => {
    try {
        const candidate = new Candidate(req.body);
        await candidate.save();

        res.status(201).json(candidate);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getCandidates = async (req, res) => {
    try {
        const candidates = await Candidate.find();
        res.json(candidates);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.matchCandidates = async (req, res) => {
    try {
        const { requiredSkills, minExperience } = req.body;

        const candidates = await Candidate.find();

        const ranked = candidates.map(candidate => {

            const matchedSkills = candidate.skills.filter(skill =>
                requiredSkills.includes(skill)
            );

            const skillScore =
                matchedSkills.length / requiredSkills.length;

            const experienceScore =
                candidate.experience >= minExperience ? 1 : 0;

            const totalScore =
                (skillScore * 0.8) + (experienceScore * 0.2);

            return {
                name: candidate.name,
                email: candidate.email,
                skills: candidate.skills,
                experience: candidate.experience,
                matchedSkills,
                matchScore: (totalScore * 100).toFixed(2)
            };
        });

        ranked.sort((a, b) => b.matchScore - a.matchScore);

        res.json(ranked);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const { getAIShortlist } = require("../services/aiService");

exports.aiShortlist = async (req, res) => {
    try {

        const candidates = await Candidate.find();

        const result = await getAIShortlist(
            req.body,
            candidates
        );

        res.json({
            aiRecommendation: result
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.deleteCandidate = async (
    req,
    res
) => {

    try {

        await Candidate.findByIdAndDelete(
            req.params.id
        );

        res.json({
            message:
            "Candidate deleted"
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
};