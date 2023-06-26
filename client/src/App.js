import React, {Component} from 'react';
import './assets/css/global/App.css';
import MenuForPC from './assets/components/global/MenuForPC';
import MainField from './assets/components/global/MainField';


class App extends Component {

  state = {
    incoming: 0,
    pageMode: '',
    mailList: [],
  }

  incomingHandler = () => {
    fetch('http://localhost:3000/mails')
    .then(response => response.json())
    .then(data => {
        let incoming = 0
        for (let i = 0; i < data.length; i++) {
            if (!data[i].read) {
                incoming += 1
            }
        }
        this.setState({incoming: incoming})
    })
    .catch(err => console.log(err))
  }

  listFetch = (listFilter) => {
    fetch(`http://localhost:3000/mails${listFilter}`)
    .then(response => response.json())
    .then(mails => {
      if (listFilter === '') {
        for (let i = 0; i < mails.length; i++) {
          if (!mails[i].attachments.length) {
            mails = mails.filter((mail) => (mail.attachments.length !== 0 && mail.deleted === false))
          }
        }
      }
      if (listFilter === '?deleted=true') {
        this.setState({pageMode: 'deleted'})
      } else {
        this.setState({pageMode: ''})
      }
      this.setState({mailList: mails})
    })
    .catch((err) => console.log(err))
  }

  mailWriteHandler = () => {
    this.setState({pageMode: 'writeMail'}) 
  }

  render () {

    return (
      <div className="App">
        <MenuForPC 
          incoming={this.state.incoming} 
          attachmentsMode={this.listAttachmentsFetch}
          listFetch={this.listFetch}
          writeMail={this.mailWriteHandler}
        />
        <MainField 
          incoming={this.incomingHandler} 
          mails={this.state.mailList} 
          listFetch={this.listFetch}
          pageMode={this.state.pageMode}
        />
      </div>
    );    
  }
}

export default App;
