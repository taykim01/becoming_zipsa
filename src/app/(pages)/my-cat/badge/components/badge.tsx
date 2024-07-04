import Badge from "@/lib/badge/badge"

export default function MyCatBadge(props: {
    badgeTitle:string,
    // get?:boolean
}){
    return(
        <Badge title={props.badgeTitle}></Badge>
    )
    //{get && <Badge title={props.badgeTitle}></Badge>}
}