import React from "react";
import settingsIcon from '../../icons/settings.svg'
import neirospIcon from '../../icons/neirospoc-icon.svg'

const MenuLeft = (props) => {

    const switchHandler = () => {
        return (props.settings ? false : true)
    }

    return (
        <div className="menu-left">
            <button 
                className="btn btn-link content-center" 
                title="Настройки"
                onClick={() => props.setSettings(switchHandler())}
            >
                <img className='' src={settingsIcon} alt="settings"/>
            </button>
            <div className="link-menu-layout">
                <a 
                    className="btn btn-link content-center" 
                    href="https://bmstu.online/" target="_blank" 
                    rel="noreferrer" 
                    title="Нейро-Spoc"
                >
                    <img className='icon' src={neirospIcon} alt="neiro-spoc"/>
                </a>                
            </div>
        </div>
    )
}

export default MenuLeft