import React from "react";
import logoutIcon from '../../icons/logout-icon.svg'
import { logOut } from "../../../store/userSlice";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

function SettingsMenu(props) {

    const dispatch = useDispatch()

    const logOutHandler = () => {
        props.setSettings(false)
        delete localStorage.credentials
        dispatch(logOut())
    }

    return (
        <div className="settings-menu column">
            <NavLink 
                to='/login'
                className="btn btn-switch-menu space-between" 
                onClick={() => logOutHandler()}
            >
                Выйти
                <img className='icon' src={logoutIcon} alt=""/>
            </NavLink>
        </div>
    )

}

export default SettingsMenu