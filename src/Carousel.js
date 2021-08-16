import "./Carousel.css";
import React from "react";
import placeHolder from "./res/thinkMoto-slide-1.png";
import ImageCard from "./ImageCard";

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageFile: placeHolder,
    };
  }

  componentDidMount() {
    const context = this.canvasA.getContext("2d");

    const image = new Image();
    image.src = placeHolder;
    image.onload = () => {
      context.drawImage(image, 0, 0, this.canvasA.width, this.canvasA.height);
    };
  }

  manipulateImage = () => {
    const context = this.canvasA.getContext("2d");
    const imgData = context.getImageData(0, 0, 1024, 1024);
    const data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
      const red = data[i];
      const green = data[i + 1];
      const blue = data[i + 2];
      const alpha = data[i + 3];

      data[i] = 50;
    }
    context.putImageData(imgData, 0, 0);

    // var canvas = document.getElementById("canvas");
    // var url = canvas.toDataURL("image/png");
    // const image = new Image();
    // image.src = url;
    // this.setState({ imageFile: url });
  };

  handleUpload = (event) => {
    this.setState({
      imageFile: URL.createObjectURL(event.target.files[0]),
    });

    const context = this.canvasA.getContext("2d");

    const image = new Image();
    image.src = URL.createObjectURL(event.target.files[0]);
    image.onload = () => {
      context.drawImage(image, 0, 0, this.canvasA.width, this.canvasA.height);
    };
    console.log(URL.createObjectURL(event.target.files[0]));
  };

  download = () => {
    var canvas = document.getElementById("canvas");
    var url = canvas.toDataURL("image/png");
    const image = new Image();
    image.src = url;
    this.setState({ imageFile: image });
    var link = document.createElement("a");
    link.download = "filename.png";
    link.href = url;
    link.click();
  };

  render() {
    const { imageFile } = this.state;
    return (
      <div className="carousel-container">
        <div className="carousel">
          <ImageCard imageUrl={imageFile} filterType="blackWhite" />
          <ImageCard imageUrl={imageFile} filterType="none" />
          <ImageCard imageUrl={imageFile} filterType="sepia" />
          <ImageCard imageUrl={imageFile} filterType="blur" />
          <canvas
            id="canvas"
            ref={(canvasA) => (this.canvasA = canvasA)}
            width={1024}
            height={1024}
          />
        </div>
        <div className="buttons">
          <div className="uploadButton">
            <input type="file" onChange={this.handleUpload} />
          </div>
          <div className="downloadButton">
            <a href={imageFile} download>
              DOWNLOAD
            </a>
          </div>
          <div
            className="downloadButton"
            onClick={() => {
              this.manipulateImage();
            }}
          >
            <h3>EDIT IMAGE</h3>
          </div>
          <div
            className="downloadButton"
            onClick={() => {
              this.download();
            }}
          >
            <h3>DOWNLOAD!</h3>
          </div>
        </div>
      </div>
    );
  }
}

export default Carousel;
