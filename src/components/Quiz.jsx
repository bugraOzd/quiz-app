import React, { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isOptionDisabled, setIsOptionDisabled] = useState(true);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizEnded, setQuizEnded] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (currentQuestionIndex < questions.length && !quizEnded) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime === 1) {
            clearInterval(timer);
            moveToNextQuestion();
            return 30;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [currentQuestionIndex, questions, quizEnded]);

  useEffect(() => {
    if (timeLeft === 20) {
      setIsOptionDisabled(false);
    }
  }, [timeLeft]);

  const fetchQuestions = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      console.log(data.slice(0, 10));
      setQuestions(data.slice(0, 10));
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const moveToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setTimeLeft(30);
      setIsOptionDisabled(true);
    } else {
      setQuizEnded(true);
    }
  };

  const handleAnswerClick = (answer) => {
    setUserAnswers([
      ...userAnswers,
      { question: currentQuestionIndex + 1, answer },
    ]);
    moveToNextQuestion();
  };

  if (questions.length === 0) {
    return <div>Loading questions...</div>;
  }

  if (quizEnded) {
    return (
      <div>
        <h2>Quiz Ended</h2>
        <thead>
          <tr>
            <th>Question</th>
            <th>Your Answer</th>
          </tr>
        </thead>
        <tbody>
          {userAnswers.map((answer, index) => (
            <tr key={index}>
              <td>{answer.question}</td>
              <td>{answer.answer}</td>
            </tr>
          ))}
        </tbody>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const timePercentage = (timeLeft / 30) * 100;

  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <div className="flex gap-3 justify-center">
        {questions.map((question, index) => (
          <button
            className={`${
              index === currentQuestionIndex
                ? "border border-[#646cff]"
                : "cursor-not-allowed"
            }`}
            disabled={index !== currentQuestionIndex}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <ProgressBar
          text={timeLeft}
          percentage={timePercentage}
          color={"#646cff"}
        />
      </div>
      <p>{currentQuestion.body}</p>
      <div className="grid grid-cols-2 grid-rows-2 gap-3 max-w-2xl">
        {["A", "B", "C", "D"].map((option) => (
          <button
            className={`${
              isOptionDisabled ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            key={option}
            onClick={() => handleAnswerClick(option)}
            disabled={isOptionDisabled}
          >
            <span className="font-bold">{option}:</span> {currentQuestion.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Quiz;
