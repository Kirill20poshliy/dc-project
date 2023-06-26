import React from "react";
import MailItem from './MailItem'

const MailList = (props) => {

    const {mails, checkAll, check, mapping} = props

    return (
        <div className="column mail-list">
            {mails.map(mail => (
                <MailItem 
                    key={mail.time} 
                    {...mail}
                    checkAll={checkAll} 
                    checked={check}
                    mapping={mapping}
                />
            ))}
        </div>
    )

}

export default MailList