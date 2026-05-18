import { useState } from "react";
import api from "../api";

function JobForm({
    setResults,
    setAIResult
}) {

    const [job, setJob] = useState({
        requiredSkills: "",
        minExperience: ""
    });

    const handleChange = (e) => {

        setJob({
            ...job,
            [e.target.name]:
                e.target.value
        });
    };

    const handleMatch = async () => {

        try {

            const response =
                await api.post(
                    "/match",
                    {
                        requiredSkills:
                            job.requiredSkills
                                .split(",")
                                .map(skill =>
                                    skill.trim()
                                ),

                        minExperience:
                            Number(
                                job.minExperience
                            )
                    }
                );

            setResults(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    const handleAIShortlist =
        async () => {

            try {

                const response =
                    await api.post(
                        "/ai/shortlist",
                        {
                            requiredSkills:
                                job.requiredSkills
                                    .split(",")
                                    .map(skill =>
                                        skill.trim()
                                    ),

                            minExperience:
                                Number(
                                    job.minExperience
                                )
                        }
                    );

                setAIResult(
                    response.data.aiRecommendation
                );

            } catch (error) {

                console.log(error);
            }
        };

    return (

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <input
                type="text"
                name="requiredSkills"
                placeholder="Required Skills"
                value={job.requiredSkills}
                onChange={handleChange}
                className="border p-3 rounded-lg"
            />

            <input
                type="number"
                name="minExperience"
                placeholder="Min Experience"
                value={job.minExperience}
                onChange={handleChange}
                className="border p-3 rounded-lg"
            />

            <div className="flex gap-4">

                <button
                    onClick={handleMatch}
                    className="bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700"
                >
                    Match Candidates
                </button>

                <button
                    onClick={handleAIShortlist}
                    className="bg-purple-600 text-white px-5 py-3 rounded-lg hover:bg-purple-700"
                >
                    AI Shortlist
                </button>

            </div>

        </div>
    );
}

export default JobForm;