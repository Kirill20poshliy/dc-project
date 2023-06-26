import React, {Component} from 'react'
import Header from '../Header'
import MailInteractionField from './MailInteractionField'
import MailWriteField from '../MailWriteField'
import {Route, Routes} from 'react-router-dom'

class MainField extends Component {

    state = {
        pageMode: '',
    }

    componentDidMount() {
        this.setState({pageMode: this.props.pageMode})
    }

    componentDidUpdate(prevProps) {
        if (this.props.pageMode !== prevProps.pageMode) {
            this.setState({pageMode: this.props.pageMode})
            console.log('state was updated!')
        }
    }

    render() {

        return(
                <div className='main-field'>
                    <Header/>
                    <Routes>
                        <Route path='/*' element={
                            <MailInteractionField
                                incoming={this.props.incoming} 
                                mails={this.props.mails}
                                listMode={this.props.listMode}
                                pageMode={this.state.pageMode}
                                listFetch={this.props.listFetch}                               
                            />
                        }/>
                        <Route path='/write' element={
                            <MailWriteField/>
                        }/>
                    </Routes>
                    {/* {this.props.pageMode === ''||'deleted' ? 
                        (<MailInteractionField 
                            incoming={this.props.incoming} 
                            mails={this.props.mails}
                            listMode={this.props.listMode}
                            pageMode={this.state.pageMode}
                            listFetch={this.props.listFetch}
                        />)
                        :
                        (<MailWriteField/>)
                    } */}
                </div>
        )
    }

}

export default MainField