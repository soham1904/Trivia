import React, { useState, useEffect, useCallback } from "react";
import StartScreen from "./components/StartScreen";
import QuizCard from "./components/QuizCard";
import Confetti from "react-confetti";

export default function App() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizData, setQuizData] = useState([]);
  const [questionCount, setQuestionCount] = useState(5);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(30);
  const [difficulty, setDifficulty] = useState("easy");
  const [darkMode, setDarkMode] = useState(false);

  const startQuiz = () => {
    setQuizStarted(true);
    setSubmitted(false);
    setScore(0);
    setCurrentQuestionIndex(0);
    setTimer(30);
  };

  const handleSubmit = useCallback(() => {
    let count = 0;
    quizData.forEach((q) => {
      if (q.selected === q.correct) count++;
    });
    setScore(count);
    setSubmitted(true);
  }, [quizData]);

  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimer(30); 
    } else {
      handleSubmit(); 
    }
  }, [currentQuestionIndex, quizData.length, handleSubmit]);

  const fetchQuizData = useCallback(async () => {
    try {
      const res = await fetch(
        `https://opentdb.com/api.php?amount=${questionCount}&difficulty=${difficulty}&type=multiple`
      );
      const data = await res.json();

      const formattedData = data.results.map((q) => {
        const answers = [...q.incorrect_answers, q.correct_answer];
        const shuffled = answers.sort(() => 0.5 - Math.random());
        return {
          question: q.question,
          answers: shuffled,
          correct: q.correct_answer,
          selected: null,
        };
      });

      setQuizData(formattedData);
    } catch (error) {
      console.error("Failed to fetch quiz data", error);
    }
  }, [questionCount, difficulty]);

  useEffect(() => {
    if (quizStarted) {
      fetchQuizData();
    }
  }, [quizStarted, fetchQuizData]);

  useEffect(() => {
    if (quizStarted && timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
    if (timer === 0) {
      handleNextQuestion();
    }
  }, [quizStarted, timer, handleNextQuestion]);

  const handleSelectAnswer = (index, selectedAnswer) => {
    setQuizData((prev) =>
      prev.map((q, i) =>
        i === index ? { ...q, selected: selectedAnswer } : q
      )
    );
  };

  const handlePlayAgain = () => {
    setQuizStarted(false);
    setQuizData([]);
    setQuestionCount(5);
    setSubmitted(false);
    setScore(0);
    setDifficulty("easy");
    setDarkMode(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        background: darkMode
          ? "linear-gradient(to bottom right, #1a202c, #2d3748)"
          : "linear-gradient(to bottom right, #60a5fa, #a78bfa, #f472b6)",
        color: darkMode ? "#ffffff" : "#000000",
      }}
    >
      {!quizStarted ? (
        <StartScreen
          startQuiz={startQuiz}
          questionCount={questionCount}
          setQuestionCount={setQuestionCount}
          setDifficulty={setDifficulty}
          difficulty={difficulty}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      ) : (
        <div className="w-full max-w-2xl bg-white bg-opacity-20 backdrop-blur-md rounded-2xl shadow-lg p-8">
          {quizData.length > 0 && (
            <QuizCard
              key={currentQuestionIndex}
              index={currentQuestionIndex}
              question={quizData[currentQuestionIndex].question}
              answers={quizData[currentQuestionIndex].answers}
              selected={quizData[currentQuestionIndex].selected}
              correct={quizData[currentQuestionIndex].correct}
              submitted={submitted}
              onSelect={handleSelectAnswer}
            />
          )}

          <div className="flex justify-between mt-6">
            {quizStarted && (
              <p className="text-white">Time left: {timer}s</p>
            )}
            {!submitted && currentQuestionIndex < quizData.length - 1 && (
              <button
                onClick={handleNextQuestion}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Next Question
              </button>
            )}
          </div>

          {submitted ? (
            <div className="text-center mt-6">
              <p className="text-xl font-bold text-white">
                You scored {score}/{quizData.length} correct answers!
              </p>

              {/* Display Correct Answers */}
              <div className="mt-6">
                <h2 className="text-lg font-semibold text-white">
                  Correct Answers:
                </h2>
                {quizData.map((q, index) => (
                  <div key={index} className="mt-3">
                    <p className="text-white">
                      <strong>{q.question}</strong>
                    </p>
                    <p
                      className={
                        q.selected === q.correct
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >
                      Your Answer: {q.selected}
                    </p>
                    <p className="text-green-500">
                      Correct Answer: {q.correct}
                    </p>
                  </div>
                ))}
              </div>

              <button
                onClick={handlePlayAgain}
                className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
              >
                Play Again
              </button>
            </div>
          ) : (
            <button
              onClick={handleSubmit}
              className="mt-6 w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Submit Answers
            </button>
          )}
        </div>
      )}

      {submitted && score > 0 && <Confetti />}
    </div>
  );
}
