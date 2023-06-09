import React, {Component} from 'react'

class MailCard extends Component {

    state = {
        active: false,
        item: {
            id: 1,
            title: 'Title',
            description: 'description',
            date: '10.10.10',
        },
    }

    render () {

        const {active} = this.state

        return (

            <div className='mail-card'>
                {active ? 
                    <div className='card'></div> 
                    : 
                    'Ничего не выбрано'}
            </div>

        )

    }

}

export default MailCard