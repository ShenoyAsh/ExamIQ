import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface AnalysisResult {
  topics: { topic: string; frequency: number; trend: 'up' | 'down' | 'stable' }[];
  difficulty: { name: string; value: number; color: string }[];
  gaps: { topic: string; priority: string; lastSeen: string }[];
  trends: { year: string; [key: string]: string | number }[];
  stats: {
    topicsFound: number;
    totalQuestions: number;
    gapTopics: number;
    analysisRange: string;
  };
  studyPlan: {
    day: string;
    topic: string;
    tasks: string[];
    duration: string;
    priority: 'High' | 'Medium' | 'Low';
  }[];
  practiceQuestions: {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
    difficulty: string;
    topic: string;
  }[];
}

interface DataContextType {
  analysisResult: AnalysisResult | null;
  setAnalysisResult: (result: AnalysisResult) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <DataContext.Provider value={{ analysisResult, setAnalysisResult, isLoading, setIsLoading }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
