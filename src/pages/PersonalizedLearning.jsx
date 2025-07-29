import { useState } from "react";
import axios from "axios";

export default function PersonalizedLearning() {
  const [topic, setTopic] = useState("");
  const [skillLevel, setSkillLevel] = useState("Beginner");
  const [goal, setGoal] = useState("");
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateRoadmap = async () => {
    if (!topic || !goal) return alert("Please fill in all fields!");
    setLoading(true);
    setError("");
    try {
      const response = await axios.post("http://localhost:5000/generate-roadmap", {
        topic,
        goal,
        skillLevel,
      });

      let roadmapData = response.data.roadmap;

      // Clean and parse JSON if it's a string
      if (typeof roadmapData === "string") {
        roadmapData = roadmapData.replace(/```json|```/g, "").trim();
        roadmapData = JSON.parse(roadmapData);
      }

      setRoadmap(roadmapData);
    } catch (err) {
      console.error(err);
      setError("Failed to generate roadmap. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">
        Personalized Learning Roadmap
      </h1>

      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter a topic (e.g., Web Development)"
        className="border p-2 rounded w-full mb-4"
      />
      <select
        value={skillLevel}
        onChange={(e) => setSkillLevel(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      >
        <option>Beginner</option>
        <option>Intermediate</option>
        <option>Advanced</option>
      </select>
      <input
        type="text"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        placeholder="Enter your learning goal"
        className="border p-2 rounded w-full mb-4"
      />
      <button
        onClick={generateRoadmap}
        disabled={loading}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 w-full"
      >
        {loading ? "Generating..." : "Generate Roadmap"}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {roadmap && (
        <div className="mt-6 p-6 border rounded bg-blue-50 shadow">
          <h2 className="font-semibold mb-4 text-xl text-blue-700">
            Your Roadmap
          </h2>
          <p className="mb-6 text-gray-800">{roadmap.overview}</p>
          <div className="space-y-6">
            {roadmap.steps?.map((step, idx) => (
              <div
                key={idx}
                className="p-5 border rounded bg-white shadow-md transition transform hover:scale-[1.02] hover:shadow-lg"
              >
                <h3 className="font-semibold text-indigo-700 text-lg">
                  {idx + 1}. {step.title}
                </h3>
                <p className="text-gray-700 mt-2">{step.description}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Estimated Time: <span className="font-medium">{step.estimated_time}</span>
                </p>
                <ul className="list-disc pl-5 mt-3 space-y-1">
                  {step.resources?.map((res, i) => (
                    <li key={i}>
                      <a
                        href={res}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:underline"
                      >
                        {res}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}