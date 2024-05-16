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
    const url_site = `${Constants.UrlApi}${_current.uri_select.prefix_url_api}${Constants.path_home_update}/10/0`;
    let data = await FetchOneApi(url_site);
    //console.log("server-sitemap", _data);
    let fields = data.data?.map((item: any) => {
      const url = `https://${domain}${UrlInfo(
        item.idDoc,
        _current
      )}`;
      //console.log(item);
      return ` <li class="lpage">
            <a href="${url}" title="${item.name}">${item.name}</a>
            </li>`;
      });
      const rend_manga = `<ul class="level-2">
                            <li class="lhead">${_current.uri_select.name_type} 10<span class="lcount">New Update</span></li>
                            ${fields.join("")}
                        </ul>`;
     xmlresult = xmlresult.concat(rend_manga);
  }
  // Add urlSet to entire sitemap string

  const sitemap = `<!doctype html>
    <html lang="en">
    
    <head>
      <meta charset="utf-8" />
      <title>${current?.setting?.brand_name}</title>
      <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport" />
      <style type="text/css">
      body {
        background-color: #fff;
        font-family: "Roboto", "Helvetica", "Arial", sans-serif;
        margin: 0;
      }
    
      #top {
    
        background-color: #b1d1e8;
        font-size: 16px;
        padding-bottom: 40px;
      }
    
      nav {
        font-size: 24px;
    
        margin: 0px 30px 0px;
        border-bottom-left-radius: 6px;
        border-bottom-right-radius: 6px;
        background-color: #f3f3f3;
        color: #666;
        box-shadow: 0 10px 20px -12px rgba(0, 0, 0, 0.42), 0 3px 20px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2);
        padding: 10px 0;
        text-align: center;
        z-index: 1;
      }
    
      h3 {
        margin: auto;
        padding: 10px;
        max-width: 600px;
        color: #666;
      }
    
      h3 span {
        float: right;
      }
    
      h3 a {
        font-weight: normal;
        display: block;
      }
    
    
      #cont {
        position: relative;
        border-radius: 6px;
        box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2);
    
        background: #f3f3f3;
    
        margin: -20px 30px 0px 30px;
        padding: 20px;
      }
    
      a:link,
      a:visited {
        color: #0180AF;
        text-decoration: underline;
      }
    
      a:hover {
        color: #666;
      }
    
    
      #footer {
        padding: 10px;
        text-align: center;
      }
    
      ul {
          margin: 0px;
    
          padding: 0px;
          list-style: none;
      }
      li {
        margin: 0px;
      }
      li ul {
        margin-left: 20px;
      }
    
      .lhead {
        background: #ddd;
        padding: 10px;
          margin: 10px 0px;
      }
    
      .lcount {
        padding: 0px 10px;
      }
    
      .lpage {
        border-bottom: #ddd 1px solid;
        padding: 5px;
      }
      .last-page {
        border: none;
      }
      </style>
    </head>
    
    <body>
      <div id="top">
        <nav>${current?.setting?.brand_name} HTML Site Map</nav>
        <h3>Last updated: ${new Date().toUTCString()} - ${current?.setting?.brand_name} Homepage</h3>
      </div>
      <div id="cont">
        <ul class="level-0">
                <li class="lhead">https://${current?.setting?.domain_name} </li>
                <li>
                ${xmlresult.join("")}
          </li>
        </ul>
      </div>
      <div id="footer">
        Copyright &copy; 2005-${new Date().getFullYear()} 
      </div>
    </body>
    
    </html>`;

  // set response content header to xml
  res.setHeader("Content-Type", "text/html");

  return res.status(200).send(sitemap);
};

export default sitemap;
