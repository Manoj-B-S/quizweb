import React from 'react';
import { ArrowRight, RotateCcw, Home } from 'lucide-react';

interface QuizControlsProps {
  showFeedback: boolean;
  selectedAnswer: number | null;
  hasMoreQuestions: boolean;
  onNextQuestion: () => void;
  onResetQuiz: () => void;
  onGoHome: () => void;
}

export const QuizControls: React.FC<QuizControlsProps> = ({
  showFeedback,
  selectedAnswer,
  hasMoreQuestions,
  onNextQuestion,
  onResetQuiz,
  onGoHome
}) => {
  if (!showFeedback) {
    return (
      <div className="text-center mt-6">
        <p className="text-gray-600 mb-4">
          {selectedAnswer === null 
            ? "Select an answer to continue" 
            : "Click 'Next Question' to proceed"
          }
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {hasMoreQuestions ? (
          <button
            onClick={onNextQuestion}
            className="primary-button inline-flex items-center gap-2"
          >
            <ArrowRight className="w-5 h-5" />
            Next Question
          </button>
        ) : (
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-800 mb-4">
              🎉 You've completed all available questions!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={onResetQuiz}
                className="primary-button inline-flex items-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Start Over
              </button>
              <button
                onClick={onGoHome}
                className="secondary-button inline-flex items-center gap-2"
              >
                <Home className="w-5 h-5" />
                Back to Home
              </button>
            </div>
          </div>
        )}
      </div>
      
      {hasMoreQuestions && (
        <div className="flex justify-center">
          <button
            onClick={onResetQuiz}
            className="secondary-button inline-flex items-center gap-2 text-sm"
          >
            <RotateCcw className="w-4 h-4" />
            Restart Quiz
          </button>
        </div>
      )}
    </div>
  );
};