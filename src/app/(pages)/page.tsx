
import Button from "@/lib/button"
import Input from "@/lib/input"

export default function Page() {
    return (
        <div className="bg-black">
            <Button.Default>버튼</Button.Default>
            <Input.Text
                title="Title"
                guide="Guide"
            />
            <Input.MultiSelect
                title="Title"
                guide="Guide"
                items={["Item1", "Item2", "Item3"]}
            />
            <Button.UserAction
                iconType="Cake"
            >버튼</Button.UserAction>
        </div>
    )
}