import { Link, useLocation } from "react-router";
import { Brain, Upload, BarChart3, Calendar, Target } from "lucide-react";

export function Navbar() {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: Brain },
    { path: "/upload", label: "Upload", icon: Upload },
    { path: "/dashboard", label: "Dashboard", icon: BarChart3 },
    { path: "/planner", label: "Planner", icon: Calendar },
    { path: "/practice", label: "Practice", icon: Target },
  ];

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl">
      <div className="bg-card/60 backdrop-blur-xl border border-border rounded-[2.5rem] px-8 py-4 shadow-2xl">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              ExamIQ
            </span>
          </Link>

          <div className="flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    flex items-center gap-2 px-6 py-2.5 rounded-full transition-all duration-300
                    ${isActive
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden md:inline">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
