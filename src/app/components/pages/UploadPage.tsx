import { useState } from "react";
import { useNavigate } from "react-router";
import { Upload, FileText, BookOpen, Settings, ChevronRight, GraduationCap, Shapes } from "lucide-react";
import { useData } from "../../context/DataContext";

export function UploadPage() {
  const navigate = useNavigate();
  const { setUserContext } = useData();
  const [step, setStep] = useState(1);
  const [papers, setPapers] = useState<File[]>([]);
  const [syllabus, setSyllabus] = useState<File | null>(null);
  const [examDate, setExamDate] = useState("");
  const [studyHours, setStudyHours] = useState(2);
  const [studentClass, setStudentClass] = useState("");
  const [subject, setSubject] = useState("");

  const handlePaperUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPapers([...papers, ...Array.from(e.target.files)]);
    }
  };

  const handleSyllabusUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSyllabus(e.target.files[0]);
    }
  };

  const handleAnalyze = () => {
    setUserContext({ studentClass, subject });
    navigate("/analysis", {
      state: { papers, syllabus, examDate, studyHours, studentClass, subject }
    });
  };


  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Upload & Configure
            </span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Follow the steps below to begin your intelligent analysis
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-16">
          {[1, 2, 3].map((num) => (
            <div key={num} className="flex items-center gap-4">
              <div
                className={`
                  w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300
                  ${step >= num
                    ? 'bg-gradient-to-br from-primary to-secondary text-white shadow-lg shadow-primary/25'
                    : 'bg-muted text-muted-foreground'
                  }
                `}
              >
                {num}
              </div>
              {num < 3 && (
                <ChevronRight className={`w-5 h-5 ${step > num ? 'text-primary' : 'text-muted-foreground'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Question Papers */}
        {step === 1 && (
          <div className="bg-card border border-border rounded-[2.5rem] p-10 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Step 01: Upload Past Papers</h2>
                <p className="text-muted-foreground">Add PDF or image files of past exam papers</p>
              </div>
            </div>

            <label className="block border-2 border-dashed border-border rounded-3xl p-12 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group">
              <Upload className="w-16 h-16 text-muted-foreground mx-auto mb-4 group-hover:text-primary transition-colors" />
              <p className="text-lg font-semibold mb-2">Drop files here or click to browse</p>
              <p className="text-sm text-muted-foreground">PDF, PNG, JPG up to 10MB each</p>
              <input
                type="file"
                multiple
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={handlePaperUpload}
                className="hidden"
              />
            </label>

            {papers.length > 0 && (
              <div className="mt-6 space-y-3">
                {papers.map((file, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 bg-accent rounded-2xl border border-border"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-primary" />
                      <span className="font-medium">{file.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => setStep(2)}
              disabled={papers.length === 0}
              className="mt-8 w-full py-4 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:scale-[1.02] transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              Continue to Syllabus
            </button>
          </div>
        )}

        {/* Step 2: Syllabus */}
        {step === 2 && (
          <div className="bg-card border border-border rounded-[2.5rem] p-10 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-success" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Step 02: Upload Syllabus (Optional)</h2>
                <p className="text-muted-foreground">Help us identify gap topics</p>
              </div>
            </div>

            <label className="block border-2 border-dashed border-border rounded-3xl p-12 text-center cursor-pointer hover:border-success/50 hover:bg-success/5 transition-all duration-300 group">
              <Upload className="w-16 h-16 text-muted-foreground mx-auto mb-4 group-hover:text-success transition-colors" />
              <p className="text-lg font-semibold mb-2">Upload your syllabus document</p>
              <p className="text-sm text-muted-foreground">Optional but recommended for better insights</p>
              <input
                type="file"
                accept=".pdf,.txt,.docx"
                onChange={handleSyllabusUpload}
                className="hidden"
              />
            </label>

            {syllabus && (
              <div className="mt-6 flex items-center justify-between p-4 bg-success/10 rounded-2xl border border-success/20">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-success" />
                  <span className="font-medium">{syllabus.name}</span>
                </div>
              </div>
            )}

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-4 rounded-full border border-border text-foreground font-semibold hover:bg-accent transition-all duration-300"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 py-4 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:scale-[1.02] transition-transform duration-300"
              >
                Continue to Config
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Configuration */}
        {step === 3 && (
          <div className="bg-card border border-border rounded-[2.5rem] p-10 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                <Settings className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Step 03: Study Configuration</h2>
                <p className="text-muted-foreground">Set your exam date and study preferences</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 font-semibold flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    Target Class / Grade
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Grade 12, Year 10"
                    value={studentClass}
                    onChange={(e) => setStudentClass(e.target.value)}
                    className="w-full px-6 py-4 rounded-2xl bg-input-background border border-border focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-semibold flex items-center gap-2">
                    <Shapes className="w-4 h-4" />
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Mathematics, Biology"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-6 py-4 rounded-2xl bg-input-background border border-border focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 font-semibold">Exam Date</label>
                <input
                  type="date"
                  value={examDate}
                  onChange={(e) => setExamDate(e.target.value)}
                  className="w-full px-6 py-4 rounded-2xl bg-input-background border border-border focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold">Daily Study Hours</label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="1"
                    max="8"
                    value={studyHours}
                    onChange={(e) => setStudyHours(Number(e.target.value))}
                    className="flex-1"
                  />
                  <div className="w-20 px-4 py-2 rounded-xl bg-primary/10 text-primary text-center font-bold">
                    {studyHours}h
                  </div>
                </div>
              </div>
            </div>


            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setStep(2)}
                className="flex-1 py-4 rounded-full border border-border text-foreground font-semibold hover:bg-accent transition-all duration-300"
              >
                Back
              </button>
              <button
                onClick={handleAnalyze}
                disabled={!examDate}
                className="flex-1 py-4 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:scale-[1.02] transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                Start Analysis
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
