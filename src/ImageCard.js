import "./Carousel.css";
import React from "react";
import placeHolder from "./res/thinkMoto-slide-1.png";
import { getFilter } from "./imageFilter";

class ImageCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: placeHolder,
      canvasHasLoaded: false,
    };
  }
  async componentDidMount() {
    this.imageToCanvas(this.props.imageUrl);
    this.setState({
      canvasHasLoaded: true,
    });
  }

  componentDidUpdate() {
    this.imageToCanvas(this.props.imageUrl);
    this.applyFilter();
  }

  applyFilter = () => {
    const context = this.canvasRef.getContext("2d");
    const { filterType } = this.props;
    console.log(filterType);

    switch (filterType) {
      case "blur":
        context.filter = "blur(4px)";
        break;
      case "sepia":
        context.filter = "sepia(1)";
        break;
      case "blackWhite":
        context.filter = "grayscale(100%)";
        break;
      default:
    }
  };

  imageToCanvas = async (imageUrl) => {
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
    };
    context.filter = "blue(4px)";
  };

  render() {
    const { imageUrl } = this.state;

    return (
      <div className="imageCard-container">
        <div className="carousel">
          <canvas
            className="canvas"
            ref={(canvasRef) => (this.canvasRef = canvasRef)}
            width={256}
            height={256}
          />
        </div>
        <div
          className="downloadButton"
          onClick={() => {
            this.applyFilter();
          }}
        >
          <h3>LOL</h3>
        </div>
      </div>
    );
  }
}

export default ImageCard;
