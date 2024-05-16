import { Constants } from "@/constants/constants";
import { UrlDetail, UrlInfo } from "@/utils/commons";
import { currentByDomain, currentKeyType } from "@/utils/currentSetting";
import { FetchApi, FetchOneApi } from "@/utils/handleApi";

const sitemap = async (req: any, res: any) => {
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
  let _raw_rq = await FetchApi(urls);
  current = currentByDomain(_raw_rq);

  let xmlresult: any = [];

  for (const item of current.map_url.data_type) {
    const _current = currentKeyType(current, item.key_type);
    //Doc
    const url_site = `${Constants.UrlApi}${_current.uri_select.prefix_url_api}${Constants.path_sitemap_doc}/10/0`;
    let data = await FetchOneApi(url_site);
    //console.log("server-sitemap", _data);
    let fields = data.data?.map((item: any) => {
      const url = `https://${domain}${UrlInfo(
        item.idDoc,
        _current
      )}`;
      //console.log(item);
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
            </item>`;
        });
    xmlresult = xmlresult.concat(fields);
  }
  // Add urlSet to entire sitemap string

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
    <channel>
    <title>${current?.setting?.brand_name}</title>
    <description>${current?.setting?.brand_name_other}</description>
    <link>https://${current?.setting?.domain_name}</link>
    <atom:link rel="alternate" type="application/rss+xml" href="https://${current?.setting?.domain_name}/api/rss.xml"/>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        ${xmlresult.join("")}
    </channel>
    </rss>`;

  // set response content header to xml
  res.setHeader("Content-Type", "text/xml; charset=utf-8");
  res.setHeader("Accept-Encoding", "*");

  return res.status(200).send(sitemap);
};

export default sitemap;
