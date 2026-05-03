import { useState } from "react";
import { Brain, Sparkles, ChevronRight, CheckCircle2, XCircle, Trophy } from "lucide-react";
import { useData, AnalysisResult } from "../../context/DataContext";
import confetti from "canvas-confetti";
import { toast } from "sonner";

export function PracticeArena() {
  const { analysisResult } = useData();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const questions: AnalysisResult['practiceQuestions'] = analysisResult?.practiceQuestions || [
    {
      id: "1",
      question: "What is the derivative of x^2?",
      options: ["x", "2x", "x^2", "1"],
      correctAnswer: "2x",
      explanation: "Using the power rule, the derivative of x^n is nx^(n-1).",
      difficulty: "Easy",
      topic: "Calculus"
    },
    {
      id: "2",
      question: "Evaluate ∫ x cos(x) dx",
      options: ["x sin(x) + cos(x) + C", "x cos(x) - sin(x) + C", "-x sin(x) + cos(x) + C", "x sin(x) - cos(x) + C"],
      correctAnswer: "x sin(x) + cos(x) + C",
      explanation: "Using Integration by Parts: ∫u dv = uv - ∫v du. Let u = x and dv = cos(x) dx.",
      difficulty: "Medium",
      topic: "Calculus"
    }
  ];

  const currentQuestion = questions[currentIdx];

  const handleShareResults = () => {
    toast.success("Results link copied!", {
      description: `I just scored ${score}/${questions.length} in ${currentQuestion.topic} practice on ExamIQ!`
    });
  };

  const handleOptionSelect = (option: string) => {
    if (showResult) return;
    setSelectedOption(option);
  };

  const handleCheck = () => {
    if (!selectedOption) return;
    setShowResult(true);
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore(score + 1);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#3b82f6", "#2dd4bf", "#10b981"]
      });
    }
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    return (
      <div className="min-h-screen pt-32 px-6 flex items-center justify-center">
        <div className="max-w-md w-full bg-card border border-border rounded-[3rem] p-12 text-center shadow-2xl shadow-primary/10">
          <div className="w-24 h-24 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-12 h-12 text-success" />
          </div>
          <h2 className="text-4xl font-bold mb-4">Practice Complete!</h2>
          <p className="text-muted-foreground mb-8 text-lg">
            You scored <span className="text-primary font-bold">{score}</span> out of <span className="font-bold">{questions.length}</span>
          </p>
          
          <div className="flex flex-col gap-4">
            <button
              onClick={() => {
                setIsFinished(false);
                setCurrentIdx(0);
                setScore(0);
                setSelectedOption(null);
                setShowResult(false);
              }}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-bold hover:scale-[1.02] transition-transform shadow-lg shadow-primary/20"
            >
              Practice Again
            </button>
            <button
              onClick={handleShareResults}
              className="w-full py-4 rounded-2xl bg-accent border border-border text-foreground font-bold hover:bg-accent/80 transition-colors"
            >
              Share Results
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Practice Arena</h1>
              <p className="text-muted-foreground">Master {currentQuestion.topic}</p>
            </div>
          </div>
          <div className="px-6 py-2 rounded-full bg-accent border border-border font-bold">
            {currentIdx + 1} / {questions.length}
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-card border border-border rounded-[2.5rem] p-10 mb-8 shadow-xl shadow-primary/5">
          <div className="flex items-center gap-2 mb-6">
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              currentQuestion.difficulty === 'Hard' ? 'bg-destructive/10 text-destructive' : 'bg-success/10 text-success'
            }`}>
              {currentQuestion.difficulty}
            </span>
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
              {currentQuestion.topic}
            </span>
          </div>

          <h2 className="text-2xl font-bold mb-8 leading-tight">
            {currentQuestion.question}
          </h2>

          <div className="space-y-4 mb-10">
            {currentQuestion.options.map((option) => (
              <button
                key={option}
                onClick={() => handleOptionSelect(option)}
                className={`
                  w-full p-5 rounded-2xl border text-left font-medium transition-all duration-200
                  ${selectedOption === option 
                    ? 'border-primary bg-primary/5 ring-2 ring-primary/20' 
                    : 'border-border hover:border-primary/30 hover:bg-accent'
                  }
                  ${showResult && option === currentQuestion.correctAnswer ? 'border-success bg-success/10 ring-2 ring-success/20' : ''}
                  ${showResult && selectedOption === option && option !== currentQuestion.correctAnswer ? 'border-destructive bg-destructive/10 ring-2 ring-destructive/20' : ''}
                `}
                disabled={showResult}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {showResult && option === currentQuestion.correctAnswer && <CheckCircle2 className="w-5 h-5 text-success" />}
                  {showResult && selectedOption === option && option !== currentQuestion.correctAnswer && <XCircle className="w-5 h-5 text-destructive" />}
                </div>
              </button>
            ))}
          </div>

          {showResult && (
            <div className="p-6 rounded-2xl bg-accent border border-border mb-8 animate-in fade-in slide-in-from-bottom-4">
              <div className="flex items-center gap-2 mb-2 text-primary font-bold">
                <Sparkles className="w-4 h-4" />
                <span>AI Explanation</span>
              </div>
              <p className="text-muted-foreground">{currentQuestion.explanation}</p>
            </div>
          )}

          <div className="flex gap-4">
            {!showResult ? (
              <button
                onClick={handleCheck}
                disabled={!selectedOption}
                className="flex-1 py-4 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-bold hover:scale-[1.02] transition-transform disabled:opacity-50"
              >
                Check Answer
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex-1 py-4 rounded-full bg-primary text-white font-bold hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
              >
                <span>{currentIdx < questions.length - 1 ? 'Next Question' : 'Finish Practice'}</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
