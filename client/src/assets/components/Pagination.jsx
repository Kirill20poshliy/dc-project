import { useDispatch, useSelector } from "react-redux"
import { setPage } from "../../store/mailsSlice"
import prevArrowIcon from '../icons/prev-arrow-icon.svg'
import nextArrowIcon from '../icons/next-arrow-icon.svg'

const Pagination = () => {

    const page = useSelector(state => state.mails.page)
    const prev = useSelector(state => state.mails.prev)
    const next = useSelector(state => state.mails.next)
    const dispatch = useDispatch()

    const incPageHandler = () => {
        dispatch(setPage(page + 1))
    }

    const decPageHandler = () => {
        dispatch(setPage(page - 1))
    }

    return (
        <div className="row content-center g-5 pagination">
            <button 
                className="btn btn-layout btn-context"
                onClick={() => decPageHandler()}
                disabled={!prev}
            >
                <img src={prevArrowIcon} alt="prev"/>
            </button>
            {page}
            <button 
                className="btn btn-layout btn-context"
                onClick={() => incPageHandler()}
                disabled={!next}
            >
                <img src={nextArrowIcon} alt="prev"/>
            </button>
        </div>
    )

}

export default Pagination