import { useRouter } from 'next/router'
export function NoDataFound(){
    const router = useRouter()

    function Reload(){
        router.reload();
    }
    return(<>
        <h3>Server is Bussy</h3>
        <code>You F5 browser or click refresh</code>
        <button onClick={Reload} >Refresh</button>
    </>)
}