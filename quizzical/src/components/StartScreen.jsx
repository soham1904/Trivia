import React from "react";

export default function StartScreen({
  startQuiz,
  questionCount,
  setQuestionCount,
  difficulty,
  setDifficulty,
}) {
  return (
    <div className="h-screen flex items-center justify-center relative bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      <div className="bg-white bg-opacity-20 backdrop-blur-lg shadow-xl p-8 rounded-2xl text-center w-80">
        <h1 className="text-4xl font-bold text-white mb-4">🧠 Quizzical</h1>
        <p className="text-white mb-6">Test your knowledge with fun trivia!</p>
        <label className="text-white font-medium block mb-2">
          Number of Questions:
        </label>
        <input
          type="number"
          min="1"
          max="10"
          value={questionCount}
          onChange={(e) => setQuestionCount(e.target.value)}
          className="w-full px-3 py-2 rounded-lg mb-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
        />

        <label className="text-white font-medium block mb-2">
          Select Difficulty:
        </label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="w-full px-3 py-2 rounded-lg mb-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <button
          onClick={startQuiz}
          className="bg-white text-purple-700 font-semibold px-4 py-2 w-full rounded-lg hover:bg-purple-100 transition-all"
        >
          🚀 Start Quiz
        </button>
      </div>
    </div>
  );
}
