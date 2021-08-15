import "./Carousel.css";
import Swiper from "swiper/bundle";
import { useState } from "react";
import placeHolder from "./res/thinkMoto-slide-1.png";

function Carousel() {
  const [imageFile, setImageFile] = useState(placeHolder);
  const swiper = new Swiper();

  const handleUpload = (event) => {
    setImageFile(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <div className="carousel-container">
      <div className="carousel">
        <img className="carousel-image" src={imageFile} alt="uploadedImage" />
        <img className="carousel-image" src={imageFile} alt="uploadedImage" />
        <img className="carousel-image" src={imageFile} alt="uploadedImage" />
      </div>
      <div className="buttons">
        <div className="uploadButton">
          <input type="file" onChange={handleUpload} />
        </div>
        <div className="downloadButton">
          <a href={imageFile} download>
            DOWNLOAD
          </a>
        </div>
      </div>
    </div>
  );
}

export default Carousel;
