import React from 'react';
import { Trophy, Target, TrendingUp } from 'lucide-react';
import { QuizStats } from '../types/quiz';

interface ScoreDisplayProps {
  stats: QuizStats;
  currentScore: number;
  totalQuestions: number;
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ 
  stats, 
  currentScore, 
  totalQuestions 
}) => {
  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreMessage = (percentage: number) => {
    if (percentage >= 90) return 'Outstanding! 🌟';
    if (percentage >= 80) return 'Great job! 🎉';
    if (percentage >= 70) return 'Good work! 👍';
    if (percentage >= 60) return 'Not bad! 👌';
    return 'Keep practicing! 💪';
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <Trophy className="w-6 h-6 text-yellow-500" />
        <h3 className="text-lg font-semibold text-gray-800">Your Progress</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-blue-800">{currentScore}</div>
          <div className="text-sm text-blue-600">Current Score</div>
        </div>
        
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <TrendingUp className="w-8 h-8 text-gray-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-800">{totalQuestions}</div>
          <div className="text-sm text-gray-600">Questions Answered</div>
        </div>
        
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <Trophy className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <div className={`text-2xl font-bold ${getScoreColor(stats.percentage)}`}>
            {stats.percentage}%
          </div>
          <div className="text-sm text-green-600">Accuracy</div>
        </div>
      </div>
      
      {totalQuestions > 0 && (
        <div className="mt-4 text-center">
          <p className="text-lg font-medium text-gray-700">
            {getScoreMessage(stats.percentage)}
          </p>
          <div className="mt-2 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${stats.percentage}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};