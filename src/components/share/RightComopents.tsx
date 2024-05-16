import SlideBar from "./SlideBar";

export function RightComponents({ dataToview, current }: any)
{
    return (
        <>
            <SlideBar dataToview={dataToview} current={current}/>
        </>
    )
}
