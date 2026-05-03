import { Calendar as CalendarIcon, Clock, CheckCircle2, ChevronRight, BookOpen, Target, TrendingUp } from "lucide-react";
import { useData, AnalysisResult } from "../../context/DataContext";
import { toast } from "sonner";
import { useState } from "react";

export function StudyPlanner() {
  const { analysisResult } = useData();
  const [completedDays, setCompletedDays] = useState<Set<number>>(new Set());

  const handleMarkDone = (idx: number) => {
    setCompletedDays(prev => {
      const next = new Set(prev);
      if (next.has(idx)) {
        next.delete(idx);
        toast.info("Marked as incomplete");
      } else {
        next.add(idx);
        toast.success("Great job! Task completed.");
      }
      return next;
    });
  };

  const handleStartLearning = (topic: string) => {
    toast.info(`Starting session: ${topic}`, {
      description: "Opening relevant study materials and AI practice questions."
    });
  };

  const handleExport = () => {
    toast.success("Calendar sync successful", {
      description: "Your study schedule has been exported to your device calendar."
    });
  };

  const studyPlan: AnalysisResult['studyPlan'] = analysisResult?.studyPlan || [
    {
      day: "Day 1",
      topic: "Calculus - Integration",
      tasks: ["Review fundamental integration rules", "Solve 2019-2021 integration questions", "Practice substitution method"],
      duration: "3 hours",
      priority: "High"
    },
    {
      day: "Day 2",
      topic: "Algebra - Matrices",
      tasks: ["Matrix multiplication & inversion", "Eigenvalues and Eigenvectors", "Solve 2022 matrix problem set"],
      duration: "2 hours",
      priority: "Medium"
    },
    {
      day: "Day 3",
      topic: "Statistics - Probability",
      tasks: ["Conditional probability", "Bayes' Theorem review", "Solve probability distributions"],
      duration: "2.5 hours",
      priority: "High"
    }
  ];

  const milestones = [
    { title: "Complete High-Frequency Topics", progress: 65, date: "May 10, 2026" },
    { title: "Cover All Gap Topics", progress: 40, date: "May 15, 2026" },
    { title: "Practice Tests Completed", progress: 75, date: "May 20, 2026" },
    { title: "Final Revision", progress: 20, date: "May 25, 2026" },
  ];

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
              <CalendarIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Personalized Study Plan</h1>
              <p className="text-muted-foreground">Optimized schedule based on your weak areas</p>
            </div>
          </div>
          <button 
            onClick={handleExport}
            className="px-6 py-3 rounded-full bg-primary/10 text-primary font-semibold hover:bg-primary/20 transition-colors flex items-center gap-2"
          >
            <span>Export to Calendar</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-card border border-border rounded-[2rem] p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">Total Study Time</span>
            </div>
            <div className="text-3xl font-bold text-primary">28 hrs</div>
            <div className="text-sm text-muted-foreground mt-1">Next 2 weeks</div>
          </div>

          <div className="bg-card border border-border rounded-[2rem] p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <Target className="w-5 h-5 text-success" />
              <span className="text-sm text-muted-foreground">Priority Topics</span>
            </div>
            <div className="text-3xl font-bold text-success">{studyPlan.length}</div>
            <div className="text-sm text-muted-foreground mt-1">High-impact areas</div>
          </div>

          <div className="bg-card border border-border rounded-[2rem] p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="w-5 h-5 text-secondary" />
              <span className="text-sm text-muted-foreground">Progress</span>
            </div>
            <div className="text-3xl font-bold text-secondary">{Math.round((completedDays.size / studyPlan.length) * 100) || 0}%</div>
            <div className="text-sm text-muted-foreground mt-1">Completion rate</div>
          </div>
        </div>

        {/* Daily Schedule */}
        <div className="space-y-6 mb-12">
          {studyPlan.map((day, idx) => (
            <div
              key={idx}
              className={`
                group relative bg-card border border-border rounded-[2.5rem] p-8 transition-all duration-300
                ${completedDays.has(idx) ? 'opacity-70 grayscale-[0.5]' : 'hover:border-primary/50 shadow-sm'}
              `}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold">
                      {day.day}
                    </span>
                    <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${
                      day.priority === 'High' ? 'bg-destructive/10 text-destructive' : 'bg-success/10 text-success'
                    }`}>
                      {day.priority} Priority
                    </span>
                    {completedDays.has(idx) && (
                      <span className="px-4 py-1.5 rounded-full bg-success/10 text-success text-sm font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                        Completed
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-primary" />
                    {day.topic}
                  </h3>

                  <ul className="space-y-3 mb-6">
                    {day.tasks.map((task, tidx) => (
                      <li key={tidx} className="flex items-center gap-3 text-muted-foreground">
                        <CheckCircle2 className={`w-5 h-5 ${completedDays.has(idx) ? 'text-success' : 'text-success/30'}`} />
                        <span className={completedDays.has(idx) ? 'line-through' : ''}>{task}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>Duration: {day.duration}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 md:w-48">
                  <button 
                    onClick={() => handleStartLearning(day.topic)}
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-primary/20"
                  >
                    Start Learning
                  </button>
                  <button 
                    onClick={() => handleMarkDone(idx)}
                    className={`
                      w-full py-3 rounded-2xl border font-semibold transition-all
                      ${completedDays.has(idx) 
                        ? 'bg-success/10 border-success/20 text-success' 
                        : 'bg-accent border-border text-foreground hover:bg-accent/80'
                      }
                    `}
                  >
                    {completedDays.has(idx) ? 'Completed' : 'Mark Done'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Milestones */}
        <div className="bg-card border border-border rounded-[2.5rem] p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Study Milestones</h3>
              <p className="text-sm text-muted-foreground">Track your progress goals</p>
            </div>
          </div>

          <div className="space-y-6">
            {milestones.map((milestone, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{milestone.title}</span>
                  <span className="text-sm text-muted-foreground">{milestone.date}</span>
                </div>
                <div className="relative w-full h-3 bg-accent rounded-full overflow-hidden">
                  <div
                    className={`
                      absolute inset-y-0 left-0 rounded-full transition-all duration-500
                      ${milestone.progress >= 70
                        ? "bg-gradient-to-r from-success to-emerald-600"
                        : milestone.progress >= 40
                        ? "bg-gradient-to-r from-primary to-secondary"
                        : "bg-gradient-to-r from-destructive to-orange-500"
                      }
                    `}
                    style={{ width: `${milestone.progress}%` }}
                  />
                </div>
                <div className="text-sm text-muted-foreground">{milestone.progress}% Complete</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
