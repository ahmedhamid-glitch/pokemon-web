import React, { useEffect, useState } from "react";
import mcq from "./Api";
const Mcq = () => {
  const [questions, setQuestions] = useState([]);
  const [result, setResult] = useState("");

  useEffect(() => {
    setQuestions(mcq);
  }, []);

  const handleChange = ({ questionIndex, userValue }) => {
    const newArrData = [...questions];
    console.log(questions);
    newArrData[questionIndex].selected = userValue;
    setQuestions([...newArrData]);
  };

  const handleBtn = () => {
    const correctAnswer = questions.filter(
      ({ answer, selected }) => answer === selected
    ).length;

    setResult(
      `Correct Answer ${correctAnswer} Correct Length ${questions.length}`
    );
  };

  return (
    <section className="container">
      <ul>
        {questions.map(({ id, quiz, objective, selected }, questionIndex) => {
          return (
            <>
              <h1>{(id = quiz)} </h1>
              <ul>
                {objective.map((item) => {
                  return (
                    <>
                      <label>
                        <input
                          type="radio"
                          value={item}
                          checked={item === selected}
                          onChange={(e) => {
                            handleChange({
                              questionIndex,
                              userValue: e.target.value,
                            });
                          }}
                        />
                        {item}
                      </label>
                    </>
                  );
                })}
              </ul>
            </>
          );
        })}
        <button onClick={handleBtn}>Submit</button>
        <h2>{result}</h2>
      </ul>
    </section>
  );
};

export default Mcq;
