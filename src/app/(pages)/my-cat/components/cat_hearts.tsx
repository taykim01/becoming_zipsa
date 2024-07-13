import "./cat_hearts.css";
import Images from "@/lib/images";
import Image from "next/image";

export default function CatHearts(){
    return(
        <div className="heart_animation">
            <Image src={Images.heart} alt="heart" width={50} height={50} />
        </div>
    )
}