import "../../scss/lienhe.scss";
import iconname from "../../assets/icon-name.png";
import iconphone from "../../assets/icon-phone.png";
import iconemail from "../../assets/icon-email.png";
import { useEffect, useState } from "react";
import { IoCall } from "react-icons/io5";
import { callAddLienhe, callDetailTrangchu, callSendMail } from "../../service/api";
import { message } from "antd";
import { Helmet } from "react-helmet";
import { useLocation, useOutletContext } from "react-router-dom";
import BannerHeader from "../bannerHeader";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const LienHe = () => {
  const [isShowVideo, handleSetVideo, setIsLoading] = useOutletContext();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [noidung, setNoidung] = useState("");
  const location = useLocation();

  const [mediaHome, setMediaHome] = useState({});
  const [loadingTest, setTest] = useState(true);

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
  useEffect(() => {
    fetch_mediaHome();
  }, []);

  const handleSaveForm = async (e) => {
    e.preventDefault();

    const res = await callAddLienhe(name, phone, email, noidung);
    const m = await callSendMail(email, name, phone, noidung)
    if (res && res.EC === 1) {
      // message.success("Cảm ơn bạn đã liên hệ với TM Media");
      Swal.fire({
        title: "Đã xác nhận!",
        text: "Cảm ơn bạn đã liên hệ với TM Media!",
        icon: "success",
      });
      setName("");
      setEmail("");
      setPhone("");
      setNoidung("");
    } else {
      message.error("Vui lòng thử lại !");
    }
  };

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

      {location.pathname === "/lien-he" && (
        <BannerHeader media={mediaHome} handleSetVideo={handleSetVideo} />
      )}

      <motion.div
        className="lienhe"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{once: true}}
      >
        <div className="lienhe_title">
          <p></p> Đăng ký tư vấn <p></p>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="lienhe_left">
                <div className="anh">
                  <img
                    src={`${process.env.REACT_APP_BACKEND_URL}/images/banner/${mediaHome.logo}`}
                    alt="logo"
                  />
                </div>

                <p>
                  <span>Văn phòng: </span>Sky9 Số 61, Đường số 1, Phường Phú
                  Hữu, TP.Thủ Đức, Ho Chi Minh City, Vietnam
                </p>
                <p>
                  <span>Hotline: </span>
                  {process.env.REACT_APP_PHONE}
                </p>
                <p>
                  <span>Email: </span>mr.haidesign@gmail.com
                </p>
                <p
                  className="web"
                  onClick={() =>
                    window.open("https://tmbranding.vn/", "_blank")
                  }
                >
                  <span>Website: </span>tmbranding.vn
                </p>
              </div>
              <div
                className="lienhe_left_tuvan"
                onClick={() => {
                  window.open("tel:" + process.env.REACT_APP_PHONE);
                }}
              >
                <IoCall style={{ marginRight: "5px" }} />
                tư vấn ngay
              </div>
            </div>
            <div className="col-md-6">
              <div className="lienhe_right">
                <form onSubmit={handleSaveForm}>
                  <div className="custom-input">
                    <img src={iconname} />
                    <input
                      type="text"
                      required
                      placeholder="Họ và tên"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                    />
                  </div>
                  <div className="custom-input">
                    <img src={iconphone} />
                    <input
                      type="tel"
                      required
                      placeholder="Số điện thoại"
                      pattern="(03|05|07|08|09)[0-9]{8}"
                      onChange={(e) => setPhone(e.target.value)}
                      value={phone}
                    />
                  </div>
                  <div className="custom-input">
                    <img src={iconemail} />
                    <input
                      type="email"
                      required
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                  </div>
                  <textarea
                    onChange={(e) => setNoidung(e.target.value)}
                    rows={10}
                    placeholder="Nội dung"
                    value={noidung}
                  ></textarea>
                  <div className="btn-lienhe">
                    <button type="submit" className="btn-lh">
                      Gửi liên hệ
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="bando">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.093105813445!2d106.78851607405382!3d10.804180789346265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175299e2905e89f%3A0x56753105cfc85bb2!2zVE0gQnJhbmRpbmcgLSBUaGnhur90IGvhur8gJiBUcnV54buBbiB0aMO0bmc!5e0!3m2!1svi!2s!4v1706087870820!5m2!1svi!2s"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </motion.div>
    </>
  );
};

export default LienHe;
