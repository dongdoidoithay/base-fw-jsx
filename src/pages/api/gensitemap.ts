import { Constants } from "@/constants/constants";
import { UrlDetail, UrlInfo } from "@/utils/commons";
import { currentByDomain, currentKeyType } from "@/utils/currentSetting";
import { FetchApi, FetchOneApi } from "@/utils/handleApi";
import { promises as fs } from "fs";
import path from "path";


async function checkAndCreateFolder(path) {
  try {
    await fs.access(path);
  } catch {
    // Folder doesn't exist, create it
    await fs.mkdir(path);
  }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: any, res: any) => {
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

  //console.log("root ==>", process.cwd())
  const publicDirectory = path.join(process.cwd(), "public/" + domain);
  //console.log("pub", publicDirectory)
  await checkAndCreateFolder(publicDirectory);
  const filenames = await fs.readdir(publicDirectory);
  //console.log("filenames =>", filenames.join(";"))

  var targetFiles = filenames.filter(function (file) {
    return path.extname(file).toLowerCase() === ".xml";
  });
  //xoa All file sitemap.xml
  targetFiles.forEach((item) => {
    //console.log("delete==>", publicDirectory + "/" + item)
    fs.unlink(publicDirectory + "/" + item);
  });
  let _count = 1000;
  let _indexFile = 1;
  for (const item of current.map_url.data_type) 
  {
    const _current = currentKeyType(current, item.key_type);
    //Doc
    let loop = true;
    let skip = 0;
    while (loop) {
      const url_site = `${Constants.UrlApi}${_current.uri_select.prefix_url_api}${Constants.path_sitemap_doc}/${_count}/${skip}`;
      let data = await FetchOneApi(url_site);
      //console.log(data);
      if (!data || data.data.length <= 0) {
        loop = false;
        break;
      }
      await genDocFileXml(publicDirectory, data.data, _indexFile, _current, domain);
      skip = skip + 1;
      _indexFile++;
    } 
   
    //detail
    loop = true;
     skip = 0;
     while (loop) {
        const url_site = `${Constants.UrlApi}${_current.uri_select.prefix_url_api}${Constants.path_sitemap_detail}/${_count}/${skip}`;
        let data = await FetchOneApi(url_site);
        //console.log(data);
        if (!data || data.data.length <= 0) {
          loop = false;
          break;
        }
        await genDetailFileXml(publicDirectory, data.data, _indexFile, _current, domain);
        skip = skip + 1;
        _indexFile++;
      } 
  }

  //gen index - robots
  var targetFiles = filenames.filter(function (file) {
    return path.extname(file).toLowerCase() === ".xml";
});

let data_robot = targetFiles.map((page) => {
    return `Sitemap: https://${domain}/${domain}/` + page
});
//console.log(data_robot)

genIndexSite(current,domain);
};

async function genDocFileXml(
  path: any,
  data: any,
  index: any,
  current: any,
  domain: any
) {
   // console.log(data);
  const xml = require("xml");
  const _date = new Date().toISOString();
  const xmlObject = {
    urlset: [
      {
        _attr: {
          xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9",
        },
      },
      ...data.map((item: any) => {
        return {
          url: [
            { loc: `https://${domain}${UrlInfo(item.idDoc, current)}` },
            { lastmod: _date },
            { changefreq: "hourly" },
            { priority: 0.9 },
          ],
        };
      }),
    ],
  };
  // Generate the XML markup
  const xmlString = xml(xmlObject);
  // Write the file to disk
  await fs.writeFile(
    path + "/sitemap-" + index + ".xml",
    `<?xml version="1.0" encoding="UTF-8"?>` + xmlString
  );
}

async function genDetailFileXml(
  path: any,
  data: any,
  index: any,
  current: any,
  domain: any
) {
    //console.log(data);
  const xml = require("xml");
  const _date = new Date().toISOString();
  const xmlObject = {
    urlset: [
      {
        _attr: {
          xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9",
        },
      },
      ...data.map((item: any) => {
        //console.log(item);
        return {
          url: [
            {
              loc: `https://${domain}${UrlDetail(item.idDoc,item.idDetail, current)}`,
            },
            { lastmod: _date },
            { changefreq: "hourly" },
            { priority: 0.8 },
          ],
        };
      }),
    ],
  };
  // Generate the XML markup
  const xmlString = xml(xmlObject);
  // Write the file to disk
  await fs.writeFile(
    path + "/sitemap-" + index + ".xml",
    `<?xml version="1.0" encoding="UTF-8"?>` + xmlString
  );
}
async function genIndexSite(current: any, domain: any) {
  let xmlString = "";

  const publicDirectory = path.join(process.cwd(), "public/" + domain);
  const filenames = await fs.readdir(publicDirectory);

  var targetFiles = filenames.filter(function (file) {
    return path.extname(file).toLowerCase() === ".xml";
  });

  targetFiles.map((page: any) => {
    xmlString += `<sitemap><loc>https://${domain}/${domain}/${page}</loc></sitemap>`;
  });

  let data_robot = targetFiles.map((page: any) => {
    return `Sitemap: https://${domain}/${domain}/` + page;
  });

  let str_item = `User-agent: *\nAllow: /\n`;

  str_item += `Sitemap: https://${domain}/api/server-sitemap.xml \n`;
  str_item += `Sitemap: https://${domain}/${domain}/sitemap-index.xml \n`;
  try {
    await fs.unlink(publicDirectory + "/robots.txt");
  } catch (e) {
    //console.log(e);
  }
  await fs.writeFile(publicDirectory + "/robots.txt", str_item + data_robot.join("\n"));

  //console.log(xmlString);
  // Write the file to disk
  await fs.writeFile(
    publicDirectory + "/sitemap-index.xml",
    `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
      xmlString +
      `</sitemapindex>`
  );
}
