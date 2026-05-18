import api from "../api";
function MatchResults({
    results,
    search
}) {
const filteredResults =
    results.filter(candidate =>
        candidate.skills.some(skill =>
            skill
                .toLowerCase()
                .includes(search.toLowerCase())
        )
    );
    const handleDelete = async (id) => {

    try {

        await api.delete(
            `/candidates/${id}`
        );

        window.location.reload();

    } catch (error) {

        console.log(error);
    }
};
    return (

        <div>

            <h2 className="text-3xl font-bold mb-6">
                Shortlisted Candidates
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

                {
                    filteredResults.map(
                        (candidate, index) => (

                        <div
                            key={index}
                            className="border rounded-xl p-5 shadow-md bg-white"
                        >

                            <h3 className="text-2xl font-bold text-blue-700 mb-2">
                                {candidate.name}
                            </h3>

                            <p>
                                <strong>Email:</strong>
                                {" "}
                                {candidate.email}
                            </p>

                            <p>
                                <strong>Experience:</strong>
                                {" "}
                                {candidate.experience}
                                {" "}
                                years
                            </p>

                            <p>
                                <strong>Match Score:</strong>
                                {" "}
                               <span
    className={`font-bold ${
        candidate.matchScore >= 80
            ? "text-green-600"
            : candidate.matchScore >= 50
            ? "text-yellow-500"
            : "text-red-500"
    }`}
>
                                    {candidate.matchScore}%
                                </span>
                            </p>

                            <p>
                                <strong>Matched Skills:</strong>
                                {" "}
                                {
                                    candidate.matchedSkills.join(", ")
                                }
                            </p>
                            <button
    onClick={() =>
        handleDelete(candidate._id)
    }
    className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
>
    Delete
</button>

                        </div>
                    ))
                }

            </div>

        </div>
    );
}

export default MatchResults;