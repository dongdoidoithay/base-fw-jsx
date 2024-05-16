/* eslint-disable import/no-anonymous-default-export */

import { Constants } from "@/constants/constants";
import {
  DescSeo,
  KeyWordSeo,
  TitleSeo,
  TypeDoc,
  UrlDetail,
  UrlInfo,
} from "@/utils/commons";
import { currentByTypeUri } from "@/utils/currentSetting";
import { FetchApi } from "@/utils/handleApi";

export default async (req: any, res: any) => {
  try {
    const { type, idDoc } = req.query;
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
    let current: any;
    let _data_info: any;

    /***Thong tin phan trang */
    const sort = "ASC";
    const count = 16;
    const page = 0;

    if (
      !type.includes(".") &&
      !idDoc.includes(".gif") &&
      !idDoc.includes(".png") &&
      !idDoc.includes(".svg")
    ) {
      let _raw_rq = await FetchApi(urls);
      current = currentByTypeUri(_raw_rq, type);

      let _idDoc = "";
      if (current && idDoc && idDoc != undefined) {
        const start_prefix = current.uri_select.start_info;
        const end_prefix = current.uri_select.end_info;
        _idDoc = idDoc
          .toString()
          .replace(start_prefix, "")
          .replace(end_prefix, "");

        const dataInfos = [
          `${Constants.UrlApi}${current.uri_select.prefix_url_api}${Constants.path_info}/${_idDoc}`,
          `${Constants.UrlApi}${current.uri_select.prefix_url_api}${Constants.path_chapter_list}/${_idDoc}/${count}/${page}/all/${sort}`,
        ];

        _data_info = await FetchApi(dataInfos);
      }
    }

    let manga_des_full = "";
    let manga_title = "";
    let manga_key_word = "";
    let url = "";
    let urlApi = "";
    if (_data_info[0]?.data?.infoDoc) {
      manga_title = TitleSeo({
        text: _data_info[0]?.data?.infoDoc.name,
        option: TypeDoc.Info,
        current: current,
        genres: _data_info[0]?.data?.infoDoc.genresName,
        chapter: "1",
        auth: _data_info[0]?.data?.infoDoc.authName,
        desc: _data_info[0]?.data?.infoDoc.desc,
        nameother: _data_info[0]?.data?.infoDoc.nameOther,
      });
      manga_des_full = DescSeo({
        text: _data_info[0]?.data?.infoDoc.name,
        option: TypeDoc.Info,
        current: current,
        genres: _data_info[0]?.data?.infoDoc.genresName,
        chapter: "1",
        auth: _data_info[0]?.data?.infoDoc.authName,
        desc: _data_info[0]?.data?.infoDoc.desc,
        nameother: _data_info[0]?.data?.infoDoc.nameOther,
      });
      manga_key_word = KeyWordSeo({
        text: _data_info[0]?.data?.infoDoc.name,
        option: TypeDoc.Info,
        current: current,
        genres: _data_info[0]?.data?.infoDoc.genresName,
        chapter: "1",
        auth: _data_info[0]?.data?.infoDoc.authName,
        desc: _data_info[0]?.data?.infoDoc.desc,
        nameother: _data_info[0]?.data?.infoDoc.nameOther,
      });
      url = `https://${domain}${UrlInfo(
        _data_info[0]?.data?.infoDoc.idDoc,
        current
      )}`;
      urlApi = `https://${domain}/api${UrlInfo(
        _data_info[0]?.data?.infoDoc.idDoc,
        current
      )}`;
    }

    const manga_rend = _data_info[1].data
      .map((data: any) => {
        let chapter_name_view = "";
        const title = TitleSeo({
          text: _data_info[0]?.data?.infoDoc.name,
          option: TypeDoc.View,
          current: current,
          genres: _data_info[0]?.data?.infoDoc.genresName,
          chapter: "1",
          auth: _data_info[0]?.data?.infoDoc.authName,
          desc: _data_info[0]?.data?.infoDoc.desc,
          nameother: _data_info[0]?.data?.infoDoc.nameOther,
        });
        const des_meta = DescSeo({
          text: _data_info[0]?.data?.infoDoc.name,
          option: TypeDoc.View,
          current: current,
          genres: _data_info[0]?.data?.infoDoc.genresName,
          chapter: "1",
          auth: _data_info[0]?.data?.infoDoc.authName,
          desc: _data_info[0]?.data?.infoDoc.desc,
          nameother: _data_info[0]?.data?.infoDoc.nameOther,
        });

        const url = `https://${domain}${UrlDetail(
          data.idDoc,
          data.idDetail,
          current
        )}`;
        return `<item>
        <link>${url}</link>
        <guid>${url}</guid>
        <title><![CDATA[${title}]]></title>
        <pubDate>${new Date().toUTCString()}</pubDate>
        <description><![CDATA[${des_meta}]]></description>
        <author>${current?.setting?.domain_name}</author>
        </item>`;
      })
      .join("");

    // Add urlSet to entire sitemap string

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0"  xmlns:sy="http://purl.org/rss/1.0/modules/syndication/"
                        xmlns:dc="http://purl.org/dc/elements/1.1/"
                        xmlns:content="http://purl.org/rss/1.0/modules/content/" 
                        xmlns:atom="http://www.w3.org/2005/Atom"  >
      <channel>
      <title>${manga_title}</title>
      <link>${url}</link>
      <language>en-us</language>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      <description>${manga_des_full}</description>
      <docs>${url}/feed</docs>
      <sy:updatePeriod>hourly</sy:updatePeriod>
      <sy:updateFrequency>1</sy:updateFrequency>
      <atom:link href="${urlApi}/feed" type="application/rss+xml" />
      <atom:link href="${urlApi}/rss.xml" type="application/rss+xml" />
      ${manga_rend}

      </channel>
      </rss>`;

    // set response content header to xml
    res.setHeader("Content-Type", "text/xml; charset=utf-8");
    res.setHeader("Accept-Encoding", "*");
    //res.setHeader('Content-Type', 'application/json');
    return res.status(200).send(sitemap);
    // return res.status(200).send(sitemap);
  } catch (e: unknown) {
    if (!(e instanceof Error)) {
      throw e;
    }

    return res.status(500).json({ error: e.message || "" });
  }
};
