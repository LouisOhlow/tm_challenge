import "./Carousel.css";
import React from "react";
import placeHolder from "./res/thinkMoto-slide-1.png";
import { getFilter } from "./imageFilter";
import { connect } from "react-redux";
import { setImage } from "./actions/images";

class ImageCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageUrl: null,
    };
  }

  async componentDidMount() {
    await this.drawImageToCanvas(placeHolder);
    const url = this.applyFilter();
    this.setState({
      imageUrl: url,
    });
  }

  async componentDidUpdate(previousProps, previousState) {
    await this.drawImageToCanvas(this.props.imageUrl);
    const url = this.applyFilter();

    if (previousProps.imageUrl !== this.props.imageUrl) {
      this.setState({ imageUrl: url });
    }
  }

  drawImageToCanvas = async (imageUrl) => {
    const canvas = this.canvasRef;
    const context = canvas.getContext("2d");
    const image = await this.imageProcess(imageUrl);

    context.drawImage(image, 0, 0, this.canvasRef.width, this.canvasRef.height);
  };

  imageProcess = (imageUrl) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => resolve(img);
      img.onerror = reject;
    });
  };

  applyFilter = () => {
    const { filterType } = this.props;
    const canvas = this.canvasRef;

    const context = canvas.getContext("2d");
    const imgData = context.getImageData(0, 0, 1024, 1024);
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
    const imageUrl = this.state.imageUrl;

    return (
      <div className="imageCard-container">
        <div className="carousel">
          <img className="carousel-image" src={imageUrl} alt="uploadedImage" />
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

const mapDispatchToProps = (dispatch) => ({
  setImage: (image, index) => dispatch(setImage(image, index)),
});

export default connect(null, mapDispatchToProps)(ImageCard);
