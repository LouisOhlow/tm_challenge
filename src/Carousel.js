import "./Carousel.css";
import React from "react";
import placeHolder from "./res/thinkMoto-slide-1.png";
import ImageCard from "./ImageCard";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Virtual, Pagination, EffectCoverflow } from "swiper";
import { connect } from "react-redux";

import "swiper/swiper.min.css";
import "swiper/components/effect-coverflow/effect-coverflow.min.css";
import "swiper/components/pagination/pagination.min.css";

SwiperCore.use([Virtual, Pagination, EffectCoverflow]);

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
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          loop
          pagination={true}
          className="swiper-container"
        >
          <SwiperSlide id="slider1" className="swiper-slide">
            <ImageCard
              className="swiper-slide-image"
              imageUrl={imageFile}
              filterType="none"
              index={0}
            />
          </SwiperSlide>
          <SwiperSlide id="slider2" className="swiper-slide">
            <ImageCard
              className="swiper-slide-image"
              imageUrl={imageFile}
              filterType="noRed"
              index={1}
            />
          </SwiperSlide>
          <SwiperSlide id="slider3" className="swiper-slide">
            <ImageCard
              className="swiper-slide-image"
              imageUrl={imageFile}
              filterType="noGreen"
              index={2}
            />
          </SwiperSlide>
          <SwiperSlide id="slider4" className="swiper-slide">
            <ImageCard
              className="swiper-slide-image"
              imageUrl={imageFile}
              filterType="blackWhite"
              index={3}
            />
          </SwiperSlide>
        </Swiper>
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
