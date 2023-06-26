import React, {Component} from 'react'
import MailOptionsMenu from '../MailOprionsMenu'
import MailList from '../MailList'
import MailCard from '../MailCard'

class MailInteractionField extends Component {

    state = {
        checkAllItems: false,
        checkedItems: [],
        mailOptionsActive: false,
        mailCardActive: false,
        mails: [],
        mappedLetter: '',
        loading: true,
    }

    componentDidUpdate(prevProps) {
        if (this.props.mails !== prevProps.mails) {
            this.setState({mails: this.props.mails})
            this.setState({loading: false})
            this.props.incoming()
        }
    }

    checkAllItemsHandler = (state) => {
        let idxs = []
        if (!this.state.checkAllItems) {
            for (let i = 0; i < this.state.mails.length; i++) {
                idxs.push(this.state.mails[i].id)
            }
        }
        this.setState({checkedItems: idxs})
        this.setState({checkAllItems: state ? false : true})
    }

    checkHandler = (checkedItem) => {
        let items = this.state.checkedItems
        if (items.includes(checkedItem)) {
            items = items.filter((item) => item !== checkedItem)
        } else {
            items.push(checkedItem)
        }
        this.setState({checkedItems: items})
        this.setState({mailOptionsActive: 
            !items.length && this.state.mailOptionsActive ? 
            false : true})
    }

    letterMappingHandler = (idx) => {
        if (this.state.mails.find(letter => letter.id === (idx)).read === false) {
            fetch(`http://localhost:3000/mails/${idx}`, {
                method: 'PATCH',
                body: JSON.stringify({read: true}),
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                    },
            })
            .then(response => {
                response.json()
                this.props.incoming()
            })
            .catch((err) => console.log(err))

        }
        this.setState({mailCardActive: true})
        this.setState({mappedLetter: this.state.mails.find(letter => letter.id === (idx))})
    }

    deleteHandler = () => {
        for (let i = 0; i < this.state.checkedItems.length; i++) {
            fetch(`http://localhost:3000/mails/${this.state.checkedItems[i]}`, {
                method: 'PATCH',
                body: JSON.stringify({deleted: true}),
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                    },
            })
            .then(() => {
                this.props.listFetch('?deleted=false')}
            )
            .catch(err => console.log(err))
        }
    }

    resendHandler = () => {

    }

    readHandler = () => {

    }

    render() {

        const {checkAllItems, mailOptionsActive, mailCardActive, mails, mappedLetter, loading} = this.state

        return(
            <div className='mail-interaction-field'>
                <MailOptionsMenu
                    check={this.checkAllItemsHandler} 
                    activeMenu={mailOptionsActive}
                    pageMode={this.props.pageMode}
                    delete={this.deleteHandler}
                    resend={this.resendHandler}
                    read={this.readHandler}
                />
                {loading ? 
                    <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                    :
                    <MailList 
                        check={this.checkHandler} 
                        checkAll={checkAllItems}
                        mails={mails}
                        mapping={this.letterMappingHandler}
                    />
                }
                <MailCard activeCard={mailCardActive} letter={mappedLetter}/>
            </div>
        )
    }

}

export default MailInteractionField