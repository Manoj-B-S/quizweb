import React from 'react';
import { useQuiz } from './hooks/useQuiz';
import { QuizStart } from './components/QuizStart';
import { QuestionCard } from './components/QuestionCard';
import { ScoreDisplay } from './components/ScoreDisplay';
import { QuizControls } from './components/QuizControls';
import { questionBank } from './data/questions';

function App() {
  const {
    state,
    startQuiz,
    selectAnswer,
    nextQuestion,
    resetQuiz,
    getQuizStats,
    hasMoreQuestions
  } = useQuiz();

  const handleGoHome = () => {
    resetQuiz();
  };

  if (!state.isQuizStarted) {
    return (
      <div className="min-h-screen py-8 px-4">
        <QuizStart 
          onStart={startQuiz} 
          totalQuestions={questionBank.length}
        />
      </div>
    );
  }

  if (!state.currentQuestion) {
    return (
      <div className="min-h-screen py-8 px-4 flex items-center justify-center">
        <div className="quiz-card text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            No more questions available!
          </h2>
          <button onClick={resetQuiz} className="primary-button">
            Start Over
          </button>
        </div>
      </div>
    );
  }

  const stats = getQuizStats();

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <ScoreDisplay 
          stats={stats}
          currentScore={state.score}
          totalQuestions={state.totalQuestions}
        />
        
        <QuestionCard
          question={state.currentQuestion}
          selectedAnswer={state.selectedAnswer}
          showFeedback={state.showFeedback}
          onSelectAnswer={selectAnswer}
          questionNumber={state.totalQuestions + 1}
        />
        
        <QuizControls
          showFeedback={state.showFeedback}
          selectedAnswer={state.selectedAnswer}
          hasMoreQuestions={hasMoreQuestions}
          onNextQuestion={nextQuestion}
          onResetQuiz={resetQuiz}
          onGoHome={handleGoHome}
        />
      </div>
    </div>
  );
}

export default App;