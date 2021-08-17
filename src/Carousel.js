import "./Carousel.css";
import React from "react";
import placeHolder from "./res/thinkMoto-slide-1.png";
import ImageCard from "./ImageCard";
import { connect } from "react-redux";

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageFile: placeHolder,
    };
  }

  handleUpload = (event) => {
    this.setState({
      imageFile: URL.createObjectURL(event.target.files[0]),
    });
  };

  download = () => {
    const { images } = this.props;
    const url = images[1];
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
          <ImageCard imageUrl={imageFile} filterType="none" index={0} />
          <ImageCard imageUrl={imageFile} filterType="noRed" index={1} />
          <ImageCard imageUrl={imageFile} filterType="noGreen" index={2} />
          <ImageCard imageUrl={imageFile} filterType="blackWhite" index={3} />
          <canvas
            id="canvass"
            ref={(canvasA) => (this.canvasA = canvasA)}
            width={1024}
            height={1024}
          />
        </div>
        <div className="buttons">
          <div className="uploadButton">
            <input type="file" onChange={this.handleUpload} />
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

const mapStateToProps = (state) => ({
  images: state.imageRed.images,
});

export default connect(mapStateToProps)(Carousel);
