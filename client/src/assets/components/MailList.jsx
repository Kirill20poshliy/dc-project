import React, {Component} from "react";
import MailItem from './MailItem'

class MailList extends Component {

    render () {

        const {mails, checkAll, check, mapping} = this.props

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
    
}

export default MailList