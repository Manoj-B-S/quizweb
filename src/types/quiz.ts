export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  category?: string;
}

export interface QuizState {
  currentQuestion: Question | null;
  score: number;
  totalQuestions: number;
  selectedAnswer: number | null;
  showFeedback: boolean;
  isQuizStarted: boolean;
  askedQuestions: string[];
}

export interface QuizStats {
  correct: number;
  incorrect: number;
  percentage: number;
}