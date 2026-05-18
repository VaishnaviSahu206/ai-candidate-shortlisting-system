const axios = require("axios");

exports.getAIShortlist = async (job, candidates) => {

    try {

        const prompt = `
        Job Requirements:
        Skills: ${job.requiredSkills.join(", ")}
        Minimum Experience: ${job.minExperience}

        Candidates:
        ${candidates.map(c =>
            `${c.name} - Skills: ${c.skills.join(", ")} - Experience: ${c.experience}`
        ).join("\n")}

        Rank the best candidates and explain why.
        `;

        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "openai/gpt-3.5-turbo",

                messages: [
                    {
                        role: "user",
                        content: prompt
                    }
                ]
            },
            {
                headers: {
                    Authorization:
                        `Bearer ${process.env.OPENROUTER_API_KEY}`,

                    "Content-Type": "application/json"
                }
            }
        );

        return response.data.choices[0].message.content;

    } catch (error) {

        console.log(error.response?.data || error.message);

        throw error;
    }
};