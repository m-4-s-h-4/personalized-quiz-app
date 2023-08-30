import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import quizData from './quizData';

const BACKED_URL = process.env.BACKED_URL;

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
    // render the questions

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
    // render the final results

      if (!boxIdeas) {
        axios.post(BACKED_URL + 'generate-box-ideas', { answers: Object.values(answers) })
          .then(response => {
            setBoxIdeas(response.data);
          })
          .catch(error => {
            console.error('Error generating box ideas:', error);
            setBoxIdeas('None');
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
