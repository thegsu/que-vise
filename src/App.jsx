import { useState } from "react";
import Home from "./home";
import Quiz from "./quiz";
import Result from "./result";

export default function App() {
  const [screen, setScreen] = useState("home");
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  return (
    <>
      {screen === "home" && (
        <Home
          setQuestions={setQuestions}
          startQuiz={() => setScreen("quiz")}
        />
      )}

      {screen === "quiz" && (
        <Quiz
          questions={questions}
          finishQuiz={(finalScore, answers) => {
            setScore(finalScore);
            setUserAnswers(answers);
            setScreen("result");
          }}
        />
      )}

      {screen === "result" && (
        <Result
          score={score}
          total={questions.length}
          questions={questions}
          userAnswers={userAnswers}
          restart={() => setScreen("home")}
        />
      )}
    </>
  );
}