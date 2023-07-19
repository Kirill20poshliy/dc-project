import React, { useEffect } from 'react';
import './assets/css/global/App.css';
import LoginPage from './assets/components/LoginPage';
import { Route, Routes, useNavigate } from 'react-router-dom';
import BodyWrapper from './assets/components/BodyWrapper';
import RequireAuth from './assets/components/RequireAuth';
import Layout from './assets/components/Layout';
import { useDispatch } from "react-redux";
import { setCredentials } from "./store/userSlice";
import { useLoginMutation } from "./store/api";

const App = () => {

  const navigate = useNavigate()
  const [login] = useLoginMutation()
  const dispatch = useDispatch()

  useEffect(() => {
    async function getLocalData() {
        try {
          const localData = JSON.parse(localStorage.getItem('credentials'))
          const {username, password} = localData
          if (username && password) {
            const userData = await login({username, password}).unwrap()
            dispatch(setCredentials({...userData, username}))
          }
          navigate('/main')     
        } catch(e) {
          console.log('Пользователь не авторизован')
        }
    }
    navigate('/main')
    getLocalData()
  }, [dispatch, login])

  return (

    <>
      <Routes>

        <Route path='/' element={<Layout/>}>
        
          {/* public pages */}

          <Route path='login' element={<LoginPage/>}/>

          {/* protected pages */}
          
          <Route element={<RequireAuth/>}>
            <Route path='/:mode' element={<BodyWrapper/>}/>
            <Route path='*' element={<div>404 not found!</div>}/>
          </Route>

        </Route>

      </Routes>
    </>

  )  

}

export default App;
