import { useState } from "react";
import "./Input.css";

const Input = () => {
  const [arrayValue, setArrayValue] = useState([
    {
      firstName: "",
      lastName: "",
    },
  ]);

  const handleForms = () => {
    setArrayValue((prev) => [...prev, { firstName: "", lastName: "" }]);
  };

  const handleChange = (index, Name, value) => {
    const newArray = [...arrayValue];
    newArray[index][Name] = value;

    setArrayValue(newArray);
  };

  const submitBtn = () => {
    // console.log("arrayValue:", arrayValue);
    console.log(
      "arrayValue",
      arrayValue.filter(({ firstName, lastName }) => {
        return firstName !== "" && lastName !== "";
      })
    );
  };

  return (
    <section className="container">
      <button className="fromBtn" onClick={handleForms}>
        Form Submit
      </button>
      <ul className="ul">
        {arrayValue.map((curElem, index) => (
          <li className="li" key={index}>
            <label className="label">
              <input
                className="input"
                name="firstName"
                placeholder="Enter your First Name"
                value={curElem.firstName}
                onChange={(e) =>
                  handleChange(index, "firstName", e.target.value)
                }
              />
            </label>
            <label className="label">
              <input
                className="input"
                name="lastName"
                placeholder="Enter your Last Name"
                value={curElem.lastName}
                onChange={(e) =>
                  handleChange(index, "lastName", e.target.value)
                }
              />
            </label>
          </li>
        ))}

        <button className="submitBtn" onClick={submitBtn}>
          Submit
        </button>
      </ul>
    </section>
  );
};

export default Input;
