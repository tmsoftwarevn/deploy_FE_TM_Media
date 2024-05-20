import { useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import {
  callDetailTrangchu,
  callGetdetail_Baiviet,
  call_up_view_baiviet,
} from "../../service/api";

import "../../scss/baiviet_detail.scss";
import BannerHeader from "../bannerHeader";
import { Helmet } from "react-helmet-stuff";
import moment from "moment";


const BaivietDetail = () => {
  const [isShowVideo, handleSetVideo, setIsLoading] = useOutletContext();
  const navigate = useNavigate();
  const params = useParams();
  
  const [detail, setDetail] = useState("");
  const [mediaHome, setMediaHome] = useState("");
  const currentUrl = window.location.href;

  const fetch_DetialBaiviet = async () => {
    const res = await callGetdetail_Baiviet(params?.slug);
    if (res && res.EC === 1) {
      setDetail(res.data);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };
  const fetch_up_view = async (id) => {
    let up_view = await call_up_view_baiviet(id);
  };
  useEffect(() => {
    fetch_up_view(detail?.id);
  }, [detail]);

  const fetch_mediaHome = async () => {
    const res = await callDetailTrangchu();
    if (res && res.EC === 1) {
      setMediaHome(res.data);
    }
  };

  useEffect(() => {
    fetch_mediaHome();
    fetch_DetialBaiviet();
  }, [params?.slug]);

  return (
    <>
      <Helmet defer={false}>
        <title>{detail?.tieude}</title>
        <meta name="description" content={detail?.meta_des} />
        {/* <meta name="keywords" content={detail?.key_word} /> */}
        <meta property="og:title" content={detail?.tieude} />
        <meta property="og:description" content={detail?.meta_des} />

        <meta property="og:image" content={`${process.env.REACT_APP_BACKEND_URL}/images/banner/${detail?.thumbnail}`}/>
        <meta property="og:url" content={currentUrl} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={currentUrl} />
        <meta property="og:image:type" content="image/jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

      </Helmet>

      <BannerHeader media={mediaHome} handleSetVideo={handleSetVideo} />
      <div className="baiviet-detail">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb breadcrumb-ov">
              <li className="breadcrumb-item">
                <span
                  className="br-home"
                  onClick={() => {
                    navigate("/");
                    setIsLoading(true);
                  }}
                >
                  Trang chủ
                </span>
              </li>
              <li className="breadcrumb-item">
                <span
                  className="br-home"
                  onClick={() => {
                    navigate("/tin-tuc");
                    setIsLoading(true);
                  }}
                >
                  Tin tức
                </span>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {detail.tieude}
              </li>
            </ol>
          </nav>

          <div className="g-detail">
            <h1 className="title-baiviet">{detail?.tieude}</h1>
            <div className="v-t">
              <div className="view">
               Lượt xem:
               <span>{detail.view}</span>
              </div>
              <div className="time-baiviet">
                {moment(detail?.createdAt).format("DD-MM-Y")}
              </div>
            </div>
          </div>

          <div className="noidung">
            <div dangerouslySetInnerHTML={{ __html: detail?.noidung }}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BaivietDetail;
