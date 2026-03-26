export default function Result({
  score,
  total,
  restart,
  questions,
  userAnswers
}) {
  const history =
    JSON.parse(localStorage.getItem("attempts")) || [];

  const latest = history[history.length - 1];

  const weakTopics = latest
    ? Object.entries(latest.topicStats).filter(
        ([_, v]) => v.correct / v.total < 0.5
      )
    : [];

  const avg =
    history.length > 0
      ? history.reduce((acc, a) => acc + a.score / a.total, 0) /
        history.length
      : 0;

  const calculateStreak = () => {
    let streak = 0;

    for (let i = history.length - 1; i >= 0; i--) {
      const date = new Date(history[i].date);
      const today = new Date();

      const diff = Math.floor(
        (today - date) / (1000 * 60 * 60 * 24)
      );

      if (diff === streak) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  };

  const wrongQuestions = questions.filter(
    (q, i) => userAnswers[i] !== q.answer
  );

  const card = {
    background: "#1c1f26",
    padding: 20,
    borderRadius: 14,
    marginBottom: 15
  };

  return (
    <div style={{ padding: 20, maxWidth: 500, margin: "auto" }}>
      <div style={card}>
        <h2 style={{ color: "#8fa2ff", fontWeight: 600 }}>
          Score: {score}/{total}
        </h2>

        <p>🔥 Streak: {calculateStreak()} days</p>
        <p>📊 Avg Accuracy: {(avg * 100).toFixed(1)}%</p>
      </div>

      <div style={card}>
        <h3 style={{ color: "#d6d24f" }}>Weak Topics</h3>

        {weakTopics.length === 0 && <p>None 😎</p>}

        {weakTopics.map(([topic, val]) => (
          <p key={topic}>
            {topic} ({val.correct}/{val.total})
          </p>
        ))}
      </div>

      <h3 style={{ fontWeight: 600 }}>❌ Incorrect Questions</h3>

      {wrongQuestions.map((q) => {
        const index = questions.findIndex(
          (qq) => qq.id === q.id
        );

        return (
          <div
            key={q.id}
            style={{
              ...card,
              borderLeft: "4px solid #ff6b6b"
            }}
          >
            <p><strong>{q.question}</strong></p>

            <p style={{ color: "#ff6b6b" }}>
              Your: {q.options[userAnswers[index]] || "Not answered"}
            </p>

            <p style={{ color: "#4CAF50" }}>
              Correct: {q.options[q.answer]}
            </p>
          </div>
        );
      })}

      <button
        onClick={restart}
        style={{
          width: "100%",
          background: "#8fa2ff",
          color: "white"
        }}
      >
        Back
      </button>
    </div>
  );
}