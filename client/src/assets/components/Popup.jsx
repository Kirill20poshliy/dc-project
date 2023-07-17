import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setPopup } from "../../store/mailsSlice"

const Popup = () => {

    const message = useSelector(state => state.mails.popupMessage)
    const dispatch = useDispatch()

    useEffect(() => {
        setTimeout(() => {
            dispatch(setPopup({popup: false, message: ''}))
        }, 3000)
    }, [dispatch])

    return (

        <div className="popup">{message}</div>

    )

}

export default Popup