import axios from "../utils/axios-customized";

export const callTest = (id) => {
  return axios.post("/api/v1/test", { id });
};
export const callLogin = (name, password) => {
  return axios.post("/api/v1/login", { name, password });
};
export const callChangePass = (name, password, new_password) => {
  return axios.put("/api/v1/changepassword", { name, password, new_password });
};
// liên hệ

export const callAllLienhe = () => {
  return axios.get("/api/v1/lienhe");
};
export const callDeleteLienhe = (id) => {
  return axios.delete(`/api/v1/lienhe/${id}`);
};
export const callAddLienhe = (name, phone, email, noidung) => {
  return axios.post(`/api/v1/lienhe`, {
    name,
    phone,
    email,
    noidung,
  });
};
// menu
export const callMenu_byid = (id) => {
  return axios.get(`/api/v1/menu/${id}`);
};
export const callDeleteMenu_byId = (id) => {
  return axios.delete(`/api/v1/menu/${id}`);
};

export const callUpdateMenu = (id, name, active) => {
  return axios.put(`/api/v1/menu/${id}`, { name, active });
};

export const callAddMenu = (name, type_id) => {
  return axios.post(`/api/v1/menu/`, { name, type_id });
};

export const callActive_menu = () => {
  return axios.get(`/api/v1/menu_active`);
};
// upload ảnh
export const callUpload_Single_Img = (fileImg) => {
  const bodyFormData = new FormData();
  bodyFormData.append("fileImg", fileImg);
  return axios({
    method: "post",
    url: "/api/v1/uploadImg",
    data: bodyFormData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const callUpload_Single_Img_baiviet = (fileImg) => {
  const bodyFormData = new FormData();
  bodyFormData.append("fileImg", fileImg);
  return axios({
    method: "post",
    url: "/api/v1/uploadImg_baiviet",
    data: bodyFormData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
// xóa ảnh, not use body with delete
export const callDeleteImg = (file) => {
  return axios.post("/api/v1/deleteImg", { fileImg: file });
};

// media
export const callUpdateMedia = (
  slug,
  key_word,
  meta_des,
  banner_bg,
  video_bg,
  link,
  noidung
) => {
  return axios.put(`/api/v1/media/${slug}`, {
    key_word,
    meta_des,
    banner_bg,
    video_bg,
    link,
    noidung,
  });
};

export const callAddMedia = (
  type_id,
  key_word,
  meta_des,
  banner_bg,
  video_bg,
  link,
  noidung,
  slug,
  title_menu
) => {
  return axios.post(`/api/v1/media`, {
    key_word,
    meta_des,
    banner_bg,
    video_bg,
    link,
    noidung,
    type_id,
    slug,
    title_menu,
  });
};

export const callDetailMedia = (slug) => {
  return axios.get(`/api/v1/media/${slug}`);
};

export const callUpdateSlugMedia = (slug, id, title_menu) => {
  return axios.put(`/api/v1/slug_media`, { slug, id, title_menu });
};
// video noi bat
export const callAddVideoNoibat = (type_id, video_bg, link, name) => {
  return axios.post(`/api/v1/video-noibat`, {
    type_id,
    video_bg,
    link,
    name,
  });
};

export const callUpadteVideoNoibat = (id, video_bg, link, name) => {
  return axios.put(`/api/v1/video-noibat/${id}`, { video_bg, link, name });
};

// danh sach video theo id

export const callGetVideoNoibat_byid = (id) => {
  return axios.get(`/api/v1/video-noibat/${id}`);
};
export const callGetVideo_detail_byid = (id) => {
  return axios.get(`/api/v1/video-noibat/detail/${id}`);
};

export const callDeleteViddeo = (id) => {
  return axios.delete(`/api/v1/video-noibat/${id}`);
};

// bai viet

export const callAddBaiviet = (
  tieude,
  key_word,
  meta_des,
  noidung,
  thumbnail,
  mota_ngan,
  slug
) => {
  return axios.post("/api/v1/baiviet", {
    tieude,
    key_word,
    meta_des,
    noidung,
    thumbnail,
    mota_ngan,
    slug,
  });
};

export const callDeleteBaiviet = (id) => {
  return axios.delete(`/api/v1/baiviet/${id}`);
};

export const callUpdateBaiviet = (
  id,
  tieude,
  key_word,
  meta_des,
  noidung,
  thumbnail,
  mota_ngan,
  active,
  slug,
  uu_tien
) => {
  return axios.put(`/api/v1/baiviet/${id}`, {
    tieude,
    key_word,
    meta_des,
    noidung,
    thumbnail,
    mota_ngan,
    active,
    slug,
    uu_tien,
  });
};

export const callGetdetail_Baiviet = (slug) => {
  return axios.get(`/api/v1/baiviet/${slug}`);
};

export const callGetBaiviet_paginate = (page, limit) => {
  return axios.get(`/api/v1/baiviet-page?page=${page}&limit=${limit}`);
};

export const callGetAll_Baiviet = () => {
  return axios.get(`/api/v1/listbaiviet`);
};

export const callGet_baiviet_noibat = () => {
  return axios.get(`/api/v1/tintuc-noibat`);
};

export const call_up_view_baiviet = (id) => {
  return axios.put(`/api/v1/baiviet_view/${id}`);
};

export const call_search_baiviet = (search, page, limit) => {
  return axios.get(
    `/api/v1/search-baiviet?search=${search}&page=${page}&limit=${limit}`
  );
};
//////
export const callUpdateTrangchu = (
  key_word,
  meta_des,
  banner_bg,
  video_bg,
  link,
  logo,
  icon_web,
  mota_cty,
  thuonghieu,
  bg_thongke,
  s1,
  s2,
  s3,
  t1,
  t2,
  t3
) => {
  return axios.put(`/api/v1/trang-chu`, {
    key_word,
    meta_des,
    banner_bg,
    video_bg,
    link,
    logo,
    icon_web,
    mota_cty,
    thuonghieu,
    bg_thongke,
    s1,
    s2,
    s3,
    t1,
    t2,
    t3,
  });
};
export const callDetailTrangchu = () => {
  return axios.get(`/api/v1/trang-chu`);
};

export const callSendMail = (email, name, phone, noidung) => {
  return axios.post(`/api/v1/mail`, {
    email,
    name,
    phone,
    noidung,
  });
};
