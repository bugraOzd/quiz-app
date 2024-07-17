import React, { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import { ArrowRight, Check } from "lucide-react";

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
      const questions = data.slice(0, 10).map((item) => {
        return {
          question: item.body,
          options: {
            A: item.title,
            B: item.title,
            C: item.title,
            D: item.title,
          },
        };
      });

      setQuestions(questions);
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

  const handleRestartQuiz = () => {
    setUserAnswers([]);
    setCurrentQuestionIndex(0);
    setQuizEnded(false);
    setIsOptionDisabled(true);
  };

  const handleNext = () => {
    setUserAnswers([
      ...userAnswers,
      { question: currentQuestionIndex + 1, answer: "-" },
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

        <button onClick={handleRestartQuiz}>Restart Quiz</button>
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
            key={index}
            className={`${
              index === currentQuestionIndex
                ? "border border-[#646cff]"
                : "cursor-not-allowed"
            }`}
            disabled={index !== currentQuestionIndex}
          >
            {index < currentQuestionIndex ? (
              <span>
                <Check />
              </span>
            ) : (
              index + 1
            )}
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
      <p className="max-w-3xl text-lg">{currentQuestion.question}</p>
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
            <span className="font-bold">{option}:</span>{" "}
            {currentQuestion.options[option]}
          </button>
        ))}
      </div>

      <button onClick={handleNext}>
        <span className="flex gap-3">
          Next
          <ArrowRight />
        </span>
      </button>
    </div>
  );
};

export default Quiz;
