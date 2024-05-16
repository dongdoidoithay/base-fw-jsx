/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useRef } from "react";
import Images from 'next/image'
import { Constants } from "@/constants/constants";


const LazyImage = ({ src, srcSet,title, ...props }:any) => {
    const imageRef = useRef(null);
    // console.log(title);
    let raw_url = src?.replace('{apiRoot}',  Constants.UrlImage);
    if (!raw_url?.includes('http')) {
        raw_url = Constants.UrlImage + raw_url;
    }

    useEffect(() => {
      const lazyImage:any = imageRef.current;
  
     if ('IntersectionObserver' in window && 'IntersectionObserverEntry' in window && 'intersectionRatio' in window.IntersectionObserverEntry.prototype) 
      {
        const lazyImageObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && lazyImage) {
              lazyImage.src = raw_url;
              lazyImage.srcset = `${raw_url} 2x, ${raw_url} 1x`;
              lazyImage.classList.remove('lazy');
              //lazyImage.alt=title;
              observer.unobserve(lazyImage);
            }
          });
        });
  
        lazyImageObserver.observe(lazyImage);
      } 
      else 
      {
        // Fallback for browsers that don't support IntersectionObserver
        lazyImage.src = raw_url;
        lazyImage.srcset = `${raw_url} 2x, ${raw_url} 1x`;
        //lazyImage.alt=title;
        lazyImage.classList.remove('lazy');
      }
    }, [src, srcSet]);
  
    // eslint-disable-next-line @next/next/no-img-element
return <img ref={imageRef} 
                  className="lazy" 
                  {...props}  
                  alt={title || 'Default alt text'} /> 

/* return  <Images
                ref={imageRef}
                loader={myLoader}
                alt={title || 'No title'}
                loading="lazy"
                placeholder="blur"
                blurDataURL="/images/loading-black-26.svg"
                {...props}
            />  */
  };
  
  export default LazyImage;