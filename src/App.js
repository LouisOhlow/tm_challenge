import "./App.css";
import { useSpring, animated } from "react-spring";
import { useState, useEffect, useRef } from "react";

function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    let id = setInterval(() => {
      savedCallback.current();
    }, delay);
    return () => clearInterval(id);
  }, [delay]);
}

function App() {
  const [counter, setCounter] = useState(1);
  const [counter2, setCounter2] = useState(2);
  const [counter3, setCounter3] = useState(0);

  useInterval(() => {
    setCounter((counter + 1) % 3);
    console.log(counter);
  }, 1000000);

  const formula1 = 60 * (2 - counter) - 60;
  const formula2 = 60 * ((2 - counter2) % 2) - 60;
  const formula3 = 60 * (2 - ((2 - counter3) % 2)) - 60;

  const move = useSpring({
    to: [{ left: `${formula1}vw` }],
  });

  const move2 = useSpring({
    to: [{ left: `${formula2}vw` }],
  });

  const move3 = useSpring({
    to: [{ left: `${formula3}vw` }],
  });

  const moveCalculation = (pos) => (pos + 1) % 3;

  return (
    <div className="App">
      <div className="slider-section">
        <div
          className="slider-imageBox"
          onClick={() => {
            setCounter(moveCalculation(counter + 1));
            setCounter3(moveCalculation(counter3 + 1));
            setCounter2(moveCalculation(counter2 + 1));
          }}
        >
          <ul className="tempBox">
            <animated.li style={move2} className="slide-elem-1"></animated.li>
            <animated.li style={move3} className="slide-elem-2"></animated.li>
            <animated.li style={move} className="slide-elem-3"></animated.li>
          </ul>
        </div>
        <div
          className="slider-textBox"
          onClick={() => {
            setCounter(moveCalculation(counter));
            setCounter3(moveCalculation(counter3));
            setCounter2(moveCalculation(counter2));
          }}
        ></div>
      </div>
    </div>
  );
}

export default App;
