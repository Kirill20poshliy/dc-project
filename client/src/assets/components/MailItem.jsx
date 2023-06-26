import React, {useState} from "react";
import importantIcon from "../icons/important-icon.svg"
import importantCheckedIcon from "../icons/important-checked-icon.svg"
import attachmentsIcon from '../icons/attachments-icon.svg'

const MailItem = (props) => {

    const [isChecked, setCheck] = useState(false)
    const [isRead, setRead] = useState(props.read)
    const [isImportant, setImportant] = useState(props.important)

    const checkHandler = (checkedItem) => {
        setCheck(isChecked ? false : true)
        props.checked(checkedItem)
    }

    const readHandler = () => {
        if (!props.read) {
            setRead(true)
        }
        props.mapping(props.id)
    }

    const importantHandler = () => {
        let val = isImportant ? false : true
        fetch(`http://localhost:3000/mails/${props.id}`, {
            method: 'PATCH',
            body: JSON.stringify({important: val}),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
                },
        })
        .then(() => {
            setImportant(val)
        })
        .catch(err => console.log(err))
    }

    const {title, time, id, checkAll, attachments} = props
    const {avatar, name} = props.mailer

    return (

        <label className="mail-item">
            <input 
                type="radio" 
                name="item" 
                id={`item-${id}`}
                onChange={readHandler}
            />
            <div className="radiomark">
                <div className="row btn-layout">
                    <div className="user-avatar row content-center">
                        {avatar ? <img src={avatar} alt=""/> : name[0]}
                    </div>
                    <div className={isRead ? 'op-5' : 'op-1 color-primary'}>{name}</div>
                </div>
                <div className="title">{title}</div>
                <div className="row space-between">
                    <div className="row options">
                        <label className="checkbox">
                            <input 
                                type="checkbox" 
                                name="check"
                                checked={checkAll ? checkAll : isChecked} 
                                onChange={() => checkHandler(id)}                  
                            />
                            <div className="checkmark"></div>
                        </label>
                        <button className="btn btn-context" onClick={importantHandler}>
                            <img className='icon' src={isImportant ? importantCheckedIcon : importantIcon} alt=""/> 
                        </button>
                        {attachments.length ?
                            <img className='icon' src={attachmentsIcon} alt=''/>
                        : 
                            ''
                        }                       
                    </div>
                    <div className="op-5">{time}</div>
                </div>
            </div>
        </label>
    )

}

export default MailItem