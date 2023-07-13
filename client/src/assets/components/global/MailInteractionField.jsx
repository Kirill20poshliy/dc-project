import React, {useState} from 'react'
import MailOptionsMenu from '../MailOprionsMenu'
import MailList from '../MailList'
import MailCard from '../MailCard'
import {useActionMailsMutation, useGetMailsQuery} from '../../../store/api'

const MailInteractionField = () => {

    const [mailCardActive, setMailCardActive] = useState(false)
    const [mappedLetter, setMappedLetter] = useState('')

    const [actionMail] = useActionMailsMutation()
    const {data} = useGetMailsQuery('')


    const letterMappingHandler = async (idx) => {
        if (data.results.find(letter => letter.message_id === (idx)).status === false) {
            const prop = {
                id: idx,
                action: {status: true}
            }
            await actionMail(prop).unwrap()
        }
        setMailCardActive(true)
        setMappedLetter(data.results.find(letter => letter.message_id === (idx)))
    }

    // const resendHandler = () => {

    // }

    return (

        <div className='mail-interaction-field'>
            <MailOptionsMenu
                // resend={resendHandler}
            />

            <MailList 
                mapping={letterMappingHandler}
            />
            <MailCard activeCard={mailCardActive} letter={mappedLetter}/>
        </div>
        
    )

}

export default MailInteractionField