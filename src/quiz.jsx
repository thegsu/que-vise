import { useState } from "react";

export default function Quiz({ questions, finishQuiz }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  const card = {
    background: "#1c1f26",
    padding: 22,
    borderRadius: 16
  };

  if (!questions.length) {
    return <h2 style={{ padding: 20 }}>File tu upload kora dhunu age</h2>;
  }

  const q = questions[current];

  const handleSelect = (i) => {
    setSelected(i);

    const updated = [...userAnswers];
    updated[current] = i;
    setUserAnswers(updated);
  };

  const handleNext = () => {
    let newScore = score;

    if (selected === q.answer) {
      newScore++;
      setScore(newScore);
    }

    setSelected(null);

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      saveAttempt(newScore);
      finishQuiz(newScore, userAnswers);
    }
  };

  const saveAttempt = (finalScore) => {
    const topicStats = {};

    questions.forEach((q, i) => {
      if (!topicStats[q.topic]) {
        topicStats[q.topic] = { correct: 0, total: 0 };
      }

      topicStats[q.topic].total++;

      if (userAnswers[i] === q.answer) {
        topicStats[q.topic].correct++;
      }
    });

    const attempt = {
      date: new Date().toISOString(),
      score: finalScore,
      total: questions.length,
      topicStats
    };

    const history =
      JSON.parse(localStorage.getItem("attempts")) || [];

    history.push(attempt);

    localStorage.setItem("attempts", JSON.stringify(history));
  };

  return (
    <div style={{ padding: 20, maxWidth: 500, margin: "auto" }}>
      <div style={card}>
        <h3 style={{ marginBottom: 20, fontWeight: 600 }}>
          Q{current + 1}. {q.question}
        </h3>

        {q.options.map((opt, i) => {
          const isSelected = selected === i;

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              style={{
                display: "block",
                width: "100%",
                margin: "12px 0",
                padding: "16px",
                borderRadius: "14px",
                border: isSelected
                  ? "2px solid #8fa2ff"
                  : "1px solid #ddd",
                background: isSelected
                  ? "#dfe6ff"   // 🔥 bright highlight
                  : "#f5f6fa",
                color: "#1a1a1a",
                textAlign: "left",
                fontWeight: 500,
                transform: isSelected ? "scale(1.02)" : "scale(1)",
                boxShadow: isSelected
                  ? "0 0 10px rgba(143,162,255,0.5)"
                  : "none",
                transition: "all 0.2s ease"
              }}
            >
              {opt}
            </button>
          );
        })}

        <button
          onClick={handleNext}
          style={{
            marginTop: 20,
            width: "100%",
            background: "#8fa2ff",
            color: "white",
            fontWeight: 600
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}