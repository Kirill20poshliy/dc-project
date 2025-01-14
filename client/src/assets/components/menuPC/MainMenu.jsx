import {useEffect, useState} from "react";
import bmstuLogo from '../../icons/bmstu_logo 1.svg'
import plusIcon from '../../icons/plus-icon.svg'
import incomingIcon from '../../icons/incoming-icon.svg'
import indicator from '../../icons/indicator.svg'
import sentIcon from '../../icons/sent-icon.svg'
import trashIcon from '../../icons/trash-icon.svg'
import importantCheckedIcon from '../../icons/important-checked-icon.svg'
// import attachmentsIcon from '../../icons/attachments-icon.svg'
import MemoryBar from "./MemoryBar";
import {NavLink} from "react-router-dom";
import {useDispatch} from 'react-redux'
import {filterHandler, setIncoming, setPage} from '../../../store/mailsSlice'
import { useSelector } from "react-redux";
import { useLazyGetMailsQuery } from "../../../store/api";

const MainMenu = () => {

    const user = useSelector(state => state.user.profileId)
    const [userId, setUserId] = useState('')
    const mails = useSelector(state => state.mails.mails)

    const dispatch = useDispatch()
    const [getIncoming, incoming] = useLazyGetMailsQuery()

    const switchHandler = (filter) => {
        dispatch(setPage(1))
        dispatch(filterHandler(filter))
    }

    useEffect(() => {
        user && setUserId(user)
    }, [user])

    useEffect(() => {
        // dispatch(filterHandler(`&deleted=false&recipient=${userId}`))
        getIncoming({filter: `&deleted=false&recipient=${userId}&status=false`, page: 1})
        .then(result => {
            dispatch(setIncoming(result.data.count))
        })
    }, [dispatch, userId, getIncoming, mails])

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
                            onClick={() => switchHandler(`&deleted=false&recipient=${userId}`)}
                            to='/main'
                        >
                            <div className="row btn-layout">
                                <img className='icon' src={incomingIcon} alt="incoming"/>
                                Входящие
                            </div>
                            {
                                incoming.isSuccess && incoming.data.count ?
                                (
                                    <div className="row btn-layout">
                                        <img className='icon' src={indicator} alt="indicator"/>
                                        {incoming.data.count}
                                    </div>
                                )
                                :
                                ('')
                            }
                        </NavLink>
                        <NavLink 
                            className="btn btn-switch-menu" 
                            onClick={() => switchHandler(`&deleted=false&sender=${userId}`)}
                            to='/main'
                        >
                            <div className="row btn-layout">
                                <img src={sentIcon} className='icon' alt=""></img>
                                Отправленные
                            </div>
                        </NavLink>
                        <NavLink 
                            className="btn btn-switch-menu" 
                            onClick={() => switchHandler(`&deleted=true&recipient=${userId}`)}
                            to='/main'
                        >
                            <div className="row btn-layout">
                                <img className='icon' src={trashIcon} alt=""></img>
                                Удалённые
                            </div>
                        </NavLink>
                    </div>
                    <p>Фильтры</p>
                    <div className="row btn-layout space-between">
                        <NavLink 
                            className="btn content-center btn-option" 
                            onClick={() => switchHandler('&important=true&deleted=false')}
                            to='/main'
                        >
                            <img className='icon' src={importantCheckedIcon} alt=""/>
                        </NavLink>
                        <NavLink 
                            className="btn content-center btn-option" 
                            onClick={() => switchHandler('&status=false&deleted=false')}
                            to='/main'
                        >
                            <img className='icon' src={indicator} alt=""/>
                        </NavLink>
                        {/* <NavLink 
                            className="btn content-center btn-option" 
                            onClick={() => switchHandler('&deleted=false&attach-')}
                            to='/main'
                        >
                            <img className='icon' src={attachmentsIcon} alt=""/>
                        </NavLink> */}
                    </div>
                    <p>Память</p>
                    <MemoryBar/>
                </div>
            </div>
        </div>
    )
}

export default MainMenu 