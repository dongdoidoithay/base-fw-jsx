
const cheerio = require("cheerio");

export async function getSource(data:any) {
    let result:any=[];
    try {
        if(data.lang=="br")
        {
            //console.log("cccc");
         /*    const response = await fetch(data.url);
            const body = await response.text(); */
            const response = await fetch(data.url, {
              mode: 'cors',
              headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X x.y; rv:42.0) Gecko/20100101 Firefox/42.0',
                'Access-Control-Allow-Origin': '*'
              }
            });
            const body = await response.text();
            // console.log(body);

            var $ =  cheerio.load(body);
            
            const pros = $("astro-island");
           // console.log("pr",pros.length);
            pros.each(function(item:any) 
            {
              const pop = $(item).attr('props');
              try
              {
                const json = JSON.parse(pop); 
                const imageFiles = json.imageFiles[1];
                if(imageFiles!=null && imageFiles!=undefined)
                {
                  let _array=imageFiles.split(',');
                 
                  for(let v=0;v<_array.length;v++)
                  {
                    if(_array[v].includes("https")){
                        result.push(_array[v].replace(/"/gi,'').replace(/]/gi,''));
                    }
                  }           
                }
              // console.log("ggg",result.join());
              }catch(e){
              //console.log(e);
              }
            }); 
        }
        //console.log("re",result.join());
        return result.join("#");
    } 
    catch (e) 
    {
        console.log("ee",e);
      return result.join("#");
    }
}
export default getSource;