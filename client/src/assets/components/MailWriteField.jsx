import React, {Component} from "react";
import { NavLink } from "react-router-dom";
import exitIcon from "../icons/exit-icon.svg"

class MailWriteField extends Component {

    render () {
        return(
            <div className="mail-write-field">
                <div className="row mail-options">
                    <NavLink to='/' className='btn content-center btn-context'>
                        <img src={exitIcon} alt="Выйти"/>
                    </NavLink>
                    <button className="btn btn-layout btn-context">Сохранить черновик</button>
                </div>
            </div>
        )
    }

}

export default MailWriteField