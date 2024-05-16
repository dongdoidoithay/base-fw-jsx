import { SectionHeader } from "./SectionHeader";
import { SectionInfo } from "./SectionInfo";

export function InfoView({ data, current }: any) {
    //console.log(data);
    return (<>
        <SectionHeader data={data?.infoDoc} current={current}/>
        <SectionInfo data={data} current={current} />
    </>)
}
