
import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import { generateQuiz } from '../services/geminiService';

interface QuizProps {
  onQuizComplete: (topic: string, score: number) => void;
}

export const Quiz: React.FC<QuizProps> = ({ onQuizComplete }) => {
  const [topic, setTopic] = useState('General NCC Knowledge');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const startQuiz = async () => {
    setLoading(true);
    try {
      const data = await generateQuiz(topic);
      setQuestions(data);
      setCurrentIndex(0);
      setScore(0);
      setQuizFinished(false);
      setShowExplanation(false);
      setSelectedOption(null);
    } catch (err) {
      alert("Error generating quiz. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (index: number) => {
    if (selectedOption !== null) return;
    
    setSelectedOption(index);
    setShowExplanation(true);
    if (index === questions[currentIndex].correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setQuizFinished(true);
      onQuizComplete(topic, score);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mb-4"></div>
        <p className="text-gray-600 font-medium">AI is drafting your questions...</p>
      </div>
    );
  }

  if (quizFinished) {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Quiz Completed!</h2>
        <p className="text-lg text-gray-600 mb-6">You scored {score} out of {questions.length}</p>
        <div className="w-full bg-gray-200 rounded-full h-4 mb-8">
          <div 
            className="bg-green-500 h-4 rounded-full transition-all duration-1000" 
            style={{ width: `${(score / questions.length) * 100}%` }}
          ></div>
        </div>
        <button 
          onClick={() => {
            setQuestions([]);
            setQuizFinished(false);
          }}
          className="bg-blue-900 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-800"
        >
          Try Another Topic
        </button>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">AI Mock Examination</h2>
        <p className="text-gray-600 mb-6">Select any training subject. Our AI generates a professional, scenario-based mock test specifically for Kerala Dte NCC cadets.</p>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {['Drill', 'Weapon Training', 'Map Reading', 'Personality Development'].map(t => (
              <button 
                key={t}
                onClick={() => setTopic(t)}
                className={`text-[10px] px-3 py-1.5 rounded-full font-bold uppercase border ${topic === t ? 'bg-blue-900 text-white border-blue-900' : 'bg-white text-gray-500 border-gray-100'}`}
              >
                {t}
              </button>
            ))}
          </div>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter custom topic..."
          />
          <button 
            onClick={startQuiz}
            className="w-full bg-blue-900 text-white py-4 rounded-xl font-bold hover:bg-blue-800 shadow-md transition-all active:scale-[0.98]"
          >
            Generate AI Quiz
          </button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex justify-between items-center px-4">
        <span className="text-xs font-bold text-blue-900 uppercase tracking-widest">Question {currentIndex + 1} of {questions.length}</span>
        <div className="flex items-center space-x-2">
           <span className="text-xs font-medium text-gray-400">Score Progress</span>
           <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-900 text-xs font-bold">{score} / {questions.length}</span>
        </div>
      </div>
      
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-8 leading-relaxed">{currentQ.question}</h3>
        
        <div className="space-y-3">
          {currentQ.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              disabled={selectedOption !== null}
              className={`w-full text-left px-6 py-4 rounded-xl border-2 transition-all ${
                selectedOption === null 
                  ? 'border-gray-50 hover:border-blue-200 hover:bg-blue-50' 
                  : idx === currentQ.correctAnswer 
                    ? 'border-green-500 bg-green-50 shadow-sm' 
                    : selectedOption === idx 
                      ? 'border-red-500 bg-red-50' 
                      : 'border-gray-50 opacity-40'
              }`}
            >
              <div className="flex items-center">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 text-xs font-bold ${
                  selectedOption === idx ? 'bg-white border' : 'bg-gray-100'
                }`}>
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="text-sm font-medium">{option}</span>
              </div>
            </button>
          ))}
        </div>

        {showExplanation && (
          <div className="mt-8 p-6 bg-blue-50/50 rounded-xl border border-blue-100 animate-fade-in">
            <div className="flex items-center mb-2">
               <span className="text-xl mr-2">{selectedOption === currentQ.correctAnswer ? '✅' : '❌'}</span>
               <h4 className="font-bold text-blue-900">Learning Insight</h4>
            </div>
            <p className="text-blue-800 text-sm leading-relaxed mb-6">{currentQ.explanation}</p>
            <button
              onClick={nextQuestion}
              className="w-full bg-blue-900 text-white py-3 rounded-xl font-bold shadow-sm hover:bg-blue-800 transition-colors"
            >
              {currentIndex + 1 === questions.length ? 'Finalize Exam' : 'Proceed to Next Question'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
