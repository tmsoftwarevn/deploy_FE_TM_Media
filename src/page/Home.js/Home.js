import "../../scss/home.scss";
import "../../scss/bannerHeader.scss";

import { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";

import CountUp from "react-countup";
import LazyLoad from "react-lazyload";
import LienHe from "../lien he/LienHe";

import { callActive_menu, callDetailTrangchu } from "../../service/api";
import Video from "../../component/video/Video";
import BannerHeader from "../bannerHeader";
import { Helmet } from "react-helmet-stuff";
import SlideBaiviet from "../bai viet/slideBaiviet";

import { motion } from "framer-motion";

const Home = () => {
  const [isShowVideo, handleSetVideo, setIsLoading] = useOutletContext();
  const [activeMenu, setActiveMenu] = useState([]);
  const [mediaHome, setMediaHome] = useState({});

  const targetDivRef = useRef(null);

  // Function to handle the scroll event
  const scrollToDiv = () => {
    if (targetDivRef.current) {
      // Scroll to the target div
      targetDivRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const fetch_mediaHome = async () => {
    const res = await callDetailTrangchu();
    if (res && res.EC === 1) {
      setMediaHome(res.data);

      setTimeout(() => {
        setIsLoading(false);
      }, 500);
      //setIsLoading(false);
    }
  };

  const fetch_ActiveMenu = async () => {
    const res = await callActive_menu();
    if (res && res.EC === 1) {
      setActiveMenu(res.data);
    }
  };

  useEffect(() => {
    fetch_mediaHome();
    fetch_ActiveMenu();
  }, []);

  return (
    <>
      <Helmet defer={false}>
        <title>{process.env.REACT_APP_TITLE_TRANGCHU}</title>
        <meta name="description" content={mediaHome?.meta_des} />
        <meta name="keywords" content={mediaHome?.key_word} />
        <meta
          property="og:title"
          content={process.env.REACT_APP_TITLE_TRANGCHU}
        />
        <meta property="og:description" content={mediaHome?.meta_des} />
      </Helmet>

      <div className="home">
        <BannerHeader media={mediaHome} handleSetVideo={handleSetVideo} />
        <motion.section
          id="gt-6978"
          initial={{ y: 200, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "tween", duration: 1 }}
        >
          <div className="container">
            <div className="row">
              <div className="col-md-6 thong-tin">
                <p className="thong-tin_title">TM MEDIA – VIDEO MARKETING</p>
                <div className="thong-tin_des">
                  <div
                    dangerouslySetInnerHTML={{ __html: mediaHome.mota_cty }}
                  ></div>
                </div>

                <div className="thong-tin_btn" onClick={scrollToDiv}>
                  Liên hệ ngay
                </div>
              </div>
              <div className="col-md-6 thuonghieu">
                <LazyLoad height={400}>
                  <img
                    src={`${process.env.REACT_APP_BACKEND_URL}/images/banner/${mediaHome.thuonghieu}`}
                    alt=""
                  />
                </LazyLoad>
                <p
                  className="mt-2"
                  style={{ textTransform: "uppercase", fontSize: "16px" }}
                >
                  Các thương hiệu đã hợp tác
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          id="tk-5234"
          initial={{ y: 200, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="bg-tk">
            <img
              src={`${process.env.REACT_APP_BACKEND_URL}/images/banner/${mediaHome?.bg_thongke}`}
              alt=""
            />
          </div>
          <div className="overlay"></div>
          <div className="thong-ke">
            <div className="container">
              <div className="row">
                <div className="col-md-4 ">
                  <p>
                    {/* +<CountUp enableScrollSpy end={95} /> % DỰ ÁN HIỆU QUẢ */}
                    {mediaHome.s1}
                  </p>
                  <p>
                    {/* Hơn <CountUp enableScrollSpy end={95} /> Khách Hàng phản hồi
                    hài lòng dịch vụ của chúng tôi. */}
                    {mediaHome.t1}
                  </p>
                </div>
                <div className="col-md-4">
                  <p>
                    {/* <CountUp enableScrollSpy end={3000} />+ DỰ ÁN VIDEO */}
                    {mediaHome.s2}
                  </p>
                  <p>
                    {/* Hơn <CountUp enableScrollSpy end={3000} /> Video được thực
                    hiện Rất nhiều BST hình ảnh xuất bản. */}
                    {mediaHome.t2}
                  </p>
                </div>
                <div className="col-md-4">
                  <p>
                    {/* <CountUp enableScrollSpy end={12} />+ NĂM KINH NGHIỆP */}
                    {mediaHome.s3}
                  </p>
                  <p>
                    {/* Chúng tôi tự tin mang lại cho bạn những sản phẩm hiệu quả. */}
                    {mediaHome.t3}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {activeMenu &&
          activeMenu.map((item) => {
            return (
              <Video
                name={item}
                isShowVideo={isShowVideo}
                handleSetVideo={handleSetVideo}
              />
            );
          })}

        <SlideBaiviet setIsLoading={setIsLoading} />

        <div ref={targetDivRef}></div>
        <LienHe />
      </div>
    </>
  );
};

export default Home;
