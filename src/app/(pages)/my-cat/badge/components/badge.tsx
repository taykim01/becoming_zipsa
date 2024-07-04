import Badge from "@/lib/badge/badge"

export default function MyCatBadge(props: {
    badgeTitle: "깨끗한 고양이" | "건강한 고양이" | "씩씩한 고양이",
}) {
    return (
        <Badge title={props.badgeTitle}></Badge>
    )
}