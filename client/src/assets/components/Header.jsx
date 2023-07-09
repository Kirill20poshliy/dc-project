import React, {useState} from "react";
// import userIcon from "../img/avatar.jpg"
import { useSelector } from "react-redux";

const Header = () => {

    const userAvatar = ''
    const [search, setSerach] = useState('')
    const userName = useSelector(state => state.user.username)

    return(
        <header className="header row space-between">
            <input 
                type="search"
                id="search"
                placeholder="Поиск"
                value={search}
                onChange={(e) => setSerach(e.target.value)}
            />
            {/* <h1 style={{fontWeight: 900}}>МГТУ им. Н.Э. Баумана</h1> */}
            <div className="row btn-layout">
                {userName ? userName : 'User'}
                <div className="user-avatar row content-center">
                    {userAvatar ? <img src={userAvatar} alt="Аватар"/> : userName[0]}
                </div>
            </div>
        </header>
    )

}

export default Header