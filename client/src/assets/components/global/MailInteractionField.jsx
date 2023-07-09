import React, {useState} from 'react'
import MailOptionsMenu from '../MailOprionsMenu'
import MailList from '../MailList'
import MailCard from '../MailCard'
import {useActionMailsMutation, useGetMailsQuery} from '../../../store/api'

const MailInteractionField = () => {

    const [mailCardActive, setMailCardActive] = useState(false)
    const [mappedLetter, setMappedLetter] = useState('')

    const [actionMail] = useActionMailsMutation()
    const {data = []} = useGetMailsQuery('')


    const letterMappingHandler = async (idx) => {
        if (data.find(letter => letter.id === (idx)).read === false) {
            const prop = {
                id: idx,
                action: {read: true}
            }
            await actionMail(prop).unwrap()
        }
        setMailCardActive(true)
        setMappedLetter(data.find(letter => letter.id === (idx)))
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