import { Link } from "react-router";
import { Brain, Target, TrendingUp, Lightbulb, Sparkles, Zap, Shield, Clock } from "lucide-react";

export function HomePage() {
  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="relative mb-32">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-pulse delay-1000" />

          <div className="relative text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary">AI-Powered Exam Intelligence</span>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                Master Your Exams
              </span>
              <br />
              <span className="text-foreground">With AI Precision</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Upload past papers, unlock intelligent insights, and study smarter with AI-generated patterns,
              personalized plans, and targeted practice.
            </p>

            <Link
              to="/upload"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:scale-105 transition-transform duration-300 shadow-2xl shadow-primary/25"
            >
              <Brain className="w-5 h-5" />
              Start Analyzing
            </Link>
          </div>
        </div>

        {/* Bento Grid Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {/* Large Feature */}
          <div className="md:col-span-2 bg-gradient-to-br from-card to-accent border border-border rounded-[3rem] p-10 hover:scale-[1.02] transition-all duration-300 group relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all" />
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-4">Pattern Recognition AI</h3>
              <p className="text-muted-foreground text-lg mb-6">
                Advanced machine learning analyzes years of past papers to identify recurring topics,
                difficulty trends, and examiner patterns.
              </p>
              <div className="flex gap-3">
                <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm">Topic Frequency</span>
                <span className="px-4 py-2 rounded-full bg-success/10 text-success text-sm">Trend Analysis</span>
              </div>
            </div>
          </div>

          {/* Small Feature 1 */}
          <div className="bg-gradient-to-br from-card to-accent border border-border rounded-[3rem] p-8 hover:scale-[1.02] transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-success to-emerald-600 flex items-center justify-center mb-4">
              <Target className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Gap Detection</h3>
            <p className="text-muted-foreground">
              Identifies critical syllabus topics never tested before—study what others miss.
            </p>
          </div>

          {/* Small Feature 2 */}
          <div className="bg-gradient-to-br from-card to-accent border border-border rounded-[3rem] p-8 hover:scale-[1.02] transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary to-purple-600 flex items-center justify-center mb-4">
              <Lightbulb className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Smart Planner</h3>
            <p className="text-muted-foreground">
              Auto-generated study schedules prioritizing high-impact topics based on your timeline.
            </p>
          </div>

          {/* Medium Feature */}
          <div className="md:col-span-2 bg-gradient-to-br from-card to-accent border border-border rounded-[3rem] p-10 hover:scale-[1.02] transition-all duration-300">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-6">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold mb-4">Practice Arena</h3>
            <p className="text-muted-foreground text-lg">
              AI generates practice questions mimicking past paper style, tone, and difficulty.
              Train on questions that feel real.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="text-center p-8 rounded-[2.5rem] bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
            <div className="flex items-center justify-center mb-4">
              <Clock className="w-8 h-8 text-primary" />
            </div>
            <div className="text-4xl font-bold text-primary mb-2">85%</div>
            <div className="text-muted-foreground">Time Saved</div>
          </div>

          <div className="text-center p-8 rounded-[2.5rem] bg-gradient-to-br from-success/10 to-success/5 border border-success/20">
            <div className="flex items-center justify-center mb-4">
              <TrendingUp className="w-8 h-8 text-success" />
            </div>
            <div className="text-4xl font-bold text-success mb-2">92%</div>
            <div className="text-muted-foreground">Accuracy Rate</div>
          </div>

          <div className="text-center p-8 rounded-[2.5rem] bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20">
            <div className="flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-secondary" />
            </div>
            <div className="text-4xl font-bold text-secondary mb-2">10K+</div>
            <div className="text-muted-foreground">Papers Analyzed</div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-br from-card to-accent border border-border rounded-[3rem] p-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5" />
          <div className="relative">
            <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Study Strategy?</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of students achieving their goals with AI-powered exam intelligence
            </p>
            <Link
              to="/upload"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:scale-105 transition-transform duration-300"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
