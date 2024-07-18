import React, { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import { Check } from "lucide-react";
import Table from "./Table";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isOptionDisabled, setIsOptionDisabled] = useState(true);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizEnded, setQuizEnded] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (currentQuestionIndex < questions.length && !quizEnded && quizStarted) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime === 1) {
            setUserAnswers([
              ...userAnswers,
              { question: currentQuestionIndex + 1, answer: "-" },
            ]);
            clearInterval(timer);
            moveToNextQuestion();
            return 30;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [currentQuestionIndex, questions, quizEnded, quizStarted]);

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
      const questions = mapQuestionData(data);

      setQuestions(questions);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const mapQuestionData = (data) => {
    return data.slice(0, 10).map((item) => {
      return {
        question: item.body,
        options: {
          A: item.title.slice(0, Math.random() * item.title.length + 1),
          B: item.title.slice(0, Math.random() * item.title.length + 1),
          C: item.title.slice(0, Math.random() * item.title.length + 1),
          D: item.title.slice(0, Math.random() * item.title.length + 1),
        },
      };
    });
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

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const handleRestartQuiz = () => {
    setUserAnswers([]);
    setTimeLeft(30);
    setCurrentQuestionIndex(0);
    setQuizEnded(false);
    setIsOptionDisabled(true);
  };

  if (questions.length === 0) {
    return <div>Loading questions...</div>;
  }

  if (quizEnded) {
    return (
      <>
        <Table answers={userAnswers} />
        <button onClick={handleRestartQuiz}>Restart Quiz</button>
      </>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const timePercentage = (timeLeft / 30) * 100;

  return (
    <div className="flex flex-col justify-center items-center gap-4 sm:gap-6 p-4 sm:p-6">
      <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
        {questions.map((question, index) => (
          <button
            key={index}
            className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full text-sm sm:text-base
              ${
                index === currentQuestionIndex
                  ? "border-2 border-[#646cff]"
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

      <div>
        <ProgressBar
          size={90}
          text={timeLeft}
          percentage={timePercentage}
          color={"#646cff"}
        />
      </div>

      {!quizStarted && (
        <button
          className="bg-primary hover:bg-primary-hover hover:border-primary-light px-4 py-2 rounded-md"
          onClick={handleStartQuiz}
        >
          Start
        </button>
      )}

      <div className={`w-full max-w-4xl ${!quizStarted ? "blur-md" : ""}`}>
        <section className="py-6 sm:py-10 px-4 sm:px-8 md:px-16 flex flex-col justify-center items-center gap-4 sm:gap-5 border border-secondary rounded-lg shadow-2xl">
          <p className="text-base sm:text-lg md:text-xl text-center">
            {currentQuestion.question}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
            {["A", "B", "C", "D"].map((option) => (
              <button
                className={`p-3 border rounded-md text-left transition-colors
                  ${
                    isOptionDisabled ? "cursor-not-allowed" : "cursor-pointer"
                  }`}
                key={option}
                onClick={() => handleAnswerClick(option)}
                disabled={isOptionDisabled}
              >
                <span className="font-bold">{option}:</span>{" "}
                <span className="text-sm sm:text-base">
                  {currentQuestion.options[option]}
                </span>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Quiz;
