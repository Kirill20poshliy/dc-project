import React, {Component} from "react";
import importantIcon from "../icons/important-icon.svg"

class MailItem extends Component {

    state = {
        important: '',
        clicked: false,
        attachments: '',
    }

    clickHandler = () => {
        return (this.state.clicked ? false : true)
    }

    render () {

        const {mailer, mailerAvatar, title, time} = this.props
        const {clicked} = this.state

        return (
            <div 
                className={`mail-item column ${clicked ? 'mail-item-checked' : ''}`} 
                onClick={() => this.setState({clicked: this.clickHandler()})}
            >
                <div className="row btn-layout">
                    <div className="user-avatar row content-center">
                        {mailerAvatar ? <img src={mailerAvatar} alt=""/> : "?"}
                    </div>
                    <div className="op-5">{mailer}</div>
                </div>
                <div className="title">{title}</div>
                <div className="row space-between">
                    <div className="row options">
                        <input 
                            type="checkbox" 
                            name="check"                    
                        />
                        {/* <label htmlFor="check"/> */}
                        <button className="btn btn-context">
                            <img src={importantIcon} alt=""/> 
                        </button>                       
                    </div>
                    <div className="op-5">{time}</div>
                </div>
            </div>
        )

    }

}

export default MailItem