import { Modal } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAnswers, addRate } from "../store/questionSlice";

function Questions({ data }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [answer, setAnswer] = useState("");
  const [answerObj, setAnswerObj] = useState({});

  let dispatch = useDispatch();

  let answersData = useSelector((state) => state.questions.answers);

  const handleChange = (e) => {
    setAnswer(e.target.value);
  };

  const showModal = (e) => {
    setAnswerObj({ id: e.id, question: e.question });
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (e, data) => {
    e.preventDefault();
    const newAnswer = {
      id: data.id,
      question: data.question,
      answer: answer,
    };
    dispatch(addAnswers(newAnswer));
    setIsModalOpen(false);
    setAnswer("");
  };

  const handleRate = (e) => {
    dispatch(addRate(e));
  };

  return (
    <div className="questions">
      {data &&
        data.map((e) => (
          <div className="questions-container" key={e.id}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <p style={{ opacity: ".6" }}>question:</p>
                <h4>{e.question}</h4>
              </div>
              <div>
                <i
                  className="fa-solid fa-caret-up"
                  style={{ marginRight: "10px", cursor: "pointer" }}
                  onClick={() => handleRate(e)}
                ></i>
                <span style={{ userSelect: "none" }}>{e.rate}</span>
              </div>
            </div>
            <div>
              <button className="answerBtn" onClick={() => showModal(e)}>
                Answer
              </button>
              <button className="editBtn">Edit</button>
              {answersData.length &&
                React.Children.toArray(
                  answersData.map(
                    (ans) =>
                      ans.id === e.id && (
                        <div className="answers">
                          <p style={{ opacity: ".6" }}>answered by someone:</p>
                          <h3>{ans.answer}</h3>
                        </div>
                      )
                  )
                )}
              <Modal
                title="Answers & Questions (Q&A)"
                open={isModalOpen}
                footer={null}
                okText="Answer away"
                onCancel={handleCancel}
              >
                <form onSubmit={(e) => handleSubmit(e, answerObj)}>
                  <input
                    type="text"
                    placeholder="Type your answer here"
                    className="answerInput"
                    onChange={handleChange}
                    value={answer}
                    required
                  />
                  <button className="answerBtn">Answer</button>
                </form>
              </Modal>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Questions;
