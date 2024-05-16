/* eslint-disable import/no-anonymous-default-export */

import { Constants } from '@/constants/constants';
import { currentByDomain } from '@/utils/currentSetting';
import { FetchApi } from '@/utils/handleApi';
import { promises as fs } from 'fs'
import path from 'path'

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

    //console.log("root ==>", process.cwd())
    const publicDirectory = path.join(process.cwd(), 'public/'+domain)
    //console.log("pub", publicDirectory)

    const filenames = await fs.readdir(publicDirectory)
    //console.log("filenames =>", filenames.join(";"))

    var targetFiles = filenames.filter(function (file) {
        return path.extname(file).toLowerCase() === ".xml";
    });
   
    let data_robot = targetFiles.map((page) => {
        return `Sitemap: https://${domain}/${domain}/` + page
    });
    //console.log(data_robot)

    let str_item = `User-agent: *\n
Allow: /\n
Sitemap: https://${domain}/api/server-sitemap.xml\n\n`

    await fs.unlink(publicDirectory + "/robots.txt")
    await fs.writeFile(
        publicDirectory + "/robots.txt",
        str_item + data_robot.join('\n')
    )

    genIndexSite(current,domain);
    res.status(200).json({ name: '==>done gensitemap index' })
}



async function genIndexSite(current:any,domain:any) {
    let xmlString='';
    
    const publicDirectory = path.join(process.cwd(), 'public/'+domain)
    const filenames = await fs.readdir(publicDirectory)
   
    var targetFiles = filenames.filter(function (file) {
        return path.extname(file).toLowerCase() === ".xml";
    });

    targetFiles.map((page) => {
        xmlString+= `<sitemap><loc>https://${domain}/${domain}/${page}</loc></sitemap>`
    });

    //console.log(xmlString);
    // Write the file to disk
    await fs.writeFile(
        publicDirectory + "/sitemap-index.xml",
        `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`
        + xmlString +`</sitemapindex>`
    )
}