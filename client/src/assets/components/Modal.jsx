import {useDispatch} from "react-redux";
import {setModal} from "../../store/mailsSlice";
import exitIcon from "../icons/exit-icon.svg"


const Modal = () => {

    const dispatch = useDispatch()

    return (
        <div className="modal-overlay">
            <div className="modal-window column">
            <input type='text' placeholder='Кому:'/>
                <div className='row space-between'>
                    <button className='btn btn-primary row content-center'>
                        Переслать
                    </button>
                    <button className='btn btn-option content-center row' onClick={() => dispatch(setModal())}>
                        <img src={exitIcon} alt="Выйти"/>
                        Отмена
                    </button>          
                </div>
            </div>
        </div>
    )

}

export default Modal