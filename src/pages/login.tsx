import { currentByDomain } from "@/utils/currentSetting";
import { FetchApi, FetchOneApi, PostApi } from "@/utils/handleApi";
import { Constants } from "@/constants/constants";

import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { GlobalNav } from "@/components/share/GlobalNav";
import { SeoBase } from "@/components/share/SeoBase";
import Link from "next/link";
import { FormEvent } from "react";
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import { postCallApi } from "./api/recall";
export const getServerSideProps = (async (context) => {
    var _ct_host = context.req.headers.host;
    let domain = "default";
    if (_ct_host && !_ct_host.includes("localhost")) {
        domain = _ct_host.replace("wwww.", "");
    }

    const urls = [
        `${Constants.UrlApp}/api/setting/${domain}`,
        `${Constants.UrlApp}/api/url/${domain}`,
        `${Constants.UrlApp}/api/menu/${domain}`,
        `${Constants.UrlApp}/api/lang/${domain}`,
        `${Constants.UrlApp}/api/seo/${domain}`,
    ];
    let _current: any;
    let _data_rq: any;

    let _raw_rq = await FetchApi(urls);
    _current = currentByDomain(_raw_rq);


    let repo = {
        current: _current ?? {}
    };

    return { props: { repo } }
}) satisfies GetServerSideProps<{ repo: any }>

export default function Login({
    repo
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const router = useRouter()
    const [cookies, setCookies] = useCookies(['token','userName','email','userId']);
    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget);

        const username = formData.get('username');
        const password = formData.get('password');
        const payload = {
            userName: username,
            password: password,
          }
        const _jsonplayload=JSON.stringify(payload);

        let datacall=await  postCallApi(`${Constants.UrlApi}${Constants.path_login}`,_jsonplayload);
        console.log(datacall);
        //console.log({username,password});
       /*  let res1=await PostApi(`${Constants.UrlApi}${Constants.path_login}`,payload);
        console.log(res1);  */
      /*  let res=await FetchOneApi(`${Constants.UrlApi}${Constants.path_get_login}/${username}/${password}`);
        console.log(res);
         if(res.success){
            setCookies('token', res.data?.token);
            setCookies('userName', res.data?.userName);
            setCookies('email', res.data?.email);
            setCookies('userId', res.data?.userId);
            //console.log(router);
            router.back();
        }  */
    }
    //console.log(repo);
    return (
        <>
            <SeoBase current={repo?.current} />
            <GlobalNav current={repo?.current} />
            <section className="mt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2">
                            <div className="row">
                                <div className="col-12 col-xxl-6 pe-0 d-none d-xxl-block">
                                    <div className="login-img" style={{ "backgroundImage": "url('/login-bg.svg')" }}></div>
                                </div>
                                <div className="col-12 col-xxl-6 ps-xl-0">
                                    <div className="login-form">
                                        <h3 className="w-100 text-center mt-2 mb-2">Login to your account!</h3>
                                        <form className="row" onSubmit={onSubmit}>
                                            <div className="col-12 mt-2 mb-2">
                                                <label className="col-12 mt-2 mb-2 w-100" htmlFor="username">Username</label>
                                                <input className="w-100" id="username" name="username" type="text" placeholder="Username" />
                                            </div>
                                            <div className="col-12 mt-2 mb-2">
                                                <label className="col-12 mt-2 mb-2 w-100" htmlFor="password">Password</label>
                                                <input className="w-100" id="password" name="password" type="password" placeholder="**********" />
                                            </div>
                                            <div className="col-12 mt-2 mb-2">
                                                <button type="submit" className="w-100" >Sign In</button>
                                            </div>
                                        </form>
                                        <hr className="w-100 mt-3 mb-3" />
                                        <div className="login-form-links w-100">
                                            <Link href="/register">Create an Account!</Link>
                                            <Link href="/forgot-password">Forgot Password?</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
