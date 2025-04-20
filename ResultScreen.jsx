export default function ResultScreen({ questions, selectedAnswers, restart }) {
    const score = questions.filter(q => selectedAnswers[q.id] === q.correct_answer).length;
  
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Your Score: {score} / {questions.length}</h2>
        {questions.map(q => {
          const userAnswer = selectedAnswers[q.id];
          const isCorrect = userAnswer === q.correct_answer;
          return (
            <div key={q.id} className="mb-4">
              <p className="font-semibold" dangerouslySetInnerHTML={{ __html: q.question }} />
              <p className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                Your answer: <span dangerouslySetInnerHTML={{ __html: userAnswer }} />
              </p>
              {!isCorrect && (
                <p className="text-green-600">
                  Correct answer: <span dangerouslySetInnerHTML={{ __html: q.correct_answer }} />
                </p>
              )}
            </div>
          )
        })}
        <button onClick={restart} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          Play Again
        </button>
      </div>
    )
  }
  