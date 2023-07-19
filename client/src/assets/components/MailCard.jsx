import React, {useEffect, useState} from 'react'
// import resendIcon from '../icons/resend-icon-blue.svg'
import trashIcon from '../icons/trash-icon-blue.svg'
import attachmentsIcon from '../icons/attachments-icon.svg'
import downloadIcon from '../icons/download-icon.svg'
// import shareIcon from '../icons/share-icon-blue.svg'
import { useDispatch, useSelector} from 'react-redux'
import {useActionMailsMutation, useDeleteHardMailMutation, useLazyGetAttachmentsQuery, useLazyGetProfilesQuery} from '../../store/api'
import {resetHandler, setPopup} from "../../store/mailsSlice";

const MailCard = (props) => {

    const [menuActive, setMenu] = useState('')
    const [sender, setSender] = useState('')
    const [recipient, setRecipient] = useState('')

    const filter = useSelector(state => state.mails.filter)
    const userId = useSelector(state => state.user.profileId)
    const dispatch = useDispatch()

    const [deleteHardMail] = useDeleteHardMailMutation()
    const [actionMail] = useActionMailsMutation()

    const [getSender, senderProfile] = useLazyGetProfilesQuery()
    const [getRecipient, recipientProfile] = useLazyGetProfilesQuery()
    const [getAttach, attachmentRes] = useLazyGetAttachmentsQuery()

    const menuHandler = () => {
        if (menuActive === '') {
            setMenu('active')
        } else {
            setMenu('')
        }
    }

    const deleteHandler = async () => {
        if (filter === `&deleted=true&recipient=${userId}` || filter === `&deleted=false&sender=${userId}`) {
            await deleteHardMail(props.letter.message_id).unwrap()
            dispatch(resetHandler())
            dispatch(setPopup({
                popup: true, 
                message: 'Сообщениe удалено безвозвратно!'
            }))
        } else {
            const prop = {id: props.letter.message_id, action: {deleted: true}}
            await actionMail(prop).unwrap()
            dispatch(resetHandler())
            dispatch(setPopup({
                popup: true, 
                message: 'Сообщениe удалено!'
            }))
        }
    }

    const {activeCard, letter} = props

    let dateTime = new Date(letter.date_received)

    dateTime = dateTime.getHours() 
                + ':'
                + (dateTime.getMinutes().toString().length === 1 
                    ? ('0' + dateTime.getMinutes().toString()) 
                    : (dateTime.getMinutes()))
                + ' ' 
                + dateTime.getDate()
                + '/' 
                + dateTime.getMonth() 
                + '/' 
                + dateTime.getFullYear().toString().slice(2)
          
    useEffect(() => {
        if (props.letter) {
            getSender(props.letter.sender + 1)
            getRecipient(props.letter.recipient + 1)
            if (props.letter.attach.length) {
                getAttach(props.letter.attach[0])
            }
        }
    }, [props.letter, getSender, getRecipient, getAttach])
    
    useEffect(() => {
        if (senderProfile.isSuccess && recipientProfile.isSuccess) {
            setSender(
                senderProfile.data.results[0].last_name
                + ' '
                + senderProfile.data.results[0].first_name
                + ' '
                + senderProfile.data.results[0].middle_name
            )
            setRecipient(
                recipientProfile.data.results[0].last_name
                + ' '
                + recipientProfile.data.results[0].first_name
                + ' '
                + recipientProfile.data.results[0].middle_name
            )
        }
    }, [senderProfile.isSuccess,
        recipientProfile.isSuccess,
        recipientProfile.data,
        senderProfile.data
    ])
        
    return (

        <div 
            className='mail-card'
        >
            {
                activeCard ?
                    <>
                        <div className='card column card-active'>
                            <div className='heading column content-start'>
                                <div className='row space-between'>
                                    <p>От кого: {sender}</p>
                                    {/* <p>{sender}</p> */}
                                </div>
                                <p>Кому: {recipient}</p>
                                <hr/>
                                <div className='row space-between'>
                                    <div>{letter.subject}</div>
                                    <p>{dateTime}</p>
                                </div>
                            </div>
                            <p className='text-body-start'>{letter.body}</p>
                            {letter.attach && attachmentRes.isSuccess ? 
                                <>
                                    {
                                        letter.attach.map(attachment => (
                                        <a
                                            href={attachmentRes.data.file}
                                            download={attachmentRes.data.file_name}
                                            rel="noreferrer"
                                            className='btn btn-attachment space-between row' 
                                            target='_blank'
                                            key={letter.attach.indexOf(attachment)}
                                        >
                                            <div className='row btn-layout'>
                                                <img className='icon' src={attachmentsIcon} alt='Вложение'/>
                                                {attachmentRes.data.file_name}                                            
                                            </div>
                                            <img className='icon' src={downloadIcon} alt='Скачать'/>
                                        </a>))                                           
                                    }                                      
                                </>
                                : 
                                ''
                            }  
                        </div>
                        <div className={`card-menu row ${menuActive}`}>
                            <div className={`burger ${menuActive}`} onClick={menuHandler}></div>
                            <div className={`body row content-center ${menuActive ? '' : 'op-0'}`}>
                                {/* <button className='btn btn-option content-center btn-layout' title="Ответить">
                                    <img className='icon' src={resendIcon} alt='Ответить'/>
                                </button> */}
                                <button 
                                    className='btn btn-option content-center btn-layout' 
                                    title="Удалить"
                                    onClick={() => deleteHandler()}
                                >
                                    <img className='icon' src={trashIcon} alt='Удалить'/>
                                </button>
                                {/* <button className='btn btn-option content-center btn-layout' title="Переслать">
                                    <img className='icon' src={shareIcon} alt='Переслать'/>
                                </button> */}
                            </div>
                        </div>                       
                    </> 
                    : 
                    <div className='card column content-center'>Ничего не выбрано</div>
            }
        </div>

    )

}

export default MailCard