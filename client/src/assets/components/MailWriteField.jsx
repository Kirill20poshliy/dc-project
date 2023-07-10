import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import exitIcon from "../icons/exit-icon.svg"
import attachmentsIcon from '../icons/attachments-icon.svg'
import importantIcon from '../icons/important-icon.svg'
import impotantCheckedIcon from '../icons/important-checked-icon.svg'
import {useWriteMailMutation} from '../../store/api'
import { useSelector } from "react-redux";

const MailWriteField = () => {

    const [writeMail] = useWriteMailMutation()
    const user = useSelector(state => state.user)
    const newUser = Object.keys(user)
                        .filter(key => key !== 'memory')
                        .reduce( (res, key) => { res[key] = user[key]; return res; }, {})

    const [mailSendTo, setMailSendTo] = useState('')
    const [mailTitle, setMailTitle] = useState('')
    const [mailBody, setMailBody] = useState('')
    const [mailImportant, setMailImportant] = useState(false)
    const [mailAttachments, setMailAttachments] = useState([])

    const [attachmentsWindow, setAttachmentsWindow] = useState(false)

    const sendMailHandler = async () => {

        const time = Date()

        const body = {
            mailer: newUser,
            sentTo: [mailSendTo],
            title: mailTitle,
            body: mailBody,
            read: true,
            time: time,
            important: mailImportant,
            deleted: false,
            attachments: mailAttachments,
        }
        await writeMail(body)
        setMailSendTo('')
        setMailTitle('')
        setMailBody('')
        setMailImportant(false)
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
                    <NavLink 
                        to='/main'
                        className="btn btn-primary content-center"
                        onClick={() => sendMailHandler()}
                    >
                        Отправить
                    </NavLink>
                    <button 
                        className="btn btn-option content-center"
                        onClick={() => setMailImportant(mailImportant ? false : true)}
                    >
                        <img src={!mailImportant ? importantIcon : impotantCheckedIcon} alt="important"/>
                    </button>
                    <button 
                        className="btn btn-option content-center row"
                        onClick={() => setAttachmentsWindow(!attachmentsWindow ? true : false)}
                    >
                        <img src={attachmentsIcon} alt="attachments"/>
                        {mailAttachments.length ? ` +${mailAttachments.length}` : ''}
                    </button>
                    <NavLink to='/main' className='btn btn-option content-center row'>
                        <img src={exitIcon} alt="Выйти"/>
                        Отмена
                    </NavLink>
                </div> 
            </div>
        </div>
    )
}

export default MailWriteField