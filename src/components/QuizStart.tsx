import React from 'react';
import { Play, BookOpen, Trophy } from 'lucide-react';

interface QuizStartProps {
  onStart: () => void;
  totalQuestions: number;
}

export const QuizStart: React.FC<QuizStartProps> = ({ onStart, totalQuestions }) => {
  return (
    <div className="quiz-card animate-fade-in">
      <div className="text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mb-6">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Interactive Quiz Challenge
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Test your knowledge with our collection of questions from various categories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 p-6 rounded-xl">
            <Trophy className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-800 mb-2">Challenge Yourself</h3>
            <p className="text-sm text-gray-600">Questions from multiple categories</p>
          </div>
          <div className="bg-green-50 p-6 rounded-xl">
            <BookOpen className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-800 mb-2">Learn & Grow</h3>
            <p className="text-sm text-gray-600">Expand your knowledge base</p>
          </div>
          <div className="bg-purple-50 p-6 rounded-xl">
            <Play className="w-8 h-8 text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-800 mb-2">Random Questions</h3>
            <p className="text-sm text-gray-600">No repeats, fresh every time</p>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl mb-8">
          <h3 className="font-semibold text-gray-800 mb-3">Quiz Features:</h3>
          <ul className="text-left text-gray-600 space-y-2">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              {totalQuestions} unique questions available
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              Instant feedback on your answers
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
              Track your progress and score
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
              Questions from Math, Science, Geography, and more
            </li>
          </ul>
        </div>

        <button
          onClick={onStart}
          className="primary-button inline-flex items-center gap-3 text-lg animate-bounce-in"
        >
          <Play className="w-6 h-6" />
          Start Quiz
        </button>
      </div>
    </div>
  );
};