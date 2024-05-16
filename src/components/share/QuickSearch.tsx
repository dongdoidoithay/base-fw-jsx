import { UrlInfo } from "@/utils/commons";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import LazyImage from "../ui/ImageLazy";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { currentKeyType } from "@/utils/currentSetting";
import { Constants } from "@/constants/constants";

export function QuickSearch({ classShow, current }: any) {
    const [codeType, setCodeType] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [searchResult, setSearchResult] = useState(false);
    const [searchData, setSearchData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const ref = useRef<HTMLUListElement>(null);
    useOnClickOutside(ref, () => HandleClose());

    const inputRef = useRef<HTMLInputElement>(null);

    //focus
    useEffect(() => {
        if (current) {
            setCodeType(current?.setting?.key_type_defalt);
        }
        // inputRef.current?.focus();
        //setValueFind(router.query.q?.toString());
    }, []);



    function HandleClose() {
        setIsSearching(false);
        setSearchResult(false);
        setSearchData([]);
        setSearchTerm('');
    }
    function onChangeType(event: { target: { value: string } }) {
        const _valueType = event.target.value;
        //console.log(_valueType);
        if (_valueType) {
            setCodeType(_valueType);
        }
    }
    /**Search About */
    const abortControllerRef: MutableRefObject<AbortController | null> = useRef(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchResults = async (term: any, signal: any) => {
        // Logic fetch data từ API hoặc nguồn khác
        // Sử dụng signal.aborted để kiểm tra nếu request bị hủy
        if (signal.aborted) {
            throw new Error('Request aborted');
        }
        const _current = currentKeyType(current, codeType);
        // Giả lập gọi API bằng Promise
        let url = `${Constants.UrlApi}${_current.uri_select.prefix_url_api}${Constants.path_quick_search}/${term}/20`;

        try {
            // Gọi API sử dụng fetch và AbortSignal
            const response = await fetch(url, { signal });

            // Kiểm tra nếu request đã bị hủy sau khi gọi API
            if (signal.aborted) {
                setIsSearching(false);
                throw new Error('Request aborted');
            }
           //console.log('Call search', url);
            // Xử lý kết quả từ API
            const data = await response.json();
            //console.log(data);
            if (data.data) {
                setSearchData(data.data);
                setSearchResult(true);
                setIsSearching(false);
            }
            return data.results;
        } catch (error) {
            console.log('ERR:',error);
            setIsSearching(false);
            if (error !== 'AbortError') {
              //  console.error('Error fetching results:', error);
            }
        }
    };
    useEffect(() => {
        //console.log("xxxx");
        const delaySearch = setTimeout(() => {
            if (searchTerm) {
                // Tạo AbortController mới để hủy request cũ
                const abortController = new AbortController();
                abortControllerRef.current = abortController;

                setIsSearching(true);
                // Gọi API hoặc logic tìm kiếm ở đây
                fetchResults(searchTerm, abortController.signal);
            }
             else {
                setSearchData([]);
            }
        }, 600); // Delay 1 giây

        // Hủy timeout và AbortController cũ khi component unmount hoặc searchTerm thay đổi
        return () => {
            clearTimeout(delaySearch);
            abortControllerRef.current?.abort();
        };
    }, [searchTerm]);

    return (<>
        <div className={`container search-boxx notranslate ${classShow}`}>
            <div className="row">
                <div className="col-md-12">
                    <form className="search ">
                        <div className="input-group">
                           <select className="form-select " onChange={(e) => onChangeType(e)} value={codeType}>
                                {(codeType == "") && <option key={`choose`}>Choose...</option>}
                                {current.menu_lang_select && current?.menu_lang_select?.select_type.map((item: any) => {
                                    return <option value={item.key_type} key={item.key_type}>{item.lable}</option>
                                })}
                            </select>
                            <input ref={inputRef}
                                type="text" autoComplete="off"
                                className="form-control"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search..." />
                            {isSearching && <div className="input-group-append">
                                <div className="input-group-text">
                                    <div className="spinner-border text-warning" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            </div>
                            }
                            {searchResult && <button className="input-group-text post-btn" type="button" onClick={HandleClose}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="24" height="24"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" fill="currentColor" /></svg>
                            </button>
                            }
                        </div>
                        {searchResult && <div className="search-result">
                            <ul ref={ref}>
                                {searchData && searchData.map((item: any) => {
                                    return (
                                        <li key={item.idDoc}>
                                            <a href={`${UrlInfo(item.idDoc, current)}`} title={item.name} style={{ "cursor": "pointer" }}>
                                                <LazyImage src={item.image} srcSet={item.image} title={item.name} />
                                                <span>{item.name}</span>
                                            </a>
                                        </li>
                                   )
                                })}

                            </ul>
                        </div>
                        }

                    </form>
                </div >
            </div >
        </div >

    </>);
}