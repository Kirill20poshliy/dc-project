import React, {useState, useEffect} from 'react'
import Header from '../Header'
import MailInteractionField from './MailInteractionField'
import MailWriteField from '../MailWriteField'
import {Route, Routes} from 'react-router-dom'

const MainField = (props) => {

    const [pageMode, setPageMode] = useState('')

    useEffect(() => {
        setPageMode(props.pageMode)   
    }, [props.pageMode])

    return(
        <div className='main-field'>
            <Header/>
            <Routes>
                <Route path='/*' element={
                    <MailInteractionField
                        incoming={props.incoming} 
                        mails={props.mails}
                        listMode={props.listMode}
                        pageMode={pageMode}
                        listFetch={props.listFetch}                               
                    />
                }/>
                <Route path='/write' element={
                    <MailWriteField/>
                }/>
            </Routes>
        </div>
    )
}

export default MainField