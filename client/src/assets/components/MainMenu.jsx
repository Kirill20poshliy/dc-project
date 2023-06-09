import React, {Component} from "react";
import bmstuLogo from '../icons/bmstu_logo 1.svg'
import plusIcon from '../icons/plus-icon.svg'
import incomingIcon from '../icons/incoming-icon.svg'
import indicator from '../icons/indicator.svg'
import sentIcon from '../icons/sent-icon.svg'
import trashIcon from '../icons/trash-icon.svg'
import draftIcon from '../icons/draft-icon.svg'
import importantIcon from '../icons/important-icon.svg'
import attachmentsIcon from '../icons/attachments-icon.svg'
import MemoryBar from "./MemoryBar";

class MainMenu extends Component {

    render() {

        const {incoming} = this.props

        return (
            <div className="menu-main column">
                <div className="menu-head">
                    <a href="https://bmstu.ru/" target="_blank" title="BMSTU" rel="noreferrer">
                        <img src={bmstuLogo} alt="BMSTU"/>                    
                    </a>
                    <h2>BMAIL</h2>
                </div>
                <div className="operating-panel column">
                    <button className="btn content-center btn-primary">
                        <img src={plusIcon} alt=""/>
                        Написать
                    </button>
                    <div className="switch">
                        <p>Папки</p>
                        <div className="menu-folders column">
                            <button className="btn btn-switch-menu">
                                <div className="row btn-layout">
                                    <img src={incomingIcon} alt="incoming"/>
                                    Входящие
                                </div>
                                {
                                    incoming ?
                                    (
                                        <div className="row btn-layout">
                                            <img src={indicator} alt="indicator"/>
                                            {incoming}
                                        </div>
                                    )
                                    :
                                    ('')
                                }
                            </button>
                            <button className="btn btn-switch-menu">
                                <div className="row btn-layout">
                                    <img src={sentIcon} alt=""></img>
                                    Отправленные
                                </div>
                            </button>
                            <button className="btn btn-switch-menu">
                                <div className="row btn-layout">
                                    <img src={trashIcon} alt=""></img>
                                    Удалённые
                                </div>
                                {/* <button className="btn btn-subsidary">
                                    Очистить
                                </button> */}
                            </button>
                            <button className="btn btn-switch-menu">
                                <div className="row btn-layout">
                                    <img src={draftIcon} alt=""></img>
                                    Черновики
                                </div>
                            </button>
                        </div>
                        <p>Фильтры</p>
                        <div className="row btn-layout space-between">
                            <button className="btn content-center btn-option">
                                <img src={importantIcon} alt=""/>
                            </button>
                            <button className="btn content-center btn-option">
                                <img src={indicator} alt=""/>
                            </button>
                            <button className="btn content-center btn-option">
                                <img src={attachmentsIcon} alt=""/>
                            </button>
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