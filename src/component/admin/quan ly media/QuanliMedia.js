import { Button, Card, Col, Flex, Input, Row, message } from "antd";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Upload } from "antd";
import {
  callDeleteImg,
  callDetailMedia,
  callUpdateMedia,
  callUpload_Single_Img,
  callUpload_Single_Img_baiviet,
} from "../../../service/api";
import ReactPlayer from "react-player";
//import ReactCkeditor from "./ReactCkeditor";

import { Editor } from "@tinymce/tinymce-react";
import TextArea from "antd/es/input/TextArea";

const QuanliMedia = () => {
  const refEditor = useRef(null);
  // luu anh phan noi dung
  const filePickerCallback = function (cb, value, meta) {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");

    input.onchange = async function () {
      const file = input.files[0];

      const res = await callUpload_Single_Img_baiviet(file);
      if (res && res.EC === 1) {
        cb(
          `${process.env.REACT_APP_BACKEND_URL}/images/baiviet/${res.data.fileUploaded}`,
          { alt: file.name }
        );
      }
    };

    input.click();
  };
  ////////////////////
  const params = useParams();
  const [detailMedia, setDetailMedia] = useState();
  const [key_word, setKey_word] = useState("");
  const [meta_des, setMeta_des] = useState("");
  const [pathBannerBg, setPathBannerBg] = useState();
  const [pathBannerVideo, setPathBannerVideo] = useState();
  let [noidung, setNoidung] = useState("");
  const [link, setLink] = useState();

  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "ảnh",
      status: "done",
      url: `${process.env.REACT_APP_BACKEND_URL}/images/banner/${detailMedia?.banner_bg}`,
    },
  ]);
  const [fileList_2, setFileList_2] = useState([
    {
      uid: "-1",
      name: "ảnh",
      status: "done",
      url: `${process.env.REACT_APP_BACKEND_URL}/images/banner/${detailMedia?.video_bg}`,
    },
  ]);
  
  const fetchDetailMedia = async () => {
    const res = await callDetailMedia(params.slug);
    if (res && res.EC === 1) {
      setDetailMedia(res.data);
      setFileList([
        {
          uid: "-1",
          name: "ảnh",
          status: "done",
          url: `${process.env.REACT_APP_BACKEND_URL}/images/banner/${res.data.banner_bg}`,
        },
      ]);

      setFileList_2([
        {
          uid: "-1",
          name: "ảnh",
          status: "done",
          url: `${process.env.REACT_APP_BACKEND_URL}/images/banner/${res.data.video_bg}`,
        },
      ]);
    }
    // set data hiển thị khi call api thành công
    setPathBannerBg(res.data?.banner_bg);
    setPathBannerVideo(res.data?.video_bg);
    setLink(res.data?.link);
    setNoidung(res.data?.noidung);
    setKey_word(res.data?.key_word);
    setMeta_des(res.data?.meta_des);
  };

  useEffect(() => {
    fetchDetailMedia();
  }, [params.slug]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onChange_2 = ({ fileList: newFileList_2 }) => {
    setFileList_2(newFileList_2);
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  const handleUploadFile_bannerBg = async ({ file, onSuccess, onError }) => {
    const res = await callUpload_Single_Img(file);
    if (res && res.data) {
      if (pathBannerBg) {
        let remove = await callDeleteImg(pathBannerBg);
      }

      setPathBannerBg(res.data.fileUploaded);
      onSuccess("ok");
    } else {
      onError("Đã có lỗi khi upload");
    }
  };
  const handleUploadFile_bannerVideo = async ({ file, onSuccess, onError }) => {
    const res = await callUpload_Single_Img(file);
    if (res && res.data) {
      if (pathBannerVideo) {
        let remove = await callDeleteImg(pathBannerVideo);
      }
      setPathBannerVideo(res.data.fileUploaded);
      onSuccess("ok");
    } else {
      onError("Đã có lỗi khi upload");
    }
  };
  const handleCallUpdate = async () => {
    // nếu là trang chủ, ko có nội dung
    if (+params.id === 1) {
      if (
        !pathBannerBg ||
        !pathBannerVideo ||
        !link ||
        !key_word ||
        !meta_des
      ) {
        message.error("Hãy nhập đầy đủ thông tin");
        return;
      }
    } else {
      if (
        !pathBannerBg ||
        !pathBannerVideo ||
        !link ||
        !key_word ||
        !meta_des
      ) {
        message.error("Hãy nhập đầy đủ thông tin");
        return;
      }
    }

    if(refEditor?.current?.getContent()){
      noidung = refEditor?.current?.getContent()
    }

    const res = await callUpdateMedia(
      params.slug,
      key_word,
      meta_des,
      pathBannerBg,
      pathBannerVideo,
      link,
      noidung
    );
    if (res && res.EC === 1) {
      message.success("Cập nhật thành công");
      fetchDetailMedia();
    } else {
      message.error("Cập nhật thất bại");
    }
  };

  return (
    <div>
      <Flex justify="end" className="mb-5">
        <Button type="primary" onClick={() => handleCallUpdate()}>
          Cập nhật
        </Button>
      </Flex>
      <Row gutter={16}>
        <Col span={12}>
          <Card title="Key word">
            <TextArea
              rows={3}
              onChange={(e) => setKey_word(e.target.value)}
              value={key_word}
              maxLength={500}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Description">
            <TextArea
              rows={3}
              value={meta_des}
              onChange={(e) => setMeta_des(e.target.value)}
              maxLength={500}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Card title="Ảnh nền header" bordered={true}>
            <Upload
              listType="picture-card"
              fileList={fileList}
              customRequest={handleUploadFile_bannerBg}
              onChange={onChange}
              onPreview={onPreview}
              maxCount={1}
              multiple={false}
              accept="image/*"
            >
              Tải lên
            </Upload>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Ảnh nền video" bordered={true}>
            <Upload
              listType="picture-card"
              fileList={fileList_2}
              customRequest={handleUploadFile_bannerVideo}
              onChange={onChange_2}
              onPreview={onPreview}
              maxCount={1}
              multiple={false}
              accept="image/*"
            >
              Tải lên
            </Upload>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Link youtube" bordered={true}>
            <Input
              className="mb-4"
              onChange={(e) => setLink(e.target.value)}
              placeholder="Nhập link youtube"
              value={link}
            ></Input>
            <ReactPlayer
              url={detailMedia?.link}
              width={"100%"}
              controls={true}
            />
          </Card>
        </Col>
      </Row>
      {/* // react edit word */}

      <>
        <h4 className="mb-4">Nội dung:</h4>
        <Editor
          apiKey={process.env.REACT_APP_API_KEY_EDITOR}
          //onInit={(evt, editor) => (editor._beforeUnload(noidung))}
          //onChange={(evt, editor) => setNoidung(editor.getContent())}
          onChange={(evt, editor) => (refEditor.current = editor)}
          initialValue={noidung}
          init={{
            height: 500,
            menubar: false,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks | " +
              "bold italic fontsize forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help | image media",
            content_style:
              "body { font-family: Helvetica, Arial, sans-serif; font-size: 14px }",
            fontsize_formats: "8px 10px 12px 14px 18px 24px 36px",
            file_picker_types: "image",
            file_picker_callback: filePickerCallback,
          }}
        />
      </>

      {/* /////////// */}
    </div>
  );
};

export default QuanliMedia;
