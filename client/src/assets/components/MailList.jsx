import React from "react";
import MailItem from './MailItem'
import {useSelector} from 'react-redux'
import {useGetMailsQuery} from '../../store/api'

const MailList = (props) => {

    const {mapping} = props
    const filter = useSelector(state => state.mails.filter)
    const {data, isError, isLoading} = useGetMailsQuery(filter)

    return (
        <div className="column mail-list">
            {isError && <p>Ошибка загрузки...</p>}
            {!isLoading 
                ?   <>
                        {data.results.map(mail => (
                            <MailItem 
                                key={mail.date_received} 
                                {...mail}
                                mapping={mapping}
                            />                    
                        ))}
                        {!data.count && !isLoading ? <p>Список пуст</p> : ''}
                    </> 
                : <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>}
        </div>
    )

}

export default MailList