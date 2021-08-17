import "./Carousel.css";
import React from "react";
import { getFilter } from "./imageFilter";
import { connect } from "react-redux";
import { setImage } from "../actions/images";

class ImageCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageUrl: null,
      height: 800,
      width: 800,
    };
  }

  async componentDidMount() {
    const image = await this.imageProcess(this.props.imageUrl);
    await this.drawImageToCanvas(image);
    const url = this.applyFilter(image.height, image.width);
    this.setState({
      height: image.height,
      width: image.widtht,
      imageUrl: url,
    });
  }

  async componentDidUpdate(previousProps, previousState) {
    const image = await this.imageProcess(this.props.imageUrl);
    await this.drawImageToCanvas(image);
    const url = this.applyFilter(image.height, image.width);
    if (previousProps.imageUrl !== this.props.imageUrl) {
      this.setState({
        height: image.height,
        width: image.width,
        imageUrl: url,
      });
    }
  }

  drawImageToCanvas = (image) => {
    const canvas = this.canvasRef;
    canvas.width = image.width;
    canvas.height = image.height;

    const context = canvas.getContext("2d");

    context.clearRect(0, 0, image.width, image.height);
    context.drawImage(image, 0, 0, image.width, image.height);
    return image;
  };

  imageProcess = (imageUrl) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => resolve(img);
      img.onerror = reject;
    });
  };

  applyFilter = (height, width) => {
    const { filterType } = this.props;
    const canvas = this.canvasRef;

    const context = canvas.getContext("2d");
    const imgData = context.getImageData(0, 0, width, height);
    const data = imgData.data;
    const pixelArray = getFilter(data, filterType);
    for (let i = 0; i < data.length; i += 1) {
      data[i] = pixelArray[i];
    }
    context.putImageData(imgData, 0, 0);
    const url = canvas.toDataURL(`${filterType}Image/png`);
    this.props.setImage(url, this.props.index);
    return url;
  };

  render() {
    const { imageUrl, height, width } = this.state;

    return (
      <div className="imageCard-container">
        <div className="carousel">
          <img className="carousel-image" src={imageUrl} alt="uploadedImage" />
          <canvas
            className="canvas"
            ref={(canvasRef) => (this.canvasRef = canvasRef)}
            width={width}
            height={height}
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setImage: (image, index) => dispatch(setImage(image, index)),
});

export default connect(null, mapDispatchToProps)(ImageCard);
