import CSVUpload from "./CSVUpload";

export default function Home({ setQuestions, startQuiz }) {
  const card = {
    background: "#1c1f26",
    padding: 20,
    borderRadius: 14
  };

  return (
    <div style={{ padding: 20 }}>
      <div style={{ ...card, maxWidth: 400, margin: "auto" }}>
        <h2 style={{ color: "#8fa2ff" }}>Revise-Master</h2>

        <CSVUpload setQuestions={setQuestions} />

        <button
          onClick={startQuiz}
          style={{
            marginTop: 20,
            width: "100%",
            background: "#8fa2ff",
            color: "white"
          }}
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
}