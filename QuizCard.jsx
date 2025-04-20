import React from "react";

export default function QuizCard({
  index,
  question,
  answers,
  selected,
  correct,
  submitted,
  onSelect,
}) {
  return (
    <div style={{
      marginBottom: "1.5rem",
      padding: "1rem",
      backgroundColor: "rgba(255,255,255,0.8)",
      borderRadius: "1rem",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
    }}>
      <h2
        style={{ fontSize: "1.125rem", fontWeight: "600", marginBottom: "1rem" }}
        dangerouslySetInnerHTML={{ __html: `${index + 1}. ${question}` }}
      />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
        {answers.map((answer, i) => {
          const isSelected = selected === answer;
          const isCorrect = submitted && answer === correct;
          const isIncorrect = submitted && isSelected && answer !== correct;

          let backgroundColor = "white";
          if (submitted) {
            if (isCorrect) backgroundColor = "#86efac";
            else if (isIncorrect) backgroundColor = "#fca5a5";
          } else if (isSelected) {
            backgroundColor = "#bfdbfe";
          }

          return (
            <button
              key={i}
              onClick={() => !submitted && onSelect(index, answer)}
              style={{
                padding: "0.5rem",
                border: "1px solid #ccc",
                borderRadius: "0.5rem",
                backgroundColor,
                cursor: "pointer",
              }}
              dangerouslySetInnerHTML={{ __html: answer }}
            />
          );
        })}
      </div>
    </div>
  );
}



  