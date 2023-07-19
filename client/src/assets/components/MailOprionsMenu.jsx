import React, { useEffect } from "react";
import shareIcon from '../icons/share-icon.svg'
import trashIcon from '../icons/trash-icon.svg'
import {useDispatch, useSelector} from "react-redux";
import {resetHandler, setModal, setPopup} from "../../store/mailsSlice";
import {useActionMailsMutation, useDeleteHardMailMutation} from '../../store/api'
import Pagination from "./Pagination";

const MailOptionsMenu = () => {

    const activeMenu = useSelector(state => state.mails.isChecked)
    const checkedItems = useSelector(state => state.mails.checkedMails)
    const filter = useSelector(state => state.mails.filter)
    const userId = useSelector(state => state.user.profileId)
    const dispatch = useDispatch()
    const [actionMail] = useActionMailsMutation()
    const [deleteHardMail] = useDeleteHardMailMutation()

    const deleteHandler = async () => {
        if (filter === `&deleted=true&recipient=${userId}` || filter === `&deleted=false&sender=${userId}`) {
            for (let i = 0; i < checkedItems.length; i++) {
                await deleteHardMail(checkedItems[i]).unwrap()
            }
            dispatch(resetHandler())
            dispatch(setPopup({
                popup: true, 
                message: `${checkedItems.length === 1 ? 'Сообщениe удалено' : 'Сообщения удалены'} безвозвратно!`
            }))
        } else {
            for (let i = 0; i < checkedItems.length; i++) {
                const prop = {id: checkedItems[i], action: {deleted: true}}
                await actionMail(prop).unwrap()
            }
            dispatch(resetHandler())
            dispatch(setPopup({
                popup: true, 
                message: `${checkedItems.length === 1 ? 'Сообщениe удалено' : 'Сообщения удалены'}!`
            }))
        }
    }

    useEffect(() => {

    }, [])

    return (
        <div className="row mail-options">
            <Pagination/>
            <button 
                className="btn btn-layout btn-context" 
                disabled={activeMenu && filter !== '?deleted=true' ? "" : "disabled"}
                onClick={() => dispatch(setModal())}
            >
                <img className='icon' src={shareIcon} alt=""/>
                Переслать
            </button>
            <button 
                className="btn btn-layout btn-context" 
                disabled={activeMenu ? "" : "disabled"}
                onClick={() => deleteHandler()}
            >
                <img className='icon' src={trashIcon} alt=""/>
                Удалить
            </button>
        </div>
    )

}

export default MailOptionsMenu