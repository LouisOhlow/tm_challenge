import "./Carousel.css";
import React, { useState } from "react";
import placeHolder from "./res/placeholder.png";
import uploadButton from "./res/upload-button.png";
import downloadButton from "./res/download-button.png";
import ImageCard from "./ImageCard";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Virtual, Pagination, EffectCoverflow } from "swiper";
import { connect } from "react-redux";
import { useSpring, animated } from "react-spring";

import "swiper/swiper.min.css";
import "swiper/components/effect-coverflow/effect-coverflow.min.css";
import "swiper/components/pagination/pagination.min.css";

SwiperCore.use([Virtual, Pagination, EffectCoverflow]);

function Carousel({ images }) {
  const [imageFile, setImageFile] = useState(placeHolder);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleUpload = (event) => {
    setImageFile(URL.createObjectURL(event.target.files[0]));
  };

  const download = () => {
    const url = images[activeIndex];
    var link = document.createElement("a");
    link.download = "filename.png";
    link.href = url;
    link.click();
  };

  return (
    <div className="carousel-container">
      <div className="background-design" />
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
          slideShadows: false,
        }}
        loop
        className="swiper-container"
        onSnapIndexChange={(swiper) => {
          setActiveIndex(swiper.activeIndex % 4);
        }}
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
            filterType="negative"
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
      <div class="uploadButton">
        <label for="file-input">
          <img src={uploadButton} alt="upload" class="arrowButton" />
        </label>
        <input id="file-input" type="file" onChange={handleUpload} />
      </div>
      <div className="downloadButton">
        <animated.img
          src={downloadButton}
          alt="downloadbutton"
          class="arrowButton"
          onClick={() => {
            download();
          }}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  images: state.imageRed.images,
});

export default connect(mapStateToProps)(Carousel);
