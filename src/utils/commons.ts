import { Constants } from "@/constants/constants";
import sample from "lodash/sample";
const CryptoJS = require("crypto-js");
export const key_slate = "ABC@123#245";
export const TypeDoc = {
  Info: "Info",
  View: "View",
  Year: "Year",
  Genres: "Genres",
  Auth: "Auth",
  Status: "Status",
  Type: "Type",
};

export const TypeMode={
  Genres:"genres",
  Auths:"auth",
  Years:"year",
  Status:"status"
  }

export function Encrypt(originalData: any) {
  return CryptoJS.AES.encrypt(
    JSON.stringify(originalData),
    key_slate
  ).toString();
}
export function Decrypt(stringData: any) {
  try {
    let bytes = CryptoJS.AES.decrypt(stringData, key_slate);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (ex: any) {
    return null;
  }
}
export function UrlCurrentType(current: any) {
  return `/${current.uri_select.key_uri}`;
}
export function UrlInfo(id:any, current:any) {
  return `/${current.uri_select.key_uri}/${current.uri_select.start_info}${id}`;
}
export function UrlDetail(id: any, iddetail: any, current: any) {
  return `/${current.uri_select.key_uri}/${current.uri_select.start_info}${id}/${current.uri_select.start_view}${iddetail}`;
}
export function UrlByKeyType(key_type: any, current: any) {
  if (current.data_uri != null) {
    return `/${
      current.data_uri.find((p: any) => p.key_type == key_type)?.key_uri
    }`;
  } else {
    return "";
  }
}
export function UrlOption(id: any, type: any, current: any) {
  let url = "";
  switch (type) {
    case TypeDoc.Genres:
      url = `/${current.uri_select.key_uri}/${current.uri_select.prefix_genres}/${id}`;
      break;
    case TypeDoc.Type:
      url = `/${current.uri_select.key_uri}/${current.uri_select.prefix_type}/${id}`;
      break;
    case TypeDoc.Year:
      url = `/${current.uri_select.key_uri}/${current.uri_select.prefix_year}/${id}`;
      break;
    case TypeDoc.Auth:
      url = `/${current.uri_select.key_uri}/${current.uri_select.prefix_auth}/${id}`;
      break;
    case TypeDoc.Status:
      url = `/${current.uri_select.key_uri}/${current.uri_select.prefix_status}/${id}`;
      break;
  }
  return url;
}
interface TitleShowProps {
  text?: string;
  option?: string;
  current?: any;
  page?: string;
  genres?: string;
  chapter?: string;
  auth?: string;
  desc?: string;
  nameother?: string;
}
export function TitleShow(
  text?:any,
  option?:any,
  current?:any,
  page='1',
  genres?:any,
  chapter?:any,
  auth?:any,
  desc?:any,
  nameother?:any
) {
  let textview = text;
  try {
    if (current.seo_select == null) return text;
    switch (option) {
      case TypeDoc.Year:
        textview = sample(current.seo_select.group_title)
          ?.replaceAll("{groupname}", current.lable_info.info_year)
          .replaceAll("{key}", text)
          .replaceAll("{page}", page)
          .replaceAll("{auth}",auth)
          .replaceAll("{desc}",desc)
          .replaceAll("{domain_name}", current.setting.domain_name)
          .replaceAll("{brand_name}", current.setting.brand_name);
        break;
      case TypeDoc.Genres:
        textview = sample(current.seo_select.group_title)
          ?.replaceAll("{groupname}", current.lable_info.info_genres)
          .replaceAll("{key}", text)
          .replaceAll("{page}", page)
          .replaceAll("{auth}",auth)
          .replaceAll("{desc}",desc)
          .replaceAll("{domain_name}", current.setting.domain_name)
          .replaceAll("{brand_name}", current.setting.brand_name);
        break;
      case TypeDoc.Auth:
        textview = sample(current.seo_select.group_title)
          ?.replaceAll("{groupname}", current.lable_info.info_auth)
          .replaceAll("{key}", text)
          .replaceAll("{page}", page)
          .replaceAll("{auth}",auth)
          .replaceAll("{desc}",desc)
          .replaceAll("{domain_name}", current.setting.domain_name)
          .replaceAll("{brand_name}", current.setting.brand_name);
        break;
      case TypeDoc.Status:
        textview = sample(current.seo_select.group_title)
          ?.replaceAll("{groupname}", current.lable_info.info_status)
          .replaceAll("{key}", text)
          .replaceAll("{page}", page)
          .replaceAll("{auth}",auth)
          .replaceAll("{desc}",desc)
          .replaceAll("{domain_name}", current.setting.domain_name)
          .replaceAll("{brand_name}", current.setting.brand_name);
        break;
      case TypeDoc.Type:
        textview = sample(current.seo_select.group_title)
          ?.replaceAll("{groupname}", current.lable_info.info_type)
          .replaceAll("{key}", text)
          .replaceAll("{page}", page)
          .replaceAll("{auth}",auth)
          .replaceAll("{desc}",desc)
          .replaceAll("{domain_name}", current.setting.domain_name)
          .replaceAll("{brand_name}", current.setting.brand_name);
        break;
      case TypeDoc.Info:
        textview = sample(current.seo_select.info_title)
          ?.replaceAll("{genres}", genres)
          .replaceAll("{name}", text)
          .replaceAll("{nameOther}", nameother)
          .replaceAll("{chapter}", chapter)
          .replaceAll("{auth}",auth)
          .replaceAll("{desc}",desc)
          .replaceAll("{domain_name}", current.setting.domain_name)
          .replaceAll("{brand_name}", current.setting.brand_name);
        break;
      case TypeDoc.View:
        textview = sample(current.seo_select.detail_title)
          ?.replaceAll("{genres}", genres)
          .replaceAll("{name}", text)
          .replaceAll("{nameOther}", nameother)
          .replaceAll("{chapter}", chapter)
          .replaceAll("{auth}",auth)
          .replaceAll("{desc}",desc)
          .replaceAll("{domain_name}", current.setting.domain_name)
          .replaceAll("{brand_name}", current.setting.brand_name);
        break;
    }
  } catch (ex) {
    //Console.WriteLine(ex);
  }
  return textview;
}
export function TitleSeo({text,
  option,
  current,
  page='1',
  genres,
  chapter,
  auth,
  desc,
  nameother
}:TitleShowProps) {
  let textview = text;
  try {
    if (current.seo_select == null) return text;
    switch (option) {
      case TypeDoc.Year:
        textview = sample(current.seo_select.group_title)
          ?.replaceAll("{groupname}", current.lable_info.info_year)
          .replaceAll("{key}", text)
          .replaceAll("{page}", page)
          .replaceAll("{auth}",auth)
          .replaceAll("{desc}",desc)
          .replaceAll("{domain_name}", current.setting.domain_name)
          .replaceAll("{brand_name}", current.setting.brand_name);
        break;
      case TypeDoc.Genres:
        textview = sample(current.seo_select.group_title)
          ?.replaceAll("{groupname}", current.lable_info.info_genres)
          .replaceAll("{key}", text)
          .replaceAll("{page}", page)
          .replaceAll("{auth}",auth)
          .replaceAll("{desc}",desc)
          .replaceAll("{domain_name}", current.setting.domain_name)
          .replaceAll("{brand_name}", current.setting.brand_name);
        break;
      case TypeDoc.Auth:
        textview = sample(current.seo_select.group_title)
          ?.replaceAll("{groupname}", current.lable_info.info_auth)
          .replaceAll("{key}", text)
          .replaceAll("{page}", page)
          .replaceAll("{auth}",auth)
          .replaceAll("{desc}",desc)
          .replaceAll("{domain_name}", current.setting.domain_name)
          .replaceAll("{brand_name}", current.setting.brand_name);
        break;
      case TypeDoc.Status:
        textview = sample(current.seo_select.group_title)
          ?.replaceAll("{groupname}", current.lable_info.info_status)
          .replaceAll("{key}", text)
          .replaceAll("{page}", page)
          .replaceAll("{auth}",auth)
          .replaceAll("{desc}",desc)
          .replaceAll("{domain_name}", current.setting.domain_name)
          .replaceAll("{brand_name}", current.setting.brand_name);
        break;
      case TypeDoc.Type:
        textview = sample(current.seo_select.group_title)
          ?.replaceAll("{groupname}", current.lable_info.info_type)
          .replaceAll("{key}", text)
          .replaceAll("{page}", page)
          .replaceAll("{auth}",auth)
          .replaceAll("{desc}",desc)
          .replaceAll("{domain_name}", current.setting.domain_name)
          .replaceAll("{brand_name}", current.setting.brand_name);
        break;
      case TypeDoc.Info:
        textview = sample(current.seo_select.info_title)
          ?.replaceAll("{genres}", genres)
          .replaceAll("{name}", text)
          .replaceAll("{nameOther}", nameother)
          .replaceAll("{chapter}", chapter)
          .replaceAll("{auth}",auth)
          .replaceAll("{desc}",desc)
          .replaceAll("{domain_name}", current.setting.domain_name)
          .replaceAll("{brand_name}", current.setting.brand_name);
        break;
      case TypeDoc.View:
        textview = sample(current.seo_select.detail_title)
          ?.replaceAll("{genres}", genres)
          .replaceAll("{name}", text)
          .replaceAll("{nameOther}", nameother)
          .replaceAll("{chapter}", chapter)
          .replaceAll("{auth}",auth)
          .replaceAll("{desc}",desc)
          .replaceAll("{domain_name}", current.setting.domain_name)
          .replaceAll("{brand_name}", current.setting.brand_name);
        break;
    }
  } catch (ex) {
    //Console.WriteLine(ex);
  }
  return textview;
}
export function DescSeo(
  {text,
    option,
    current,
    page='1',
    genres,
    chapter,
    auth,
    desc,
    nameother
  }:TitleShowProps
) {
  let textview = text;
  try {
   // console.log(option);
    if (current.seo_select == null) return text;
    switch (option) {
      case TypeDoc.Year:
        textview = sample(current.seo_select.group_desc)
          ?.replaceAll("{groupname}", current.lable_info.info_year)
          .replaceAll("{key}", text)
          .replaceAll("{page}", page)
          .replaceAll("{auth}",auth)
          .replaceAll("{desc}",desc)
          .replaceAll("{domain_name}", current.setting.domain_name)
          .replaceAll("{brand_name}", current.setting.brand_name);
        break;
      case TypeDoc.Genres:
        textview = sample(current.seo_select.group_desc)
          ?.replaceAll("{groupname}", current.lable_info.info_genres)
          .replaceAll("{key}", text)
          .replaceAll("{page}", page)
          .replaceAll("{auth}",auth)
          .replaceAll("{desc}",desc)
          .replaceAll("{domain_name}", current.setting.domain_name)
          .replaceAll("{brand_name}", current.setting.brand_name);
        break;
      case TypeDoc.Auth:
        textview = sample(current.seo_select.group_desc)
          ?.replaceAll("{groupname}", current.lable_info.info_auth)
          .replaceAll("{key}", text)
          .replaceAll("{page}", page)
          .replaceAll("{auth}",auth)
          .replaceAll("{desc}",desc)
          .replaceAll("{domain_name}", current.setting.domain_name)
          .replaceAll("{brand_name}", current.setting.brand_name);
        break;
      case TypeDoc.Status:
        textview = sample(current.seo_select.group_desc)
          ?.replaceAll("{groupname}", current.lable_info.info_status)
          .replaceAll("{key}", text)
          .replaceAll("{page}", page)
          .replaceAll("{auth}",auth)
          .replaceAll("{desc}",desc)
          .replaceAll("{domain_name}", current.setting.domain_name)
          .replaceAll("{brand_name}", current.setting.brand_name);
        break;
      case TypeDoc.Type: 
        textview = sample(current.seo_select.group_desc)
          ?.replaceAll("{groupname}", current.lable_info.info_type)
          .replaceAll("{key}", text)
          .replaceAll("{page}", page)
          .replaceAll("{auth}",auth)
          .replaceAll("{desc}",desc)
          .replaceAll("{domain_name}", current.setting.domain_name)
          .replaceAll("{brand_name}", current.setting.brand_name);
        break;
      case TypeDoc.Info:
       // console.log(sample(current.seo_select.info_desc));
        textview = sample(current.seo_select.info_desc)
          ?.replaceAll("{genres}", genres)
          .replaceAll("{name}", text)
          .replaceAll("{nameOther}", nameother)
          .replaceAll("{chapter}", chapter)
          .replaceAll("{auth}",auth)
          .replaceAll("{desc}",desc)
          .replaceAll("{domain_name}", current.setting.domain_name)
          .replaceAll("{brand_name}", current.setting.brand_name);
         // console.log(textview);
        break;
      case TypeDoc.View:
        textview = sample(current.seo_select.detail_desc)
          ?.replaceAll("{genres}", genres)
          .replaceAll("{name}", text)
          .replaceAll("{nameOther}", nameother)
          .replaceAll("{chapter}", chapter)
          .replaceAll("{auth}",auth)
          .replaceAll("{desc}",desc)
          .replaceAll("{domain_name}", current.setting.domain_name)
          .replaceAll("{brand_name}", current.setting.brand_name);
        break;
    }
  } catch (ex) {
    console.log(ex);
  }
  return textview;
}
export function KeyWordSeo(
  {text,
    option,
    current,
    page='1',
    genres,
    chapter,
    auth,
    desc,
    nameother
  }:TitleShowProps
) {
  let textview = text;
  try {
    if (current.seo_select == null) return text;
    switch (option) {
      case TypeDoc.Year:
        textview = sample(current.seo_select.group_key)
          ?.replaceAll("{groupname}", current.lable_info.info_year)
          .replaceAll("{key}", text)
          .replaceAll("{page}", page)
          .replaceAll("{auth}",auth)
          .replaceAll("{desc}",desc)
          .replaceAll("{domain_name}", current.setting.domain_name)
          .replaceAll("{brand_name}", current.setting.brand_name);
        break;
      case TypeDoc.Genres:
        textview = sample(current.seo_select.group_key)
          ?.replaceAll("{groupname}", current.lable_info.info_genres)
          .replaceAll("{key}", text)
          .replaceAll("{page}", page)
          .replaceAll("{auth}",auth)
          .replaceAll("{desc}",desc)
          .replaceAll("{domain_name}", current.setting.domain_name)
          .replaceAll("{brand_name}", current.setting.brand_name);
        break;
      case TypeDoc.Auth:
        textview = sample(current.seo_select.group_key)
          ?.replaceAll("{groupname}", current.lable_info.info_auth)
          .replaceAll("{key}", text)
          .replaceAll("{page}", page)
          .replaceAll("{auth}",auth)
          .replaceAll("{desc}",desc)
          .replaceAll("{domain_name}", current.setting.domain_name)
          .replaceAll("{brand_name}", current.setting.brand_name);
        break;
      case TypeDoc.Status:
        textview = sample(current.seo_select.group_key)
          ?.replaceAll("{groupname}", current.lable_info.info_status)
          .replaceAll("{key}", text)
          .replaceAll("{page}", page)
          .replaceAll("{auth}",auth)
          .replaceAll("{desc}",desc)
          .replaceAll("{domain_name}", current.setting.domain_name)
          .replaceAll("{brand_name}", current.setting.brand_name);
        break;
      case TypeDoc.Type:
        textview = sample(current.seo_select.group_key)
          ?.replaceAll("{groupname}", current.lable_info.info_type)
          .replaceAll("{key}", text)
          .replaceAll("{page}", page)
          .replaceAll("{auth}",auth)
          .replaceAll("{desc}",desc)
          .replaceAll("{domain_name}", current.setting.domain_name)
          .replaceAll("{brand_name}", current.setting.brand_name);
        break;
      case TypeDoc.Info:
        textview = sample(current.seo_select.info_key)
          ?.replaceAll("{genres}", genres)
          .replaceAll("{name}", text)
          .replaceAll("{nameOther}", nameother)
          .replaceAll("{chapter}", chapter)
          .replaceAll("{auth}",auth)
          .replaceAll("{desc}",desc)
          .replaceAll("{domain_name}", current.setting.domain_name)
          .replaceAll("{brand_name}", current.setting.brand_name);
        //console.log(textview);
        break;
      case TypeDoc.View:
        textview = sample(current.seo_select.detail_key)
          ?.replaceAll("{genres}", genres)
          .replaceAll("{name}", text)
          .replaceAll("{nameOther}", nameother)
          .replaceAll("{chapter}", chapter)
          .replaceAll("{auth}",auth)
          .replaceAll("{desc}",desc)
          .replaceAll("{domain_name}", current.setting.domain_name)
          .replaceAll("{brand_name}", current.setting.brand_name);
        break;
    }
  } catch (ex) {
    //Console.WriteLine(ex);
  }
  return textview;
}

export function LableMenuName(key_type: any, current: any) {
  if (current.menu_lang_select != null)
    return current.menu_lang_select.menu_lang.find(
      (p: any) => p.key_type == key_type
    )?.lable;
  else return "...";
}

export function UrlLinkImage(url:any){
  let raw_url = url?.replaceAll('{apiRoot}', Constants.UrlImage);
  if (!raw_url?.includes('http')) {
      raw_url = Constants.UrlImage + raw_url;
  }
  return raw_url;
}