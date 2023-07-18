import React, {useState} from "react";
import { useNavigate, NavLink } from "react-router-dom";
import exitIcon from "../icons/exit-icon.svg"
import attachmentsIcon from '../icons/attachments-icon.svg'
import importantIcon from '../icons/important-icon.svg'
import impotantCheckedIcon from '../icons/important-checked-icon.svg'
import {useLazyGetProfilesQuery, useLazyGetUserQuery, useWriteMailMutation} from '../../store/api'
import { useDispatch, useSelector } from "react-redux";
import { setPopup } from "../../store/mailsSlice";

const MailWriteField = () => {

    const [writeMail, {isLoading}] = useWriteMailMutation()
    const user = useSelector(state => state.user.profileId)
    
    const [mailSendTo, setMailSendTo] = useState('')
    const [mailTitle, setMailTitle] = useState('')
    const [mailBody, setMailBody] = useState('')
    const [mailImportant, setMailImportant] = useState(false)
    const [mailAttachments, setMailAttachments] = useState([3])

    // const [attachmentsWindow, setAttachmentsWindow] = useState(false)
    const [getRecipientUser] = useLazyGetUserQuery()
    const [getRecipientProfile] = useLazyGetProfilesQuery()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const sendMailHandler = async () => {

        try {
            await getRecipientUser(mailSendTo).then((resolved) => {
                if (resolved.data.count) {
                    return getRecipientProfile(resolved.data.results[0].id)
                } else {
                    throw new Error(`Пользователь не найден!`)
                }
            }).then(async (data) => {
                if (data.data.count) {
                    const body = {
                        sender: user,
                        recipient: data.data.results[0].id,
                        subject: mailTitle,
                        body: mailBody,
                        attach: mailAttachments,
                        status: false,
                        status_sender: true,
                        status_recipient: false,
                        important: mailImportant,
                        important_sender: mailImportant,
                        important_recipient: mailImportant,
                        deleted: false,
                        deleted_sender: false,
                        deleted_recipient: false,
                    }
                    await writeMail(body)
                    setMailSendTo('')
                    setMailTitle('')
                    setMailBody('')
                    setMailImportant(false)
                    navigate('/main')
                    dispatch(setPopup({popup: true, message: 'Сообщение отправлено!'}))  
                } else {
                    throw new Error('Упс, что-то пошло не так!')
                } 
            })
        } catch (e) {
            dispatch(setPopup({popup: true, message: `Ошибка отправки!\n${e}`}))
        }
    }

    const attachmentsHandler = (e) => {
        if (e.target.files) {
            setMailAttachments(e.target.files[0]);
            console.log(e.target.files[0])
        }
    }

    return(
        <div className="mail-write-field column">
            <div className="column write-field">
                <input 
                    type="text" 
                    name="to"
                    placeholder="Кому:"
                    value={mailSendTo}
                    onChange={e => setMailSendTo(e.target.value)}
                />
                <input 
                    type="text"
                    name="theme"
                    placeholder="Тема:"
                    value={mailTitle}
                    onChange={e => setMailTitle(e.target.value)}
                />
                <textarea 
                    placeholder="Напишите что-нибудь"
                    name="body"
                    value={mailBody}
                    onChange={e => setMailBody(e.target.value)}
                /> 
                <div className="row">
                    <button 
                        to='/main'
                        className="btn btn-primary content-center"
                        onClick={() => sendMailHandler()}
                    >
                        Отправить
                    </button>
                    <button 
                        className="btn btn-option content-center"
                        onClick={() => setMailImportant(mailImportant ? false : true)}
                    >
                        <img src={!mailImportant ? importantIcon : impotantCheckedIcon} alt="important"/>
                    </button>
                    <label className="file-field btn btn-option content-center row">
                        <input 
                            type="file" 
                            name="file" 
                            id="file"
                            onChange={(e) => attachmentsHandler(e)}
                        />
                        <div className="filemark">
                            <img src={attachmentsIcon} alt="attachments"/>
                            {/* {mailAttachments.length ? ` +${mailAttachments.length}` : ''} */}
                        </div>
                    </label>
                    {/* <button 
                        className="btn btn-option content-center row"
                        onClick={() => attachmentsHandler()}
                    >
                        <img src={attachmentsIcon} alt="attachments"/>
                        {mailAttachments.length ? ` +${mailAttachments.length}` : ''}
                    </button> */}
                    <NavLink to='/main' className='btn btn-option content-center row'>
                        <img src={exitIcon} alt="Выйти"/>
                        Отмена
                    </NavLink>
                </div> 
            </div>
            {isLoading && (
                <div className="loader">
                    <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                </div>
            )}
        </div>
    )
}

export default MailWriteField