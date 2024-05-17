import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import LazyLoad from "react-lazyload";
import "../../scss/slide_video.scss";
import { callGetVideoNoibat_byid } from "../../service/api";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const responsive = {
  md: {
    breakpoint: { max: 3000, min: 769 },
    items: 3,
  },
  sm: {
    breakpoint: { max: 768, min: 577 },
    items: 2,
  },
  xs: {
    breakpoint: { max: 576, min: 0 },
    items: 1,
  },
};

const Video = (props) => {
  const { isShowVideo, handleSetVideo, name } = props;
  const [listVideo, setListVideo] = useState([]);

  const fetchVideo_byIdmenu = async () => {
    let res = await callGetVideoNoibat_byid(name?.id);
    if (res && res.EC === 1) {
      setListVideo(res.data);
    }
  };
  useEffect(() => {
    fetchVideo_byIdmenu();
  }, [name?.id]);

  if (listVideo[0]?.name) {
    // check list có phần tử nào ko
    return (
      <motion.div
        className="media"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="container">
          <div
            className="media_title"
            //   initial={{ y: -400, opacity: 0.2 }}
            //   whileInView={{ y: 0, opacity: 1 }}
            //   transition={{ type: "tween" }}
            //  viewport={{ once: true }}
          >
            <p></p> {name.title_menu ? name.title_menu : name.name} <p></p>
          </div>
          <div className="media_carousel">
            <Carousel
              responsive={responsive}
              itemClass="carousel-item-padding-40-px"
              focusOnSelect={false}
              draggable={false} // ko kéo
              swipeable={false} // vuốt
              partialVisbile={false}
              infinite={true}
              autoPlay={true}
            >
              {listVideo.length > 0 &&
                listVideo.map((item) => {
                  return (
                    <div>
                      <div
                        className="media_carousel_group"
                        onClick={() => handleSetVideo(true, item.link)}
                      >
                        <LazyLoad height={400} once offset={200}>
                          <img
                            src={`${process.env.REACT_APP_BACKEND_URL}/images/banner/${item?.video_bg}`}
                            alt=""
                          />
                        </LazyLoad>

                        <div className="glightbox_video">
                          <svg
                            viewBox="0 0 131 131"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              className="inner-circle"
                              d="M65 21C40.1488 21 20 41.1488 20 66C20 90.8512 40.1488 111 65 111C89.8512 111 110 90.8512 110 66C110 41.1488 89.8512 21 65 21Z"
                              fill="white"
                            ></path>
                            <circle
                              className="outer_circle"
                              cx="65.5"
                              cy="65.5"
                              r="64"
                              stroke="white"
                            ></circle>
                            <path
                              className="play"
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M60 76V57L77 66.7774L60 76Z"
                              fill="#BF2428"
                            ></path>
                          </svg>
                        </div>
                      </div>

                      <p>{item.name}</p>
                    </div>
                  );
                })}
            </Carousel>
          </div>
        </div>
      </motion.div>
    );
  }
  return <></>;
};

export default Video;
