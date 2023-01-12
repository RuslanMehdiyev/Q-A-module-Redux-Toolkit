import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import uuid from "react-uuid";
import { addQuestion } from "../store/questionSlice";
import Questions from "./Questions";

function QAcomp() {
  const [question, setQuestion] = useState({
    id: "",
    question: "",
  });

  const handleInput = (e) => {
    setQuestion({ id: uuid(), question: e.target.value, rate: 0 });
  };

  const dispatch = useDispatch();

  const add = (e) => {
    e.preventDefault();
    dispatch(addQuestion(question));
    setQuestion({ id: "", question: "" });
  };

  let data = useSelector((state) => state.questions.value);
  return (
    <div className="qaContainer">
      <form action="" className="askQuestion" onSubmit={add}>
        <h2>Ask Anything</h2>
        <input
          className="inputs"
          type="text"
          placeholder="Ask a question"
          value={question.question}
          onChange={(e) => handleInput(e)}
          required
        />
        <button>Ask</button>
      </form>
      <Questions data={data} />
    </div>
  );
}

export default QAcomp;
