import React, {useState, useEffect} from "react";
import userIcon from "../img/avatar.jpg"

const Header = () => {

    const [userName, setName] = useState('')
    const [userAvatar, setAvatar] = useState(userIcon)
    const [search, setSerach] = useState('')

    useEffect(() => {
        fetch('http://localhost:3000/user')
        .then(response => response.json())
        .then(data => {
            setName(data.name)
            setAvatar(data.avatar ? data.avatar : '')
        })
        .catch(err => console.log(err))
    }, [])

    return(
        <header className="header row space-between">
            <input 
                type="search"
                id="search"
                placeholder="Поиск"
                value={search}
                onChange={(e) => setSerach(e.target.value)}
            />
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