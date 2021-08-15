import "./App.css";
import { useSpring, animated } from "react-spring";
import { useState, useEffect, useRef } from "react";
import img1 from "./res/thinkMoto-slide-1.png";
import img2 from "./res/thinkMoto-slide-2.png";
import img3 from "./res/thinkMoto-slide-3.png";

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
    setCounter(moveCalculation(counter));
    setCounter3(moveCalculation(counter3));
    setCounter2(moveCalculation(counter2));
  }, 5000);

  const formula1 = 60 * (2 - counter) - 60;
  const formula2 = 60 * ((2 - counter2) % 2) - 60;
  const formula3 = 60 * (2 - ((2 - counter3) % 2)) - 60;

  const txtForm1 = 40 * (2 - counter) - 40;
  const txtForm2 = 40 * ((2 - counter2) % 2) - 40;
  const txtForm3 = 40 * (2 - ((2 - counter3) % 2)) - 40;

  const move = useSpring({
    to: [{ left: `${formula1}vw` }],
  });
  const move2 = useSpring({
    to: [{ left: `${formula2}vw` }],
  });
  const move3 = useSpring({
    to: [{ left: `${formula3}vw` }],
  });

  const move4 = useSpring({
    to: [{ left: `${txtForm1}vw` }],
  });
  const move5 = useSpring({
    to: [{ left: `${txtForm2}vw` }],
  });
  const move6 = useSpring({
    to: [{ left: `${txtForm3}vw` }],
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
          <ul className="imgBox">
            <animated.img
              id="img3"
              src={img3}
              style={move2}
              className="slide-img"
            ></animated.img>
            <animated.img
              id="img1"
              src={img1}
              style={move3}
              className="slide-img"
            ></animated.img>
            <animated.img
              id="img2"
              src={img2}
              style={move}
              className="slide-img"
            ></animated.img>
          </ul>
        </div>
        <div
          className="slider-textBox"
          onClick={() => {
            setCounter(moveCalculation(counter));
            setCounter3(moveCalculation(counter3));
            setCounter2(moveCalculation(counter2));
          }}
        >
          <ul className="txtBox">
            <animated.p style={move5} className="slide-txt">
              Hallo 1
            </animated.p>
            <animated.p style={move6} className="slide-txt">
              Hallo 2
            </animated.p>
            <animated.p style={move4} className="slide-txt">
              Hallo 3
            </animated.p>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
