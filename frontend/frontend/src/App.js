import { useState } from "react";

import CandidateForm from "./components/CandidateForm";
import JobForm from "./components/JobForm";
import MatchResults from "./components/MatchResults";

function App() {

    const [results, setResults] = useState([]);
    const [aiResult, setAIResult] = useState("");
    const [search, setSearch] = useState("");

    return (

        <div className="min-h-screen bg-gray-100 p-10">

            <h1 className="text-5xl font-bold text-center mb-10 text-blue-700">
                AI Candidate Shortlisting System
            </h1>

            <div className="bg-white p-6 rounded-xl shadow-lg mb-8">

                <CandidateForm />

            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg mb-8">

                <JobForm
                    setResults={setResults}
                    setAIResult={setAIResult}
                />

            </div>

            <input
                type="text"
                placeholder="Search by skill..."
                value={search}
                onChange={(e) =>
                    setSearch(e.target.value)
                }
                className="border p-3 rounded-lg w-full mb-6"
            />

            <div className="bg-white p-6 rounded-xl shadow-lg">

                <MatchResults
                    results={results}
                    search={search}
                />

            </div>

            {
                aiResult && (

                    <div className="bg-blue-100 p-6 rounded-xl shadow-lg mt-8">

                        <h2 className="text-2xl font-bold mb-4">
                            AI Recommendation
                        </h2>

                        <p className="text-lg whitespace-pre-line">
                            {aiResult}
                        </p>

                    </div>
                )
            }

        </div>
    );
}

export default App;