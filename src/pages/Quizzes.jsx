import { useState } from "react";
import axios from "axios";

export default function Quizzes() {
  const [topic, setTopic] = useState("");
  const [quiz, setQuiz] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateQuiz = async () => {
    if (!topic) return alert("Please enter a topic!");
    setLoading(true);
    setError("");
    setSubmitted(false);
    setSelectedAnswers({});
    try {
      const response = await axios.post(
        "https://prepmate-server-48bt.onrender.com/generate-quiz",
        { topic }
      );
      const quizData = Array.isArray(response.data.quiz) ? response.data.quiz : [];
      setQuiz(quizData);
      if (quizData.length === 0) setError("No quiz could be generated. Try again.");
    } catch (err) {
      console.error(err);
      setError("Failed to generate quiz. Try again later.");
      setQuiz([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (index, option) => {
    if (!submitted) {
      setSelectedAnswers((prev) => ({ ...prev, [index]: option }));
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    let correct = 0;
    quiz.forEach((q, index) => {
      if (selectedAnswers[index] === q.correct_answer) correct++;
    });
    setScore(correct);
  };

  const handleRetry = () => {
    setSubmitted(false);
    setSelectedAnswers({});
    setScore(0);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center text-indigo-700">AI-Powered Quizzes</h1>
      
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter topic (e.g., Data Structures)"
          className="border p-2 rounded w-full shadow-sm"
        />
        <button
          onClick={generateQuiz}
          disabled={loading}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 shadow-md"
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {quiz.length > 0 && (
        <div className="grid gap-4">
          {quiz.map((q, index) => {
            const isCorrect = submitted && selectedAnswers[index] === q.correct_answer;
            const isWrong = submitted && selectedAnswers[index] && selectedAnswers[index] !== q.correct_answer;
            return (
              <div
                key={index}
                className={`p-4 border rounded-lg shadow-md transition ${
                  isCorrect
                    ? "bg-green-50 border-green-400"
                    : isWrong
                    ? "bg-red-50 border-red-400"
                    : "bg-white hover:shadow-lg"
                }`}
              >
                <p className="font-semibold text-lg mb-3">
                  {index + 1}. {q.question}
                </p>
                <ul className="space-y-2">
                  {q.options?.map((opt, i) => (
                    <li key={i}>
                      <button
                        onClick={() => handleSelect(index, opt)}
                        className={`w-full text-left p-2 rounded border transition ${
                          selectedAnswers[index] === opt
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-100 hover:bg-gray-200"
                        }`}
                        disabled={submitted}
                      >
                        {opt}
                      </button>
                    </li>
                  ))}
                </ul>
                {submitted && isWrong && (
                  <p className="mt-3 text-sm text-gray-700">
                    <strong>Correct Answer:</strong> {q.correct_answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}

      {quiz.length > 0 && !submitted && (
        <button
          onClick={handleSubmit}
          className="mt-6 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 block mx-auto shadow-md"
        >
          Submit Quiz
        </button>
      )}

      {submitted && (
        <div className="mt-6 p-4 border rounded bg-green-50 shadow-md text-center">
          <h2 className="text-xl font-semibold text-green-700">Your Score: {score}/{quiz.length}</h2>
          <button
            onClick={handleRetry}
            className="mt-3 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 shadow-md"
          >
            Retry Quiz
          </button>
        </div>
      )}
    </div>
  );
}