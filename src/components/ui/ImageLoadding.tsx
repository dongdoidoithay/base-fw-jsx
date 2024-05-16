/*  */
import {LRUCache } from "lru-cache";
import { useState, useEffect } from "react";

const cache = new LRUCache({ max: 100 });
import Images from 'next/image'
const myLoader = ({ src}:any) => {
  return `${src}`
}

const ImageLoading = ({url, title,classStyle,style}:any) => {
//console.log(url);
  let raw_url=url?.replace('{apiRoot}',"https://api.unionmanga.xyz");
  if(!raw_url?.includes('http')){
    raw_url="https://api.unionmanga.xyz"+raw_url;
  }
  //console.log(raw_url);
  const loadingUrl = "/ajax-loader.gif";
  const [imgSrc, setImgSrc] = useState<string>(loadingUrl);
  const errorUrl = "/next.svg";
  const noImageUrl = "/noimage.jpg";
  


  useEffect(() => {
   
    let _url=raw_url?.replace(/[']/g,'');
    if (cache.has(_url) ){
      const _x = cache.get(_url) as string;
      setImgSrc(_x);
      return;
    }

    const img = new Image();
    img.onload = () => {
      setImgSrc(_url);
      cache.set(_url, _url);
    };
    img.onerror=( e)=>{
      console.log('error image:',_url)
      setImgSrc(noImageUrl);
      cache.set(_url, noImageUrl);
    }
    img.src = _url;
    img.alt = title;
  }, [raw_url]);


  //return <img src={imgSrc} alt={title} className={classStyle}/>;
  return <Images  
            loader={myLoader}
            src={imgSrc}
            alt={title||'No title'}
            width={20}
            height={20}
            style={style}
            className={`bg-white ${classStyle}`}
            loading="lazy"
            placeholder="blur"
            blurDataURL="/ajax-loader.gif"
            />
};

export default ImageLoading;
