// first example

const obj = { name: "Alice", age: 25 };
const updateObject = (obj, age, value) => {
  return { ...obj, [age]: value };
};

const updatedObj = updateObject(obj, "age", 30);
console.log(updatedObj);

// updatedObj should be { name: "Alice", age: 26 }

const arr = [
  { id: 1, value: "A" },
  { id: 2, value: "B" },
];

const updateArray = (arr, index, newValue) => {
  return arr.map((curElem, idx) =>
    index === idx ? { ...curElem, ...newValue } : curElem
  );
};

const updatedArr = updateArray(arr, 0, { value: "d" });
console.log(updatedArr);

const arr1 = [
  { id: 1, value: "A" },
  { id: 2, value: null },
  { id: 3, value: "C" },
];

const filterAndMap = (arr, key) => {
  return arr.filter((item) => item[key] != null).map((item) => item["value"]);
};

const result = filterAndMap(arr1, "value");
console.log(result);
