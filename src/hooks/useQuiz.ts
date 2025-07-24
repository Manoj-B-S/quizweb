import { useState, useCallback } from 'react';
import { Question, QuizState } from '../types/quiz';
import { questionBank } from '../data/questions';

const initialState: QuizState = {
  currentQuestion: null,
  score: 0,
  totalQuestions: 0,
  selectedAnswer: null,
  showFeedback: false,
  isQuizStarted: false,
  askedQuestions: []
};

export const useQuiz = () => {
  const [state, setState] = useState<QuizState>(initialState);

  const getRandomQuestion = useCallback((): Question | null => {
    const availableQuestions = questionBank.filter(
      q => !state.askedQuestions.includes(q.id)
    );
    
    if (availableQuestions.length === 0) {
      return null; // No more questions available
    }
    
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    return availableQuestions[randomIndex];
  }, [state.askedQuestions]);

  const startQuiz = useCallback(() => {
    const firstQuestion = getRandomQuestion();
    setState(prev => ({
      ...prev,
      currentQuestion: firstQuestion,
      isQuizStarted: true,
      askedQuestions: firstQuestion ? [firstQuestion.id] : []
    }));
  }, [getRandomQuestion]);

  const selectAnswer = useCallback((answerIndex: number) => {
    setState(prev => ({
      ...prev,
      selectedAnswer: answerIndex,
      showFeedback: true
    }));
  }, []);

  const nextQuestion = useCallback(() => {
    const isCorrect = state.selectedAnswer === state.currentQuestion?.correctAnswer;
    const newScore = isCorrect ? state.score + 1 : state.score;
    const nextQ = getRandomQuestion();
    
    setState(prev => ({
      ...prev,
      currentQuestion: nextQ,
      score: newScore,
      totalQuestions: prev.totalQuestions + 1,
      selectedAnswer: null,
      showFeedback: false,
      askedQuestions: nextQ ? [...prev.askedQuestions, nextQ.id] : prev.askedQuestions
    }));
  }, [state.selectedAnswer, state.currentQuestion, state.score, getRandomQuestion]);

  const resetQuiz = useCallback(() => {
    setState(initialState);
  }, []);

  const getQuizStats = useCallback(() => {
    const correct = state.score;
    const incorrect = state.totalQuestions - state.score;
    const percentage = state.totalQuestions > 0 ? Math.round((correct / state.totalQuestions) * 100) : 0;
    
    return { correct, incorrect, percentage };
  }, [state.score, state.totalQuestions]);

  return {
    state,
    startQuiz,
    selectAnswer,
    nextQuestion,
    resetQuiz,
    getQuizStats,
    hasMoreQuestions: questionBank.length > state.askedQuestions.length
  };
};