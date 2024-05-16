const fs = require("fs");
const path = require("path");


const cacheSetting: { [key: string]: any } = {};
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const domain = Array.isArray(req.query.domain)
    ? req.query.domain[0]
    : req.query.domain;

  if (domain && cacheSetting[domain]) {
    res.status(200).json(cacheSetting[domain]);
    res.end();
    console.log("CACHE Setting......");
    return;
  }
  let dir = path.join(process.cwd(), `src/assets/${domain}/setting.json`);
  if (!fs.existsSync(dir)){
    dir = path.join(process.cwd(), `src/assets/default/setting.json`);
  } 

  fs.readFile(dir, "utf8", (err:any, data:any) => {
    if (err) {
     // console.error("Error reading file:", err);
     res.status(500).json({ error: `Error reading file for ${domain}: ${err.message}` });
        res.end(); // Đóng kết nối sau khi gửi phản hồi
        return;
    }

    try {
      // Parse dữ liệu JSON
      const jsonData = JSON.parse(data);
      if(domain)
      cacheSetting[domain]=jsonData;
      // Xử lý dữ liệu JSON
      res.status(200).json(jsonData);
      res.end(); 
    } catch (err) {
      res.status(500).json({ error: `Error reading file for ${domain}: ${err}` });
      res.end(); // Đóng kết nối sau khi gửi phản hồi
      return;
    }
  });
 // res.status(200).json({"err":"no - data"});
}