import React from 'react';
import { Question } from '../types/quiz';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  selectedAnswer: number | null;
  showFeedback: boolean;
  onSelectAnswer: (index: number) => void;
  questionNumber: number;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedAnswer,
  showFeedback,
  onSelectAnswer,
  questionNumber
}) => {
  const getOptionClassName = (index: number) => {
    let className = 'option-button';
    
    if (showFeedback) {
      if (index === question.correctAnswer) {
        className += ' correct';
      } else if (index === selectedAnswer && index !== question.correctAnswer) {
        className += ' incorrect';
      }
    } else if (selectedAnswer === index) {
      className += ' selected';
    }
    
    return className;
  };

  const getOptionIcon = (index: number) => {
    if (!showFeedback) return null;
    
    if (index === question.correctAnswer) {
      return <CheckCircle className="w-5 h-5 text-green-600" />;
    } else if (index === selectedAnswer && index !== question.correctAnswer) {
      return <XCircle className="w-5 h-5 text-red-600" />;
    }
    
    return null;
  };

  return (
    <div className="quiz-card animate-slide-up">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            Question {questionNumber}
          </span>
          {question.category && (
            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
              {question.category}
            </span>
          )}
        </div>
        
        <div className="flex items-start gap-4">
          <HelpCircle className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
          <h2 className="text-2xl font-semibold text-gray-800 leading-relaxed">
            {question.text}
          </h2>
        </div>
      </div>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => !showFeedback && onSelectAnswer(index)}
            disabled={showFeedback}
            className={getOptionClassName(index)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-semibold text-gray-600">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="text-gray-800 font-medium">{option}</span>
              </div>
              {getOptionIcon(index)}
            </div>
          </button>
        ))}
      </div>

      {showFeedback && (
        <div className="mt-6 p-4 rounded-xl bg-gray-50 animate-fade-in">
          <div className="flex items-center gap-2 mb-2">
            {selectedAnswer === question.correctAnswer ? (
              <>
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-green-800">Correct!</span>
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5 text-red-600" />
                <span className="font-semibold text-red-800">Incorrect</span>
              </>
            )}
          </div>
          <p className="text-gray-700">
            The correct answer is: <strong>{question.options[question.correctAnswer]}</strong>
          </p>
        </div>
      )}
    </div>
  );
};