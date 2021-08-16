import "./Carousel.css";
import React from "react";
import placeHolder from "./res/thinkMoto-slide-1.png";
import { getFilter } from "./imageFilter";
import { thisTimeValue } from "es-abstract";

class ImageCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageUrl: placeHolder,
      drawnImage: false,
    };
  }
  componentDidMount() {
    this.drawImageToCanvas(placeHolder);
  }

  //   componentDidUpdate() {
  //     this.drawImageToCanvas(placeHolder);
  //   }

  drawImageToCanvas = (imageUrl) => {
    const context = this.canvasRef.getContext("2d");
    const image = new Image();
    image.src = imageUrl;
    image.onload = () => {
      context.drawImage(
        image,
        0,
        0,
        this.canvasRef.width,
        this.canvasRef.height
      );
      this.applyFilter();
    };
  };

  applyFilter = () => {
    const { filterType } = this.props;
    const context = this.canvasRef.getContext("2d");
    const imgData = context.getImageData(0, 0, 256, 256);
    const data = imgData.data;
    const pixelArray = getFilter(data, filterType);
    for (let i = 0; i < data.length; i += 1) {
      data[i] = pixelArray[i];
    }
    context.putImageData(imgData, 0, 0);
    var canvas = this.canvasRef;
    this.setState({ imageUrl: canvas.toDataURL(`${filterType}Image/png`) });
  };

  getImageFromCanvas = () => {
    const { filterType } = this.props;
    var canvas = document.getElementById("canvas");
    if (canvas) {
      return canvas.toDataURL(`${filterType}Image/png`);
    } else return null;
  };

  render() {
    const { imageUrl, drawnImage } = this.state;
    const canvasUrl = imageUrl;

    return (
      <div className="imageCard-container">
        <div className="carousel">
          <img className="carousel-image" src={canvasUrl} alt="uploadedImage" />
          <canvas
            className="canvas"
            ref={(canvasRef) => (this.canvasRef = canvasRef)}
            width={256}
            height={256}
          />
        </div>
      </div>
    );
  }
}

export default ImageCard;
