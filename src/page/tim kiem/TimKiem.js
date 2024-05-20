import { useEffect, useState } from "react";
import "../../scss/baiviet.scss";
import { callDetailTrangchu, call_search_baiviet } from "../../service/api";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";

import BannerHeader from "../bannerHeader";
import moment from "moment";
import { Flex, Input, Pagination } from "antd";
import { Helmet } from "react-helmet-stuff";
import { TfiEye } from "react-icons/tfi";
import Search from "antd/es/input/Search";
import LienHe from "../lien he/LienHe";
import LazyLoad from "react-lazyload";
const TimKiem = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const [isShowVideo, handleSetVideo, setIsLoading] = useOutletContext();
  const [mediaHome, setMediaHome] = useState({});
  const [listBlog, setListBlog] = useState([]);
  const [totalBlog, setTotalBlog] = useState(0);
  const [pageNumber, setPage] = useState(
    params.get("page") ? params.get("page") : 1
  );
  const [tuKhoa, setTuKhoa] = useState(
    params.get("tu-khoa") ? params.get("tu-khoa") : ""
  );
  const navigate = useNavigate();
  const [limit, setLimit] = useState(12); // số bài viết hiển thị

  const fetch_mediaHome = async () => {
    const res = await callDetailTrangchu();
    if (res && res.EC === 1) {
      setMediaHome(res.data);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };

  const fetch_search_baiviet = async () => {
    const res = await call_search_baiviet(tuKhoa, pageNumber, limit);
    if (res && res.EC === 1) {
      setListBlog(res.data.list);
      setTotalBlog(res.data.total);
    }
  };

  useEffect(() => {
    fetch_mediaHome();
  }, []);

  useEffect(() => {
    fetch_search_baiviet();
  }, [pageNumber, tuKhoa]);

  const onchangePage = (page) => {
    setPage(page);
    //chỉ hiển thị path , còn setpage khi onchange rồi
    navigate(`?page=${page}&tu-khoa=${tuKhoa}`);
  };
  const onSearch = (value, _e, info) => {
    navigate(`?page=${pageNumber}&tu-khoa=${value}`);
    setTuKhoa(value);
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

      <BannerHeader media={mediaHome} handleSetVideo={handleSetVideo} />
      <div className="baiviet">
        <div className="container">
          <div className="group-search">
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
                  Tìm kiếm : (
                  <span style={{ fontStyle: "italic" }}>{tuKhoa}</span>)
                </li>
              </ol>
            </nav>
            <div className="search">
              <Search placeholder="Tìm kiếm" onSearch={onSearch} enterButton />
            </div>
          </div>

          {totalBlog > 0 ? (
            <>
              <div className="row">
                {listBlog &&
                  listBlog.length > 0 &&
                  listBlog.map((item) => {
                    return (
                      <div key={item.id} className="col-sm-6 col-lg-4">
                        <div
                          className="card"
                          onClick={() => {
                            navigate(`/tin-tuc/${item.slug}`);
                            setIsLoading(true);
                          }}
                        >
                          <div className="card-img-holder">
                            <LazyLoad height={400}>
                              <img
                                src={`${process.env.REACT_APP_BACKEND_URL}/images/banner/${item?.thumbnail}`}
                              />
                            </LazyLoad>
                          </div>
                          <h3 className="blog-title">{item.tieude}</h3>
                          <span className="blog-time">
                            {moment(item?.createdAt).format("DD-MM-Y")}
                          </span>
                          <p className="description">{item.mota_ngan}</p>
                          <div className="options">
                            <div className="view">
                              <TfiEye />
                              <span>{item?.view}</span>
                            </div>
                            <button className="btn-doc">Xem thêm</button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>

              <Flex align="center" justify="center" className="m-5 ">
                <Pagination
                  onChange={(p) => onchangePage(p)}
                  defaultCurrent={pageNumber}
                  total={+totalBlog}
                  pageSize={+limit}
                />
              </Flex>
            </>
          ) : (
            <>
              <div style={{ textAlign: "center" }}>Không có kết quả nào!</div>
              <LienHe />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default TimKiem;
