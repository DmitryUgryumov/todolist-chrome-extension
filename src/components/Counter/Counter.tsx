import { useEffect, useState } from "react";
import "./Counter.css";

const Counter = () => {
  const [counter, setCounter] = useState(0);

  return (
    <div className="counter">
      <div className="counter__title">{counter}</div>
      <button onClick={() => setCounter((prev) => prev + 1)}>Plus</button>
      <button onClick={() => setCounter((prev) => prev - 1)}>Minus</button>
    </div>
  );
};

export default Counter;
