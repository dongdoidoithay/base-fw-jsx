/* eslint-disable import/no-anonymous-default-export */

import { Constants } from "@/constants/constants";
import { UrlInfo } from "@/utils/commons";
import { currentByTypeUri } from "@/utils/currentSetting";
import { FetchApi, FetchOneApi } from "@/utils/handleApi";
import sample from "lodash/sample";

export default async (req: any, res: any) => {
  try {
    const { type } = req.query;
    var _ct_host = req.headers.host;
    let domain = "default";
    if (_ct_host && !_ct_host.includes("localhost")) {
      domain = _ct_host.replace("wwww.", "");
    }
    const urls = [
      `${Constants.UrlApp}/api/setting/${domain}`,
      `${Constants.UrlApp}/api/url/${domain}`,
      `${Constants.UrlApp}/api/menu/${domain}`,
      `${Constants.UrlApp}/api/lang/${domain}`,
      `${Constants.UrlApp}/api/seo/${domain}`,
    ];
    let _current: any;
    let _data_rq: any;

    if (!type.includes(".")) {
      let _raw_rq = await FetchApi(urls);
      _current = currentByTypeUri(_raw_rq, type);

      if (_current) {
        const dataUrls = `${Constants.UrlApi}${_current.uri_select.prefix_url_api}${Constants.path_home_update}/24/0`;
        _data_rq = await FetchOneApi(dataUrls);
      }
    }
    const manga = _data_rq.data
      .map((item: any) => {
        const url = `https://${domain}${UrlInfo(item.idDoc, _current)}`;
        return `<item>
          <title><![CDATA[${item.name}]]></title>
          <link>${url}</link>
          <guid>${url}</guid>
          <pubDate>${new Date().toUTCString()}</pubDate>
          <description><![CDATA[${item.nameOther ? item.nameOther : ""} ${
          item.desc ? item.desc : ""
        }]]></description>
          
          <content:encoded><![CDATA[${item.nameOther} ${item.desc} tag ${
          item.tags
        }]]></content:encoded>
          <author>${_current?.setting?.domain_name}</author>
        </item>`;
      })
      .join("");

    const _title = sample(_current.seo_select?.title)
      .replaceAll("{domain}", _current.setting?.brand_name_other)
      .replaceAll("{brand_name}", _current.setting?.brand_name);
    const _desc = sample(_current.seo_select?.desc)
      .replaceAll("{domain}", _current.setting?.brand_name_other)
      .replaceAll("{brand_name}", _current.setting?.brand_name);
    const _keyword = sample(_current.seo_select?.key)
      .replaceAll("{domain}", _current.setting?.brand_name_other)
      .replaceAll("{brand_name}", _current.setting?.brand_name);

    // Add urlSet to entire sitemap string

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
      <channel>
      <title>${_title}</title>
      <description>${_desc}</description>
      <link>https://${domain}</link>
      <atom:link href="https://${domain}/api/${type}/rss.xml" type="application/rss+xml" />
      <atom:link href="https://${domain}/api/${type}/feed" type="application/rss+xml" />
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      ${manga}
    
      </channel>
      
      </rss>`;

    // set response content header to xml
    res.setHeader("Content-Type", "text/xml; charset=utf-8");
    res.setHeader("Accept-Encoding", "*");
    return res.status(200).send(sitemap);
  } catch (e: unknown) {
    if (!(e instanceof Error)) {
      throw e;
    }

    return res.status(500).json({ error: e.message || "" });
  }
};
