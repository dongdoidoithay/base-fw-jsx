import { Constants } from "@/constants/constants";
import { UrlInfo } from "@/utils/commons";
import { currentByDomain, currentKeyType } from "@/utils/currentSetting";
import { FetchApi, FetchOneApi } from "@/utils/handleApi";

const serversitemap = async (req: any, res: any) => {
  let xmlresult: any = [];
  try {
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

    //const _date=new Date().toISOString();

    for (const item of current.map_url.data_type) {
      const _current = currentKeyType(current, item.key_type);
      //Doc
      const url_site = `${Constants.UrlApi}${_current.uri_select.prefix_url_api}${Constants.path_home_update}/10/0`;
      let data = await FetchOneApi(url_site);
      //console.log("server-sitemap", _data);
      let fields = data.data.map((item: any) => {
        const url = `https://${domain}${UrlInfo(item.idDoc, current)}`;
        return `<url><loc>${url}</loc><lastmod>${new Date().toISOString()}</lastmod><changefreq>always</changefreq><priority>1</priority></url>`;
      });
      xmlresult = xmlresult.concat(fields);
    }
    // Add urlSet to entire sitemap string

    const sitemap = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
                        ${xmlresult.join("")}
                    </urlset>`;
    // set response content header to xml
    res.setHeader("Content-Type", "text/xml; charset=utf-8");
    res.setHeader("Accept-Encoding", "*");
    return res.status(200).send(sitemap);
  } catch (e: unknown) {
    //console.log("server-sitemap.xml-->", e);
    res.setHeader("Content-Type", "text/xml; charset=utf-8");
    res.setHeader("Accept-Encoding", "*");
    const sitemap = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
        ${xmlresult.join("")}
    </urlset>`;
    return res.status(200).send(sitemap);
  }
};

export default serversitemap;
