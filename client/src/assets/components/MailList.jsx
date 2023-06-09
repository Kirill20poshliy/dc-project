import React, {Component} from "react";
import MailItem from './MailItem'

class MailList extends Component {

    state = {
        mails: [
            {
                mailer: 'John Doe', 
                mailerAvatar: '', 
                title: 'Access to the dc-project group was granted', 
                time: '12:33',
                id: 5,
            },
            {
                mailer: 'John Doe', 
                mailerAvatar: '', 
                title: 'Access to the dc-project group was granted', 
                time: '12:32',
                id: 3,
            },
            {
                mailer: 'John Doe', 
                mailerAvatar: '', 
                title: 'Access to the dc-project group was granted', 
                time: '12:30',
                id: 2,
            },
            {
                mailer: 'John Doe', 
                mailerAvatar: '', 
                title: 'Access to the dc-project group was granted', 
                time: '12:31',
                id: 1,
            },
        ],
    }

    render () {

        const {mails} = this.state

        return (
            <div className="column mail-list">
                {mails.map(mail => (
                    <MailItem 
                        key={mail.time} 
                        {...mail} 
                        checkAll={this.props.checkAll} 
                        checked={this.props.check}
                    />
                ))}
            </div>
        )

    }
    
}

export default MailList