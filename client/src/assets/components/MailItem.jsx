import React, {Component} from "react";
import importantIcon from "../icons/important-icon.svg"

class MailItem extends Component {

    state = {
        important: '',
        attachments: '',
        isChecked: false,
    }

    checkHandler = () => {
        this.setState({isChecked: this.state.isChecked ? false : true})
        this.props.checked()
    }

    render () {

        const {mailer, mailerAvatar, title, time, id, checkAll} = this.props
        const {isChecked} = this.state

        return (

            <label className="mail-item">
                <input type="radio" name="item" id={`item-${id}`} />
                <div className="radiomark">
                    <div className="row btn-layout">
                        <div className="user-avatar row content-center">
                            {mailerAvatar ? <img src={mailerAvatar} alt=""/> : "?"}
                        </div>
                        <div className="op-5">{mailer}</div>
                    </div>
                    <div className="title">{title}</div>
                    <div className="row space-between">
                        <div className="row options">
                            <label className="checkbox">
                                <input 
                                    type="checkbox" 
                                    name="check"
                                    checked={checkAll ? checkAll : isChecked} 
                                    onChange={this.checkHandler}                  
                                />
                                <div className="checkmark"></div>
                            </label>
                            <button className="btn btn-context">
                                <img src={importantIcon} alt=""/> 
                            </button>                       
                        </div>
                        <div className="op-5">{time}</div>
                    </div>
                </div>
            </label>
        )

    }

}

export default MailItem