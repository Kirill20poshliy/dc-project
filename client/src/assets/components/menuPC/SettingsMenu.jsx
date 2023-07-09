import React from "react";
import logoutIcon from '../../icons/logout-icon.svg'

function SettingsMenu(props) {

    return (
        <div className="settings-menu column">
            <button 
                className="btn btn-switch-menu space-between" 
                onClick={() => props.setSettings(false)}
            >
                Выйти
                <img className='icon' src={logoutIcon} alt=""/>
            </button>
        </div>
    )

}

export default SettingsMenu