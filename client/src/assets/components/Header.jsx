import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetProfilesQuery } from "../../store/api";
import { setUserProfile } from "../../store/userSlice";

const Header = () => {

    const [search, setSerach] = useState('')
    const [userId, setUserId] = useState('')
    const [user, setUser] = useState('') 
    const stateUserId = useSelector(state => state.user.id)
    const dispatch = useDispatch()

    const {data, isSuccess} = useGetProfilesQuery(userId)

    useEffect(() => {
        if (stateUserId) {
            setUserId(stateUserId)
        }
    }, [stateUserId])

    useEffect(() => {
        if (isSuccess) {
            if (data.results.length === 1) {
                dispatch(setUserProfile(data.results[0]))
                setUser(data.results[0].last_name + ' ' + data.results[0].first_name)
            }
        }
    }, [isSuccess, data, dispatch])

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
                {user ? user : 'User'}
                <div className="user-avatar row content-center">
                    {user[0]}
                </div>
            </div>
        </header>
    )

}

export default Header