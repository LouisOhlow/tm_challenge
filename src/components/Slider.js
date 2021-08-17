import "./Slider.css";
import { useSpring, animated } from "react-spring";
import { useState, useEffect, useRef } from "react";
import img1 from "../res/images/thinkMoto-slide-1.png";
import img2 from "../res/images/thinkMoto-slide-2.png";
import img3 from "../res/images/thinkMoto-slide-3.png";
import SliderCard from "./SliderCard";
import sliderContent from "../res/content/text";
import arrowLeft from "../res/images/mouse-arrow-left.png";
import arrowRight from "../res/images/mouse-arrow-right.png";

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

function Slider() {
  const [counter, setCounter] = useState(1);
  const [counter2, setCounter2] = useState(2);
  const [counter3, setCounter3] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mouseHovers, setMouseHovers] = useState(1);
  const [arrowPos, setArrowPos] = useState(0);
  const [arrowImage, setArrowImage] = useState(arrowLeft);

  useInterval(() => {
    setCounter(moveCalculation(counter));
    setCounter3(moveCalculation(counter3));
    setCounter2(moveCalculation(counter2));
  }, 800000000);
  const screen = Screen;

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

  const arrow = useSpring({
    to: [
      {
        opacity: mouseHovers,
        height: 90 * mouseHovers,
        width: 90 * mouseHovers,
        left: mousePos.x + arrowPos,
        top: mousePos.y - 220,
      },
    ],
  });

  const moveCalculation = (pos) => (pos + 1) % 3;

  return (
    <div
      className="Slider"
      onMouseMove={(e) => {
        setMousePos({ x: e.screenX, y: e.screenY });
      }}
    >
      <animated.img
        style={arrow}
        src={arrowImage}
        className="mousePos"
        onMouseEnter={() => {
          setMouseHovers(1);
        }}
        onMouseOut={() => setMouseHovers(0)}
      />
      <div className="slider-section">
        <div className="slider-imageBox">
          <div
            className="homeSlider-prev"
            onMouseEnter={() => {
              setMouseHovers(1);
              setArrowPos(-10);
              setArrowImage(arrowLeft);
            }}
            onMouseOut={() => setMouseHovers(0)}
            onClick={() => {
              setCounter(moveCalculation(counter + 1));
              setCounter3(moveCalculation(counter3 + 1));
              setCounter2(moveCalculation(counter2 + 1));
            }}
          />
          <ul className="imgBox">
            <animated.img
              id="img3"
              src={img3}
              style={move2}
              className="slide-img"
            />
            <animated.img
              id="img1"
              src={img1}
              style={move3}
              className="slide-img"
            />
            <animated.img
              id="img2"
              src={img2}
              style={move}
              className="slide-img"
            />
          </ul>
        </div>
        <div className="slider-textBox">
          <div
            className="homeSlider-next"
            onMouseEnter={() => {
              setMouseHovers(1);
              setArrowPos(-70);
              setArrowImage(arrowRight);
            }}
            onMouseOut={() => setMouseHovers(0)}
            onClick={() => {
              setCounter(moveCalculation(counter));
              setCounter3(moveCalculation(counter3));
              setCounter2(moveCalculation(counter2));
            }}
          />
          <ul className="txtBox">
            <animated.p style={move5} className="slide-txt">
              <SliderCard
                headline={sliderContent[2].headline}
                description={sliderContent[2].description}
              />
            </animated.p>
            <animated.p style={move6} className="slide-txt">
              <SliderCard
                headline={sliderContent[0].headline}
                description={sliderContent[0].description}
              />
            </animated.p>
            <animated.p style={move4} className="slide-txt">
              <SliderCard
                headline={sliderContent[1].headline}
                description={sliderContent[1].description}
              />
            </animated.p>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Slider;
