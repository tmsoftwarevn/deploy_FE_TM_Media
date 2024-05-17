import "../../scss/footer.scss";

import { MdKeyboardArrowRight, MdLocationOn } from "react-icons/md";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoCall } from "react-icons/io5";
import { IoMdMail } from "react-icons/io";
import { BiWorld } from "react-icons/bi";
import { callMenu_byid } from "../../service/api";
import { convertSlug } from "../../utils/convertSlug";

import { FaFacebookF } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import chungnhan from "../../assets/chungnhan.jpg";

const Footer = () => {
  const [menu_video, setMenu_video] = useState([]);
  const [menu_chupanh, setMenu_chupanh] = useState([]);
  const [menu_xaykenh, setMenu_xaykenh] = useState([]);
  const navigate = useNavigate();

  const fetch_getMenu = async () => {
    //1: video, 2: chup anh, 3: xay kenh
    let video = await callMenu_byid(1);

    if (video && video.EC === 1) {
      setMenu_video(video.data);
    }

    let chupanh = await callMenu_byid(2);

    if (chupanh && chupanh.EC === 1) {
      setMenu_chupanh(chupanh.data);
    }

    let xaykenh = await callMenu_byid(3);

    if (xaykenh && xaykenh.EC === 1) {
      setMenu_xaykenh(xaykenh.data);
    }
  };
  useEffect(() => {
    fetch_getMenu();
  }, []);

  return (
    <footer className="footer">
      <div className="container">
        {/* // info  */}
        <div className="row">
          <div class="footer-col col-md-3">
            <h4>Liên hệ</h4>
            <ul className="ul-ft">
              <li>
                <MdLocationOn
                  style={{
                    marginRight: "8px",
                    fontSize: "18px",
                    marginBottom: "3px",
                  }}
                />
                Sky9 Số 61, Đường số 1, Phường Phú Hữu, TP.Thủ Đức, Ho Chi Minh
                City, Vietnam
              </li>
              <li
                onClick={() => {
                  window.open("tel:" + process.env.REACT_APP_PHONE);
                }}
              >
                <IoCall
                  style={{
                    marginRight: "8px",
                    fontSize: "18px",
                    marginBottom: "3px",
                  }}
                />
                {process.env.REACT_APP_PHONE}
              </li>
              <li
                onClick={() => {
                  window.open("mailto:" + "mr.haidesign@gmail.com");
                }}
              >
                <IoMdMail
                  style={{
                    marginRight: "8px",
                    fontSize: "18px",
                    marginBottom: "3px",
                  }}
                />
                mr.haidesign@gmail.com
              </li>
              <li
                onClick={() => window.open("https://tmbranding.vn/", "_blank")}
              >
                <BiWorld
                  style={{
                    marginRight: "8px",
                    fontSize: "18px",
                    marginBottom: "3px",
                  }}
                />
                tmbranding.vn
              </li>
            </ul>

            {/* /// */}
            <div className="center-icon">
              <div
                className="g-fb"
                onClick={() =>
                  window.open(process.env.REACT_APP_LINK_FACEBOOK, "_blank")
                }
              >
                <FaFacebookF className="fb" />
              </div>

              <div
                className="g-fb"
                onClick={() =>
                  window.open(process.env.REACT_APP_LINK_YOUTUBE, "_blank")
                }
              >
                <FaYoutube className="yt" />
              </div>
              <div
                className="g-fb"
                onClick={() =>
                  window.open(process.env.REACT_APP_LINK_TIKTOK, "_blank")
                }
              >
                <FaTiktok className="tiktok" />
              </div>
              <div
                className="g-fb"
                onClick={() =>
                  window.open(process.env.REACT_APP_URL_ZALO, "_blank")
                }
              >
                <SiZalo className="zalo" />
              </div>
            </div>
          </div>
          <div class="footer-col col-md-3">
            <h4>Sản xuất video</h4>
            <ul className="ul-ft">
              {menu_video.map((item, index) => {
                let name_slug = convertSlug(item.name);
                return (
                  <li
                    key={item.id}
                    onClick={() =>
                      navigate(`/${name_slug}`)
                    }
                  >
                    <MdKeyboardArrowRight  />
                    {item.name}
                  </li>
                );
              })}
            </ul>
          </div>
          <div class="footer-col col-md-3">
            <h4>Chụp ảnh quảng cáo</h4>
            <ul className="ul-ft">
              {menu_chupanh.map((item, index) => {
                let name_slug = convertSlug(item.name);
                return (
                  <li
                    key={item.id}
                    onClick={() =>
                      navigate(`/${name_slug}`)
                    }
                  >
                    <MdKeyboardArrowRight />
                    {item.name}
                  </li>
                );
              })}
            </ul>
            <img
              src={chungnhan}
              style={{cursor: "pointer"}}
              onClick={() =>
                window.open(
                  "https://www.dmca.com/Protection/Status.aspx?id=cc5c8a96-e272-498c-adee-06713b87922e&refurl=https%3a%2f%2ftmmedia.pro%2f&rlo=true",
                 
                )
              }
            />
          </div>
          <div class="footer-col col-md-3">
            <h4>Xây kênh</h4>
            <ul className="ul-ft">
              {menu_xaykenh.map((item, index) => {
                let name_slug = convertSlug(item.name);
                return (
                  <li
                    key={item.id}
                    onClick={() =>
                      navigate(`/${name_slug}`)
                    }
                  >
                    <MdKeyboardArrowRight />
                    {item.name}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <p className="ft-end">
          {" "}
          &copy; All rights reserved. Designed By{" "}
          <span
            className="sp-tm"
            onClick={() => window.open("https://tmsoftware.vn/", "_blank")}
          >
            TM Software
          </span>
        </p>
      </div>
    </footer>
  );
};
export default Footer;
