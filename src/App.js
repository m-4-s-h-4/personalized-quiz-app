import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import quizData from './quizData';

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [boxIdeas, setBoxIdeas] = useState(null);

  const handleAnswer = (questionIndex, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: answer,
    }));
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const renderQuestions = () => {
    if (currentQuestionIndex < quizData.length) {
      const currentQuestion = quizData[currentQuestionIndex];
      const options = currentQuestion.options;

      return (
        <div>
          <h3>Question {currentQuestionIndex + 1}:</h3>
          <p>{currentQuestion.question}</p>
          {options.map((option, index) => (
            <button key={index} onClick={() => handleAnswer(currentQuestionIndex, option)}>
              {option}
            </button>
          ))}
        </div>
      );
    } else {
      if (!boxIdeas) {
        axios.post('http://localhost:3001/api/generate-box-ideas', { answers: Object.values(answers) })
          .then(response => {
            setBoxIdeas(response.data);
          })
          .catch(error => {
            console.error('Error generating box ideas:', error);
          });
      }

      return (
        <div>
          <p>Quiz completed!</p>
          <h3>Box Ideas for You:</h3>
          <p>{boxIdeas}</p>
        </div>
      );
    }
  };

  return (
    <div className="App">
      <h1>Personalized Quiz App</h1>
      {renderQuestions()}
    </div>
  );
}

export default App;
