import Button from "@/lib/button"
import Input from "@/lib/input"

export default function Page() {
    return (
        <div className="bg-gray">
            <Button.Default />
            <Input.Text
                title="Title"
                guide="Guide"
            />
        </div>
    )
}