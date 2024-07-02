import Button from "@/lib/button"
import Input from "@/lib/input"

export default function Page() {
    return (
        <div className="bg-gray">
            <Button.Default>버튼</Button.Default>
            <Input.Text
                title="Title"
                guide="Guide"
            />
            <Button.UserAction />
        </div>
    )
}