import { Trophy, Star, Award, Flame } from "lucide-react";

export default function Achievements() {
  const badges = [
    { icon: <Star className="w-12 h-12 text-yellow-500" />, title: "Quiz Master", desc: "Completed 10 quizzes" },
    { icon: <Flame className="w-12 h-12 text-orange-500" />, title: "Streak Keeper", desc: "7 days of continuous learning" },
    { icon: <Award className="w-12 h-12 text-purple-500" />, title: "Top Performer", desc: "Scored above 90% in 5 quizzes" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <h2 className="text-4xl font-bold text-center mb-10 text-indigo-600">Your Achievements</h2>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {badges.map((badge, index) => (
          <div key={index} className="bg-white rounded-xl shadow p-6 text-center hover:shadow-lg transition">
            {badge.icon}
            <h3 className="mt-4 text-xl font-semibold">{badge.title}</h3>
            <p className="text-gray-600">{badge.desc}</p>
          </div>
        ))}
      </div>

      {/* Progress Bar Section */}
      <div className="mt-16 max-w-3xl mx-auto text-center">
        <h3 className="text-2xl font-semibold mb-4">Level Progress</h3>
        <div className="w-full bg-gray-300 rounded-full h-6">
          <div className="bg-indigo-600 h-6 rounded-full" style={{ width: "65%" }}></div>
        </div>
        <p className="mt-2 text-gray-700">Level 3 – 65% to Level 4</p>
      </div>
    </div>
  );
}