import { key_slate } from "./commons";

var md5 = require("md5");

export async function FetchApi(urls: any) {
  const _date = new Date().toUTCString();
  let retryAttempts = 0;
  let respone_data;
  async function doApiCall() {
    /*     , {
      headers: {
        _date: _date,
        _ref: url,
        _tranId: md5(_date + url+ key_slate)
      },
    } */
    await Promise.all(urls.map((url: any) => fetch(url)))
      .then((responses) =>
        Promise.all(responses.map((response) => response.json()))
      )
      .then((data) => {
        //  console.log(data);
        respone_data = data;
        return respone_data;
        // Xử lý dữ liệu từ tất cả các URL
        // _current=currentByDomain(data);
        //console.log(_current);
      })
      .catch((error) => {
        if (error.toString().includes("Unexpected token")) {
          return {
            err: "no data found",
          };
        }
        if (retryAttempts < 9) {
          retryAttempts++;
          console.log(
            `Retrying API call to (Attempt ${retryAttempts} : ${error})`
          );
          setTimeout(() => doApiCall(), 900);
          //return doApiCall();
        } else {
          return null;
          //throw new Error(`API call to ${path} failed after ${9} attempts.`);
        }
      });
  }
  await doApiCall();
  return respone_data;
}

export async function FetchOneApi(url: any) {
  const _date = new Date().toUTCString();
  let retryAttempts = 0;
  let respone_data;
  async function doApiCall() {
    /*     await  fetch(url, {
      mode: "cors",
      headers: {
        _date: _date,
        _ref: url,
        _tranId: md5(_date + url+ key_slate),
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X x.y; rv:42.0) Gecko/20100101 Firefox/42.0",
        "Access-Control-Allow-Origin": "*",
      },
    }) */

    await fetch(url)
      .then((responses) => responses.json())
      .then((data) => {
        // console.log(data);
        respone_data = data;
        return respone_data;
        // Xử lý dữ liệu từ tất cả các URL
        // _current=currentByDomain(data);
        //console.log(_current);
      })
      .catch((error) => {
        if (error.toString().includes("Unexpected token")) {
          return {
            err: "no data found",
          };
        }
        if (retryAttempts < 9) {
          retryAttempts++;
          console.log(
            `Retrying API call to (Attempt ${retryAttempts} : ${url})`
          );
          setTimeout(() => doApiCall(), 900);
          //return doApiCall();
        } else {
          return null;
          //throw new Error(`API call to ${path} failed after ${9} attempts.`);
        }
      });
  }
  await doApiCall();
  return respone_data;
}

export async function PostApi(path: string, data: any) {
 // let _path = "https://api.unionmanga.xyz/api/v1/auth/" + path;
/*headers: {
      _date: _date,
      _tranId: _hashPath,
      _path: path,
       "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      mode: 'no-cors' 
    },*/
  const _slat = "8e0550790c94d6abc71d738959a88d209690dc86";
  const _date = new Date().toUTCString();
  const _hashPath = md5(_slat + _date + path);
  console.log({path,data});
  let res = await fetch( 'https://app.unionmanga.xyz/api/v1/auth/login', {
    method: 'POST',
    headers: {
      'Accept': 'text/plain',
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(data),
  });
  console.log(res);
  if (res.ok) {
    return res.json();
  } else {
    console.log("Call ex", res);
  }
  return res.json();
}
