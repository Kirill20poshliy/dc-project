import React, {useEffect, useState} from "react";
import importantIcon from "../icons/important-icon.svg"
import importantCheckedIcon from "../icons/important-checked-icon.svg"
import attachmentsIcon from '../icons/attachments-icon.svg'
import {useDispatch} from "react-redux";
import {checkHandler} from "../../store/mailsSlice";
import {useActionMailsMutation, useLazyGetProfilesQuery} from '../../store/api'

const MailItem = (props) => {

    const [isChecked, setCheck] = useState(false)
    const [isRead, setRead] = useState(props.status)
    const [isImportant, setImportant] = useState(props.important)
    const [senderProfile, setSenderProfile] = useState()
    const [senderProfileName, setSenderProfileName] =useState('')
    const [actionMail] = useActionMailsMutation()
    const [getProfile] = useLazyGetProfilesQuery()

    const dispatch = useDispatch()

    const checkMailHandler = (checkedItem) => {
        setCheck(isChecked ? false : true)
        dispatch(checkHandler({checkedItem}))
    }

    const readHandler = () => {
        if (!isRead) {
            setRead(true)
        }
        props.mapping(props.message_id)
    }

    const importantHandler = async () => {
        let val = isImportant ? false : true
        const prop = {id: props.message_id, action: {important: val}}
        await actionMail(prop).unwrap()
        setImportant(val)
    }

    const {subject, date_received, message_id, attach} = props

    let date = new Date(date_received)

    let time = date.getHours() 
                + ':' 
                + (date.getMinutes().toString().length === 1 
                    ? ('0' + date.getMinutes().toString()) 
                    : (date.getMinutes()))

    date = date.getDate() 
            + '/' 
            + date.getMonth() 
            + '/' 
            + date.getFullYear().toString().slice(2)

    let dateNow = new Date()
    dateNow = dateNow.getDate() 
                + '/' 
                + dateNow.getMonth() 
                + '/' 
                + dateNow.getFullYear().toString().slice(2)

    if (date === dateNow) {
        date = time
    } else {
        date = time + ' ' + date
    }

    useEffect(() => {
        async function getAllSender() {
            await getProfile(props.sender + 1)
            .then((profile) => {
                setSenderProfile(profile.data.results[0])
            })
        }
        getAllSender()
    }, [getProfile, props.sender])

    useEffect(() => {
        if (senderProfile) {
            setSenderProfileName(senderProfile.last_name 
                                    + ' ' 
                                    + senderProfile.first_name[0] 
                                    + '.' 
                                    + senderProfile.middle_name[0] 
                                    + '.')
        }
    }, [senderProfile])

    return (

        <label className="mail-item">
            <input 
                type="radio" 
                name="item" 
                id={`item-${message_id}`}
                onChange={readHandler}
            />
            <div className="radiomark">
                <div className="row btn-layout">
                    <div className="user-avatar row content-center">
                        {senderProfileName[0]}
                    </div>
                    <div className={isRead ? 'op-5' : 'op-1 color-primary'}>
                        {senderProfileName}
                    </div>
                </div>
                <div className="title">{subject}</div>
                <div className="row space-between">
                    <div className="row options">
                        <label className="checkbox">
                            <input 
                                type="checkbox" 
                                name="check"
                                checked={isChecked} 
                                onChange={() => checkMailHandler(message_id)}                  
                            />
                            <div className="checkmark"></div>
                        </label>
                        <button className="btn btn-context" onClick={importantHandler}>
                            <img className='icon' src={isImportant ? importantCheckedIcon : importantIcon} alt=""/> 
                        </button>
                        {attach.length ?
                            <img className='icon' src={attachmentsIcon} alt=''/>
                        : 
                            ''
                        }                       
                    </div>
                    <div className="op-5">{date}</div>
                </div>
            </div>
        </label>
    )

}

export default MailItem