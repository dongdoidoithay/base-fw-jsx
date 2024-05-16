import { Constants } from "@/constants/constants";
import { currentByDomain } from "./currentSetting";
import { FetchApi } from "./handleApi";

// cache.js
const NodeCache = require('node-cache');
const cache = new NodeCache();

export async function getCacheConfig (domain:any) {
    var _ct_host = domain;
    let _domain = "default";
    if (_ct_host && !_ct_host.includes("localhost")) {
      _domain = _ct_host.replace("wwww.", "");
    }
  const cachedConfig = cache.get(_domain);
  if (cachedConfig) {
    return cachedConfig;
  }
  const urls = [
    `${Constants.UrlApp}/api/setting/${domain}`,
    `${Constants.UrlApp}/api/url/${domain}`,
    `${Constants.UrlApp}/api/menu/${domain}`,
    `${Constants.UrlApp}/api/lang/${domain}`,
    `${Constants.UrlApp}/api/seo/${domain}`,
  ];

  let _raw_rq = await FetchApi(urls);
  const config  = currentByDomain(_raw_rq);

  console.log("### all api config |->"+_domain);
  // Cache dữ liệu cấu hình
  cache.set(_domain, config);

  return config;
}