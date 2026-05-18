import { useState } from "react";
import api from "../api";

function CandidateForm() {

    const [form, setForm] = useState({
        name: "",
        email: "",
        skills: "",
        experience: "",
        projects: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await api.post("/candidates", {
                ...form,
                skills: form.skills
                    .split(",")
                    .map(skill => skill.trim()),

                experience:
                    Number(form.experience)
            });

            alert("Candidate Added");
            setForm({
    name: "",
    email: "",
    skills: "",
    experience: "",
    projects: ""
});

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >

            <input
                type="text"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                className="border p-3 rounded-lg"
            />

            <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="border p-3 rounded-lg"
            />

            <input
                type="text"
                name="skills"
                placeholder="Skills (React, Node.js)"
                value={form.skills}
                onChange={handleChange}
                className="border p-3 rounded-lg"
            />

            <input
                type="number"
                name="experience"
                placeholder="Experience"
                value={form.experience}
                onChange={handleChange}
                className="border p-3 rounded-lg"
            />

            <textarea
                name="projects"
                placeholder="Projects / Bio"
                value={form.projects}
                onChange={handleChange}
                className="border p-3 rounded-lg md:col-span-2"
            />

            <button
                type="submit"
                className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
            >
                Add Candidate
            </button>

        </form>
    );
}

export default CandidateForm;