import React, {useState} from 'react'
import MailOptionsMenu from '../MailOprionsMenu'
import MailList from '../MailList'
import MailCard from '../MailCard'
import {useActionMailsMutation, useLazyGetMailQuery} from '../../../store/api'

const MailInteractionField = () => {

    const [mailCardActive, setMailCardActive] = useState(false)
    const [mappedLetter, setMappedLetter] = useState('')

    const [actionMail] = useActionMailsMutation()
    const [getMail] = useLazyGetMailQuery()


    const letterMappingHandler = async (idx) => {
        await getMail(idx).then(res => {
            if (res.data.status === false) {
                const prop = {
                    id: idx,
                    action: {status: true}
                }
                actionMail(prop)
            }
            setMailCardActive(true)
            setMappedLetter(res.data)
        })
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