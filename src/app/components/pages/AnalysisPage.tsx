import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router";
import { Loader2, CheckCircle2, Brain, Sparkles } from "lucide-react";
import { analyzeExamData } from "../../services/aiService";
import { useData } from "../../context/DataContext";

export function AnalysisPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAnalysisResult } = useData();
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState("Extracting text from papers...");
  const [complete, setComplete] = useState(false);
  const analysisStarted = useRef(false);

  useEffect(() => {
    if (analysisStarted.current) return;
    analysisStarted.current = true;

    const input = location.state;
    if (!input) {
      navigate("/upload");
      return;
    }

    const { subject, studentClass } = input;

    const stages = [
      { text: `Extracting text from ${subject} papers...`, duration: 2000 },
      { text: `Identifying ${subject} topics for ${studentClass}...`, duration: 2500 },
      { text: "Analyzing difficulty distribution...", duration: 2000 },
      { text: "Mapping question frequencies...", duration: 2500 },
      { text: "Detecting syllabus gaps...", duration: 2000 },
      { text: "Generating personalized insights...", duration: 1500 },
    ];


    let currentStage = 0;
    const interval = setInterval(() => {
      if (currentStage < stages.length) {
        setStage(stages[currentStage].text);
        setProgress(((currentStage + 1) / stages.length) * 90); // Go up to 90%
        currentStage++;
      }
    }, 2000);

    const startAnalysis = async () => {
      try {
        const result = await analyzeExamData(input);
        setAnalysisResult(result);
        clearInterval(interval);
        setProgress(100);
        setComplete(true);
        setTimeout(() => navigate("/dashboard"), 2000);
      } catch (error) {
        console.error("Analysis failed:", error);
        setStage("Analysis failed. Please try again.");
      }
    };

    startAnalysis();

    return () => clearInterval(interval);
  }, [navigate, location.state, setAnalysisResult]);


  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-2xl w-full">
        {!complete ? (
          <div className="bg-card border border-border rounded-[3rem] p-12 text-center">
            <div className="relative mb-8">
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center animate-pulse">
                <Brain className="w-12 h-12 text-white" />
              </div>
              <div className="absolute inset-0 w-24 h-24 mx-auto rounded-full bg-primary/20 blur-2xl" />
            </div>

            <h2 className="text-3xl font-bold mb-4">Analyzing Your Papers</h2>
            <p className="text-muted-foreground mb-8">{stage}</p>

            <div className="relative w-full h-3 bg-accent rounded-full overflow-hidden mb-4">
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</div>

            <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>This may take a few moments...</span>
            </div>
          </div>
        ) : (
          <div className="bg-card border border-border rounded-[3rem] p-12 text-center">
            <div className="relative mb-8">
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-success to-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-white" />
              </div>
              <div className="absolute inset-0 w-24 h-24 mx-auto rounded-full bg-success/20 blur-2xl" />
            </div>

            <h2 className="text-3xl font-bold mb-4">Analysis Complete!</h2>
            <p className="text-muted-foreground mb-6">
              Successfully processed your papers and generated insights
            </p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20">
                <div className="text-2xl font-bold text-primary mb-1">24</div>
                <div className="text-sm text-muted-foreground">Topics Found</div>
              </div>
              <div className="p-4 rounded-2xl bg-success/10 border border-success/20">
                <div className="text-2xl font-bold text-success mb-1">156</div>
                <div className="text-sm text-muted-foreground">Questions</div>
              </div>
              <div className="p-4 rounded-2xl bg-secondary/10 border border-secondary/20">
                <div className="text-2xl font-bold text-secondary mb-1">5</div>
                <div className="text-sm text-muted-foreground">Gap Topics</div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-primary">
              <Sparkles className="w-5 h-5" />
              <span className="font-semibold">Redirecting to dashboard...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
