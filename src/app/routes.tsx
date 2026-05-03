import { createBrowserRouter } from "react-router";
import { Root } from "./components/layout/Root";
import { HomePage } from "./components/pages/HomePage";
import { UploadPage } from "./components/pages/UploadPage";
import { AnalysisPage } from "./components/pages/AnalysisPage";
import { Dashboard } from "./components/pages/Dashboard";
import { StudyPlanner } from "./components/pages/StudyPlanner";
import { PracticeArena } from "./components/pages/PracticeArena";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "upload", element: <UploadPage /> },
      { path: "analysis", element: <AnalysisPage /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "planner", element: <StudyPlanner /> },
      { path: "practice", element: <PracticeArena /> },
    ],
  },
]);
