import { useEffect, useState } from "react";
import { useLocation, useOutletContext, useParams } from "react-router-dom";
import { callDetailMedia } from "../../service/api";
import "../../scss/dichvumedia.scss";
import "../../scss/bannerHeader.scss";
import Video from "../video/Video";
import BannerHeader from "../../page/bannerHeader";
import { Helmet } from "react-helmet-stuff";

const DichVuMedia = () => {
  const [isShowVideo, handleSetVideo, setIsLoading] = useOutletContext();
  const location = useLocation();
  const params = useParams();
  const [detailMedia, setDetailMedia] = useState("");
  const currentUrl = window.location.href;

  const fetch_DetailMedia = async () => {
    let res = await callDetailMedia(params.slug);
    if (res && res.EC === 1) {
      setDetailMedia(res.data);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetch_DetailMedia();
  }, [params.slug]);

  return (
    <>
      <Helmet defer={false}>
        <title>{detailMedia?.title_menu}</title>
        <meta name="description" content={detailMedia?.meta_des} />
        {/* <meta name="keywords" content={detailMedia?.key_word} /> */}
        <meta property="og:title" content={detailMedia?.title_menu} />
        <meta property="og:description" content={detailMedia?.meta_des} />

        <meta property="og:image" content={`${process.env.REACT_APP_BACKEND_URL}/images/banner/${detailMedia?.video_bg}`}/>
        <meta property="og:url" content={currentUrl} />
        <meta property="og:type" content="article" />
        <link rel="canonical" href={currentUrl} />
        <meta property="og:image:type" content="image/jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

      </Helmet>

      <BannerHeader media={detailMedia} handleSetVideo={handleSetVideo} />

      <section id="nd-9653" className="mt-4">
        <div className="container">
          <div dangerouslySetInnerHTML={{ __html: detailMedia?.noidung }}></div>
        </div>
      </section>

      <Video
        isShowVideo={isShowVideo}
        handleSetVideo={handleSetVideo}
        name={detailMedia}
      />
    </>
  );
};

export default DichVuMedia;
