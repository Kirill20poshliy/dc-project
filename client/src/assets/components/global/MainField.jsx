import React from 'react'
import Header from '../Header'
import MailInteractionField from './MailInteractionField'
import MailWriteField from '../MailWriteField'
import {useParams} from 'react-router-dom'

const MainField = () => {

    const {mode} = useParams()

    return(
        <div className='main-field'>
            <Header/>
            {mode === 'main' && <MailInteractionField/>}
            {mode === 'write' && <MailWriteField/>}
        </div>
    )
}

export default MainField