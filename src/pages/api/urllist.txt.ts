import { Constants } from "@/constants/constants";
import { UrlDetail, UrlInfo } from "@/utils/commons";
import { currentByDomain, currentKeyType } from "@/utils/currentSetting";
import { FetchApi, FetchOneApi } from "@/utils/handleApi";

const urllist= async (req:any, res:any) => {
  // console.log("_domain",_domain);
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
  //wrap lop domain ow day
   let xmlresult:any = [];
   for (const item of current.map_url.data_type) 
    {
        const _current = currentKeyType(current, item.key_type);
        //Doc
        const url_site = `${Constants.UrlApi}${_current.uri_select.prefix_url_api}${Constants.path_home_update}/50/0`;
        let data = await FetchOneApi(url_site);
       // console.log("server-sitemap", data);
        let fields = data.data.map((item: any) => {
            const url = `https://${domain}${UrlInfo(item.idDoc, _current)}`;
            return `${url}\n`;
        });

        xmlresult = xmlresult.concat(fields);
  }
  const sitemap = `${xmlresult.join('')}`;
 res.setHeader("Content-Type", "text/plain");

 return res.status(200).send(sitemap);
}



export default urllist;




