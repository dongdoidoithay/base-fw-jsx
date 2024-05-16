const fs = require("fs");
const path = require("path");
// Biến lưu trữ dữ liệu đã đọc từ file
const cache: { [key: string]: any }={};
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const domain = Array.isArray(req.query.domain)
  ? req.query.domain[0]
  : req.query.domain;
  //const { domain } = req.query;
  // Kiểm tra nếu dữ liệu đã được cache
  if (domain&& cache[domain]) {
    res.status(200).json(cache[domain]);
    res.end();
    console.log("CACHE ......");
    return;
  }

  let dir = path.join(process.cwd(), `src/assets/${domain}/lang.json`);
  if (!fs.existsSync(dir)) {
    dir = path.join(process.cwd(), `src/assets/default/lang.json`);
  }

  fs.readFile(dir, "utf8", (err:any, data:any) => {
    if (err) {
      // console.error("Error reading file:", err);
      res
        .status(500)
        .json({ error: `Error reading file for ${domain}: ${err.message}` });
      res.end(); // Đóng kết nối sau khi gửi phản hồi
      return;
    }

    try {
      // Parse dữ liệu JSON
      const jsonData = JSON.parse(data);
      // Cache dữ liệu
      if (domain) {
        cache[domain] = jsonData;
      }
      // Xử lý dữ liệu JSON
      res.status(200).json(jsonData);
      res.end();
    } catch (err) {
      res
        .status(500)
        .json({ error: `Error reading file for ${domain}: ${err}` });
      res.end(); // Đóng kết nối sau khi gửi phản hồi
      return;
    }
  });
  // res.status(200).json({"err":"no - data"});
}
