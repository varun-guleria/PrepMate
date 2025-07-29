import { Link, useNavigate } from "react-router-dom";
import { 
  Brain, 
  BookOpen, 
  Trophy, 
  Target, 
  Clock,
  BarChart3
} from "lucide-react";
import { useEffect } from "react";

export default function Index() {
  const navigate = useNavigate();

  // Enable smooth scrolling for anchor links
  useEffect(() => {
    const handleSmoothScroll = (e) => {
      if (e.target.tagName === "A" && e.target.getAttribute("href")?.startsWith("#")) {
        e.preventDefault();
        const targetId = e.target.getAttribute("href").substring(1);
        const target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    };
    document.addEventListener("click", handleSmoothScroll);
    return () => document.removeEventListener("click", handleSmoothScroll);
  }, []);


  return (
    <div className="font-sans text-gray-900">
      {/* Navigation */}
      <nav id = "navigation"className="flex justify-between items-center py-6 px-8 bg-white shadow">
        <h1 className="text-2xl font-bold text-indigo-600">PrepMate</h1>
        <div className="space-x-6">
          <a href="#features" className="hover:text-indigo-600">Features</a>
          <Link to="#" className="hover:text-indigo-600">Pricing</Link>
          <Link to="/about" className="hover:text-indigo-600">About</Link>
         
        </div>
        <div className="space-x-4">
          <Link to="#" className="text-gray-600 hover:text-indigo-600">Sign In</Link>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">Get Started</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-20 bg-gray-50">
        <h2 className="text-4xl font-bold mb-4">AI-Powered Learning Platform</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Master Your Placement Preparation with AI. Accelerate your career with personalized learning paths,
          AI-powered quizzes, comprehensive progress tracking, and expert-curated content.
        </p>
        <div className="space-x-4">
          <button
            onClick={() => navigate("/personalized-learning")}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
          >
            Start Learning Now
          </button>
          <button className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-50">
            Watch Demo
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white" id="features">
        <h3 className="text-3xl font-bold text-center mb-12">Everything You Need to Succeed</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto px-6">
          
          {/* Quizzes */}
          <Link to="/quizzes" className="p-6 border rounded-lg shadow hover:shadow-lg block">
            <Brain className="w-10 h-10 text-indigo-600 mb-4" />
            <h4 className="font-semibold text-lg mb-2">AI-Powered Quizzes</h4>
            <p className="text-gray-600">
              Adaptive quizzes that adjust difficulty based on your performance and learning pace.
            </p>
          </Link>

          {/* Progress Analytics */}
          <div className="p-6 border rounded-lg shadow hover:shadow-lg">
            <BarChart3 className="w-10 h-10 text-indigo-600 mb-4" />
            <div className="coming-soon">
              <h4 className="font-semibold text-lg mb-2">Progress Analytics</h4>
              <p>Coming Soon!</p>
            </div>
            <p className="text-gray-600">
              Comprehensive insights into your learning journey with detailed analytics and tracking.
            </p>
          </div>

          {/* Curated Content */}
          <Link to="/content" className="p-6 border rounded-lg shadow hover:shadow-lg block">
            <BookOpen className="w-10 h-10 text-indigo-600 mb-4" />
            <h4 className="font-semibold text-lg mb-2">Curated Content</h4>
            <p className="text-gray-600">
              Expert-selected study materials covering all major placement topics with regular updates.
            </p>
          </Link>

          {/* Personalized Learning */}
          <Link to="/personalized-learning" className="p-6 border rounded-lg shadow hover:shadow-lg block">
            <Target className="w-10 h-10 text-indigo-600 mb-4" />
            <h4 className="font-semibold text-lg mb-2">Personalized Learning</h4>
            <p className="text-gray-600">
              Get a customized AI-generated roadmap tailored to your skill level and career goals.
            </p>
          </Link>

          {/* Time Management */}
          <Link to="/time-management" className="p-6 border rounded-lg shadow hover:shadow-lg block transition transform hover:scale-[1.02]">
            <Clock className="w-10 h-10 text-indigo-600 mb-4" />
            <h4 className="font-semibold text-lg mb-2">Time Management</h4>
            <p className="text-gray-600">
              Smart scheduling and tracking tools to help you optimize your preparation timeline.
            </p>
          </Link>

          {/* Achievement System */}
         <Link to="/achievements" className="p-6 border rounded-lg shadow hover:shadow-lg block transition transform hover:scale-[1.02]">
      <Trophy className="w-10 h-10 text-indigo-600 mb-4" />
      <h4 className="font-semibold text-lg mb-2">Achievement System</h4>
      <p className="text-gray-600">
        View your badges, track streaks, and unlock new milestones as you progress.
      </p>
    </Link>

  </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center max-w-5xl mx-auto">
          <div>
            <h4 className="text-4xl font-bold text-indigo-600">10K+</h4>
            <p className="text-gray-600">Students Placed</p>
          </div>
          <div>
            <h4 className="text-4xl font-bold text-indigo-600">500+</h4>
            <p className="text-gray-600">Partner Companies</p>
          </div>
          <div>
            <h4 className="text-4xl font-bold text-indigo-600">95%</h4>
            <p className="text-gray-600">Success Rate</p>
          </div>
          <div>
            <h4 className="text-4xl font-bold text-indigo-600">50K+</h4>
            <p className="text-gray-600">Practice Questions</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center bg-indigo-600 text-white">
        <h3 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h3>
        <p className="max-w-2xl mx-auto mb-8">
          Join thousands of successful candidates who have landed their dream jobs with PrepMate.
        </p>
        <button 
        onClick={() => navigate("/content")}
        className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
          Begin Your Preparation
        </button>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-gray-300">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6">
          <div>
            <h4 className="text-white text-xl font-bold mb-4">PrepMate</h4>
            <p>AI-powered placement preparation platform for ambitious students.</p>
          </div>
          <div>
            <h5 className="text-white font-semibold mb-4">Platform</h5>
            <ul className="space-y-2">
              <li><Link to="/personalized-learning">Personalized Roadmap</Link></li>
              <li><a href = "#navigation">Dashboard</a></li>
              <li><Link to="/quizzes">Quizzes</Link></li>
              <li><Link to="/content">Study Material</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-semibold mb-4">Company</h5>
            <ul className="space-y-2">
              <li><Link to="/about">About</Link></li>
              <li><Link to="#">Contact</Link></li>
              <li><Link to="#">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-semibold mb-4">Support</h5>
            <ul className="space-y-2">
              <li><Link to="#">Help Center</Link></li>
              <li><Link to="#">Privacy Policy</Link></li>
              <li><Link to="#">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <p className="text-center text-gray-500 mt-8">© 2024 PrepMate. All rights reserved.</p>
      </footer>
    </div>
  );
}