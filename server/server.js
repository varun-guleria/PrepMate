import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

/** Generate quiz */
app.post("/generate-quiz", async (req, res) => {
  const { topic } = req.body;
  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "meta-llama/llama-4-scout-17b-16e-instruct",
        messages: [
          { role: "system", content: "You are a quiz generator. Respond ONLY in valid JSON, no extra text." },
          {
            role: "user",
            content: `Generate 5 multiple-choice questions on ${topic}. 
            STRICTLY return this JSON format (NO extra text, no backticks):
            [
              {
                "question": "string",
                "options": ["string","string","string","string"],
                "correct_answer": "string"
              }
            ]`
          }
        ],
        max_tokens: 800,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    let raw = response.data.choices[0].message.content.trim();
    // Extract JSON inside if wrapped in markdown or extra text
    const match = raw.match(/\[([\s\S]*)\]/);
    if (match) raw = match[0];

    let quiz = [];
    try {
      quiz = JSON.parse(raw);
      if (!Array.isArray(quiz)) throw new Error("Not an array");
    } catch (e) {
      console.error("Invalid JSON from model:", raw);
      quiz = [];
    }

    res.json({ quiz });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ quiz: [], error: "Failed to generate quiz" });
  }
});

/** Basic feedback */
app.post("/personalized-feedback", async (req, res) => {
  const { topic, incorrectQuestions } = req.body;
  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "meta-llama/llama-4-scout-17b-16e-instruct",
        messages: [
          { role: "system", content: "You are an expert tutor. Give short constructive advice." },
          {
            role: "user",
            content: `The student attempted a quiz on ${topic}. These are the questions they got wrong: ${JSON.stringify(incorrectQuestions)}.
            Give 3-4 sentences of feedback on what to study next.`
          }
        ],
        max_tokens: 300,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const advice = response.data.choices[0].message.content || "Review your incorrect answers and study the key concepts.";
    res.json({ advice });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ advice: "Could not generate personalized feedback." });
  }
});
app.post("/generate-roadmap", async (req, res) => {
  const { topic, goal, skillLevel } = req.body;
  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "meta-llama/llama-4-scout-17b-16e-instruct",
        messages: [
          { role: "system", content: "You are a helpful assistant. Respond ONLY with valid JSON, no markdown, no extra text." },
          {
            role: "user",
            content: `Create a complete, valid JSON roadmap for ${topic}.
Goal: ${goal}.
Skill Level: ${skillLevel}.
Respond strictly in this JSON format:
{
  "overview": "string",
  "steps": [
    {
      "title": "string",
      "description": "string",
      "estimated_time": "string",
      "resources": ["string"]
    }
  ]
}`
          }
        ],
        max_tokens: 3000, // allow more space
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY_ROADMAP}`,
          "Content-Type": "application/json"
        }
      }
    );

    let content = response.data.choices[0].message.content;
    content = content.replace(/```json|```/g, "").trim();

    let roadmap;
    try {
      roadmap = JSON.parse(content);
    } catch (e) {
      console.error("Invalid JSON from model:", content);
      // Try to salvage: cut off at last full bracket
      const safeContent = content.substring(0, content.lastIndexOf("]") + 1) + "}";
      try {
        roadmap = JSON.parse(safeContent);
      } catch {
        return res.json({ roadmap: { overview: "Partial response", steps: [], raw: content } });
      }
    }

    res.json({ roadmap });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Failed to generate roadmap" });
  }
});
app.listen(5000, () => console.log("Server running on http://localhost:5000"));