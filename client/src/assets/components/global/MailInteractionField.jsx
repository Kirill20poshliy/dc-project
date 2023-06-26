import React, {useState, useEffect} from 'react'
import MailOptionsMenu from '../MailOprionsMenu'
import MailList from '../MailList'
import MailCard from '../MailCard'

const MailInteractionField = (props) => {

    const [checkAllItems, setCheckAllItems] = useState(false)
    const [checkedItems, setCheckedItems] = useState([])
    const [mailOptionsActive, setMailOptionsActive] = useState(false)
    const [mailCardActive, setMailCardActive] = useState(false)
    const [mails, setMails] = useState([])
    const [mappedLetter, setMappedLetter] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setMails(props.mails)
        setLoading(false)
        props.incoming()        
    }, [props.mails])

    const checkAllItemsHandler = (state) => {
        let idxs = []
        if (!checkAllItems) {
            for (let i = 0; i < mails.length; i++) {
                idxs.push(mails[i].id)
            }
        }
        setCheckedItems(idxs)
        setCheckAllItems(state ? false : true)
    }

    const checkHandler = (checkedItem) => {
        let items = checkedItems
        if (items.includes(checkedItem)) {
            items = items.filter((item) => item !== checkedItem)
        } else {
            items.push(checkedItem)
        }
        setCheckedItems(items)
        setMailOptionsActive( 
            !items.length && mailOptionsActive ? 
            false : true)
    }

    const letterMappingHandler = (idx) => {
        if (mails.find(letter => letter.id === (idx)).read === false) {
            fetch(`http://localhost:3000/mails/${idx}`, {
                method: 'PATCH',
                body: JSON.stringify({read: true}),
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                    },
            })
            .then(response => {
                response.json()
                props.incoming()
            })
            .catch((err) => console.log(err))

        }
        setMailCardActive(true)
        setMappedLetter(mails.find(letter => letter.id === (idx)))
    }

    const deleteHandler = () => {
        for (let i = 0; i < this.state.checkedItems.length; i++) {
            fetch(`http://localhost:3000/mails/${checkedItems[i]}`, {
                method: 'PATCH',
                body: JSON.stringify({deleted: true}),
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                    },
            })
            .then(() => {
                props.listFetch('?deleted=false')}
            )
            .catch(err => console.log(err))
        }
    }

    const resendHandler = () => {

    }

    const readHandler = () => {

    }

    return (

        <div className='mail-interaction-field'>
            <MailOptionsMenu
                check={checkAllItemsHandler} 
                activeMenu={mailOptionsActive}
                pageMode={props.pageMode}
                delete={deleteHandler}
                resend={resendHandler}
                read={readHandler}
            />
            {loading ? 
                <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                :
                <MailList 
                    check={checkHandler} 
                    checkAll={checkAllItems}
                    mails={mails}
                    mapping={letterMappingHandler}
                />
            }
            <MailCard activeCard={mailCardActive} letter={mappedLetter}/>
        </div>
        
    )

}

export default MailInteractionField