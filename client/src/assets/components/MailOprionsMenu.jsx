import React, {Component} from "react";
import resendIcon from '../icons/resend-icon.svg'
import trashIcon from '../icons/trash-icon.svg'
import writtenIcon from '../icons/written-icon.svg'

class MailOptionsMenu extends Component {

    state = {
        active: false,
    }

    checkHandler = () => {
        this.setState({active: this.state.active ? false : true})
        this.props.check(this.state.active)
    }

    render () {

        const {active} = this.state

        return (
            <div className="row mail-options">
                    <input 
                        type="checkbox"
                        name="check"
                        onChange={() => this.checkHandler()}
                    />
                    {/* <label htmlFor="check"/>                     */}
                <button 
                    className="btn btn-layout btn-context" 
                    disabled={active ? "" : "disabled"}
                >
                    <img src={resendIcon} alt=""/>
                    Переслать
                </button>
                <button 
                    className="btn btn-layout btn-context" 
                    disabled={active ? "" : "disabled"}
                >
                    <img src={trashIcon} alt=""/>
                    Удалить
                </button>
                <button 
                    className="btn btn-layout btn-context" 
                    disabled={active ? "" : "disabled"}
                >
                    <img src={writtenIcon} alt=""/>
                    Прочитать
                </button>
            </div>
        )

    }

}

export default MailOptionsMenu