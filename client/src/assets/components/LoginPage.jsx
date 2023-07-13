import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../store/userSlice";
import { useLoginMutation } from "../../store/api";
import bmstuLogo from '../icons/bmstu_logo_2.png'

const LoginPage = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const navigate = useNavigate()

    const [login, {isLoading, isError}] = useLoginMutation()
    const dispatch = useDispatch()
    

    useEffect(() => {
        setErrMsg('')
    }, [username, password])

    const submitHandler = async (e) => {
        e.preventDefault()

        try {
            const userData = await login({username, password}).unwrap()
            localStorage.setItem('credentials', JSON.stringify({username: username, password: password}))
            dispatch(setCredentials({...userData, username}))
            setUsername('')
            setPassword('')
            navigate('/main')
        } catch (err) {
            setErrMsg(err ? 'Пользователь не найден!' : '')
        }
    }

    return (
        <div className="login-page column content-center">

                <div className="column content-center lo-1">
                    <img src={bmstuLogo} alt="bmstu"/>
                    <div className="column lo-2">
                        <div className="dash op-5"></div>
                        <h1>МГТУ им. Н.Э. Баумана</h1>                    
                    </div>
                </div>
                <form id='login-form' className="column content-center" onSubmit={submitHandler}>
                    <input 
                        type="text" 
                        name="login"
                        autoComplete="on"
                        placeholder="Логин"
                        onChange={(e) => setUsername(e.target.value)}    
                    />
                    <input 
                        type="password" 
                        name="password"
                        placeholder="Пароль"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="btn btn-primary content-center">Войти</button>
                </form>
                {isLoading ? <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div> : ''}
                <p>{isError ? errMsg : ''}</p>                


            <div className="footer row space-between">
                <p>bmail: beta V1.0</p>
                <p>Copyright © 2023 BMSTU</p>
            </div>
        </div>
    )
    
}

export default LoginPage