/* export async function getCurrentByDomain(map_setting,map_url,map_menu,map_lang,map_seo) 
{
    let current={};
    try {
        current.map_url=map_url;
        current.map_seo = map_seo;
        current.map_lang = map_lang;
        current.Menu = map_menu.data_menu;
        current.Menu_Lang = map_menu.data_menu_lang;
        current.setting = map_setting;
        current.data_uri = map_url.data_uri;
        current.uri_select = map_url.data_uri.find(p => p.key_type == map_setting.key_type_defalt);
        current.type_select = map_url.data_type.find(p => p.key_type == map_setting.key_type_defalt);
        if (current.type_select != null && current.type_select!=undefined)
        {
            current.seo_select = map_seo.data_seo.find(p => p.key_lang == _curdomain.current.type_select.key_lang).data;
            var lang_select = map_lang.data_lang.find(p => p.key_lang == _curdomain.current.type_select.key_lang);
            if (lang_select != null && lang_select!=undefined)
            { 
                current.menu_lang_select = _curdomain.current.Menu_Lang.find(p => p.key_lang == _curdomain.current.type_select.key_lang);
                current.lable_select = lang_select.data_lable.find(p => p.key_mode == _curdomain.current.type_select.key_mode);
                current.date_select = lang_select.data_date;
                current.lable_info = lang_select.lable_info;
            }
        }
        return current;
    } 
    catch (e) 
    {
      return current;
    }
} */
export function currentByDomain(data:any){
    let current:any={};
   
    try {
        current.setting = data[0];
        current.map_url=data[1];
        current.map_seo = data[4];
        current.map_lang = data[3];
        current.Menu = data[2].data_menu;
        current.Menu_Lang = data[2].data_menu_lang;
        

        current.data_uri = data[1].data_uri;
        current.uri_select = data[1].data_uri.find((p:any) => p.key_type == data[0].key_type_defalt);
        current.type_select = data[1].data_type.find((p:any) => p.key_type == data[0].key_type_defalt);
        if (current.type_select != null && current.type_select!=undefined)
        {
            current.seo_select = data[4].data_seo.find((p:any) => p.key_lang == current.type_select.key_lang).data;
            var lang_select = data[3].data_lang.find((p:any) => p.key_lang == current.type_select.key_lang);
            if (lang_select != null && lang_select!=undefined)
            { 
                current.menu_lang_select = current.Menu_Lang.find((p:any) => p.key_lang == current.type_select.key_lang);
                current.lable_select = lang_select.data_lable.find((p:any) => p.key_mode == current.type_select.key_mode);
                current.date_select = lang_select.data_date;
                current.lable_info = lang_select.lable_info;
            }
        }
        return current;
    } 
    catch (e) 
    {
      return current;
    }
}
export function currentByTypeUri(data:any,typeUri:any){
    let current:any={};
    
    try {
        current.setting = data[0];
        current.map_url=data[1];
        current.map_seo = data[4];
        current.map_lang = data[3];
        current.Menu = data[2].data_menu;
        current.Menu_Lang = data[2].data_menu_lang;
        current.data_uri = data[1].data_uri;

        current.uri_select = data[1].data_uri.find((p:any) => p.key_uri == typeUri);
        current.type_select = data[1].data_type.find((p:any) => p.key_type == current.uri_select.key_type);
        if (current.type_select != null && current.type_select!=undefined)
        {
            current.seo_select = data[4].data_seo.find((p:any) => p.key_lang == current.type_select.key_lang).data;
            var lang_select = data[3].data_lang.find((p:any) => p.key_lang == current.type_select.key_lang);
            if (lang_select != null && lang_select!=undefined)
            { 
                current.menu_lang_select = current.Menu_Lang.find((p:any) => p.key_lang == current.type_select.key_lang);
                current.lable_select = lang_select.data_lable.find((p:any) => p.key_mode == current.type_select.key_mode);
                current.date_select = lang_select.data_date;
                current.lable_info = lang_select.lable_info;
            }
        }
        return current;
    } 
    catch (e) 
    {
      return current;
    }
}
export function currentByKeyType(data:any,keyType:any){
    let current:any={};
    try {
        current.setting = data[0];
        current.map_url=data[1];
        current.map_seo = data[4];
        current.map_lang = data[3];
        current.Menu = data[2].data_menu;
        current.Menu_Lang = data[2].data_menu_lang;
        current.data_uri = data[1].data_uri;

        current.uri_select = data[1].data_uri.find((p:any) => p.key_type == keyType);
        current.type_select = data[1].data_type.find((p:any) => p.key_type == keyType);
        if (current.type_select != null && current.type_select!=undefined)
        {
            current.seo_select = data[4].data_seo.find((p:any) => p.key_lang == current.type_select.key_lang).data;
            var lang_select = data[3].data_lang.find((p:any) => p.key_lang == current.type_select.key_lang);
            if (lang_select != null && lang_select!=undefined)
            { 
                current.menu_lang_select = current.Menu_Lang.find((p:any) => p.key_lang == current.type_select.key_lang);
                current.lable_select = lang_select.data_lable.find((p:any) => p.key_mode == current.type_select.key_mode);
                current.date_select = lang_select.data_date;
                current.lable_info = lang_select.lable_info;
            }
        }
        return current;
    } 
    catch (e) 
    {
      return current;
    }
}
export function currentKeyType(current:any,keyType:any){
    if(!current)
        return null;
    let findCurrent=current;
    try {
/*         current.setting = data[0];
        current.map_url=data[1];
        current.map_seo = data[4];
        current.map_lang = data[3];
        current.Menu = data[2].data_menu;
        current.Menu_Lang = data[2].data_menu_lang;
        current.data_uri = data[1].data_uri; */

        findCurrent.uri_select = current.map_url.data_uri.find((p:any) => p.key_type == keyType);
        findCurrent.type_select = current.map_url.data_type.find((p:any) => p.key_type == keyType);
        if (findCurrent.type_select != null && current.type_select!=undefined)
        {
            findCurrent.seo_select = current.map_seo.data_seo.find((p:any) => p.key_lang == findCurrent.type_select.key_lang).data;
            var lang_select = current.map_lang.data_lang.find((p:any) => p.key_lang == findCurrent.type_select.key_lang);
            if (lang_select != null && lang_select!=undefined)
            { 
                findCurrent.menu_lang_select = findCurrent.Menu_Lang.find((p:any) => p.key_lang == findCurrent.type_select.key_lang);
                findCurrent.lable_select = lang_select.data_lable.find((p:any) => p.key_mode == findCurrent.type_select.key_mode);
                findCurrent.date_select = lang_select.data_date;
                findCurrent.lable_info = lang_select.lable_info;
            }
        }
        return findCurrent;
    } 
    catch (e) 
    {
      return current;
    }
}
/* export function currentByDomainLocal(){
    let current:any={};
    try{
        var value = localStorage.getItem("_root");
        let _root=JSON.parse(value);
        if(_root!=null){
            current.setting = _root.setting ;
            current.map_url=_root.map_url;
            current.map_seo = _root.map_seo;
            current.map_lang = _root.map_lang ;
            current.Menu = _root.Menu;
            current.Menu_Lang =  _root.Menu_Lang;
           
            current.data_uri = _root.map_url.data_uri;
            current.uri_select = _root.map_url.data_uri.find(p => p.key_type == _root.setting.key_type_defalt);
            current.type_select = _root.map_url.data_type.find(p => p.key_type == _root.setting.key_type_defalt);
            if (current.type_select != null && current.type_select!=undefined)
            {
                current.seo_select = _root.map_seo.data_seo.find(p => p.key_lang == current.type_select.key_lang).data;
                var lang_select =  _root.map_lang.data_lang.find(p => p.key_lang == current.type_select.key_lang);
                if (lang_select != null && lang_select!=undefined)
                { 
                    current.menu_lang_select = current.Menu_Lang.find(p => p.key_lang == current.type_select.key_lang);
                    current.lable_select = lang_select.data_lable.find(p => p.key_mode == current.type_select.key_mode);
                    current.date_select = lang_select.data_date;
                    current.lable_info = lang_select.lable_info;
                }
            }
            return current;

        }

    }catch{}
    
}
export function currentByTypeUriLocal(typeUri){
    let current={};
    try{
        var value = localStorage.getItem("_root");
        let _root=JSON.parse(value);
        if(_root!=null){
            current.setting = _root.setting ;
            current.map_url=_root.map_url;
            current.map_seo = _root.map_seo;
            current.map_lang = _root.map_lang ;
            current.Menu = _root.Menu;
            current.Menu_Lang =  _root.Menu_Lang;
           
            current.data_uri = _root.map_url.data_uri;
            current.uri_select = _root.map_url.data_uri.find(p => p.key_uri == typeUri);
            current.type_select = _root.map_url.data_type.find(p => p.key_type == current.uri_select.key_type);
            if (current.type_select != null && current.type_select!=undefined)
            {
                current.seo_select = _root.map_seo.data_seo.find(p => p.key_lang == current.type_select.key_lang).data;
                var lang_select =  _root.map_lang.data_lang.find(p => p.key_lang == current.type_select.key_lang);
                if (lang_select != null && lang_select!=undefined)
                { 
                    current.menu_lang_select = current.Menu_Lang.find(p => p.key_lang == current.type_select.key_lang);
                    current.lable_select = lang_select.data_lable.find(p => p.key_mode == current.type_select.key_mode);
                    current.date_select = lang_select.data_date;
                    current.lable_info = lang_select.lable_info;
                }
            }
            return current;

        }

    }catch{}
    
}
export function currentByKeyTypeLocal(keyType){
    let current={};
    try{
        var value = localStorage.getItem("_root");
        let _root=JSON.parse(value);
        if(_root!=null){
            current.setting = _root.setting ;
            current.map_url=_root.map_url;
            current.map_seo = _root.map_seo;
            current.map_lang = _root.map_lang ;
            current.Menu = _root.Menu;
            current.Menu_Lang =  _root.Menu_Lang;
           
            current.data_uri = _root.map_url.data_uri;
            current.uri_select = _root.map_url.data_uri.find(p => p.key_type == keyType);
            current.type_select = _root.map_url.data_type.find(p => p.key_type == keyType);
            if (current.type_select != null && current.type_select!=undefined)
            {
                current.seo_select = _root.map_seo.data_seo.find(p => p.key_lang == current.type_select.key_lang).data;
                var lang_select =  _root.map_lang.data_lang.find(p => p.key_lang == current.type_select.key_lang);
                if (lang_select != null && lang_select!=undefined)
                { 
                    current.menu_lang_select = current.Menu_Lang.find(p => p.key_lang == current.type_select.key_lang);
                    current.lable_select = lang_select.data_lable.find(p => p.key_mode == current.type_select.key_mode);
                    current.date_select = lang_select.data_date;
                    current.lable_info = lang_select.lable_info;
                }
            }
            return current;

        }

    }catch{}
    
} */