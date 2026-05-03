import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, Target, AlertCircle, Sparkles, Download, Share2 } from "lucide-react";
import { useData, AnalysisResult } from "../../context/DataContext";
import { toast } from "sonner";

export function Dashboard() {
  const { analysisResult, userContext } = useData();

  const handleDownload = () => {
    toast.success("Intelligence Report generating...", {
      description: "Your personalized study PDF will be ready in a moment."
    });
  };

  const handleShare = () => {
    toast.info("Sharing Link Copied", {
      description: "Your dashboard link has been copied to clipboard."
    });
  };

  // Use real data if available, otherwise use fallback data (same as original dummy data)
  const topicData: AnalysisResult['topics'] = analysisResult?.topics || [
    { topic: "Calculus", frequency: 45, trend: "up" },
    { topic: "Algebra", frequency: 38, trend: "stable" },
    { topic: "Statistics", frequency: 32, trend: "up" },
    { topic: "Geometry", frequency: 28, trend: "down" },
  ];

  const trendData: AnalysisResult['trends'] = analysisResult?.trends || [
    { year: "2021", Calculus: 35, Algebra: 42 },
    { year: "2022", Calculus: 42, Algebra: 38 },
    { year: "2023", Calculus: 45, Algebra: 40 },
  ];

  const difficultyData: AnalysisResult['difficulty'] = analysisResult?.difficulty || [
    { name: "Easy", value: 35, color: "hsl(142, 76%, 36%)" },
    { name: "Medium", value: 50, color: "hsl(221, 83%, 53%)" },
    { name: "Hard", value: 15, color: "hsl(0, 62%, 50%)" },
  ];

  const gapTopics: AnalysisResult['gaps'] = analysisResult?.gaps || [
    { topic: "Complex Numbers", priority: "High", lastSeen: "Never" },
    { topic: "Differential Equations", priority: "High", lastSeen: "2019" },
  ];

  const stats: AnalysisResult['stats'] = analysisResult?.stats || {
    topicsFound: 24,
    totalQuestions: 156,
    gapTopics: 5,
    analysisRange: "5 Yrs"
  };

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
                  {userContext?.studentClass || "General"}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-secondary/10 text-secondary text-[10px] font-bold uppercase tracking-wider">
                  {userContext?.subject || "All Subjects"}
                </span>
              </div>
              <h1 className="text-4xl font-bold">Intelligence Dashboard</h1>
              <p className="text-muted-foreground">Tailored analysis for your {userContext?.subject || "selected"} exams</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={handleShare}
              className="p-3 rounded-xl border border-border hover:bg-accent transition-colors"
            >
              <Share2 className="w-5 h-5 text-muted-foreground" />
            </button>
            <button 
              onClick={handleDownload}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
            >
              <Download className="w-5 h-5" />
              <span>Download Report</span>
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-card border border-border rounded-[2rem] p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-primary mb-1">{stats.topicsFound}</div>
            <div className="text-sm text-muted-foreground">Topics Identified</div>
          </div>
          <div className="bg-card border border-border rounded-[2rem] p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-success mb-1">{stats.totalQuestions}</div>
            <div className="text-sm text-muted-foreground">Total Questions</div>
          </div>
          <div className="bg-card border border-border rounded-[2rem] p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-secondary mb-1">{stats.gapTopics}</div>
            <div className="text-sm text-muted-foreground">Gap Topics</div>
          </div>
          <div className="bg-card border border-border rounded-[2rem] p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-foreground mb-1">{stats.analysisRange}</div>
            <div className="text-sm text-muted-foreground">Analysis Range</div>
          </div>
        </div>

        {/* Bento Grid Analytics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Topic Dominance Chart */}
          <div className="bg-card border border-border rounded-[2.5rem] p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Topic Dominance</h3>
                <p className="text-sm text-muted-foreground">Questions per topic</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topicData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(240, 6%, 90%)" />
                <XAxis dataKey="topic" stroke="hsl(240, 5%, 46%)" angle={-45} textAnchor="end" height={80} />
                <YAxis stroke="hsl(240, 5%, 46%)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(0, 0%, 100%)",
                    border: "1px solid hsl(240, 6%, 90%)",
                    borderRadius: "12px",
                  }}
                />
                <Bar dataKey="frequency" fill="hsl(221, 83%, 53%)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Difficulty Distribution */}
          <div className="bg-card border border-border rounded-[2.5rem] p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
                <Target className="w-5 h-5 text-success" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Difficulty Mix</h3>
                <p className="text-sm text-muted-foreground">Question complexity</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={difficultyData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {difficultyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(0, 0%, 100%)",
                    border: "1px solid hsl(240, 6%, 90%)",
                    borderRadius: "12px",
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Trend Mapping */}
        <div className="bg-card border border-border rounded-[2.5rem] p-8 mb-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Trend Mapping</h3>
              <p className="text-sm text-muted-foreground">Year-over-year topic appearance</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(240, 6%, 90%)" />
              <XAxis dataKey="year" stroke="hsl(240, 5%, 46%)" />
              <YAxis stroke="hsl(240, 5%, 46%)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(0, 0%, 100%)",
                  border: "1px solid hsl(240, 6%, 90%)",
                  borderRadius: "12px",
                }}
              />
              <Legend />
              {topicData.slice(0, 3).map((t, i) => (
                <Line
                  key={t.topic}
                  type="monotone"
                  dataKey={t.topic}
                  stroke={["hsl(221, 83%, 53%)", "hsl(142, 76%, 36%)", "hsl(263, 70%, 50%)"][i]}
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Gap Topics Table */}
        <div className="bg-card border border-border rounded-[2.5rem] p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Gap Topics</h3>
              <p className="text-sm text-muted-foreground">Important topics never or rarely tested</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 font-semibold text-sm text-muted-foreground">Topic</th>
                  <th className="text-left py-4 px-4 font-semibold text-sm text-muted-foreground">Priority</th>
                  <th className="text-left py-4 px-4 font-semibold text-sm text-muted-foreground">Last Seen</th>
                  <th className="text-left py-4 px-4 font-semibold text-sm text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {gapTopics.map((item, idx) => (
                  <tr key={idx} className="border-b border-border/50 hover:bg-accent/50 transition-colors">
                    <td className="py-4 px-4 font-medium">{item.topic}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`
                          px-3 py-1 rounded-full text-xs font-semibold
                          ${item.priority === "High"
                            ? "bg-destructive/10 text-destructive"
                            : item.priority === "Medium"
                            ? "bg-primary/10 text-primary"
                            : "bg-muted/10 text-muted-foreground"
                          }
                        `}
                      >
                        {item.priority}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">{item.lastSeen}</td>
                    <td className="py-4 px-4">
                      {item.lastSeen === "Never" ? (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-destructive/10 text-destructive">
                          Critical
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                          Review
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
