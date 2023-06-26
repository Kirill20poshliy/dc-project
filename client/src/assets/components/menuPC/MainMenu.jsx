import React, {Component} from "react";
import bmstuLogo from '../../icons/bmstu_logo 1.svg'
import plusIcon from '../../icons/plus-icon.svg'
import incomingIcon from '../../icons/incoming-icon.svg'
import indicator from '../../icons/indicator.svg'
import sentIcon from '../../icons/sent-icon.svg'
import trashIcon from '../../icons/trash-icon.svg'
import draftIcon from '../../icons/draft-icon.svg'
import importantCheckedIcon from '../../icons/important-checked-icon.svg'
import attachmentsIcon from '../../icons/attachments-icon.svg'
import MemoryBar from "./MemoryBar";
import { NavLink } from "react-router-dom";

class MainMenu extends Component {

    componentDidMount() {
        this.props.mode('?deleted=false')
    }

    render() {

        const {incoming, mode} = this.props

        return (
            <div className="menu-main column">
                <div className="menu-head">
                    <a href="https://bmstu.ru/" target="_blank" title="BMSTU" rel="noreferrer">
                        <img src={bmstuLogo} alt="BMSTU"/>                    
                    </a>
                    <h2>BMAIL</h2>
                </div>
                <div className="operating-panel column">
                    <NavLink className="btn content-center btn-primary" to='/write'>
                        <img className='icon' src={plusIcon} alt=""/>
                        Написать
                    </NavLink>
                    <div className="switch">
                        <p>Папки</p>
                        <div className="menu-folders column">
                            <NavLink 
                                className="btn btn-switch-menu" 
                                onClick={() => mode('?deleted=false')}
                                to='/'
                            >
                                <div className="row btn-layout">
                                    <img className='icon' src={incomingIcon} alt="incoming"/>
                                    Входящие
                                </div>
                                {
                                    incoming ?
                                    (
                                        <div className="row btn-layout">
                                            <img className='icon' src={indicator} alt="indicator"/>
                                            {incoming}
                                        </div>
                                    )
                                    :
                                    ('')
                                }
                            </NavLink>
                            <NavLink 
                                className="btn btn-switch-menu" 
                                onClick={() => mode('?written')}
                                to='/'
                            >
                                <div className="row btn-layout">
                                    <img src={sentIcon} className='icon' alt=""></img>
                                    Отправленные
                                </div>
                            </NavLink>
                            <NavLink 
                                className="btn btn-switch-menu" 
                                onClick={() => mode('?deleted=true')}
                                to='/'
                            >
                                <div className="row btn-layout">
                                    <img className='icon' src={trashIcon} alt=""></img>
                                    Удалённые
                                </div>
                                {/* <button className="btn btn-subsidary">
                                    Очистить
                                </button> */}
                            </NavLink>
                            <NavLink 
                                className="btn btn-switch-menu" 
                                onClick={() => mode('?drafts')}
                                to='/'
                            >
                                <div className="row btn-layout">
                                    <img className='icon' src={draftIcon} alt=""></img>
                                    Черновики
                                </div>
                            </NavLink>
                        </div>
                        <p>Фильтры</p>
                        <div className="row btn-layout space-between">
                            <NavLink 
                                className="btn content-center btn-option" 
                                onClick={() => mode('?important=true&deleted=false')}
                                to='/'
                            >
                                <img className='icon' src={importantCheckedIcon} alt=""/>
                            </NavLink>
                            <NavLink 
                                className="btn content-center btn-option" 
                                onClick={() => mode('?read=false')}
                                to='/'
                            >
                                <img className='icon' src={indicator} alt=""/>
                            </NavLink>
                            <NavLink 
                                className="btn content-center btn-option" 
                                onClick={() => mode('')}
                                to='/'
                            >
                                <img className='icon' src={attachmentsIcon} alt=""/>
                            </NavLink>
                        </div>
                        <p>Память</p>
                        <MemoryBar/>
                    </div>
                </div>
            </div>
        )

    }

}

export default MainMenu 