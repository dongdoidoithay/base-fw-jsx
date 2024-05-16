import { FomatDate } from "@/utils/caldate";
import { useEffect, useState } from "react";

export function HistoryView({current}:any) {

    const [list, setList] = useState([]);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            let _list_row = window.localStorage.getItem("Read_View");
            let _list = JSON.parse(_list_row);
            if (_list !== null && _list.length > 0) {
                setList(_list.reverse().slice(0, 6));
            }
        }
    }, []);
    function RemoveItem(idDoc:any)
    {
        if (typeof window !== 'undefined') 
        {
            let cookie_obj:any=[];
            const ls_obj = JSON.parse(window.localStorage.getItem("Read_View"));
            for (let i = 0; i < ls_obj.length; i++) 
            {
                const obj = ls_obj[i];
                //console.log(obj);
                if(obj.idDoc!=idDoc)
                    cookie_obj.push(obj);
            }
            //console.log(cookie_obj);
            window.localStorage.setItem("Read_View", JSON.stringify(cookie_obj));
            setList(cookie_obj?.reverse().slice(0, 6));
        }
    }

    if (list.length > 0)
        return (
            <>
                <h2>RECENT VIEW</h2>
                <div className="row">
                    {list.map((item: any, index: any) => {
                        return (
                            <div className="side-bars-item" key={item.idDoc}>
                                <div className="side-bars-left">
                                    <div className="side-bars-score">
                                        <a onClick={()=>RemoveItem(item.idDoc)} style={{"color":"var(--pbl-color-2)","cursor":"pointer"}}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width={12} height={12}><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                                             fill="currentColor"/></svg>
                                        </a>
                                    </div>
                                </div>
                                <div className="side-bars-right">
                                    <div className="side-bars-name max-caracter-1">
                                        <a href={`${item.url_view}`} title={`${item.nameDoc} |${item.nameChapter}`}>
                                            {item.nameDoc} - {item.nameChapter}
                                        </a>
                                    </div>
                                    <div>
                                        {FomatDate(item.time, current)}
                                    </div>

                                </div>
                            </div>
                        )
                    })}
                </div>
            </>
        )
    else
        return <></>
}