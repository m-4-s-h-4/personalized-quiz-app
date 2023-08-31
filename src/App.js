import React, { useState } from 'react';
import axios from 'axios';
import Lottie from 'react-lottie';
import animationData from './loading.json';
import './App.css';
import quizData from './quizData';
import BoxIdeasList from './BoxIdeasList';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'https://ec2-3-121-74-101.eu-central-1.compute.amazonaws.com:3001/api/';

console.log(BACKEND_URL);

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [boxIdeas, setBoxIdeas] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // New loading state

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
        <div className="question-answer-container">
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
      if (!boxIdeas && !isLoading) { // Check loading state
        setIsLoading(true); // Set loading state
        axios.post(BACKEND_URL + 'generate-box-ideas', { answers: Object.values(answers) })
          .then(response => {
            setBoxIdeas(response.data);
            setIsLoading(false); // Reset loading state
          })
          .catch(error => {
            console.error('Error generating box ideas:', error);
            setBoxIdeas('None');
            setIsLoading(false); // Reset loading state
          });
      }

      return (
        <div>
          <h3>Box Ideas for You:</h3>
          <BoxIdeasList ideas={boxIdeas} />
        </div>
      );
    }
  };

  return (
    <div className="App">
      <h1>Personalized Quiz</h1>
      {isLoading ? (
        <Lottie options={defaultOptions} height={400} width={400} />
      ) : (
        renderQuestions()
      )}
    </div>
  );
}

export default App;
