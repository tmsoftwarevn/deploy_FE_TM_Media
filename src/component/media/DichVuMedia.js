import { useEffect, useState } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { callDetailMedia } from "../../service/api";
import "../../scss/dichvumedia.scss";
import "../../scss/bannerHeader.scss";
import Video from "../video/Video";
import BannerHeader from "../../page/bannerHeader";

const DichVuMedia = () => {
  const navigate = useNavigate();

  const [isShowVideo, handleSetVideo] = useOutletContext();
  const location = useLocation();
  const [idMedia, setIdMedia] = useState(location.state?.idMedia);

  const [detailMedia, setDetailMedia] = useState();
  const fetch_DetailMedia = async () => {
    let res = await callDetailMedia(location.state?.idMedia);
    if (res && res.EC === 1) {
      setDetailMedia(res.data);
    }
  };

  // useEffect(() => {
  //   if (!idMedia) {
  //     navigate("/");
  //   }
  // }, [idMedia]);

  useEffect(() => {
    fetch_DetailMedia();
  }, [location]);

  return (
    <>
      
    <BannerHeader media = {detailMedia} handleSetVideo = {handleSetVideo}/>
      <section id="nd-9653" className="m-5">
        <div className="container">
          <div dangerouslySetInnerHTML={{ __html: detailMedia?.noidung }}></div>
        </div>
      </section>
      
      <Video
        isShowVideo={isShowVideo}
        handleSetVideo={handleSetVideo}
        name={{ name: location.state?.name, id: location.state?.idMedia }}
       
      />
    </>
  );
};

export default DichVuMedia;
