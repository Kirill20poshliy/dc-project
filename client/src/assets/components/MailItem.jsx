import React, {Component} from "react";
import importantIcon from "../icons/important-icon.svg"
import importantCheckedIcon from "../icons/important-checked-icon.svg"
import attachmentsIcon from '../icons/attachments-icon.svg'

class MailItem extends Component {

    state = {
        isChecked: false,
        mailRead: this.props.read,
        important: this.props.important,
    }

    checkHandler = (checkedItem) => {
        this.setState({isChecked: this.state.isChecked ? false : true})
        this.props.checked(checkedItem)
    }

    readHandler = () => {
        if (!this.props.read) {
            this.setState({mailRead: true})
        }
        this.props.mapping(this.props.id)
    }

    importantHandler = () => {
        let val = this.state.important ? false : true
        fetch(`http://localhost:3000/mails/${this.props.id}`, {
            method: 'PATCH',
            body: JSON.stringify({important: val}),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
                },
        })
        .then(() => {
            this.setState({important: val})
        })
        .catch(err => console.log(err))
    }

    render () {

        const {title, time, id, checkAll, attachments} = this.props
        const {avatar, name} = this.props.mailer
        const {isChecked} = this.state

        return (

            <label className="mail-item">
                <input 
                    type="radio" 
                    name="item" 
                    id={`item-${id}`}
                    onChange={this.readHandler}
                />
                <div className="radiomark">
                    <div className="row btn-layout">
                        <div className="user-avatar row content-center">
                            {avatar ? <img src={avatar} alt=""/> : name[0]}
                        </div>
                        <div className={this.state.mailRead ? 'op-5' : 'op-1 color-primary'}>{name}</div>
                    </div>
                    <div className="title">{title}</div>
                    <div className="row space-between">
                        <div className="row options">
                            <label className="checkbox">
                                <input 
                                    type="checkbox" 
                                    name="check"
                                    checked={checkAll ? checkAll : isChecked} 
                                    onChange={() => this.checkHandler(id)}                  
                                />
                                <div className="checkmark"></div>
                            </label>
                            <button className="btn btn-context" onClick={this.importantHandler}>
                                <img className='icon' src={this.state.important ? importantCheckedIcon : importantIcon} alt=""/> 
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

}

export default MailItem