import React, {Component} from "react";
import settingsIcon from '../icons/settings.svg'
import neirospIcon from '../icons/neirospoc-icon.svg'

class MenuLeft extends Component {

    switchHandler = () => {
        return (this.props.settings ? false : true)
    }

    render () {
        return (
            <div className="menu-left">
                <button 
                    className="btn btn-link content-center" 
                    title="settings"
                    onClick={() => this.props.setSettings(this.switchHandler())}
                >
                    <img src={settingsIcon} alt="settings"/>
                </button>
                <div className="link-menu-layout">
                    <a 
                        className="btn btn-link content-center" 
                        href="https://bmstu.online/" target="_blank" 
                        rel="noreferrer" 
                        title="NeiroSpoc"
                    >
                        <img src={neirospIcon} alt="neiro-spoc"/>
                    </a>                
                </div>
            </div>
        )
    }

}

export default MenuLeft