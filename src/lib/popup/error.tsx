import { useRecoilState } from "recoil"
import { popupErrorState } from "../../recoil/popup_error"
import Popup from "."

export default function Error() {
    const [popupError, setPopupError] = useRecoilState(popupErrorState)
    const close = () => setPopupError({ open: false, message: "" })
    return (
        <Popup.Default
            title="고양이별 성격 알아보기"
            open={popupError.open}
            onClose={close}>
            {popupError.message}
        </Popup.Default>
    )
}