import { currentByDomain } from "@/utils/currentSetting";
import { FetchApi, FetchOneApi } from "@/utils/handleApi";
import { Constants } from "@/constants/constants";

import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { GlobalNav } from "@/components/share/GlobalNav";
import Link from "next/link";
import { SeoBase } from "@/components/share/SeoBase";
import { FormEvent, useState } from "react";
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import { Zoom, toast } from "react-toastify";
export const getServerSideProps = (async (context) => {
    /**Setting Block */
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
    //_current=await getCacheConfig(domain);
    let _raw_rq = await FetchApi(urls);
    _current = currentByDomain(_raw_rq);

    let repo = {
        current: _current ?? {},
    };
    //const repo_data=Encrypt(repo);
    //console.log("rp", repo);
    return { props: { repo } }
}) satisfies GetServerSideProps<{ repo: any }>

export default function Register({
    repo
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const router = useRouter()
    const [cookies, setCookies] = useCookies(['token', 'userName', 'email', 'userId']);
    const[userName,setUserName]=useState(null);
    const[email,setEmail]=useState(null);
    const[password,setPassword]=useState(null);
    const[password2,setPassword2]=useState(null);
    

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        setUserName(null);setEmail(null);setPassword(null);setPassword2(null);
        event.preventDefault()
        const formData = new FormData(event.currentTarget);

        const username = formData.get('username');
        const email = formData.get('email');
        const password = formData.get('password');
        const password2 = formData.get('password2');
        //check null
        let _icheck = true;
        let _mess = "Error ! ";
        if (!username) {

            setUserName('The Username field is required.')
            _icheck = false;
        }
        if (!email) {
            setEmail('The E-Mail field is required.');
             _icheck = false;
        }
        if (!password) {
            setPassword('The Password field is required.');
             _icheck = false;
        }
        if (!password2) {
            setPassword2('The passwordconf Confirmation field is required.');
             _icheck = false;
        }
        if(password && password2 && (password!=password2)){
            setPassword2('The Password field does not match the passwordconf Confirmation field.');
             _icheck = false;
        }
        console.log({ username, password });
        if (!_icheck) {
            //validate
            toast(`${_mess}`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Zoom,
            });
        } else {

            let res = await FetchOneApi(`${Constants.UrlApi}${Constants.path_get_login}/${username}/${password}`);
            console.log(res);
            if (res.success) {
                setCookies('token', res.data?.token);
                setCookies('userName', res.data?.userName);
                setCookies('email', res.data?.email);
                setCookies('userId', res.data?.userId);
                //console.log(router);
                router.back();
            }
        }
    }
    return (<>
        <SeoBase current={repo?.current} />
        <GlobalNav current={repo?.current} />
        <section className="mt-5 mb-5">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 offset-lg-2">
                        <div className="row">
                            <div className="col-12 col-xxl-6 pe-0 d-none d-xxl-block">
                                <div className="login-img" style={{ "backgroundImage": "url('/login-bg.svg')" }}></div>
                            </div>
                            <div className="col-12 col-xxl-6 ps-xl-0">
                                <div className="login-form">
                                    <h3 className="w-100 text-center mt-2 mb-2">Create Account</h3>
                                    <form className="row" onSubmit={onSubmit}>
                                        <div className="col-12 mt-2 mb-2">
                                            <label className="col-12 mt-2 mb-2 w-100">Username</label>
                                            <input className="w-100" id="username" name="username" type="text" placeholder="Username" />
                                            <p className="text-danger">{userName}</p>
                                        </div>
                                        <div className="col-12 mt-2 mb-2">
                                            <label className="col-12 mt-2 mb-2 w-100" >Email</label>
                                            <input className="w-100" id="email" name="email" type="text" placeholder="Email" />
                                            <p className="text-danger">{email}</p>
                                        </div>
                                        <div className="col-12 mt-2 mb-2">
                                            <label className="col-12 mt-2 mb-2 w-100" >Password</label>
                                            <input className="w-100" id="password" name="password" type="password" placeholder="**********" />
                                            <p className="text-danger">{password}</p>
                                        </div>
                                        <div className="col-12 mt-2 mb-2">
                                            <label className="col-12 mt-2 mb-2 w-100">Re-Password</label>
                                            <input className="w-100" id="password2" name="repassword" type="password" placeholder="**********" />
                                            <p className="text-danger">{password2}</p>
                                        </div>
                                        <div className="col-12 mt-2 mb-2">
                                            <button type="submit" className="w-100">Register</button>
                                        </div>
                                    </form>
                                    <hr className="w-100 mt-3 mb-3" />
                                    <div className="login-form-links w-100">
                                        <Link href="/login">Sign In</Link>
                                        <Link href="/forgot-password">Forgot Password?</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>)
}