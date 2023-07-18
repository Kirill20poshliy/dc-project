import React, { useEffect } from "react";
import MailItem from './MailItem'
import {useDispatch, useSelector} from 'react-redux'
import {useLazyGetMailsQuery} from '../../store/api'
import { setPaginationButtons } from "../../store/mailsSlice";

const MailList = (props) => {

    const {mapping} = props
    const filter = useSelector(state => state.mails.filter)
    const page = useSelector(state => state.mails.page)
    const [getMails, mails] = useLazyGetMailsQuery()
    const dispatch = useDispatch()

    useEffect(() => {
        async function fetchMails() {
            await getMails({filter, page})
            .then(result => {
                dispatch(setPaginationButtons({
                    prev: result.data.previous,
                    next: result.data.next
                }))
            })
        }
        fetchMails()
    }, [filter, page, getMails, dispatch])

    useEffect(() => {
        let re = setInterval(() => {
            getMails({filter, page})
        }, 3000)
        return () => clearInterval(re)
    }, [filter, page, getMails])

    return (
        <div className="column mail-list">
            {mails.isError && <p>Ошибка загрузки...</p>}
            {mails.isSuccess 
                ?   <>
                        {mails.data.results.map(mail => (
                            <MailItem 
                                key={mail.date_received} 
                                {...mail}
                                mapping={mapping}
                            />                    
                        ))}
                        {!mails.data.count && !mails.isLoading ? <p>Список пуст</p> : ''}
                    </> 
                : <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>}
        </div>
    )

}

export default MailList