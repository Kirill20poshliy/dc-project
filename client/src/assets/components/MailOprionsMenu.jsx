import React, {Component} from "react";
import shareIcon from '../icons/share-icon.svg'
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

    deleteHandler = () => {
        // console.log(this.props)
        this.props.delete()
    }

    render () {

        const {active} = this.state

        return (
            <div className="row mail-options">
                <label className="checkbox">
                    <input 
                        type="checkbox"
                        name="check"
                        onChange={() => this.checkHandler()}
                    />
                    <div className="checkmark"></div>
                </label>
                <button 
                    className="btn btn-layout btn-context" 
                    disabled={(active || this.props.activeMenu) && this.props.pageMode !== 'deleted' ? "" : "disabled"}
                >
                    <img className='icon' src={shareIcon} alt=""/>
                    Переслать
                </button>
                <button 
                    className="btn btn-layout btn-context" 
                    disabled={active || this.props.activeMenu ? "" : "disabled"}
                    onClick={() => this.deleteHandler()}
                >
                    <img className='icon' src={trashIcon} alt=""/>
                    Удалить
                </button>
                <button 
                    className="btn btn-layout btn-context" 
                    disabled={(active || this.props.activeMenu) && this.props.pageMode !== 'deleted' ? "" : "disabled"}
                >
                    <img className='icon' src={writtenIcon} alt=""/>
                    Прочитать
                </button>
            </div>
        )

    }

}

export default MailOptionsMenu