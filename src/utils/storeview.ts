import { UrlDetail, UrlInfo } from "./commons";

const StoreLocalView=(current:any,data:any)=>{
    let local_data =null;
    const _key="Read_View";
    if (typeof window !== 'undefined') {
         local_data =  window.localStorage.getItem(_key);
    }
    
    //console.log('config.typeManga:',config.typeManga);
    //kiem tra u

    if ((local_data == null && data.idDetail != null && data.idDetail != undefined) || local_data == "null") 
    {
       // console.log("local_data", local_data)
       var item_obj:any = {};
       item_obj[data.idDoc] = data.idDetail;
       item_obj["idDoc"] = data.idDoc;
       item_obj["idDetail"] = data.idDetail;
       item_obj["nameChapter"] =data.nameChapter;
       item_obj["nameDoc"] = data.nameDoc;
       item_obj["time"] = data.date;
       item_obj["image"] = data.manga?.image;
       item_obj["url_detail"] = `${UrlInfo(data.idDoc,current)}`;
       item_obj["url_view"] = `${UrlDetail(data.idDoc,data.idDetail,current)}`;
       if (typeof window !== 'undefined') 
       window.localStorage.setItem(_key, JSON.stringify([item_obj]));
    }
    else {
        if (typeof window !== 'undefined') {
            var cookie_obj = JSON.parse(window.localStorage.getItem(_key));
            var exist = false;
            if (cookie_obj != null) {
                for (var i = 0; i < cookie_obj.length; i++) {
                    var obj = cookie_obj[i];
                    if (obj[data.idDoc] && data.idDetail != null && data.idDetail != undefined) {
                        obj[data.idDoc] = data.idDetail;
                        obj["idDoc"] = data.idDoc;
                        obj["idDetail"] = data.idDetail;
                        obj["nameChapter"] =data.nameChapter;
                        obj["nameDoc"] = data.nameDoc;
                        obj["time"] = data.date;
                        obj["image"] = data.manga?.image;
                        obj["url_detail"] = `${UrlInfo(data.idDoc,current)}`;
                        obj["url_view"] = `${UrlDetail(data.idDoc,data.idDetail,current)}`;
                        exist = true;
                        break;
                    }
                }
            }
            else {
                var item_obj:any = {};
                if (data.idDetail != null && data.idDetail != undefined) {
                    item_obj[data.idDoc] = data.idDetail;
                    item_obj["idDoc"] = data.idDoc;
                    item_obj["idDetail"] = data.idDetail;
                    item_obj["nameChapter"] =data.nameChapter;
                    item_obj["nameDoc"] = data.nameDoc;
                    item_obj["time"] = data.date;
                    item_obj["image"] = data.manga?.image;
                    item_obj["url_detail"] = `${UrlInfo(data.idDoc,current)}`;
                    item_obj["url_view"] = `${UrlDetail(data.idDoc,data.idDetail,current)}`;
                    localStorage.setItem(_key, JSON.stringify([item_obj]));
                    exist = true;
                }
            }
            if (!exist && data.idDetail != null && data.idDetail != undefined) {
                var item_obj:any = {};
                item_obj[data.idDoc] = data.idDetail;
                item_obj["idDoc"] = data.idDoc;
                item_obj["idDetail"] = data.idDetail;
                item_obj["nameChapter"] =data.nameChapter;
                item_obj["nameDoc"] = data.nameDoc;
                item_obj["time"] = data.date;
                item_obj["image"] = data.manga?.image;
                item_obj["url_detail"] = `${UrlInfo(data.idDoc,current)}`;
                item_obj["url_view"] = `${UrlDetail(data.idDoc,data.idDetail,current)}`;
                cookie_obj.push(item_obj);
            }
            window.localStorage.setItem(_key, JSON.stringify(cookie_obj));
        }
    }
}
export default StoreLocalView;